export interface MetalPrice {
  price: number;
  unit: string;
  currency: string;
}

export interface MetalPricesResponse {
  gold: MetalPrice;
  silver: MetalPrice;
  timestamp: string;
}

interface MetalsApiResponse {
  success: boolean;
  data?: MetalPricesResponse;
  error?: string;
}

// In-memory short-lived cache (5 minutes)
let cache: { data: MetalPricesResponse; expiresAt: number } | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000;

export async function fetchMetalPricesFromProvider(): Promise<MetalsApiResponse> {
  const apiKey = process.env.GOLD_SILVER_API_KEY;
  const baseUrl = process.env.GOLD_SILVER_API_URL;

  if (!apiKey || !baseUrl) {
    return {
      success: false,
      error: "Server configuration missing API credentials.",
    };
  }

  // Check valid cache
  if (cache && Date.now() < cache.expiresAt) {
    return {
      success: true,
      data: cache.data,
    };
  }

  try {
    const url = new URL(baseUrl);
    url.searchParams.append("api_key", apiKey);
    url.searchParams.append("currency", "PKR");
    url.searchParams.append("unit", "g");

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const res = await fetch(url.toString(), {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      return {
        success: false,
        error: `Provider returned status ${res.status}`,
      };
    }

    const raw = await res.json();

    if (raw.status !== "success" || !raw.metals || !raw.metals.gold || !raw.metals.silver) {
      return {
        success: false,
        error: "Invalid or incomplete price data returned by provider.",
      };
    }

    const normalizedData: MetalPricesResponse = {
      gold: {
        price: Math.round(raw.metals.gold * 100) / 100,
        unit: raw.unit || "g",
        currency: raw.currency || "PKR",
      },
      silver: {
        price: Math.round(raw.metals.silver * 100) / 100,
        unit: raw.unit || "g",
        currency: raw.currency || "PKR",
      },
      timestamp: raw.timestamps?.metal || new Date().toISOString(),
    };

    // Update cache
    cache = {
      data: normalizedData,
      expiresAt: Date.now() + CACHE_TTL_MS,
    };

    return {
      success: true,
      data: normalizedData,
    };
  } catch (err: unknown) {
    const isAbort = err instanceof Error && err.name === "AbortError";
    return {
      success: false,
      error: isAbort
        ? "Gold/Silver price service request timed out."
        : "Failed to connect to Gold/Silver price service.",
    };
  }
}

export function clearMetalsCache(): void {
  cache = null;
}

