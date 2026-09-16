import { calculateNisabThreshold, evaluateNisabEligibility } from "./nisab";
import { DEFAULT_ZAKAT_METHODOLOGY, createMethodologyConfig } from "./methodology";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`FAILED: ${message}`);
  }
}

function runNisabTests() {
  console.log("Starting Zakat Nisab Unit Tests...\n");
  let passed = 0;
  let total = 0;

  const mockPrices = {
    goldPricePerGram: 25000,
    silverPricePerGram: 300,
  };

  // 1. Gold Nisab threshold calculation
  total++;
  const goldNisab = calculateNisabThreshold("gold", mockPrices, DEFAULT_ZAKAT_METHODOLOGY);
  assert(goldNisab.standard === "gold", "Standard is gold");
  assert(goldNisab.grams === 87.48, "Gold Nisab grams is 87.48");
  assert(goldNisab.pricePerGram === 25000, "Gold price is 25000");
  assert(goldNisab.value === 87.48 * 25000, "Gold Nisab monetary value equals 87.48 * 25000"); // 2,187,000
  console.log("✅ Test 1 Passed: Gold Nisab threshold calculation.");
  passed++;

  // 2. Silver Nisab threshold calculation
  total++;
  const silverNisab = calculateNisabThreshold("silver", mockPrices, DEFAULT_ZAKAT_METHODOLOGY);
  assert(silverNisab.standard === "silver", "Standard is silver");
  assert(silverNisab.grams === 612.36, "Silver Nisab grams is 612.36");
  assert(silverNisab.pricePerGram === 300, "Silver price is 300");
  assert(silverNisab.value === 612.36 * 300, "Silver Nisab monetary value equals 612.36 * 300"); // 183,708
  console.log("✅ Test 2 Passed: Silver Nisab threshold calculation.");
  passed++;

  // 3. Nisab eligibility evaluation
  total++;
  const thresholdVal = 183708;

  // Below Nisab
  assert(evaluateNisabEligibility(100000, thresholdVal) === false, "Wealth below Nisab is not eligible");

  // Exactly at Nisab
  assert(evaluateNisabEligibility(183708, thresholdVal) === true, "Wealth exactly at Nisab is eligible");

  // Above Nisab
  assert(evaluateNisabEligibility(500000, thresholdVal) === true, "Wealth above Nisab is eligible");
  console.log("✅ Test 3 Passed: Nisab eligibility evaluation (below, equal, above).");
  passed++;

  // 4. Custom Nisab configuration override
  total++;
  const customConfig = createMethodologyConfig({
    silverNisabGrams: 600,
  });
  const customNisab = calculateNisabThreshold("silver", mockPrices, customConfig);
  assert(customNisab.grams === 600, "Custom Nisab grams used");
  assert(customNisab.value === 600 * 300, "Custom Nisab monetary value calculated");
  console.log("✅ Test 4 Passed: Configurable Nisab threshold override.");
  passed++;

  console.log(`\nNisab Results: ${passed}/${total} tests passed! 🎉`);
}

runNisabTests();
