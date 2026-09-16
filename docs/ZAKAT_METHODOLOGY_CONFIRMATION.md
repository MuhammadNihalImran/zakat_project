# Zakat Companion — Zakat Methodology Confirmation Document

> **CRITICAL NOTICE**: This document is ONLY for obtaining official religious methodology confirmation from a designated Islamic reviewer or religious authority. No religious ruling is assumed by the application. The Zakat calculation engine will NOT be implemented until official approval is received.

---

## 1. Implementation Gate

> **CRITICAL RULE: NO CALCULATION LOGIC BEFORE APPROVAL**

* All religious methodology decisions currently remain **`PENDING`**.
* No Zakat formula or calculation rule should be implemented based on assumptions or unverified rules.
* No Zakat calculation engine should be created until the required methodology decisions are officially approved by the designated religious authority.
* Calculator UI input fields may remain as currently designed for user input, but their calculation behavior must NOT assume unapproved rulings.
* The AI chatbot must NOT present unapproved methodology as established fact.
* Once official approval is received from the designated reviewer, the approved rules will become the authoritative specification for Phase 10 implementation.

---

## 2. Methodology Confirmation Table

| Decision ID | Topic | Question That Needs Confirmation | Why Application Needs This Decision | Status | Approved Rule | Source / Authority | Date Confirmed | Notes |
|---|---|---|---|---|---|---|---|---|
| **DEC-01** | Zakat Rate | What Zakat rate percentage and calendar basis (lunar vs solar) should be applied? | Required to calculate final payable Zakat amount on net wealth. | **PENDING** | Not yet confirmed | Not yet provided | Not yet provided | Reference example for discussion (e.g., 2.5% lunar vs 2.577% solar); not an approved rule. |
| **DEC-02** | Gold Nisab | What Gold Nisab threshold weight and unit standard should be used? | Required to determine Nisab eligibility when using Gold threshold basis. | **PENDING** | Not yet confirmed | Not yet provided | Not yet provided | Reference example for discussion (e.g., 87.48g / 7.5 Tolas pure gold); not an approved rule. |
| **DEC-03** | Silver Nisab | What Silver Nisab threshold weight and unit standard should be used? | Required to determine Nisab eligibility when using Silver threshold basis. | **PENDING** | Not yet confirmed | Not yet provided | Not yet provided | Reference example for discussion (e.g., 612.36g / 52.5 Tolas pure silver); not an approved rule. |
| **DEC-04** | Nisab Selection Criteria | How should the app determine whether Gold or Silver Nisab applies to mixed wealth? | Required to evaluate whether a user with cash/mixed assets meets the threshold. | **PENDING** | Not yet confirmed | Not yet provided | Not yet provided | Options for discussion (Silver Nisab vs Gold Nisab vs User Choice); not a predetermined rule. |
| **DEC-05** | Hawl / Holding Period | What Hawl (1 lunar year) holding period rule should be applied for eligibility? | Required to guide user on whether wealth has been held long enough to trigger Zakat. | **PENDING** | Not yet confirmed | Not yet provided | Not yet provided | Reference guidance options for reviewer confirmation; not a predetermined rule. |
| **DEC-06** | Cash & Savings Treatment | What inclusion and exclusion rules apply to liquid cash, bank balances, and interest? | Required to determine net Zakatable cash amount. | **PENDING** | Not yet confirmed | Not yet provided | Not yet provided | Possible treatment options (e.g., cash inclusion, interest exclusion) for reviewer confirmation; not an approved rule. |
| **DEC-07** | Gold Valuation & Jewelry | How should personal gold jewelry be treated and valued? | Required to calculate Zakatable gold asset value from user inputs. | **PENDING** | Not yet confirmed | Not yet provided | Not yet provided | Scholar views differ on personal worn jewelry (exempt vs Zakatable); requires reviewer confirmation. |
| **DEC-08** | Silver Valuation & Utensils | How should silver jewelry, coins, and utensils be categorized and valued? | Required to calculate Zakatable silver asset value. | **PENDING** | Not yet confirmed | Not yet provided | Not yet provided | Valuation treatment options requiring reviewer confirmation; not an approved rule. |
| **DEC-09** | Investments Methodology | How should marketable stocks, shares, mutual funds, and dividends be assessed? | Required to compute Zakatable value for investment holdings. | **PENDING** | Not yet confirmed | Not yet provided | Not yet provided | Options for discussion (full market value vs liquid trade asset ratio); requiring reviewer confirmation. |
| **DEC-10** | Business Assets Methodology | Which commercial inventory, trade stock, and business capital are Zakatable? | Required to compute Zakatable business inventory value. | **PENDING** | Not yet confirmed | Not yet provided | Not yet provided | Options for discussion (wholesale cost vs retail market price valuation); requiring reviewer confirmation. |
| **DEC-11** | Receivables / Owed Debt | Which debt repayments owed to the user should be included in current year Zakat? | Required to compute Zakatable receivables. | **PENDING** | Not yet confirmed | Not yet provided | Not yet provided | Good debts vs doubtful debt classification requiring reviewer confirmation; not an approved rule. |
| **DEC-12** | Liabilities Deduction Rules | Which short-term debts and immediate personal/business expenses are deductible? | Required to calculate total deductible liabilities. | **PENDING** | Not yet confirmed | Not yet provided | Not yet provided | Options for discussion (short-term debts due within 1 year vs long-term debt principal); requiring reviewer confirmation. |
| **DEC-13** | Net Amount & Negative Rules | How should zero or negative net wealth results be handled when liabilities > assets? | Required to determine Net Zakatable Wealth boundary rules. | **PENDING** | Not yet confirmed | Not yet provided | Not yet provided | Boundary rule options for zero/negative net wealth requiring reviewer confirmation; not an approved rule. |
| **DEC-14** | Rounding Rules & Precision | What numeric rounding rules should apply to calculated PKR Zakat payable amounts? | Required for itemized calculation and PDF reporting output. | **PENDING** | Not yet confirmed | Not yet provided | Not yet provided | Numeric rounding options (round to nearest Rupee vs round up); requiring reviewer confirmation. |
| **DEC-15** | Currency Conversion Basis | What currency conversion basis applies for non-PKR inputs? | Required to support foreign currency conversions if enabled. | **PENDING** | Not yet confirmed | Not yet provided | Not yet provided | Currency exchange rate basis options requiring reviewer confirmation; not an approved rule. |
| **DEC-16** | Live Metal Valuation Basis | Which spot market rate basis (spot bullion vs local retail jeweler rate) applies? | Required to convert gold/silver weights to PKR values. | **PENDING** | Not yet confirmed | Not yet provided | Not yet provided | Spot rate (metals.dev) vs local retail market rate options requiring reviewer confirmation; not an approved rule. |
| **DEC-17** | Real Estate / Property Scope | How should non-homestead investment property or land intended for resale be classified? | Scope classification required before calculation boundary is finalized. | **PENDING — SCOPE DECISION REQUIRED** | Not yet confirmed | Not yet provided | Not yet provided | Scope decision required: Reviewer/product team must classify as 'MVP OUT OF SCOPE — NOT IMPLEMENTED' or 'FUTURE SCOPE'. (Do NOT implement or add fields in MVP). |
| **DEC-18** | Retirement / Provident Funds Scope | How should accumulated provident fund or pension balances be classified? | Scope classification required before calculation boundary is finalized. | **PENDING — SCOPE DECISION REQUIRED** | Not yet confirmed | Not yet provided | Not yet provided | Scope decision required: Reviewer/product team must classify as 'MVP OUT OF SCOPE — NOT IMPLEMENTED' or 'FUTURE SCOPE'. (Do NOT implement or add fields in MVP). |

