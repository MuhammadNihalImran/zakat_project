import { NisabStandard } from "@/types/calculator";

export type ZakatMethodologyStatus =
  | "DEVELOPMENT_DEFAULTS_PENDING_REVIEW"
  | "APPROVED";

export interface MetalPricesInput {
  goldPricePerGram: number;
  silverPricePerGram: number;
  currency?: string;
  timestamp?: string;
}

export interface ZakatMethodologyConfig {
  /**
   * Methodology approval status.
   * Development default — pending religious review.
   */
  status: ZakatMethodologyStatus;

  /**
   * Zakat rate ratio (e.g., 0.025 for 2.5%).
   * Development default — pending religious review.
   */
  zakatRate: number;

  /**
   * Calendar basis (lunar vs solar).
   * Development default — pending religious review.
   */
  calendarBasis: "lunar" | "solar";

  /**
   * Gold Nisab threshold in grams.
   * Development default — pending religious review.
   */
  goldNisabGrams: number;

  /**
   * Silver Nisab threshold in grams.
   * Development default — pending religious review.
   */
  silverNisabGrams: number;

  /**
   * Default Nisab selection method.
   * Development default — pending religious review.
   */
  defaultNisabStandard: NisabStandard;

  /**
   * Hawl holding period assumed satisfied for entered assets.
   * Development default — pending religious review.
   */
  hawlSatisfiedDefault: boolean;

  /**
   * Gold valuation method.
   * Development default — pending religious review.
   */
  goldValuationMethod: "spot_price_with_purity" | "user_estimate_fallback";

  /**
   * Silver valuation method.
   * Development default — pending religious review.
   */
  silverValuationMethod: "spot_price_with_purity" | "user_estimate_fallback";

  /**
   * Investment asset valuation multiplier ratio.
   * Development default — pending religious review.
   */
  investmentValuationRatio: number;

  /**
   * Business trade inventory valuation multiplier ratio.
   * Development default — pending religious review.
   */
  businessTradeStockValuationRatio: number;

  /**
   * Receivables valuation multiplier ratio.
   * Development default — pending religious review.
   */
  receivablesValuationRatio: number;

  /**
   * Whether to allow deduction of liabilities.
   * Development default — pending religious review.
   */
  allowLiabilityDeduction: boolean;

  /**
   * Deduction limit for liabilities relative to total gross assets.
   * Development default — pending religious review.
   */
  liabilityDeductionCap: "total_assets" | "none";

  /**
   * Rounding precision method for Zakat payable amount.
   * Development default — pending religious review.
   */
  roundingMethod: "nearest_integer" | "floor" | "ceil" | "none";

  /**
   * Currency code.
   */
  currency: string;

  /**
   * DEC-17 Scope status.
   */
  dec17Scope: string;

  /**
   * DEC-18 Scope status.
   */
  dec18Scope: string;

  /**
   * Mandatory user-facing disclaimer.
   */
  disclaimer: string;
}

export interface AssetCategoryBreakdown {
  cashSavings: number;
  gold: number;
  silver: number;
  investments: number;
  businessAssets: number;
  receivables: number;
}

export interface ZakatCalculationResult {
  totalAssets: number;
  categoryBreakdown: AssetCategoryBreakdown;
  totalLiabilities: number;
  allowedLiabilities: number;
  netZakatableWealth: number;
  nisabStandardUsed: NisabStandard;
  nisabThresholdGrams: number;
  nisabValue: number;
  isEligible: boolean;
  zakatRatePercentage: number;
  zakatPayable: number;
  methodologyStatus: ZakatMethodologyStatus;
  disclaimer: string;
  limitations: string[];
}
