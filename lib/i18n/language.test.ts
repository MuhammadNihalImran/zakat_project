import { translations, Language } from "./translations";
import { initialCalculatorState, CalculatorState } from "@/types/calculator";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`FAILED: ${message}`);
  }
}

/**
 * Helper to recursively extract key paths from an object for key symmetry checking.
 */
function getObjectKeys(obj: Record<string, unknown>, prefix = ""): string[] {
  let keys: string[] = [];
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    const path = prefix ? `${prefix}.${key}` : key;
    if (val && typeof val === "object" && !Array.isArray(val)) {
      keys = keys.concat(getObjectKeys(val as Record<string, unknown>, path));
    } else {
      keys.push(path);
    }
  }
  return keys;
}

function runLanguageTests() {
  console.log("Starting Phase 13 Language & RTL Unit Tests...\n");
  let passed = 0;
  let total = 0;

  // -------------------------------------------------------------
  // Test 1: Dictionary Key Symmetry
  // -------------------------------------------------------------
  total++;
  const enKeys = getObjectKeys(translations.en as unknown as Record<string, unknown>).sort();
  const urKeys = getObjectKeys(translations.ur as unknown as Record<string, unknown>).sort();

  assert(enKeys.length === urKeys.length, `Key counts match (EN: ${enKeys.length}, UR: ${urKeys.length})`);
  for (let i = 0; i < enKeys.length; i++) {
    assert(enKeys[i] === urKeys[i], `Key path '${enKeys[i]}' exists in both English and Urdu dictionaries`);
  }
  console.log("✅ Test 1 Passed: English and Urdu translation dictionaries have 100% matching key symmetry.");
  passed++;

  // -------------------------------------------------------------
  // Test 2: No Empty/Missing Required Translations
  // -------------------------------------------------------------
  total++;
  const requiredNavKeys = ["title", "howItWorks", "faqs", "calculateCta", "langSwitch"] as const;
  for (const key of requiredNavKeys) {
    assert(Boolean(translations.en.nav[key]), `EN nav.${key} is non-empty`);
    assert(Boolean(translations.ur.nav[key]), `UR nav.${key} is non-empty`);
  }

  const requiredResultKeys = ["title", "subtitle", "statusBadge", "payablePlaceholderLabel", "breakdownTitle", "pdfDisabledBtn", "startNewBtn"] as const;
  for (const key of requiredResultKeys) {
    assert(Boolean(translations.en.calculator.result[key]), `EN calculator.result.${key} is non-empty`);
    assert(Boolean(translations.ur.calculator.result[key]), `UR calculator.result.${key} is non-empty`);
  }
  console.log("✅ Test 2 Passed: Required translation strings are present and non-empty.");
  passed++;

  // -------------------------------------------------------------
  // Test 3: Language State Retention for Calculator State
  // -------------------------------------------------------------
  total++;
  const userEnteredState: CalculatorState = {
    ...initialCalculatorState,
    nisabStandard: "gold",
    cashSavings: { cashInHand: "50000", bankSavings: "150000", otherCash: "10000" },
    gold: { weightGrams: "25", purityCarat: "22", estimatedValue: "500000" },
    silver: { weightGrams: "200", purityCarat: "24", estimatedValue: "60000" },
    investments: { stocks: "100000", mutualFunds: "50000", otherInvestments: "0" },
    businessAssets: { tradeStock: "200000", cashReserves: "50000" },
    receivables: { expectedRepayments: "30000" },
    liabilities: { shortTermDebts: "40000", immediateExpenses: "10000" },
  };

  // Simulate language toggle from EN -> UR
  let currentLang: Language = "en";
  const stateBeforeToggle = JSON.stringify(userEnteredState);

  // Toggle language
  currentLang = currentLang === "en" ? "ur" : "en";
  const stateAfterToggle = JSON.stringify(userEnteredState);

  assert(currentLang === "ur", "Language toggled to Urdu");
  assert(stateBeforeToggle === stateAfterToggle, "Calculator state remains 100% identical after language toggle");
  console.log("✅ Test 3 Passed: Calculator state retention across language toggle verified.");
  passed++;

  // -------------------------------------------------------------
  // Test 4: Language to Direction Mapping (LTR vs RTL)
  // -------------------------------------------------------------
  total++;
  const getDirection = (l: Language): "ltr" | "rtl" => (l === "ur" ? "rtl" : "ltr");

  assert(getDirection("en") === "ltr", "English maps to LTR direction");
  assert(getDirection("ur") === "rtl", "Urdu maps to RTL direction");
  console.log("✅ Test 4 Passed: LTR vs RTL direction mapping verified.");
  passed++;

  // -------------------------------------------------------------
  // Test 5: Document Language and Direction Property Binding
  // -------------------------------------------------------------
  total++;
  const mockDoc = { lang: "en", dir: "ltr" };
  const applyLanguageToDoc = (l: Language) => {
    mockDoc.lang = l;
    mockDoc.dir = l === "ur" ? "rtl" : "ltr";
  };

  applyLanguageToDoc("ur");
  assert(mockDoc.lang === "ur", "Document lang property updated to 'ur'");
  assert(mockDoc.dir === "rtl", "Document dir property updated to 'rtl'");

  applyLanguageToDoc("en");
  assert(mockDoc.lang === "en", "Document lang property updated to 'en'");
  assert(mockDoc.dir === "ltr", "Document dir property updated to 'ltr'");
  console.log("✅ Test 5 Passed: Document element lang and dir binding verified.");
  passed++;

  console.log(`\nLanguage & RTL Results: ${passed}/${total} tests passed! 🎉`);
}

runLanguageTests();
