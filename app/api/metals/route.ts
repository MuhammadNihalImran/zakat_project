import { NextResponse } from "next/server";
import { fetchMetalPricesFromProvider } from "@/lib/api/metals";

export async function GET() {
  const result = await fetchMetalPricesFromProvider();

  if (!result.success) {
    return NextResponse.json(
      {
        success: false,
        error: "We couldn't fetch current gold and silver prices. Please try again later.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: true, data: result.data },
    {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
      },
    }
  );
}
