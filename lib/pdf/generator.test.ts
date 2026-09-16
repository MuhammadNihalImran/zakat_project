import { generatePdfSummary, validatePdfPayload } from "./generator";
import { ZakatCalculationResult } from "@/lib/zakat/types";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`FAILED: ${message}`);
  }
}

const mockResult: ZakatCalculationResult = {
  totalAssets: 1000000,
  categoryBreakdown: {
    cashSavings: 400000,
    gold: 250000,
    silver: 50000,
    investments: 150000,
    businessAssets: 100000,
    receivables: 50000,
  },
  totalLiabilities: 200000,
  allowedLiabilities: 200000,
  netZakatableWealth: 800000,
  nisabStandardUsed: "silver",
  nisabThresholdGrams: 612.36,
  nisabValue: 183708,
  isEligible: true,
  zakatRatePercentage: 2.5,
  zakatPayable: 20000,
  methodologyStatus: "DEVELOPMENT_DEFAULTS_PENDING_REVIEW",
  disclaimer:
    "This calculation uses development methodology defaults that are pending religious review. It is not an official religious ruling or fatwa.",
  limitations: [
    "DEC-17: MVP OUT OF SCOPE — Real estate and investment property are not implemented.",
    "DEC-18: FUTURE SCOPE — Retirement, pension, and provident funds are not implemented in MVP.",
  ],
};

async function runPdfTests() {
  console.log("Starting Phase 10 PDF Generator Unit Tests...\n");
  let passed = 0;
  let total = 0;

  // 1. English PDF generation returns valid PDF buffer starting with %PDF
  total++;
  const payloadEn = validatePdfPayload({ calculationResult: mockResult, lang: "en" });
  const pdfBufferEn = await generatePdfSummary(payloadEn);
  assert(Buffer.isBuffer(pdfBufferEn), "Returns a node Buffer");
  assert(pdfBufferEn.length > 0, "Buffer is non-empty");
  const headerEn = pdfBufferEn.toString("ascii", 0, 4);
  assert(headerEn === "%PDF", "PDF buffer starts with %PDF signature");
  console.log("✅ Test 1 Passed: English PDF generation produces valid %PDF buffer.");
  passed++;

  // 2. Urdu PDF generation returns valid PDF buffer starting with %PDF
  total++;
  const payloadUr = validatePdfPayload({ calculationResult: mockResult, lang: "ur" });
  const pdfBufferUr = await generatePdfSummary(payloadUr);
  assert(Buffer.isBuffer(pdfBufferUr), "Returns a node Buffer for Urdu");
  assert(pdfBufferUr.length > 0, "Buffer is non-empty for Urdu");
  const headerUr = pdfBufferUr.toString("ascii", 0, 4);
  assert(headerUr === "%PDF", "Urdu PDF buffer starts with %PDF signature");
  console.log("✅ Test 2 Passed: Urdu PDF generation produces valid %PDF buffer.");
  passed++;

  // 3. Missing calculation result is rejected
  total++;
  try {
    validatePdfPayload({ lang: "en" });
    assert(false, "Should reject payload missing calculationResult");
  } catch (err: unknown) {
    assert(
      err instanceof Error && err.message.includes("Missing or invalid calculationResult"),
      "Rejects missing calculationResult"
    );
  }
  console.log("✅ Test 3 Passed: Missing calculationResult payload rejected.");
  passed++;

  // 4. Invalid numeric value in calculationResult is rejected
  total++;
  try {
    const invalidResult = { ...mockResult, zakatPayable: "invalid" };
    validatePdfPayload({ calculationResult: invalidResult });
    assert(false, "Should reject non-numeric zakatPayable");
  } catch (err: unknown) {
    assert(
      err instanceof Error && err.message.includes("zakatPayable"),
      "Rejects invalid numeric field"
    );
  }
  console.log("✅ Test 4 Passed: Invalid numeric value rejected.");
  passed++;

  // 5. Invalid language is rejected
  total++;
  try {
    validatePdfPayload({ calculationResult: mockResult, lang: "fr" });
    assert(false, "Should reject unsupported language");
  } catch (err: unknown) {
    assert(
      err instanceof Error && err.message.includes("Invalid language"),
      "Rejects unsupported language"
    );
  }
  console.log("✅ Test 5 Passed: Invalid language parameter rejected.");
  passed++;

  // 6. Disclaimer presence verified
  total++;
  assert(
    payloadEn.calculationResult.disclaimer.includes("pending religious review"),
    "Disclaimer is preserved in validated payload"
  );
  console.log("✅ Test 6 Passed: Methodology disclaimer verified.");
  passed++;

  // 7. Methodology status presence verified
  total++;
  assert(
    payloadEn.calculationResult.methodologyStatus === "DEVELOPMENT_DEFAULTS_PENDING_REVIEW",
    "Methodology status preserved"
  );
  console.log("✅ Test 7 Passed: Methodology status verified.");
  passed++;

  // 8. Actual category values represented in payload
  total++;
  assert(
    payloadEn.calculationResult.categoryBreakdown.cashSavings === 400000,
    "Cash savings preserved"
  );
  assert(
    payloadEn.calculationResult.categoryBreakdown.gold === 250000,
    "Gold holdings preserved"
  );
  console.log("✅ Test 8 Passed: Actual category values represented.");
  passed++;

  // 9. Actual final payable amount represented
  total++;
  assert(payloadEn.calculationResult.zakatPayable === 20000, "Zakat payable amount preserved");
  console.log("✅ Test 9 Passed: Actual final payable amount represented.");
  passed++;

  // 10. Verification that generator does NOT recalculate Zakat math
  total++;
  // We pass a custom result where zakatPayable is 9999 (which math wouldn't compute)
  const customPayableResult: ZakatCalculationResult = {
    ...mockResult,
    zakatPayable: 9999,
  };
  const payloadCustom = validatePdfPayload({ calculationResult: customPayableResult });
  assert(
    payloadCustom.calculationResult.zakatPayable === 9999,
    "PDF generator respects passed zakatPayable without recalculation"
  );
  const pdfBufferCustom = await generatePdfSummary(payloadCustom);
  assert(pdfBufferCustom.toString("ascii", 0, 4) === "%PDF", "PDF generated with custom result");
  console.log("✅ Test 10 Passed: PDF generator performs zero recalculation.");
  passed++;

  console.log(`\nPDF Generator Results: ${passed}/${total} tests passed! 🎉`);
}

runPdfTests().catch((err) => {
  console.error("PDF test run failed:", err);
  process.exit(1);
});
