# Zakat Companion — Product Requirements Document

## 1. Product Overview

Zakat Companion is a responsive web application designed to help users, especially first-time Zakat givers, understand their Zakat eligibility and calculate their Zakat through a simple, guided, and easy-to-understand process.

The application is designed for users in Pakistan and will support both English and Urdu.

The product focuses on:

* Simple Zakat guidance
* Nisab/eligibility understanding
* Asset classification
* Liabilities
* Zakat calculation
* Detailed calculation breakdown
* Live Gold/Silver price information
* AI-assisted Zakat guidance
* PDF calculation summary
* Privacy-conscious usage

The MVP does not require users to create an account or save their calculations.

## 2. Problem Statement

First-time Zakat givers may face difficulty understanding:

* What Nisab means
* Whether they are eligible to pay Zakat
* Which assets are included
* How gold and silver should be considered
* How investments should be treated
* How business assets should be treated
* How receivables should be treated
* How liabilities/debts affect the calculation
* How to calculate the final Zakat amount
* Where to obtain reliable information

Users may also have privacy concerns when entering financial information into a digital calculator.

Zakat Companion aims to make this process clearer, simpler, and more guided.

## 3. Target Users

### Primary Target User

First-time Zakat giver who needs step-by-step guidance.

### Secondary Users

* People who calculate Zakat annually
* Users with multiple asset types
* Users who want a clear calculation breakdown
* Users who want a downloadable summary

## 4. Product Goals

The main goals are:

1. Make Zakat calculation easier for beginners.
2. Explain Nisab and eligibility clearly.
3. Help users identify relevant asset categories.
4. Provide a structured calculation process.
5. Provide a transparent calculation breakdown.
6. Provide current Gold/Silver price information where required.
7. Provide Zakat-related AI guidance.
8. Allow users to download a PDF summary.
9. Provide English and Urdu support.
10. Minimize unnecessary collection and storage of financial information.

## 5. MVP Scope

### 5.1 In Scope

The MVP includes:

* Landing page
* English language
* Urdu language
* RTL support for Urdu
* Eligibility/Nisab guidance
* Cash and savings
* Gold
* Silver
* Investments
* Business assets
* Receivables
* Liabilities/debts
* Zakat calculation
* Detailed calculation breakdown
* Gold/Silver live price API
* AI Zakat chatbot
* PDF summary
* FAQs
* Privacy/security information
* Responsive mobile/desktop interface
* Input validation
* Error handling

### 5.2 Out of Scope

The following are NOT part of the MVP:

* Login
* Register
* User accounts
* User dashboard
* Calculation history
* Saved calculations
* Edit/delete history
* Native Android application
* Native iOS application
* Payment processing
* Zakat donation processing
* Bank account integration
* Crypto wallet integration
* Social/community features
* Full financial management system
* Complex personalized religious rulings
* Unnecessary admin dashboard
* Unnecessary analytics infrastructure
* Unnecessary microservices
* Database for calculation history or user accounts

## 6. Core User Journey

The main user journey is:

Landing Page
→ Calculate My Zakat
→ Eligibility / Nisab
→ Assets
→ Liabilities
→ Review
→ Calculate
→ Detailed Result
→ Download PDF

The user should be able to complete the core calculation without creating an account.

## 7. Functional Requirements

### 7.1 Landing Page

The landing page should communicate:

* What Zakat Companion does
* Why Zakat calculation can be difficult
* How the application helps
* Main features
* How the process works
* Privacy information
* FAQs
* Call-to-action to start calculation

Primary CTA:

"Calculate My Zakat"

### 7.2 Language Support

The application must support:

* English
* Urdu

Urdu should support an appropriate RTL interface.

Language switching should not unnecessarily erase currently entered temporary information.

### 7.3 Zakat Eligibility and Nisab

The application must provide:

* Explanation of Nisab
* Eligibility guidance
* Relevant Gold/Silver price information
* Nisab information/value used in calculation

Exact religious methodology must be approved before implementation.

