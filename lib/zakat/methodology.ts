import { ZakatMethodologyConfig } from "./types";

/**
 * Single centralized methodology configuration for Zakat Companion.
 * 
 * CRITICAL RELIGIOUS METHODOLOGY NOTICE:
 * All values in this file are DEVELOPMENT DEFAULTS PENDING RELIGIOUS REVIEW.
 * They are not officially approved fatwas or religious rulings.
 */
export const DEFAULT_ZAKAT_METHODOLOGY: ZakatMethodologyConfig = {
  /**
   * Methodology approval status.
   * Development default — pending religious review.
   */
  status: "DEVELOPMENT_DEFAULTS_PENDING_REVIEW",

  /**
   * Zakat rate: 2.5% (0.025) for Lunar year calendar basis.
   * Development default — pending religious review.
   */
  zakatRate: 0.025,

  /**
   * Calendar basis: Lunar (Hijri) year standard.
   * Development default — pending religious review.
   */
  calendarBasis: "lunar",

  /**
   * Gold Nisab weight standard: 87.48 grams (7.5 Tolas pure gold).
   * Development default — pending religious review.
   */
  goldNisabGrams: 87.48,

  /**
   * Silver Nisab weight standard: 612.36 grams (52.5 Tolas pure silver).
   * Development default — pending religious review.
   */
  silverNisabGrams: 612.36,

  /**
   * Default Nisab selection threshold: Silver.
   * Development default — pending religious review.
   */
  defaultNisabStandard: "silver",

  /**
   * Hawl holding period: Assumed completed (1 lunar year) for entered wealth.
   * Development default — pending religious review.
   */
  hawlSatisfiedDefault: true,

  /**
   * Gold valuation method: Spot market price * purity ratio (with estimate fallback).
   * Development default — pending religious review.
   */
  goldValuationMethod: "spot_price_with_purity",

  /**
   * Silver valuation method: Spot market price * purity ratio (with estimate fallback).
   * Development default — pending religious review.
   */
  silverValuationMethod: "spot_price_with_purity",

  /**
   * Investment assets valuation ratio: 100% of entered market value.
   * Development default — pending religious review.
   */
  investmentValuationRatio: 1.0,

  /**
   * Business trade inventory valuation ratio: 100% of entered value.
   * Development default — pending religious review.
   */
  businessTradeStockValuationRatio: 1.0,

  /**
   * Receivables valuation ratio: 100% of expected debt repayments.
   * Development default — pending religious review.
   */
  receivablesValuationRatio: 1.0,

  /**
   * Liabilities deduction rule: Short-term debts and immediate expenses deductible up to total assets.
   * Development default — pending religious review.
   */
  allowLiabilityDeduction: true,
  liabilityDeductionCap: "total_assets",

  /**
   * Rounding precision rule: Round Zakat payable to nearest whole integer (PKR).
   * Development default — pending religious review.
   */
  roundingMethod: "nearest_integer",

  /**
   * Currency basis.
   * Development default — pending religious review.
   */
  currency: "PKR",

  /**
   * DEC-17 Scope Classification.
   */
  dec17Scope: "DEC-17: MVP OUT OF SCOPE — Real estate and investment property are not implemented.",

  /**
   * DEC-18 Scope Classification.
   */
  dec18Scope: "DEC-18: FUTURE SCOPE — Retirement, pension, and provident funds are not implemented in MVP.",

  /**
   * Mandatory user disclaimer text.
   */
  disclaimer:
    "This calculation uses development methodology defaults that are pending religious review. It is not an official religious ruling or fatwa.",
};

/**
 * Creates a custom methodology configuration by overriding specific development defaults.
 * Allows replacing methodology rules dynamically without rewriting the calculation engine.
 */
export function createMethodologyConfig(
  overrides?: Partial<ZakatMethodologyConfig>
): ZakatMethodologyConfig {
  return {
    ...DEFAULT_ZAKAT_METHODOLOGY,
    ...overrides,
  };
}
