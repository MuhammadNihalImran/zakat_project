# Zakat Companion — UI/UX Specification

## 1. UI/UX Goals

The interface should:

* Be simple for a first-time Zakat giver.
* Reduce confusion around Nisab and asset categories.
* Guide the user step-by-step.
* Use clear everyday language.
* Avoid overwhelming users with financial terminology.
* Support English and Urdu.
* Support RTL for Urdu.
* Work well on mobile, tablet, and desktop.
* Provide clear validation and error messages.
* Build trust through privacy and transparency.
* Match the approved PRD/SRS flow exactly.

## 2. Design Principles

Use:

* Simplicity
* Clarity
* Consistency
* Progressive disclosure
* Beginner-friendly forms
* Clear hierarchy
* Accessible controls
* Minimal unnecessary decoration
* Consistent spacing
* Consistent buttons
* Clear feedback
* Mobile-first design

Do not introduce unnecessary animations, complex dashboards, charts, or decorative UI that does not support the user task.

## 3. Global Navigation

The landing page header should contain:

* Zakat Companion
* How It Works
* FAQs
* Language Switch
* Calculate My Zakat

There should be NO:

* Login
* Register
* User account
* Dashboard

Calculator screens should provide appropriate Back/Continue navigation.

## 4. Landing Page

### 4.1 Header

Display:

* Logo/brand name: Zakat Companion
* How It Works
* FAQs
* English/Urdu language switch
* Calculate My Zakat CTA

Responsive behavior:

* Desktop: horizontal navigation.
* Mobile: compact responsive navigation.

### 4.2 Hero Section

Main message:

**Calculate Your Zakat With Confidence**

Supporting message should explain that the application provides a simple guided way to understand eligibility and calculate Zakat.

Primary CTA:
**Calculate My Zakat**

Secondary CTA:
**How It Works**

### 4.3 Trust / User Insights Section

Communicate the main concerns identified during user research:

* Uncertainty about Nisab
* Confusion about which assets count
* Difficulty understanding liabilities
* Difficulty calculating the final amount
* Privacy concerns

Keep this section concise and user-focused.

### 4.4 Problem Section

Clearly communicate common problems:

* Unsure about Nisab?
* Don't know which assets count?
* Confused about liabilities?
* Difficulty calculating Zakat?

### 4.5 Solution / Value Section

Explain how Zakat Companion helps users:

* Understand eligibility
* Identify relevant assets
* Enter liabilities
* Calculate Zakat
* Understand the final breakdown
* Generate a PDF summary
* Get general guidance through the chatbot

### 4.6 Features Section

Show the approved features only:

* Eligibility / Nisab Guidance
* Cash & Savings
* Gold
* Silver
* Investments
* Business Assets
* Receivables
* Liabilities
* Zakat Calculation
* Detailed Breakdown
* Live Gold/Silver Prices
* AI Zakat Chatbot
* PDF Summary
* English + Urdu
* Privacy-focused experience

Do not add unapproved features.

### 4.7 How It Works

Show four simple steps:

1. **Check Eligibility**
2. **Add Assets**
3. **Add Liabilities**
4. **Get Your Zakat**

Use simple visual indicators/cards/icons.

### 4.8 Privacy / Trust Section

Clearly communicate that financial information is used for the current calculation and that calculation history is not saved in the MVP.

Avoid making stronger privacy claims than the actual implementation supports.

### 4.9 FAQs

Include an FAQ section for common general questions and application usage.

Questions can include:

* What is Nisab?
* Which assets can I include?
* What are liabilities?
* How does the calculator work?
* How are gold and silver prices obtained?
* Is my calculation saved?

Do not provide unsupported religious rulings.

### 4.10 Final CTA

Use a clear final call-to-action:

**Calculate My Zakat**

## 5. Eligibility / Nisab Screen

Purpose:
Help the user understand whether they may be eligible before entering detailed assets.

Display:

* Back navigation
* Page heading: **Check Your Zakat Eligibility**
* Short Nisab explanation
* Gold price
* Silver price
* Relevant Nisab information
* Continue button

The exact religious methodology must be approved before implementation.

If methodology is not confirmed, mark the requirement as:

**Requires Methodology Confirmation**

The screen should clearly distinguish informational price data from the actual eligibility decision.

## 6. Assets Screen

Heading should clearly indicate that the user is adding assets.

Display asset categories as simple cards:

### Cash & Savings

Short explanation/help text.

### Gold

Short explanation/help text.

### Silver

Short explanation/help text.

### Investments

