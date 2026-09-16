import { NisabStandard } from "@/types/calculator";
import { MetalPricesInput, ZakatMethodologyConfig } from "./types";

export interface NisabEvaluationResult {
  standard: NisabStandard;
  grams: number;
  pricePerGram: number;
  value: number;
}

/**
 * Calculates the monetary Nisab threshold based on selected standard and metal prices.
 * Uses configurable Nisab weight thresholds from methodology.
 */
export function calculateNisabThreshold(
  standard: NisabStandard,
  prices: MetalPricesInput | undefined,
  methodology: ZakatMethodologyConfig
): NisabEvaluationResult {
  const isGold = standard === "gold";

  const grams = isGold
    ? methodology.goldNisabGrams
    : methodology.silverNisabGrams;

  const pricePerGram = isGold
    ? prices?.goldPricePerGram ?? 0
    : prices?.silverPricePerGram ?? 0;

  const value = grams * pricePerGram;

  return {
    standard,
    grams,
    pricePerGram,
    value,
  };
}

/**
 * Evaluates whether net zakatable wealth satisfies Nisab eligibility threshold.
 */
export function evaluateNisabEligibility(
  netZakatableWealth: number,
  nisabValue: number
): boolean {
  if (nisabValue <= 0) {
    return false; // Cannot determine eligibility without valid metal price / Nisab threshold
  }
  return netZakatableWealth >= nisabValue;
}
