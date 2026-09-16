# Zakat Companion — Software Requirements Specification

## 1. Introduction

### 1.1 Purpose

This document defines the software requirements for Zakat Companion, a responsive web application that helps users understand Zakat eligibility and calculate Zakat through a guided process.

### 1.2 Product Scope

The application provides:

* Eligibility/Nisab guidance
* Asset input
* Liability input
* Zakat calculation
* Detailed calculation breakdown
* Gold/Silver live price integration
* AI Zakat chatbot
* PDF summary
* English and Urdu support
* Responsive UI
* Privacy-conscious operation

### 1.3 Intended Users

Primary user:

First-time Zakat giver.

Secondary users:

* Annual Zakat users
* Users with multiple asset types
* Users who want a transparent calculation breakdown

### 1.4 Product Type

Responsive Web Application.

The MVP is NOT a native Android or iOS application.

---

# 2. System Overview

The core user flow is:

```text
Landing Page
      ↓
Eligibility / Nisab
      ↓
Assets
      ↓
Liabilities
      ↓
Review
      ↓
Zakat Calculation
      ↓
Detailed Result
      ↓
PDF Summary
```

The user does not need an account to use the calculator.

---

# 3. Functional Requirements

## 3.1 Landing Page

The system shall provide:

* Product introduction
* Problem explanation
* Solution/value explanation
* Feature overview
* How It Works
* Privacy information
* FAQs
* Calculate My Zakat CTA

Primary CTA:

`Calculate My Zakat`

No Login/Register UI shall exist.

---

## 3.2 Language Support

The system shall support:

* English
* Urdu

Urdu must support appropriate RTL layout.

Language switching should preserve temporary entered values where technically appropriate.

---

## 3.3 Eligibility / Nisab

The system shall provide:

* Explanation of Nisab
* Eligibility guidance
* Relevant Gold/Silver price information
* Nisab value/information used by the calculation

Exact methodology must be approved before implementation.

Potential methodology decisions requiring confirmation (Requires Methodology Confirmation):

* Gold vs Silver Nisab (Requires Methodology Confirmation)
* Gold/Silver price basis (Requires Methodology Confirmation)
* Hawl/eligibility treatment (Requires Methodology Confirmation)
* Liability deduction (Requires Methodology Confirmation)
* Investment treatment (Requires Methodology Confirmation)
* Business asset treatment (Requires Methodology Confirmation)
* Receivable treatment (Requires Methodology Confirmation)

Do not invent any religious rule.

---

## 3.4 Asset Requirements

The system shall support:

### Cash & Savings

Allow the user to enter applicable cash and savings amounts.

### Gold

Allow relevant gold information to be entered according to the approved methodology.

### Silver

Allow relevant silver information to be entered according to the approved methodology.

### Investments

Allow applicable investment information to be entered according to the approved methodology.

### Business Assets

Allow applicable business assets to be entered according to the approved methodology.

### Receivables

Allow applicable receivables to be entered according to the approved methodology.

Each category should provide simple explanatory/help text.

---

## 3.5 Liability Requirements

The system shall allow users to enter applicable liabilities/debts.

The treatment of liabilities must follow the approved methodology.

The UI must clearly explain what information the user is expected to enter.

---

## 3.6 Calculation Engine

The calculation engine shall:

* Accept validated input
* Apply approved Zakat rules
* Produce deterministic results
* Handle invalid input
* Handle missing required information
* Be independent from UI presentation
* Be testable

Conceptual function:

```text
calculateZakat(input)
```

Requirement:

```text
Same valid input
+
Same approved methodology
=
Same result
```

The calculation engine must not depend on the AI chatbot.

---

## 3.7 Calculation Breakdown

The result shall show:

* Asset breakdown
* Total assets
* Applicable liabilities
* Net zakatable amount
* Nisab information/value used
* Zakat rate
* Final Zakat amount

The user should be able to understand how the final result was obtained.

---

# 4. Gold/Silver Price API Requirements

The system shall retrieve Gold/Silver prices through the backend.

Required flow:

```text
Frontend
   ↓
Backend/API
   ↓
External Gold/Silver API
   ↓
Backend/API
   ↓
Frontend
```

The frontend must never contain secret API credentials.

The system shall handle:

* Loading state
* Successful response
* API failure
* Invalid API response
* Missing price
* Network failure

The exact API provider and pricing methodology must be approved before final implementation.

---

# 5. AI Chatbot Requirements

The chatbot shall support:

* Zakat-related questions
* Nisab/general information
* Asset category guidance
* Calculator guidance
* Application usage

Required architecture:

```text
User
 ↓
Chatbot UI
 ↓
Backend/API
 ↓
AI API
 ↓
Backend/API
 ↓
Chatbot UI
```

The AI API key must remain server-side.

The chatbot shall not be the calculation engine.

The chatbot shall not invent religious rulings.

The chatbot should politely redirect unrelated questions.

If the AI service fails, the core calculator must continue working.

---

# 6. PDF Requirements

After calculation, the user shall be able to generate a PDF summary.

The PDF may contain:

* Calculation date
* Nisab information
* Asset breakdown
* Liabilities
* Net zakatable amount
* Zakat rate
* Final Zakat amount
* Relevant methodology/disclaimer