Short explanation/help text.

### Business Assets

Short explanation/help text.

### Receivables

Short explanation/help text.

Each category should:

* Have a clear label.
* Have an understandable icon.
* Have short help text.
* Be easy to select.
* Avoid complicated terminology.

## 7. Asset Input Screens

Each asset category should have an appropriate input interface.

### 7.1 Cash & Savings

Possible approved inputs:

* Cash in hand
* Bank savings
* Other applicable cash

Each input should include:

* Clear label
* Input field
* Currency/unit
* Help text where needed
* Validation
* Error message

### 7.2 Gold

Display the appropriate gold input fields according to the approved methodology.

Where relevant:

* Quantity/weight
* Unit
* Current price
* Calculated value

Do not invent the final methodology.

### 7.3 Silver

Use a similar structure to Gold.

### 7.4 Investments

Provide the approved investment input fields.

Use explanatory help text so first-time users understand what should be entered.

### 7.5 Business Assets

Provide the approved business-asset input fields.

Avoid turning the application into a full business accounting system.

### 7.6 Receivables

Provide the approved receivable input fields and guidance.

## 8. Liabilities Screen

Heading:

**Do You Have Any Liabilities?**

Provide:

* Applicable debt/liability inputs
* Add another option where required
* Total liabilities
* Help/explanation
* Back
* Continue

Validation must prevent invalid values.

The exact liability deduction methodology requires confirmation before implementation.

## 9. Review Screen

Purpose:
Allow the user to review entered information before calculating.

Display:

* Cash & Savings
* Gold
* Silver
* Investments
* Business Assets
* Receivables
* Total Assets
* Liabilities
* Net Zakatable Amount

Provide a clear:
**Calculate Zakat**

button.

The user should be able to go back and correct inputs before calculation.

Do not include:

* Account information
* Saved calculations
* History
* Dashboard

## 10. Result Screen

The final result must be visually prominent.

Display:

### Zakat Payable

Show the final amount clearly.

Also display:

* Total Assets
* Applicable Liabilities
* Net Zakatable Amount
* Zakat Rate
* Nisab information/value used
* Final Zakat amount

Actions:

* **Download PDF**
* **Start New Calculation**

The result should be understandable without requiring the user to inspect technical details.

## 11. PDF Summary UI

The result screen should provide a clear Download PDF action.

The PDF summary may contain:

* Calculation date
* Nisab information
* Asset breakdown
* Liabilities
* Net zakatable amount
* Zakat rate
* Final Zakat amount
* Methodology/disclaimer

Do not include unnecessary sensitive information.

Do not create a PDF history/library UI.

## 12. AI Chatbot UI

The chatbot should appear as a floating button, preferably in the bottom-right on LTR layouts.

For Urdu RTL layouts, position and alignment should remain intuitive.

Chatbot scope:

* General Zakat questions
* Nisab/general information
* Asset category guidance
* Calculator guidance
* Application usage

Suggested questions:

* What is Nisab?
* Does gold count?
* What are liabilities?
* How do I use the calculator?

The chatbot should:

* Clearly identify itself as an AI assistant.
* Avoid presenting unsupported religious rulings as facts.
* Stay within the approved scope.
* Redirect unrelated questions politely.
* Fail gracefully if the AI service is unavailable.

Example AI error:
**Sorry, I'm unable to answer right now. Please try again later.**

The chatbot must never prevent the calculator from working.

## 13. Language / Internationalization

Supported languages:

* English
* Urdu

Language switch:

* Should be easily visible.
* Should work consistently across the application.
* Should preserve temporary entered values where appropriate.

Urdu:

* Must use RTL layout.
* Text alignment should adapt appropriately.
* Icons and controls should remain understandable.
* Forms must remain usable in RTL.

Do not create additional languages.

## 14. Responsive Design

The application must support:

### Mobile

* Mobile-first layout
* Full-width forms where appropriate
* Touch-friendly controls
* Easy navigation
* Readable text
* No horizontal scrolling

### Tablet

* Comfortable spacing
* Responsive cards/forms
* Appropriate content width

### Desktop

* Structured content layout
* Comfortable reading width
* Clear hierarchy
* Appropriate use of whitespace

Do not simply scale the desktop design down to mobile.

## 15. Form Design

All forms should use:

* Clear labels
* Helpful placeholder text where useful
* Units
* Currency indicators where appropriate
* Short explanations
* Validation
* Clear error messages

Avoid:

* Ambiguous labels
* Long unexplained forms
* Unnecessary fields
* Technical terminology