Do NOT allow AI coding agents to invent Zakat rules.

Items requiring confirmation may include:

* Gold vs Silver Nisab methodology (Requires Methodology Confirmation)
* Price basis (Requires Methodology Confirmation)
* Hawl/eligibility interpretation (Requires Methodology Confirmation)
* Liability deduction rules (Requires Methodology Confirmation)
* Business asset treatment (Requires Methodology Confirmation)
* Receivables treatment (Requires Methodology Confirmation)
* Investment treatment (Requires Methodology Confirmation)

### 7.4 Asset Management

The calculator must support:

#### Cash & Savings

Allow relevant cash and savings values to be entered.

#### Gold

Allow relevant gold information to be entered according to the approved methodology.

#### Silver

Allow relevant silver information to be entered according to the approved methodology.

#### Investments

Allow applicable investment information to be entered according to the approved methodology.

#### Business Assets

Allow applicable business assets to be entered according to the approved methodology.

#### Receivables

Allow applicable money owed to the user to be entered according to the approved methodology.

Each category should provide simple guidance/help text.

### 7.5 Liabilities

Users must be able to enter applicable liabilities/debts according to the approved methodology.

The system must clearly show how liabilities are treated in the calculation.

### 7.6 Zakat Calculation

The calculation engine must:

* Accept validated input
* Apply approved calculation rules
* Produce deterministic results
* Handle invalid values
* Handle missing required information
* Keep calculation logic separate from UI

Conceptual function:

`calculateZakat(input)`

Same valid inputs + same approved methodology = same result.

### 7.7 Calculation Breakdown

The result should show:

* Asset breakdown
* Total assets
* Applicable liabilities
* Net zakatable amount
* Nisab information/value used
* Zakat rate
* Final Zakat amount

The user should be able to understand how the final amount was reached.

### 7.8 Gold and Silver Price API

Gold/Silver prices should be retrieved through a backend/server-side integration.

Flow:

Frontend
→ Backend
→ External Gold/Silver API
→ Backend
→ Frontend

API credentials must never be exposed to the frontend.

The application should handle:

* Loading
* API failure
* Invalid response
* Missing price
* Appropriate retry/fallback behavior

### 7.9 AI Chatbot

The application should provide an AI chatbot focused on:

* Zakat-related questions
* Nisab/general information
* Asset category guidance
* Calculator guidance
* Application usage

The chatbot should NOT be a replacement for the deterministic calculation engine.

Unrelated questions should be politely redirected.

The chatbot should avoid presenting uncertain or unsupported religious rulings as facts.

AI failure must not prevent the calculator from working.

### 7.10 PDF Summary

Users should be able to generate a PDF summary after calculation.

The PDF may contain:

* Calculation date
* Nisab information
* Asset breakdown
* Liabilities
* Net zakatable amount
* Zakat rate
* Final Zakat amount
* Relevant methodology/disclaimer

Avoid unnecessary sensitive information.

### 7.11 FAQs

The application should provide FAQs related to:

* Zakat
* Nisab
* Assets
* Liabilities
* Calculation
* Gold/Silver pricing
* Application usage

### 7.12 Privacy and Security

The MVP should:

* Avoid unnecessary personal data collection
* Avoid permanently storing calculation data
* Keep API keys server-side
* Use environment variables for secrets
* Validate user input
* Protect backend endpoints
* Avoid exposing sensitive errors

The user should be clearly informed about how their entered information is handled.

### 7.13 Responsive Design

The application must work properly on:

* Mobile
* Tablet
* Desktop

The mobile experience should be designed intentionally rather than simply shrinking the desktop layout.

## 8. User Experience Requirements

The experience should be:

* Simple
* Guided
* Beginner-friendly
* Clear
* Trustworthy
* Privacy-conscious
* Accessible
* Responsive

The user should not need technical knowledge to complete the calculation.

The core calculator should use a step-by-step flow rather than presenting an unnecessarily complex form.

## 9. Business Rules

