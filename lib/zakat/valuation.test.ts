import {
  calculateCashValue,
  calculateGoldValue,
  calculateSilverValue,
  calculateInvestmentsValue,
  calculateBusinessAssetsValue,
  calculateReceivablesValue,
  calculateLiabilitiesValue,
  parseValuationNumber,
} from "./valuation";
import { DEFAULT_ZAKAT_METHODOLOGY } from "./methodology";
import {
  CashSavingsData,
  GoldData,
  SilverData,
  InvestmentsData,
  BusinessAssetsData,
  ReceivablesData,
  LiabilitiesData,
} from "@/types/calculator";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`FAILED: ${message}`);
  }
}

function runValuationTests() {
  console.log("Starting Zakat Valuation Unit Tests...\n");
  let passed = 0;
  let total = 0;

  // 1. parseValuationNumber edge cases
  total++;
  assert(parseValuationNumber("", "field") === 0, "Empty string returns 0");
  assert(parseValuationNumber("  ", "field") === 0, "Whitespace string returns 0");
  assert(parseValuationNumber(undefined, "field") === 0, "Undefined returns 0");
  assert(parseValuationNumber("1500", "field") === 1500, "Parses integer string");
  assert(parseValuationNumber("1500.75", "field") === 1500.75, "Parses float string");

  try {
    parseValuationNumber("-100", "field");
    assert(false, "Should throw for negative string");
  } catch (err: unknown) {
    assert(
      err instanceof Error && err.message.includes("Negative values are not allowed"),
      "Negative string throws error"
    );
  }

  try {
    parseValuationNumber("abc", "field");
    assert(false, "Should throw for non-numeric string");
  } catch (err: unknown) {
    assert(
      err instanceof Error && err.message.includes("Invalid numeric value"),
      "Invalid string throws error"
    );
  }
  console.log("✅ Test 1 Passed: parseValuationNumber validation works.");
  passed++;

  // 2. Cash and savings
  total++;
  const cashData: CashSavingsData = {
    cashInHand: "10000",
    bankSavings: "50000",
    otherCash: "5000",
  };
  const cashVal = calculateCashValue(cashData, DEFAULT_ZAKAT_METHODOLOGY);
  assert(cashVal === 65000, `Expected 65000 cash total, got ${cashVal}`);
  console.log("✅ Test 2 Passed: Cash and savings valuation.");
  passed++;

  // 3. Gold purity valuation (24K, 22K, 21K, 18K)
  total++;
  const testPrices = { goldPricePerGram: 10000, silverPricePerGram: 200 };

  // 10g 24K gold = 10 * 1.0 * 10000 = 100000
  const gold24: GoldData = { weightGrams: "10", purityCarat: "24", estimatedValue: "" };
  assert(
    calculateGoldValue(gold24, testPrices, DEFAULT_ZAKAT_METHODOLOGY) === 100000,
    "24K Gold value"
  );

  // 10g 22K gold = 10 * (22/24) * 10000 = 91666.666...
  const gold22: GoldData = { weightGrams: "10", purityCarat: "22", estimatedValue: "" };
  const val22 = calculateGoldValue(gold22, testPrices, DEFAULT_ZAKAT_METHODOLOGY);
  assert(Math.abs(val22 - 91666.66666666667) < 0.0001, "22K Gold value");

  // 10g 21K gold = 10 * (21/24) * 10000 = 87500
  const gold21: GoldData = { weightGrams: "10", purityCarat: "21", estimatedValue: "" };
  assert(
    calculateGoldValue(gold21, testPrices, DEFAULT_ZAKAT_METHODOLOGY) === 87500,
    "21K Gold value"
  );

  // 10g 18K gold = 10 * (18/24) * 10000 = 75000
  const gold18: GoldData = { weightGrams: "10", purityCarat: "18", estimatedValue: "" };
  assert(
    calculateGoldValue(gold18, testPrices, DEFAULT_ZAKAT_METHODOLOGY) === 75000,
    "18K Gold value"
  );
  console.log("✅ Test 3 Passed: Gold purity ratio valuation (24K, 22K, 21K, 18K).");
  passed++;

  // 4. Gold estimated value fallback when no weight or spot price
  total++;
  const goldEst: GoldData = { weightGrams: "0", purityCarat: "24", estimatedValue: "150000" };
  assert(
    calculateGoldValue(goldEst, undefined, DEFAULT_ZAKAT_METHODOLOGY) === 150000,
    "Gold estimated value fallback"
  );
  console.log("✅ Test 4 Passed: Gold estimated value fallback.");
  passed++;

  // 5. Silver purity valuation
  total++;
  const silverData: SilverData = { weightGrams: "500", purityCarat: "24", estimatedValue: "" };
  // 500g * 1.0 * 200 = 100000
  assert(
    calculateSilverValue(silverData, testPrices, DEFAULT_ZAKAT_METHODOLOGY) === 100000,
    "Silver spot valuation"
  );
  console.log("✅ Test 5 Passed: Silver spot valuation.");
  passed++;

  // 6. Investments valuation
  total++;
  const invData: InvestmentsData = { stocks: "50000", mutualFunds: "30000", otherInvestments: "20000" };
  assert(
    calculateInvestmentsValue(invData, DEFAULT_ZAKAT_METHODOLOGY) === 100000,
    "Investments 100% market value"
  );
  console.log("✅ Test 6 Passed: Investments valuation.");
  passed++;

  // 7. Business trade inventory valuation
  total++;
  const busData: BusinessAssetsData = { tradeStock: "80000", cashReserves: "20000" };
  assert(
    calculateBusinessAssetsValue(busData, DEFAULT_ZAKAT_METHODOLOGY) === 100000,
    "Business assets 100% valuation"
  );
  console.log("✅ Test 7 Passed: Business assets valuation.");
  passed++;

  // 8. Receivables valuation
  total++;
  const recData: ReceivablesData = { expectedRepayments: "40000" };
  assert(
    calculateReceivablesValue(recData, DEFAULT_ZAKAT_METHODOLOGY) === 40000,
    "Receivables 100% valuation"
  );
  console.log("✅ Test 8 Passed: Receivables valuation.");
  passed++;

  // 9. Liabilities valuation
  total++;
  const liabData: LiabilitiesData = { shortTermDebts: "15000", immediateExpenses: "5000" };
  assert(
    calculateLiabilitiesValue(liabData, DEFAULT_ZAKAT_METHODOLOGY) === 20000,
    "Deductible liabilities total"
  );
  console.log("✅ Test 9 Passed: Liabilities valuation.");
  passed++;

  console.log(`\nValuation Results: ${passed}/${total} tests passed! 🎉`);
}

runValuationTests();
