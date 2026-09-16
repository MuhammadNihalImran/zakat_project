import { CalculatorState } from "@/types/calculator";
import { translations, Language } from "@/lib/i18n/translations";

export type ValidationErrorKey =
  | "emptyInput"
  | "invalidNumber"
  | "negativeValue"
  | "excessiveValue";

export interface ValidationResult {
  isValid: boolean;
  errorKey?: ValidationErrorKey;
}

export interface ValidationOptions {
  allowEmpty?: boolean;
  max?: number;
}

/**
 * Safely validates numeric input strings without introducing religious rules or thresholds.
 */
export function validateNumericString(
  val: string,
  options: ValidationOptions = {}
): ValidationResult {
  const allowEmpty = options.allowEmpty ?? true;
  const maxLimit = options.max ?? 1_000_000_000_000; // 1 Trillion safety limit

  const trimmed = typeof val === "string" ? val.trim() : "";

  if (trimmed === "") {
    if (!allowEmpty) {
      return { isValid: false, errorKey: "emptyInput" };
    }
    return { isValid: true };
  }

  // Strict numeric regex check (allows positive decimals)
  if (!/^\d+(\.\d+)?$/.test(trimmed)) {
    // If it starts with minus, identify negative
    if (/^-\d+(\.\d+)?$/.test(trimmed)) {
      return { isValid: false, errorKey: "negativeValue" };
    }
    return { isValid: false, errorKey: "invalidNumber" };
  }

  const parsed = parseFloat(trimmed);

  if (isNaN(parsed)) {
    return { isValid: false, errorKey: "invalidNumber" };
  }

  if (parsed < 0) {
    return { isValid: false, errorKey: "negativeValue" };
  }

  if (parsed > maxLimit) {
    return { isValid: false, errorKey: "excessiveValue" };
  }

  return { isValid: true };
}

/**
 * Returns localized message for a validation error key.
 */
export function getValidationErrorMessage(
  errorKey: ValidationErrorKey | undefined,
  lang: Language = "en"
): string {
  if (!errorKey) return "";
  const t = translations[lang].validation;
  return t[errorKey] || t.invalidNumber;
}

/**
 * Validates complete CalculatorState before review/result.
 */
export function validateCalculatorState(state: CalculatorState): {
  isValid: boolean;
  invalidFields: string[];
} {
  const invalidFields: string[] = [];

  const check = (category: string, field: string, val: string) => {
    const res = validateNumericString(val, { allowEmpty: true });
    if (!res.isValid) {
      invalidFields.push(`${category}.${field}`);
    }
  };

  // Cash & Savings
  check("cashSavings", "cashInHand", state.cashSavings.cashInHand);
  check("cashSavings", "bankSavings", state.cashSavings.bankSavings);
  check("cashSavings", "otherCash", state.cashSavings.otherCash);

  // Gold
  check("gold", "weightGrams", state.gold.weightGrams);
  check("gold", "estimatedValue", state.gold.estimatedValue);

  // Silver
  check("silver", "weightGrams", state.silver.weightGrams);
  check("silver", "estimatedValue", state.silver.estimatedValue);

  // Investments
  check("investments", "stocks", state.investments.stocks);
  check("investments", "mutualFunds", state.investments.mutualFunds);
  check("investments", "otherInvestments", state.investments.otherInvestments);

  // Business Assets
  check("businessAssets", "tradeStock", state.businessAssets.tradeStock);
  check("businessAssets", "cashReserves", state.businessAssets.cashReserves);

  // Receivables
  check("receivables", "expectedRepayments", state.receivables.expectedRepayments);

  // Liabilities
  check("liabilities", "shortTermDebts", state.liabilities.shortTermDebts);
  check("liabilities", "immediateExpenses", state.liabilities.immediateExpenses);

  return {
    isValid: invalidFields.length === 0,
    invalidFields,
  };
}