The calculation must follow an approved Zakat methodology.

The following rules must be finalized before implementation (Requires Methodology Confirmation):

* Zakat rate (Requires Methodology Confirmation)
* Nisab basis (Requires Methodology Confirmation)
* Gold Nisab (Requires Methodology Confirmation)
* Silver Nisab (Requires Methodology Confirmation)
* Gold/Silver price source and price basis (Requires Methodology Confirmation)
* Hawl/eligibility treatment (Requires Methodology Confirmation)
* Liability deduction methodology (Requires Methodology Confirmation)
* Business asset methodology (Requires Methodology Confirmation)
* Receivable methodology (Requires Methodology Confirmation)
* Investment methodology (Requires Methodology Confirmation)

Until officially confirmed, these must be treated as "Requires Methodology Confirmation".

The system must not invent religious rulings.

## 10. Non-Functional Requirements

### 10.1 Performance

The application should load efficiently and avoid unnecessary network requests.

### 10.2 Reliability

Core calculation should remain functional even if the AI chatbot is unavailable.

### 10.3 Security

Secrets must not be exposed to the client.

API keys must be stored using secure environment variables.

### 10.4 Accessibility

Use:

* Semantic HTML
* Clear labels
* Keyboard accessibility
* Readable text
* Appropriate focus states
* Understandable validation messages
* Sufficient contrast

### 10.5 Responsiveness

All major screens must work on mobile, tablet, and desktop.

## 11. Error and Edge Cases

The application should handle:

* Empty input
* Invalid numbers
* Negative values where not allowed
* Extremely large values
* Missing required information
* Gold/Silver API failure
* AI API failure
* PDF generation failure
* Network failure
* Invalid API response
* Language switching

Error messages should be understandable and should not expose technical secrets.

## 12. Success Criteria

The MVP is successful when:

1. A first-time user can understand the application.
2. A user can complete the calculation without login.
3. Eligibility/Nisab guidance is available.
4. Supported asset categories can be entered.
5. Liabilities can be entered.
6. Calculation is deterministic and correct according to approved methodology.
7. A clear breakdown is provided.
8. Gold/Silver prices can be retrieved through the backend.
9. AI chatbot provides scoped Zakat guidance.
10. PDF summary can be generated.
11. English and Urdu are supported.
12. Mobile and desktop layouts work.
13. Invalid input is handled correctly.
14. No API secrets are exposed.
15. No calculation history is stored.
16. No unapproved features are added.
17. UI follows the approved wireframe.

## 13. Risks and Mitigation

### Incorrect Zakat Rules

Mitigation:
Obtain and document approved methodology before implementation.

### Gold/Silver API Failure

Mitigation:
Provide loading/error handling and an approved fallback strategy if applicable.

### AI Hallucination

Mitigation:
Keep chatbot scoped and clearly distinguish guidance from deterministic calculation.

### API Key Exposure

Mitigation:
Keep credentials server-side and use environment variables.

### AI-Generated Bugs

Mitigation:
Use controlled development, testing, code review, and PRD/SRS validation.

### UI Mismatch

Mitigation:
Compare implementation against the approved wireframe.

### Financial Data Exposure

Mitigation:
Minimize data collection and avoid permanent storage in MVP.

## 14. Future Scope

Possible future additions include:

* Database
* User accounts
* Calculation history
* Saved calculations
* Additional languages
* Native mobile application
* Additional integrations

These features require explicit approval before implementation.

## 15. Important Development Constraints

The following documents are the project's source of truth:

* `PRD.md`
* `SRS.md`
* `ARCHITECTURE.md`
* `UI_UX.md`
* `DEVELOPMENT_PLAN.md`

AI coding agents must follow these documents.

AI agents must NOT:

* Invent features
* Add Login/Register
* Add calculation history
* Add user accounts
* Change the approved user flow
* Change approved UI without approval
* Change architecture without approval
* Install unnecessary dependencies
* Modify unrelated files

If any requirement is unclear or conflicting, stop and ask for clarification.
