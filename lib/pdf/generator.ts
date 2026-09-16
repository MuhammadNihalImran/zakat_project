import PDFDocument from "pdfkit";
import { ZakatCalculationResult } from "@/lib/zakat/types";

export type SupportedPdfLanguage = "en" | "ur";

export interface PdfRequestPayload {
  calculationResult: ZakatCalculationResult;
  lang?: SupportedPdfLanguage;
}

/**
 * Validates the API payload structure before PDF generation.
 * Ensures the payload contains valid, non-tampered calculation results.
 * 
 * DOES NOT perform any Zakat calculation math.
 */
export function validatePdfPayload(payload: unknown): PdfRequestPayload {
  if (!payload || typeof payload !== "object") {
    throw new Error("Invalid payload: Body must be an object.");
  }

  const p = payload as Record<string, unknown>;

  if (!p.calculationResult || typeof p.calculationResult !== "object") {
    throw new Error("Invalid payload: Missing or invalid calculationResult.");
  }

  const res = p.calculationResult as Record<string, unknown>;

  const requiredNumberFields = [
    "totalAssets",
    "totalLiabilities",
    "allowedLiabilities",
    "netZakatableWealth",
    "nisabThresholdGrams",
    "nisabValue",
    "zakatRatePercentage",
    "zakatPayable",
  ];

  for (const field of requiredNumberFields) {
    if (typeof res[field] !== "number" || isNaN(res[field] as number)) {
      throw new Error(`Invalid calculationResult: '${field}' must be a valid number.`);
    }
  }

  if (typeof res.isEligible !== "boolean") {
    throw new Error("Invalid calculationResult: 'isEligible' must be a boolean.");
  }

  if (!res.nisabStandardUsed || (res.nisabStandardUsed !== "gold" && res.nisabStandardUsed !== "silver")) {
    throw new Error("Invalid calculationResult: 'nisabStandardUsed' must be 'gold' or 'silver'.");
  }

  if (typeof res.methodologyStatus !== "string" || !res.methodologyStatus) {
    throw new Error("Invalid calculationResult: 'methodologyStatus' must be a non-empty string.");
  }

  if (typeof res.disclaimer !== "string" || !res.disclaimer) {
    throw new Error("Invalid calculationResult: 'disclaimer' must be a non-empty string.");
  }

  if (!res.categoryBreakdown || typeof res.categoryBreakdown !== "object") {
    throw new Error("Invalid calculationResult: Missing categoryBreakdown.");
  }

  const cat = res.categoryBreakdown as Record<string, unknown>;
  const categoryFields = ["cashSavings", "gold", "silver", "investments", "businessAssets", "receivables"];
  for (const cField of categoryFields) {
    if (typeof cat[cField] !== "number" || isNaN(cat[cField] as number)) {
      throw new Error(`Invalid categoryBreakdown: '${cField}' must be a valid number.`);
    }
  }

  let lang: SupportedPdfLanguage = "en";
  if (p.lang === "ur" || p.lang === "en") {
    lang = p.lang;
  } else if (p.lang !== undefined) {
    throw new Error("Invalid language: 'lang' must be 'en' or 'ur'.");
  }

  return {
    calculationResult: p.calculationResult as ZakatCalculationResult,
    lang,
  };
}

/**
 * Server-side PDF document generator.
 * 
 * Renders the provided ZakatCalculationResult into a clean, downloadable PDF buffer.
 * Performs ZERO Zakat calculations internally.
 */