The MVP shall not permanently store generated PDFs unless explicitly approved later.

---

# 7. Authentication Requirements

Authentication is NOT part of the MVP.

The system shall NOT contain:

* Login
* Register
* User accounts
* Password management
* User profile
* User dashboard

The user can directly start the calculator.

---

# 8. Data Persistence Requirements

The MVP shall NOT provide:

* Calculation history
* Saved calculations
* Edit/delete history
* User profiles
* Persistent user financial records

A database is not required for the MVP.

The application should operate using temporary calculation state.

Future persistent storage may be introduced only after explicit approval.

---

# 9. UI Requirements

The UI shall follow `UI_UX.md` and the approved wireframe.

Required screens:

1. Landing Page
2. Eligibility/Nisab
3. Assets
4. Asset Inputs
5. Liabilities
6. Review
7. Result
8. PDF Summary

The chatbot UI should be accessible without disrupting the calculator.

---

# 10. Validation Requirements

The system shall validate:

* Required inputs
* Numeric inputs
* Invalid numbers
* Negative values where not allowed
* Extremely large values
* Missing required information

Validation messages must be simple and understandable.

Example:

`Please enter a valid amount.`

Validation should occur on the client where useful and on the server for security-sensitive operations.

---

# 11. Error Handling Requirements

The system shall gracefully handle:

### Gold/Silver API Failure

Display a clear user-friendly error.

### AI API Failure

Display an AI error without breaking the calculator.

### PDF Failure

Inform the user that the PDF could not be generated and allow retry.

### Network Failure

Provide an understandable message.

### Unexpected Server Error

Do not expose stack traces, secrets, or internal implementation details.

---

# 12. Privacy and Security Requirements

The system shall:

* Minimize collection of personal information
* Avoid permanent calculation storage
* Keep API keys server-side
* Use environment variables
* Validate server-side inputs
* Protect API endpoints
* Avoid exposing sensitive errors
* Never commit secrets to GitHub

The user should be informed about how calculation information is handled.

---

# 13. Non-Functional Requirements

## 13.1 Performance

The application should:

* Load efficiently
* Avoid unnecessary API requests
* Avoid unnecessary client-side processing
* Keep the calculation flow responsive

## 13.2 Reliability

Core Zakat calculation should work independently of AI availability.

## 13.3 Security

Secrets must never be exposed to client-side code.

## 13.4 Accessibility

The system should provide:

* Semantic HTML
* Accessible labels
* Keyboard navigation
* Focus states
* Readable text
* Understandable errors
* Sufficient contrast

## 13.5 Responsiveness

The system shall support:

* Mobile
* Tablet
* Desktop

## 13.6 Maintainability

Calculation logic, API integrations, UI components, and PDF generation should be modular.

---

# 14. Edge Cases

The system shall consider:

* Zero values
* Empty fields
* Invalid numeric input
* Negative input
* Very large values
* API unavailable
* API returns invalid data
* AI unavailable
* PDF generation failure
* User changes language
* User navigates backward
* User refreshes during calculation

No permanent calculation data should be required for recovery.

---

# 15. Business Rules

The calculation must use only an approved Zakat methodology.

The following require confirmation before implementation:

* Zakat rate (Requires Methodology Confirmation)
* Gold Nisab (Requires Methodology Confirmation)
* Silver Nisab (Requires Methodology Confirmation)
* Gold/Silver price basis (Requires Methodology Confirmation)
* Hawl treatment (Requires Methodology Confirmation)
* Liability deduction (Requires Methodology Confirmation)
* Business asset treatment (Requires Methodology Confirmation)
* Receivable treatment (Requires Methodology Confirmation)
* Investment treatment (Requires Methodology Confirmation)

Until confirmed, mark them:

`Requires Methodology Confirmation`

AI must not decide these rules independently.

---

# 16. Acceptance Criteria

The MVP shall be accepted when:

* User can access the application without login.
* User can start calculation from the landing page.
* User can view eligibility/Nisab guidance.
* User can enter supported assets.
* User can enter liabilities.
* Inputs are validated.
* Approved Zakat methodology is correctly applied.
* Calculation is deterministic.
* Detailed breakdown is displayed.
* Gold/Silver data can be retrieved through the backend.
* AI chatbot works within its defined scope.
* PDF summary can be generated.
* English and Urdu are supported.
* Urdu supports RTL appropriately.
* Mobile layout works.
* Desktop layout works.
* API keys are not exposed.
* Calculation history does not exist.
* User accounts do not exist.
* UI follows the approved wireframe.
* No unapproved features are present.

---

# 17. MVP Exclusions

Explicitly exclude:

* Login
* Register
* User accounts
* Dashboard
* Calculation history
* Saved calculations
* Database for user/calculation persistence
* Native mobile apps
* Payment processing
* Bank integration
* Crypto integration
* Social/community features
* Unnecessary admin dashboard
* Unnecessary microservices

---

# 18. Requirements Traceability

All implementation must be traceable to:

```text
PRD.md
SRS.md
ARCHITECTURE.md
UI_UX.md
DEVELOPMENT_PLAN.md
```

If implementation conflicts with these documents, the developer must stop and resolve the conflict before proceeding.
