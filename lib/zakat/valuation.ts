import {
  CashSavingsData,
  GoldData,
  SilverData,
  InvestmentsData,
  BusinessAssetsData,
  ReceivablesData,
  LiabilitiesData,
} from "@/types/calculator";
import { MetalPricesInput, ZakatMethodologyConfig } from "./types";

/**
 * Safely parses and validates numeric input strings for Zakat calculation.
 * Throws explicit errors for negative values, non-numeric strings, and NaN.
 * Empty or undefined input resolves to 0.
 */
export function parseValuationNumber(
  val: string | number | undefined,
  fieldName: string
): number {
  if (val === undefined || val === null) return 0;

  if (typeof val === "number") {
    if (isNaN(val)) {
      throw new Error(`Invalid numeric value for ${fieldName}: NaN`);
    }
    if (!isFinite(val)) {
      throw new Error(`Invalid numeric value for ${fieldName}: Infinity`);
    }
    if (val < 0) {
      throw new Error(`Negative values are not allowed for ${fieldName}: ${val}`);
    }
    return val;
  }

  const trimmed = val.trim();
  if (trimmed === "") return 0;

  if (trimmed.startsWith("-")) {
    throw new Error(`Negative values are not allowed for ${fieldName}: "${val}"`);
  }

  if (!/^\d+(\.\d+)?$/.test(trimmed)) {
    throw new Error(`Invalid numeric value for ${fieldName}: "${val}"`);
  }

  const parsed = parseFloat(trimmed);
  if (isNaN(parsed)) {
    throw new Error(`Invalid numeric value for ${fieldName}: "${val}"`);
  }

  return parsed;
}

/**
 * Calculates total cash and bank savings.
 */
export function calculateCashValue(
  data: CashSavingsData,
  _methodology: ZakatMethodologyConfig
): number {
  const cash = parseValuationNumber(data.cashInHand, "cashInHand");
  const bank = parseValuationNumber(data.bankSavings, "bankSavings");
  const other = parseValuationNumber(data.otherCash, "otherCash");
  return cash + bank + other;
}

/**
 * Calculates gold asset value based on weight, carat purity ratio, and spot price or user estimate.
 */
export function calculateGoldValue(
  data: GoldData,
  prices: MetalPricesInput | undefined,
  _methodology: ZakatMethodologyConfig
): number {
  const weight = parseValuationNumber(data.weightGrams, "gold.weightGrams");
  const estValue = parseValuationNumber(
    data.estimatedValue,
    "gold.estimatedValue"
  );

  const caratStr = data.purityCarat ? data.purityCarat.trim() : "24";
  const caratVal = parseValuationNumber(caratStr, "gold.purityCarat");
  // Standard gold carat ratio based on 24K pure gold scale
  const purityRatio = caratVal > 0 ? caratVal / 24 : 1.0;

  const spotPrice = prices?.goldPricePerGram ?? 0;

  if (weight > 0 && spotPrice > 0) {
    return weight * purityRatio * spotPrice;
  }

  if (estValue > 0) {
    return estValue;
  }

  return 0;
}

/**
 * Calculates silver asset value based on weight, purity ratio, and spot price or user estimate.
 */
export function calculateSilverValue(
  data: SilverData,
  prices: MetalPricesInput | undefined,
  _methodology: ZakatMethodologyConfig
): number {
  const weight = parseValuationNumber(data.weightGrams, "silver.weightGrams");
  const estValue = parseValuationNumber(
    data.estimatedValue,
    "silver.estimatedValue"
  );

  const purityStr = data.purityCarat ? data.purityCarat.trim() : "24";
  const purityVal = parseValuationNumber(purityStr, "silver.purityCarat");

  let purityRatio = 1.0;
  if (purityVal <= 24 && purityVal > 0) {
    purityRatio = purityVal / 24;
  } else if (purityVal <= 100 && purityVal > 0) {
    purityRatio = purityVal / 100;
  } else if (purityVal <= 1000 && purityVal > 0) {
    purityRatio = purityVal / 1000;
  }

  const spotPrice = prices?.silverPricePerGram ?? 0;

  if (weight > 0 && spotPrice > 0) {
    return weight * purityRatio * spotPrice;
  }

  if (estValue > 0) {
    return estValue;
  }

  return 0;
}

/**
 * Calculates investment portfolio value according to methodology ratio.
 */
export function calculateInvestmentsValue(
  data: InvestmentsData,
  methodology: ZakatMethodologyConfig
): number {
  const stocks = parseValuationNumber(data.stocks, "investments.stocks");
  const mutualFunds = parseValuationNumber(
    data.mutualFunds,
    "investments.mutualFunds"
  );
  const other = parseValuationNumber(
    data.otherInvestments,
    "investments.otherInvestments"
  );

  const totalMarketValue = stocks + mutualFunds + other;
  return totalMarketValue * methodology.investmentValuationRatio;
}

/**
 * Calculates business asset value according to methodology ratio.
 */
export function calculateBusinessAssetsValue(
  data: BusinessAssetsData,
  methodology: ZakatMethodologyConfig
): number {
  const stock = parseValuationNumber(
    data.tradeStock,
    "businessAssets.tradeStock"
  );
  const reserves = parseValuationNumber(
    data.cashReserves,
    "businessAssets.cashReserves"
  );

  const zakatableStock = stock * methodology.businessTradeStockValuationRatio;
  return zakatableStock + reserves;
}

/**
 * Calculates receivables value according to methodology ratio.
 */
export function calculateReceivablesValue(
  data: ReceivablesData,
  methodology: ZakatMethodologyConfig
): number {
  const repayments = parseValuationNumber(
    data.expectedRepayments,
    "receivables.expectedRepayments"
  );
  return repayments * methodology.receivablesValuationRatio;
}

/**
 * Calculates gross deductible liabilities.
 */
export function calculateLiabilitiesValue(
  data: LiabilitiesData,
  methodology: ZakatMethodologyConfig
): number {
  if (!methodology.allowLiabilityDeduction) {
    return 0;
  }

  const debts = parseValuationNumber(
    data.shortTermDebts,
    "liabilities.shortTermDebts"
  );
  const expenses = parseValuationNumber(
    data.immediateExpenses,
    "liabilities.immediateExpenses"
  );

  return debts + expenses;
}