export function generatePdfSummary(payload: PdfRequestPayload): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const { calculationResult, lang } = payload;
      const isUrdu = lang === "ur";

      const doc = new PDFDocument({
        size: "A4",
        margin: 40,
        info: {
          Title: "Zakat Calculation Summary Report",
          Author: "Zakat Companion",
          Subject: "Zakat Assessment Summary",
        },
      });

      const chunks: Buffer[] = [];
      doc.on("data", (chunk: Buffer) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", (err: Error) => reject(err));

      const primaryColor = "#0f172a"; // Slate 900
      const accentColor = "#059669"; // Emerald 600
      const warningBg = "#fef3c7"; // Amber 100
      const warningText = "#92400e"; // Amber 800
      const borderColor = "#cbd5e1"; // Slate 300

      const titleText = isUrdu
        ? "زکوٰۃ سمری رپورٹ — ZAKAT CALCULATION SUMMARY REPORT"
        : "ZAKAT CALCULATION SUMMARY REPORT";

      const generatedDate = new Date().toLocaleString(isUrdu ? "ur-PK" : "en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      });

      // 1. Header Banner
      doc
        .rect(40, 40, 515, 60)
        .fill(primaryColor);

      doc
        .fillColor("#ffffff")
        .fontSize(14)
        .font("Helvetica-Bold")
        .text("ZAKAT COMPANION", 55, 52, { width: 480 });

      doc
        .fontSize(10)
        .font("Helvetica")
        .fillColor("#94a3b8")
        .text(titleText, 55, 72, { width: 480 });

      // 2. Report Date & Status
      doc
        .fillColor("#475569")
        .fontSize(9)
        .font("Helvetica")
        .text(`Report Generated: ${generatedDate}`, 40, 110);

      doc
        .fillColor("#059669")
        .font("Helvetica-Bold")
        .text(`Status: ${calculationResult.methodologyStatus}`, 320, 110, { align: "right" });

      // 3. Mandatory Disclaimer Box
      doc
        .rect(40, 130, 515, 45)
        .fillAndStroke(warningBg, "#fde68a");

      doc
        .fillColor(warningText)
        .fontSize(8.5)
        .font("Helvetica-Bold")
        .text("METHODOLOGY DISCLAIMER NOTICE:", 50, 138);

      doc
        .fontSize(8)
        .font("Helvetica")
        .text(calculationResult.disclaimer, 50, 150, {
          width: 495,
          lineGap: 2,
        });

      // 4. Executive Summary Card (Main Result)
      doc
        .rect(40, 185, 515, 80)
        .fillAndStroke("#022c22", accentColor); // Dark Emerald container

      doc
        .fillColor("#a7f3d0")
        .fontSize(10)
        .font("Helvetica-Bold")
        .text("FINAL ZAKAT PAYABLE", 55, 195);

      const statusTag = calculationResult.isEligible
        ? "ELIGIBLE FOR ZAKAT"
        : "BELOW NISAB THRESHOLD";

      doc
        .fillColor("#ffffff")
        .fontSize(9)
        .text(`[ ${statusTag} ]`, 380, 195, { align: "right" });

      doc
        .fillColor("#34d399")
        .fontSize(24)
        .font("Helvetica-Bold")
        .text(`PKR ${calculationResult.zakatPayable.toLocaleString()}`, 55, 212);

      const nisabDesc = `Nisab Standard: ${calculationResult.nisabStandardUsed.toUpperCase()} (${calculationResult.nisabThresholdGrams}g) | Threshold: PKR ${calculationResult.nisabValue.toLocaleString()} | Rate: ${calculationResult.zakatRatePercentage}%`;

      doc
        .fillColor("#cbd5e1")
        .fontSize(8.5)
        .font("Helvetica")
        .text(nisabDesc, 55, 245);

      // 5. Net Wealth Summary Table
      doc
        .fillColor(primaryColor)
        .fontSize(11)
        .font("Helvetica-Bold")
        .text("CALCULATION SUMMARY", 40, 280);

      const summaryY = 295;
      const rowHeight = 20;

      // Table Header
      doc.rect(40, summaryY, 515, rowHeight).fill("#f1f5f9");
      doc.fillColor("#334155").fontSize(9).font("Helvetica-Bold");
      doc.text("Metric", 50, summaryY + 5);
      doc.text("Value (PKR)", 400, summaryY + 5, { width: 145, align: "right" });

      // Rows
      const summaryRows = [
        { label: "Total Gross Zakatable Assets", value: `PKR ${calculationResult.totalAssets.toLocaleString()}` },
        { label: "Total Deductible Liabilities", value: `- PKR ${calculationResult.allowedLiabilities.toLocaleString()}` },
        { label: "Net Zakatable Wealth", value: `PKR ${calculationResult.netZakatableWealth.toLocaleString()}` },
      ];

      summaryRows.forEach((row, i) => {
        const y = summaryY + rowHeight * (i + 1);
        doc.rect(40, y, 515, rowHeight).stroke(borderColor);
        doc.fillColor("#1e293b").fontSize(8.5).font(i === 2 ? "Helvetica-Bold" : "Helvetica");
        doc.text(row.label, 50, y + 5);
        doc.text(row.value, 400, y + 5, { width: 145, align: "right" });
      });

      // 6. Category Breakdown Table
      const catY = 385;
      doc
        .fillColor(primaryColor)
        .fontSize(11)
        .font("Helvetica-Bold")
        .text("ENTERED ASSET CATEGORY BREAKDOWN", 40, catY);

      const catTableY = catY + 15;
      doc.rect(40, catTableY, 515, rowHeight).fill("#f1f5f9");
      doc.fillColor("#334155").fontSize(9).font("Helvetica-Bold");
      doc.text("Asset Category", 50, catTableY + 5);
      doc.text("Assessed Value (PKR)", 400, catTableY + 5, { width: 145, align: "right" });

      const catBreakdown = calculationResult.categoryBreakdown;
      const catRows = [
        { label: "Cash & Savings", value: `PKR ${catBreakdown.cashSavings.toLocaleString()}` },
        { label: "Gold Holdings", value: `PKR ${catBreakdown.gold.toLocaleString()}` },
        { label: "Silver Holdings", value: `PKR ${catBreakdown.silver.toLocaleString()}` },
        { label: "Investments (Stocks & Funds)", value: `PKR ${catBreakdown.investments.toLocaleString()}` },
        { label: "Business Trade Inventory & Capital", value: `PKR ${catBreakdown.businessAssets.toLocaleString()}` },
        { label: "Receivables (Expected Debt Repayments)", value: `PKR ${catBreakdown.receivables.toLocaleString()}` },
      ];

      catRows.forEach((row, i) => {
        const y = catTableY + rowHeight * (i + 1);
        doc.rect(40, y, 515, rowHeight).stroke(borderColor);
        doc.fillColor("#334155").fontSize(8.5).font("Helvetica");
        doc.text(row.label, 50, y + 5);
        doc.text(row.value, 400, y + 5, { width: 145, align: "right" });
      });

      // 7. Scope & Limitation Metadata
      const notesY = catTableY + rowHeight * 7 + 15;
      doc
        .fillColor(primaryColor)
        .fontSize(10)
        .font("Helvetica-Bold")
        .text("METHODOLOGY & SCOPE NOTES", 40, notesY);

      let currentNoteY = notesY + 15;
      doc.fillColor("#64748b").fontSize(7.5).font("Helvetica");

      calculationResult.limitations.forEach((note) => {
        doc.text(`• ${note}`, 45, currentNoteY, { width: 505 });
        currentNoteY += 12;
      });

      // 8. Footer
      doc
        .rect(40, 770, 515, 0.5)
        .stroke(borderColor);

      doc
        .fillColor("#94a3b8")
        .fontSize(7.5)
        .font("Helvetica")
        .text("Zakat Companion — Privacy-conscious calculation summary. No financial data was saved on server.", 40, 778);

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}