---

## 3. Reviewer-Friendly Questions for Religious Authority

The following neutral questions are prepared for presentation to the designated Islamic scholar or religious review board. *Note: Example options listed under questions are for reference and discussion only; no option is predetermined.*

### 1. Zakat Rate
> **Question**: What Zakat rate percentage and calendar basis should this application use? Please specify the applicable percentage, calendar basis (lunar vs solar), and authoritative source.
> *Examples for discussion only (not predetermined): 2.5% for Lunar year vs 2.577% for Solar year.*

### 2. Gold Nisab Threshold
> **Question**: What Gold Nisab threshold weight and unit standard should the application use? Please specify the exact weight, unit (grams vs tolas), purity basis, and authoritative source.
> *Examples for discussion only (not predetermined): 87.48 grams / 7.5 Tolas of 24K pure gold.*

### 3. Silver Nisab Threshold
> **Question**: What Silver Nisab threshold weight and unit standard should the application use? Please specify the exact weight, unit (grams vs tolas), purity basis, and authoritative source.
> *Examples for discussion only (not predetermined): 612.36 grams / 52.5 Tolas of pure silver.*

### 4. Nisab Selection Criteria
> **Question**: How should the application determine which Nisab basis applies when a user possesses mixed assets (cash, gold, silver, investments)? Please specify the selection criteria and authoritative source.
> *Examples for discussion only (not predetermined): Silver Nisab threshold, Gold Nisab threshold, or User Choice.*