## 16. Validation States

Examples:

Invalid amount:
**Please enter a valid amount.**

Empty required field:
**Please enter a value.**

Invalid numeric input:
**Please enter a valid number.**

Negative value where not allowed:
**Amount cannot be negative.**

Validation should be understandable to a first-time user.

## 17. Loading States

Provide clear loading indicators/messages.

Examples:

**Fetching current gold price...**

**Fetching current silver price...**

**Calculating your Zakat...**

**Generating your PDF...**

Do not leave users wondering whether the application is still working.

## 18. Error States

### Price API Error

**We couldn't fetch the current gold price. Please try again.**

Equivalent wording may be used for silver.

### AI Error

**Sorry, I'm unable to answer right now. Please try again later.**

### PDF Error

Provide a user-friendly message and keep the calculation result available.

### General Error

Do not expose stack traces, API keys, internal errors, or technical implementation details to users.

## 19. Empty States

Where an optional section has no values, show a clear zero/not-added state rather than confusing blank UI.

Example:
**No liabilities added**

## 20. Navigation and User Flow

The UI must preserve this exact primary flow:

Landing
→ Eligibility / Nisab
→ Assets
→ Liabilities
→ Review
→ Result
→ PDF

Users should be able to:

* Go back.
* Correct entered information.
* Continue forward.
* Start a new calculation from the result.

Do not add unnecessary navigation layers.

## 21. Accessibility

The UI should include:

* Semantic HTML
* Proper form labels
* Keyboard navigation
* Visible focus states
* Clear error messages
* Accessible buttons
* Readable typography
* Sufficient contrast
* Logical heading hierarchy
* Accessible interactive controls

Do not rely on color alone to communicate errors or status.

## 22. Privacy UX

The UI should communicate privacy clearly without making unsupported claims.

Important MVP behavior:

* No login/register.
* No user account.
* No calculation history.
* No saved calculation dashboard.
* No persistent financial profile.

Avoid unnecessary requests for personally identifiable information.

## 23. Methodology / Religious Disclaimer UX

Where methodology affects the calculation, the UI should provide an understandable explanation/disclaimer.

The application must not claim that a specific religious methodology is universally authoritative unless that methodology has been approved.

The following require confirmation before final implementation:

* Zakat rate
* Gold Nisab
* Silver Nisab
* Gold/Silver price basis
* Hawl/eligibility treatment
* Liability deduction methodology
* Business asset treatment
* Receivable treatment
* Investment treatment

Use the wording:

**Requires Methodology Confirmation**

where appropriate during development.

## 24. Visual Consistency

Maintain consistent:

* Button styles
* Card styles
* Input styles
* Border radius
* Spacing
* Typography
* Icons
* Headings
* Error states
* Success states
* Loading states

Create reusable UI components rather than styling every screen independently.

## 25. UI Component Categories

Conceptually organize components into:

### `components/ui/`

Reusable:

* Buttons
* Inputs
* Cards
* Modal/dialog
* Alerts
* Loading indicators
* Navigation elements

### `components/calculator/`

Calculator-specific:

* Asset cards
* Asset forms
* Liability forms
* Review summary
* Result breakdown

### `components/chatbot/`

* Floating chatbot button
* Chat window
* Message bubbles
* Suggested questions
* Loading/error states

Do not implement these components during this documentation task.

## 26. UI Rules for AI-Assisted Development

AI coding tools must treat this document as the UI/UX source of truth.

Before implementing any screen, AI must:

1. Read `PRD.md`.
2. Read `SRS.md`.
3. Read `ARCHITECTURE.md`.
4. Read `UI_UX.md`.
5. Identify the exact approved screen/requirement.
6. Implement only that requirement.

AI must NOT:

* Add login/register.
* Add dashboard.
* Add history.
* Add saved calculations.
* Add database UI.
* Change the approved user flow.
* Invent new screens.
* Add unnecessary features.
* Redesign approved wireframes without approval.
* Modify unrelated parts of the application.

If requirements conflict or are unclear, stop and request clarification.

## 27. UI Definition of Done

A UI feature is complete only when:

* It matches the approved PRD.
* It matches the SRS.
* It matches this UI/UX specification.
* It follows the approved user flow.
* It works on mobile.
* It works on tablet.
* It works on desktop.
* English works correctly.
* Urdu works correctly.
* RTL works correctly.
* Validation works.
* Loading states work.
* Error states work.
* Accessibility basics are satisfied.
* No unapproved feature was introduced.
* No unrelated files/features were changed.
