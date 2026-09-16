import { NextRequest, NextResponse } from "next/server";
import { generatePdfSummary, validatePdfPayload } from "@/lib/pdf/generator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { success: false, error: "Invalid JSON request body." },
        { status: 400 }
      );
    }

    // Server-side validation of calculation payload
    let validatedPayload;
    try {
      validatedPayload = validatePdfPayload(body);
    } catch (valErr) {
      const msg = valErr instanceof Error ? valErr.message : "Validation failed.";
      return NextResponse.json({ success: false, error: msg }, { status: 400 });
    }

    // Stream PDF generation
    const pdfBuffer = await generatePdfSummary(validatedPayload);

    const timestamp = new Date().toISOString().split("T")[0];
    const filename = `zakat-summary-${timestamp}.pdf`;

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "An error occurred while generating the PDF document." },
      { status: 500 }
    );
  }
}