### 5. Hawl / One-Year Holding Period
> **Question**: What Hawl (1-year holding period) rule should the application use to explain eligibility to users? Please specify the criteria and authoritative source.

### 6. Cash & Savings Treatment
> **Question**: What inclusion and exclusion rules should apply to liquid cash, bank deposits, and unearned interest? Please specify the rule and authoritative source.

### 7. Gold Valuation & Personal Jewelry
> **Question**: How should personal gold jewelry be treated (exempt vs Zakatable), and how should purity carats (24K, 22K, 21K, 18K) be evaluated? Please specify the rule and authoritative source.

### 8. Silver Valuation & Utensils
> **Question**: How should silver jewelry, coins, bars, and silver utensils be categorized and valued? Please specify the rule and authoritative source.

### 9. Investment Assets Methodology
> **Question**: How should marketable stocks, shares, and mutual funds be assessed for Zakat calculation? Please specify the valuation rule and authoritative source.
> *Examples for discussion only (not predetermined): Full 100% market value vs liquid trade asset percentage.*

### 10. Business Assets Methodology
> **Question**: Which business trade inventory and capital should be included, and should inventory be valued at cost or retail price? Please specify the rule and authoritative source.

### 11. Receivables & Money Owed
> **Question**: Which debt repayments owed to the user (good debts vs doubtful debts) should be included in current year Zakatable wealth? Please specify the criteria and authoritative source.

### 12. Liabilities & Debt Deduction Rules
> **Question**: Which short-term debts and immediate personal or business expenses due within the year are deductible from gross wealth? Please specify the rule and authoritative source.

### 13. Net Zakatable Amount & Boundary Rules
> **Question**: How should the application handle zero or negative net wealth results when total liabilities exceed total assets? Please specify the boundary rule and authoritative source.

### 14. Rounding Rules & Precision
> **Question**: What numeric rounding rules should apply to calculated PKR Zakat payable amounts? Please specify the precision rule and authoritative source.

### 15. Currency Conversion Basis
> **Question**: What exchange rate basis should be applied when foreign currency values are entered? Please specify the rate basis and authoritative source.

### 16. Live Metal Price Basis
> **Question**: Which Gold and Silver price source (spot bullion rates vs local retail market rates) should be used as the valuation basis? Please specify the source and authoritative basis.

### 17. Real Estate / Property Scope Decision
> **Question**: Should real estate and property investments be evaluated for MVP calculation or explicitly classified as Out of Scope / Future Scope? Please specify the scope classification and rule if applicable.

### 18. Retirement / Provident Funds Scope Decision
> **Question**: Should provident/retirement funds be evaluated for MVP calculation or explicitly classified as Out of Scope / Future Scope? Please specify the scope classification and rule if applicable.

