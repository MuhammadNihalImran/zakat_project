import { calculateZakat } from "./engine";
import { DEFAULT_ZAKAT_METHODOLOGY, createMethodologyConfig } from "./methodology";
import { CalculatorState, initialCalculatorState } from "@/types/calculator";
import { MetalPricesInput, ZakatMethodologyConfig } from "./types";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`FAILED: ${message}`);
  }
}

function runEngineTests() {
  console.log("Starting Zakat Calculation Engine Unit Tests...\n");
  let passed = 0;
  let total = 0;

  const samplePrices: MetalPricesInput = {
    goldPricePerGram: 25000,
    silverPricePerGram: 300,
  };

  // -----------------------------------------------------------------
  // Test 1: All values zero / empty input
  // -----------------------------------------------------------------
  total++;
  const emptyState: CalculatorState = initialCalculatorState;
  const res1 = calculateZakat(emptyState, DEFAULT_ZAKAT_METHODOLOGY, samplePrices);
  assert(res1.totalAssets === 0, "Total assets is 0 for empty state");
  assert(res1.totalLiabilities === 0, "Total liabilities is 0 for empty state");
  assert(res1.netZakatableWealth === 0, "Net zakatable wealth is 0 for empty state");
  assert(res1.zakatPayable === 0, "Zakat payable is 0 for empty state");
  assert(res1.isEligible === false, "Not eligible for empty state");
  assert(res1.methodologyStatus === "DEVELOPMENT_DEFAULTS_PENDING_REVIEW", "Correct methodology status");
  console.log("✅ Test 1 Passed: Empty state / all values zero.");
  passed++;

  // -----------------------------------------------------------------
  // Test 2: Net wealth below Nisab
  // -----------------------------------------------------------------
  total++;
  // Silver Nisab = 612.36 * 300 = 183,708 PKR
  const stateBelowNisab: CalculatorState = {
    ...initialCalculatorState,
    nisabStandard: "silver",
    cashSavings: { cashInHand: "100000", bankSavings: "0", otherCash: "0" },
  };
  const res2 = calculateZakat(stateBelowNisab, DEFAULT_ZAKAT_METHODOLOGY, samplePrices);
  assert(res2.netZakatableWealth === 100000, "Net wealth is 100,000");
  assert(res2.isEligible === false, "Below Silver Nisab is not eligible");
  assert(res2.zakatPayable === 0, "Zakat payable is 0 when below Nisab");
  console.log("✅ Test 2 Passed: Net wealth below Nisab.");
  passed++;

  // -----------------------------------------------------------------
  // Test 3: Net wealth exactly equal to Nisab
  // -----------------------------------------------------------------
  total++;
  // Silver Nisab = 612.36 * 300 = 183,708 PKR
  const silverNisabValue = 612.36 * 300; // 183,708
  const stateAtNisab: CalculatorState = {
    ...initialCalculatorState,
    nisabStandard: "silver",
    cashSavings: { cashInHand: silverNisabValue.toString(), bankSavings: "0", otherCash: "0" },
  };
  const res3 = calculateZakat(stateAtNisab, DEFAULT_ZAKAT_METHODOLOGY, samplePrices);
  assert(res3.isEligible === true, "Exactly at Nisab is eligible");
  assert(res3.zakatPayable === Math.round(silverNisabValue * 0.025), "Calculates 2.5% at Nisab threshold");
  console.log("✅ Test 3 Passed: Net wealth exactly at Nisab.");
  passed++;

  // -----------------------------------------------------------------
  // Test 4: Net wealth above Nisab
  // -----------------------------------------------------------------
  total++;
  // Net wealth = 1,000,000 PKR, Zakat at 2.5% = 25,000 PKR
  const stateAboveNisab: CalculatorState = {
    ...initialCalculatorState,
    nisabStandard: "silver",
    cashSavings: { cashInHand: "600000", bankSavings: "400000", otherCash: "0" },
  };
  const res4 = calculateZakat(stateAboveNisab, DEFAULT_ZAKAT_METHODOLOGY, samplePrices);
  assert(res4.netZakatableWealth === 1000000, "Net wealth is 1,000,000");
  assert(res4.isEligible === true, "Above Nisab is eligible");
  assert(res4.zakatPayable === 25000, "Zakat payable is 25,000 (2.5% of 1M)");
  console.log("✅ Test 4 Passed: Net wealth above Nisab.");
  passed++;

  // -----------------------------------------------------------------
  // Test 5: Liabilities greater than total assets
  // -----------------------------------------------------------------
  total++;
  const stateLiabExceed: CalculatorState = {
    ...initialCalculatorState,
    cashSavings: { cashInHand: "50000", bankSavings: "0", otherCash: "0" },
    liabilities: { shortTermDebts: "100000", immediateExpenses: "50000" },
  };
  const res5 = calculateZakat(stateLiabExceed, DEFAULT_ZAKAT_METHODOLOGY, samplePrices);
  assert(res5.totalAssets === 50000, "Total assets is 50,000");
  assert(res5.totalLiabilities === 150000, "Total liabilities is 150,000");
  assert(res5.allowedLiabilities === 50000, "Allowed liabilities capped at 50,000");
  assert(res5.netZakatableWealth === 0, "Net wealth floored at 0");
  assert(res5.zakatPayable === 0, "Zakat payable is 0");
  console.log("✅ Test 5 Passed: Liabilities greater than assets.");
  passed++;

  // -----------------------------------------------------------------
  // Test 6: Negative inputs throw explicit error
  // -----------------------------------------------------------------
  total++;
  const stateNegative: CalculatorState = {
    ...initialCalculatorState,
    cashSavings: { cashInHand: "-500", bankSavings: "0", otherCash: "0" },
  };
  try {
    calculateZakat(stateNegative, DEFAULT_ZAKAT_METHODOLOGY, samplePrices);
    assert(false, "Should throw on negative input");
  } catch (err: unknown) {
    assert(
      err instanceof Error && err.message.includes("Negative values are not allowed"),
      "Throws explicit error for negative value"
    );
  }
  console.log("✅ Test 6 Passed: Negative input rejected safely.");
  passed++;

  // -----------------------------------------------------------------
  // Test 7: Invalid numeric string throws explicit error
  // -----------------------------------------------------------------
  total++;
  const stateInvalidStr: CalculatorState = {
    ...initialCalculatorState,
    cashSavings: { cashInHand: "invalid_text", bankSavings: "0", otherCash: "0" },
  };
  try {
    calculateZakat(stateInvalidStr, DEFAULT_ZAKAT_METHODOLOGY, samplePrices);
    assert(false, "Should throw on non-numeric string");
  } catch (err: unknown) {
    assert(
      err instanceof Error && err.message.includes("Invalid numeric value"),
      "Throws explicit error for non-numeric string"
    );
  }
  console.log("✅ Test 7 Passed: Invalid numeric string rejected safely.");
  passed++;

  // -----------------------------------------------------------------
  // Test 8: Missing methodology configuration throws explicit error
  // -----------------------------------------------------------------
  total++;
  try {
    // @ts-expect-error Testing runtime check for null methodology
    calculateZakat(initialCalculatorState, null, samplePrices);
    assert(false, "Should throw on missing methodology");
  } catch (err: unknown) {
    assert(
      err instanceof Error && err.message.includes("Missing methodology configuration"),
      "Throws explicit error for missing methodology"
    );
  }
  console.log("✅ Test 8 Passed: Missing methodology configuration handled.");
  passed++;

  // -----------------------------------------------------------------
  // Test 9: Missing metal prices handled safely
  // -----------------------------------------------------------------
  total++;
  const res9 = calculateZakat(initialCalculatorState, DEFAULT_ZAKAT_METHODOLOGY, undefined);
  assert(res9.nisabValue === 0, "Nisab value is 0 when metal prices missing");
  assert(res9.isEligible === false, "Not eligible when metal prices missing");
  console.log("✅ Test 9 Passed: Missing metal prices handled safely.");
  passed++;

  // -----------------------------------------------------------------
  // Test 10: Custom methodology configuration (dynamic rate & nisab)
  // -----------------------------------------------------------------
  total++;
  const customConfig: ZakatMethodologyConfig = createMethodologyConfig({
    zakatRate: 0.03, // 3% custom rate
    silverNisabGrams: 500, // custom 500g Nisab
  });
  const stateCustom: CalculatorState = {
    ...initialCalculatorState,
    nisabStandard: "silver",
    cashSavings: { cashInHand: "200000", bankSavings: "0", otherCash: "0" },
  };
  const res10 = calculateZakat(stateCustom, customConfig, samplePrices);
  // Nisab threshold = 500 * 300 = 150,000 PKR
  assert(res10.nisabThresholdGrams === 500, "Engine respects configured Nisab grams (500)");
  assert(res10.nisabValue === 150000, "Engine respects configured Nisab value (150,000)");
  assert(res10.isEligible === true, "Wealth 200,000 >= 150,000 is eligible");
  assert(res10.zakatRatePercentage === 3, "Zakat rate percentage is 3%");
  assert(res10.zakatPayable === 6000, "Zakat payable is 3% of 200,000 = 6,000");
  console.log("✅ Test 10 Passed: Custom methodology config dynamic overrides verified.");
  passed++;

  // -----------------------------------------------------------------
  // Test 11: All asset categories combined calculation
  // -----------------------------------------------------------------
  total++;
  const combinedState: CalculatorState = {
    nisabStandard: "gold",
    cashSavings: { cashInHand: "50000", bankSavings: "50000", otherCash: "0" }, // 100,000
    gold: { weightGrams: "10", purityCarat: "24", estimatedValue: "" }, // 10 * 25000 = 250,000
    silver: { weightGrams: "100", purityCarat: "24", estimatedValue: "" }, // 100 * 300 = 30,000
    investments: { stocks: "100000", mutualFunds: "50000", otherInvestments: "0" }, // 150,000
    businessAssets: { tradeStock: "200000", cashReserves: "50000" }, // 250,000
    receivables: { expectedRepayments: "20000" }, // 20,000
    liabilities: { shortTermDebts: "100000", immediateExpenses: "0" }, // 100,000
  };
  const res11 = calculateZakat(combinedState, DEFAULT_ZAKAT_METHODOLOGY, samplePrices);
  // Total Assets = 100k + 250k + 30k + 150k + 250k + 20k = 800,000 PKR
  assert(res11.totalAssets === 800000, `Expected 800000 total assets, got ${res11.totalAssets}`);
  assert(res11.totalLiabilities === 100000, "Total liabilities 100,000");
  assert(res11.netZakatableWealth === 700000, "Net zakatable wealth 700,000");

  // Gold Nisab = 87.48 * 25000 = 2,187,000 PKR.
  // 700,000 < 2,187,000 -> Not eligible on Gold Nisab standard
  assert(res11.nisabStandardUsed === "gold", "Gold standard used");
  assert(res11.nisabValue === 2187000, "Gold Nisab value is 2,187,000");
  assert(res11.isEligible === false, "Below Gold Nisab threshold");
  assert(res11.zakatPayable === 0, "Zakat payable is 0 when below Gold Nisab");
  console.log("✅ Test 11 Passed: All asset categories combined calculation.");
  passed++;

  // -----------------------------------------------------------------
  // Test 12: Rounding behavior
  // -----------------------------------------------------------------
  total++;
  const stateRounding: CalculatorState = {
    ...initialCalculatorState,
    nisabStandard: "silver",
    cashSavings: { cashInHand: "200033", bankSavings: "0", otherCash: "0" },
  };
  // 200,033 * 0.025 = 5000.825 PKR
  const resNearest = calculateZakat(stateRounding, createMethodologyConfig({ roundingMethod: "nearest_integer" }), samplePrices);
  assert(resNearest.zakatPayable === 5001, "Nearest integer rounding (5000.825 -> 5001)");

  const resFloor = calculateZakat(stateRounding, createMethodologyConfig({ roundingMethod: "floor" }), samplePrices);
  assert(resFloor.zakatPayable === 5000, "Floor rounding (5000.825 -> 5000)");

  const resCeil = calculateZakat(stateRounding, createMethodologyConfig({ roundingMethod: "ceil" }), samplePrices);
  assert(resCeil.zakatPayable === 5001, "Ceil rounding (5000.825 -> 5001)");
  console.log("✅ Test 12 Passed: Rounding methods (nearest, floor, ceil).");
  passed++;

  // -----------------------------------------------------------------
  // Test 13: Deterministic output repeatability
  // -----------------------------------------------------------------
  total++;
  const resA = calculateZakat(combinedState, DEFAULT_ZAKAT_METHODOLOGY, samplePrices);
  const resB = calculateZakat(combinedState, DEFAULT_ZAKAT_METHODOLOGY, samplePrices);
  assert(JSON.stringify(resA) === JSON.stringify(resB), "Calculation is 100% deterministic");
  console.log("✅ Test 13 Passed: Deterministic output repeatability.");
  passed++;

  // -----------------------------------------------------------------
  // Test 14: DEC-17 and DEC-18 scope classifications present
  // -----------------------------------------------------------------
  total++;
  assert(
    DEFAULT_ZAKAT_METHODOLOGY.dec17Scope.includes("MVP OUT OF SCOPE"),
    "DEC-17 classified as MVP OUT OF SCOPE"
  );
  assert(
    DEFAULT_ZAKAT_METHODOLOGY.dec18Scope.includes("FUTURE SCOPE"),
    "DEC-18 classified as FUTURE SCOPE"
  );
  assert(res11.limitations.some(l => l.includes("DEC-17")), "DEC-17 limitation in breakdown");
  assert(res11.limitations.some(l => l.includes("DEC-18")), "DEC-18 limitation in breakdown");
  console.log("✅ Test 14 Passed: DEC-17 and DEC-18 scope notes verified.");
  passed++;

  console.log(`\nEngine Results: ${passed}/${total} tests passed! 🎉`);
}

runEngineTests();
