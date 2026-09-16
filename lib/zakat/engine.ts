import { CalculatorState } from "@/types/calculator";
import {
  MetalPricesInput,
  ZakatCalculationResult,
  ZakatMethodologyConfig,
} from "./types";
import { DEFAULT_ZAKAT_METHODOLOGY } from "./methodology";
import {
  calculateBusinessAssetsValue,
  calculateCashValue,
  calculateGoldValue,
  calculateInvestmentsValue,
  calculateLiabilitiesValue,
  calculateReceivablesValue,
  calculateSilverValue,
} from "./valuation";
import { calculateNisabThreshold, evaluateNisabEligibility } from "./nisab";

/**
 * Pure, deterministic Zakat calculation engine.
 * 
 * Computes asset totals, allowed deductible liabilities, net zakatable wealth,
 * Nisab eligibility, and final Zakat payable using the provided methodology configuration.
 */
export function calculateZakat(
  input: CalculatorState,
  methodology: ZakatMethodologyConfig = DEFAULT_ZAKAT_METHODOLOGY,
  prices?: MetalPricesInput
): ZakatCalculationResult {
  if (!methodology) {
    throw new Error("Missing methodology configuration");
  }

  if (!input) {
    throw new Error("Missing calculator input state");
  }

  // 1. Category asset valuations
  const cashSavings = calculateCashValue(input.cashSavings, methodology);
  const gold = calculateGoldValue(input.gold, prices, methodology);
  const silver = calculateSilverValue(input.silver, prices, methodology);
  const investments = calculateInvestmentsValue(input.investments, methodology);
  const businessAssets = calculateBusinessAssetsValue(
    input.businessAssets,
    methodology
  );
  const receivables = calculateReceivablesValue(input.receivables, methodology);

  const categoryBreakdown = {
    cashSavings,
    gold,
    silver,
    investments,
    businessAssets,
    receivables,
  };

  // 2. Gross assets sum
  const totalAssets =
    cashSavings + gold + silver + investments + businessAssets + receivables;

  // 3. Liabilities calculation
  const totalLiabilities = calculateLiabilitiesValue(
    input.liabilities,
    methodology
  );

  const allowedLiabilities =
    methodology.liabilityDeductionCap === "total_assets"
      ? Math.min(totalLiabilities, totalAssets)
      : totalLiabilities;

  // 4. Net Zakatable wealth (never negative)
  const netZakatableWealth = Math.max(0, totalAssets - allowedLiabilities);

  // 5. Nisab threshold evaluation
  const selectedStandard =
    input.nisabStandard || methodology.defaultNisabStandard;
  const nisabEval = calculateNisabThreshold(
    selectedStandard,
    prices,
    methodology
  );

  const isEligible = evaluateNisabEligibility(
    netZakatableWealth,
    nisabEval.value
  );

  // 6. Zakat rate application
  const rawZakatPayable = isEligible
    ? netZakatableWealth * methodology.zakatRate
    : 0;

  // 7. Rounding application
  let zakatPayable = rawZakatPayable;
  if (methodology.roundingMethod === "nearest_integer") {
    zakatPayable = Math.round(rawZakatPayable);
  } else if (methodology.roundingMethod === "floor") {
    zakatPayable = Math.floor(rawZakatPayable);
  } else if (methodology.roundingMethod === "ceil") {
    zakatPayable = Math.ceil(rawZakatPayable);
  }

  // Ensure Zakat payable is never negative
  zakatPayable = Math.max(0, zakatPayable);

  const zakatRatePercentage = methodology.zakatRate * 100;

  const limitations = [
    "Gold/Silver worn jewelry vs investment bullion is evaluated uniformly based on entered weight and purity.",
    "Investments portfolio market value is evaluated at 100% without company net asset ratio breakdown.",
    "Business trade stock is evaluated at 100% user-entered valuation.",
    "Receivables are evaluated at 100% without separating doubtful or uncollectible debts.",
    methodology.dec17Scope,
    methodology.dec18Scope,
  ];

  return {
    totalAssets,
    categoryBreakdown,
    totalLiabilities,
    allowedLiabilities,
    netZakatableWealth,
    nisabStandardUsed: nisabEval.standard,
    nisabThresholdGrams: nisabEval.grams,
    nisabValue: nisabEval.value,
    isEligible,
    zakatRatePercentage,
    zakatPayable,
    methodologyStatus: methodology.status,
    disclaimer: methodology.disclaimer,
    limitations,
  };
}