---

## 4. Implementation Component Dependencies

The mapping below identifies which application components and source files will depend on each decision **once official methodology confirmation is received**:

```text
DEC-01 (Zakat Rate)
├── lib/zakat/engine.ts (Future Calculation Engine)
├── app/calculator/result/page.tsx (Result Screen)
└── lib/pdf/generator.ts (Future PDF Summary Report)

DEC-02 (Gold Nisab) & DEC-03 (Silver Nisab)
├── app/calculator/eligibility/page.tsx (Eligibility Screen)
├── lib/zakat/engine.ts (Future Calculation Engine)
├── app/calculator/result/page.tsx (Result Screen)
└── lib/pdf/generator.ts (Future PDF Summary Report)

DEC-04 (Nisab Selection Criteria)
├── context/CalculatorContext.tsx (Calculator State)
├── app/calculator/eligibility/page.tsx (Eligibility Screen)
├── lib/zakat/engine.ts (Future Calculation Engine)
└── app/calculator/result/page.tsx (Result Screen)

DEC-05 (Hawl Holding Period)
├── app/calculator/eligibility/page.tsx (Eligibility Screen)
└── components/chatbot/ChatbotWidget.tsx (AI Assistant Guidance)

DEC-06 (Cash & Savings Treatment)
├── app/calculator/assets/cash-savings/page.tsx (Cash Form)
└── lib/zakat/engine.ts (Future Calculation Engine)

DEC-07 (Gold Valuation) & DEC-08 (Silver Valuation)
├── app/calculator/assets/gold/page.tsx (Gold Form)
├── app/calculator/assets/silver/page.tsx (Silver Form)
├── lib/zakat/engine.ts (Future Calculation Engine)
└── app/calculator/review/page.tsx (Review Screen)

DEC-09 (Investments Methodology)
├── app/calculator/assets/investments/page.tsx (Investments Form)
└── lib/zakat/engine.ts (Future Calculation Engine)

DEC-10 (Business Assets Methodology)
├── app/calculator/assets/business-assets/page.tsx (Business Assets Form)
└── lib/zakat/engine.ts (Future Calculation Engine)

DEC-11 (Receivables Methodology)
├── app/calculator/assets/receivables/page.tsx (Receivables Form)
└── lib/zakat/engine.ts (Future Calculation Engine)

DEC-12 (Liabilities Deduction Rules)
├── app/calculator/liabilities/page.tsx (Liabilities Screen)
└── lib/zakat/engine.ts (Future Calculation Engine)

DEC-13 (Net Amount Rules) & DEC-14 (Rounding Rules)
├── lib/zakat/engine.ts (Future Calculation Engine)
├── app/calculator/result/page.tsx (Result Screen)
└── lib/pdf/generator.ts (Future PDF Summary Report)

DEC-15 (Currency Conversion) & DEC-16 (Live Metal Price Basis)
├── lib/api/metals.ts (Metals Price Service)
└── app/api/metals/route.ts (API Handler)

DEC-17 (Real Estate Scope) & DEC-18 (Retirement Funds Scope)
└── Scope decision boundary (Requires explicit classification as Out of Scope or Future Scope)
```

---

## 5. UI Field Methodology Audit

The audit below lists all existing calculator input fields, why each exists, its dependency on **future approved methodology**, and potential post-confirmation adjustments:

