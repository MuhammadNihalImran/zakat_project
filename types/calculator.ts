export type NisabStandard = "gold" | "silver";

export interface CashSavingsData {
  cashInHand: string;
  bankSavings: string;
  otherCash: string;
}

export interface GoldData {
  weightGrams: string;
  purityCarat: string;
  estimatedValue: string;
}

export interface SilverData {
  weightGrams: string;
  purityCarat: string;
  estimatedValue: string;
}

export interface InvestmentsData {
  stocks: string;
  mutualFunds: string;
  otherInvestments: string;
}

export interface BusinessAssetsData {
  tradeStock: string;
  cashReserves: string;
}

export interface ReceivablesData {
  expectedRepayments: string;
}

export interface LiabilitiesData {
  shortTermDebts: string;
  immediateExpenses: string;
}

export interface CalculatorState {
  nisabStandard: NisabStandard;
  cashSavings: CashSavingsData;
  gold: GoldData;
  silver: SilverData;
  investments: InvestmentsData;
  businessAssets: BusinessAssetsData;
  receivables: ReceivablesData;
  liabilities: LiabilitiesData;
}

export const initialCalculatorState: CalculatorState = {
  nisabStandard: "silver",
  cashSavings: { cashInHand: "", bankSavings: "", otherCash: "" },
  gold: { weightGrams: "", purityCarat: "24", estimatedValue: "" },
  silver: { weightGrams: "", purityCarat: "24", estimatedValue: "" },
  investments: { stocks: "", mutualFunds: "", otherInvestments: "" },
  businessAssets: { tradeStock: "", cashReserves: "" },
  receivables: { expectedRepayments: "" },
  liabilities: { shortTermDebts: "", immediateExpenses: "" },
};