| Field Path | Field Label | Purpose | Methodology Dependency | Post-Confirmation Action |
|---|---|---|---|---|
| `cashSavings.cashInHand` | Cash on Hand | Collects liquid physical cash. | **DEC-06**: Dependent on cash inclusion rule. | Value will feed calculation engine once DEC-06 is approved. |
| `cashSavings.bankSavings` | Bank Accounts / Deposits | Collects liquid bank balances. | **DEC-06**: Dependent on interest exclusion rules. | May add help text regarding bank interest exclusion upon confirmation. |
| `cashSavings.otherCash` | Other Liquid Cash | Collects foreign currency or additional cash. | **DEC-06**, **DEC-15**: Dependent on exchange rate basis. | May require explicit currency selector if non-PKR inputs allowed. |
| `gold.weightGrams` | Gold Weight (grams) | Collects total gold mass. | **DEC-07**: Dependent on purity multiplier rules. | Weight will be multiplied by approved purity ratio. |
| `gold.purityCarat` | Gold Purity / Carat (24K, 22K, 21K, 18K) | Collects purity level. | **DEC-07**: Dependent on purity factor rules. | Will determine pure gold mass in calculation engine. |
| `gold.estimatedValue` | Estimated Total Value (PKR) | User-entered estimated value. | **DEC-07**, **DEC-16**: Dependent on spot vs user value rule. | Engine will determine whether to use spot rate or user estimate. |
| `silver.weightGrams` | Silver Weight (grams) | Collects total silver mass. | **DEC-08**: Dependent on mass evaluation rule. | Feeds pure silver calculation logic upon confirmation. |
| `silver.purityCarat` | Silver Purity (99.9%, 92.5%, Commercial) | Collects silver purity. | **DEC-08**: Dependent on purity factor rule. | Multiplies silver mass in calculation engine. |
| `silver.estimatedValue` | Estimated Total Value (PKR) | User-entered estimated value. | **DEC-08**, **DEC-16**: Dependent on spot rate basis rule. | Evaluates spot vs estimated preference. |
| `investments.stocks` | Shares & Stocks Value | Collects stock portfolio value. | **DEC-09**: Dependent on stock valuation ratio rule. | Engine will apply approved stock valuation multiplier. |
| `investments.mutualFunds` | Mutual Funds & Investment Bonds | Collects mutual fund holdings. | **DEC-09**: Dependent on fund asset classification rule. | Engine will apply approved mutual fund valuation rule. |
| `investments.otherInvestments` | Other Zakatable Investments | Collects additional investments. | **DEC-09**: Dependent on general investment rule. | Will be included in gross assets according to approved rule. |
| `businessAssets.tradeStock` | Commercial Trade Inventory | Collects trade stock inventory value. | **DEC-10**: Dependent on cost vs retail valuation rule. | May add guidance on cost vs retail valuation. |
| `businessAssets.cashReserves` | Business Cash Capital | Collects business liquid cash reserves. | **DEC-10**: Dependent on business capital inclusion rule. | Feeds business asset total in calculation engine. |
| `receivables.expectedRepayments` | Expected Debt Repayments | Collects good debts owed to user. | **DEC-11**: Dependent on debt recovery criteria rule. | Engine will include expected debt in gross assets. |
| `liabilities.shortTermDebts` | Short-Term Debts Due Within 1 Year | Collects short-term liabilities. | **DEC-12**: Dependent on 1-year debt deduction rule. | Engine will deduct from gross assets upon confirmation. |
| `liabilities.immediateExpenses` | Immediate Personal / Business Expenses | Collects immediate bills due. | **DEC-12**: Dependent on deductible expense rule. | Engine will deduct from gross assets upon confirmation. |

---

## 6. Calculation Engine Readiness Checklist

The Zakat calculation engine (Phase 10) **CANNOT** be implemented until every checkbox below is officially confirmed and marked as Approved:

```text
[ ] DEC-01: Zakat Rate Percentage & Calendar Basis Confirmed
[ ] DEC-02: Gold Nisab Weight Standard Confirmed
[ ] DEC-03: Silver Nisab Weight Standard Confirmed
[ ] DEC-04: Nisab Selection Rule Confirmed
[ ] DEC-05: Hawl (1-Year Holding) Rule Confirmed
[ ] DEC-06: Cash & Savings Inclusion Rules Confirmed
[ ] DEC-07: Gold Valuation & Personal Jewelry Rules Confirmed
[ ] DEC-08: Silver Valuation & Utensils Rules Confirmed
[ ] DEC-09: Investments (Stocks & Mutual Funds) Methodology Confirmed
[ ] DEC-10: Business Assets Valuation Methodology Confirmed
[ ] DEC-11: Receivables & Owed Debt Rules Confirmed
[ ] DEC-12: Deductible Liabilities & Debts Rules Confirmed
[ ] DEC-13: Net Zakatable Amount & Zero/Negative Rules Confirmed
[ ] DEC-14: Numeric Rounding Rules & Precision Confirmed
[ ] DEC-15: Currency Conversion Exchange Basis Confirmed
[ ] DEC-16: Live Metal Valuation Source & Rate Basis Confirmed
[ ] DEC-17: Real Estate / Property Scope Classified (In Scope vs Out of Scope)
[ ] DEC-18: Retirement / Provident Fund Scope Classified (In Scope vs Out of Scope)
```

---

## 7. Confirmation & Sign-Off Record Log

### 7.1 Individual Decision Confirmation Log

| Decision ID | Decision Topic | Status | Approved Rule | Source / Authority | Date Confirmed | Reviewer Initial |
|---|---|---|---|---|---|---|
| **DEC-01** | Zakat Rate | `PENDING` | Not yet confirmed | Not yet provided | Not yet provided | _________ |
| **DEC-02** | Gold Nisab | `PENDING` | Not yet confirmed | Not yet provided | Not yet provided | _________ |
| **DEC-03** | Silver Nisab | `PENDING` | Not yet confirmed | Not yet provided | Not yet provided | _________ |
| **DEC-04** | Nisab Selection | `PENDING` | Not yet confirmed | Not yet provided | Not yet provided | _________ |
| **DEC-05** | Hawl Rule | `PENDING` | Not yet confirmed | Not yet provided | Not yet provided | _________ |
| **DEC-06** | Cash & Savings | `PENDING` | Not yet confirmed | Not yet provided | Not yet provided | _________ |
| **DEC-07** | Gold Valuation | `PENDING` | Not yet confirmed | Not yet provided | Not yet provided | _________ |
| **DEC-08** | Silver Valuation | `PENDING` | Not yet confirmed | Not yet provided | Not yet provided | _________ |
| **DEC-09** | Investments | `PENDING` | Not yet confirmed | Not yet provided | Not yet provided | _________ |
| **DEC-10** | Business Assets | `PENDING` | Not yet confirmed | Not yet provided | Not yet provided | _________ |
| **DEC-11** | Receivables | `PENDING` | Not yet confirmed | Not yet provided | Not yet provided | _________ |
| **DEC-12** | Deductible Liabilities | `PENDING` | Not yet confirmed | Not yet provided | Not yet provided | _________ |
| **DEC-13** | Net Amount Rules | `PENDING` | Not yet confirmed | Not yet provided | Not yet provided | _________ |
| **DEC-14** | Rounding Rules | `PENDING` | Not yet confirmed | Not yet provided | Not yet provided | _________ |
| **DEC-15** | Currency Basis | `PENDING` | Not yet confirmed | Not yet provided | Not yet provided | _________ |
| **DEC-16** | Live Metal Source | `PENDING` | Not yet confirmed | Not yet provided | Not yet provided | _________ |
| **DEC-17** | Real Estate Scope | `PENDING` | Not yet confirmed | Not yet provided | Not yet provided | _________ |
| **DEC-18** | Retirement Scope | `PENDING` | Not yet confirmed | Not yet provided | Not yet provided | _________ |

### 7.2 Overall Methodology Sign-Off Record

*(To be completed when overall sign-off is received from the designated Islamic Reviewer/Scholar)*

* **Designated Religious Authority**: `___________________________`
* **Reviewer Qualification / Affiliation**: `___________________________`
* **Approval Date**: `___________________________`
* **Sign-Off Document Reference / Certificate**: `___________________________`
* **Reviewer Signature / Stamp**: `___________________________`
* **Notes / Special Conditions**:
  ```text
  _________________________________________________________________________________
  _________________________________________________________________________________
  ```
