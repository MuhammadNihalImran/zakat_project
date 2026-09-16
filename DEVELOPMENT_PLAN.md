# Zakat Companion — Development Plan

## 1. Development Objective

Build the approved Zakat Companion responsive web application according to:

* PRD
* SRS
* Architecture
* UI/UX specification

The goal is to develop the application in controlled, testable phases without introducing unapproved functionality.

The development process must follow:

**Plan → Implement → Test → Review → Integrate**

## 2. Development Principles

Follow these principles:

* Build one feature at a time.
* Keep the architecture modular.
* Keep calculation logic separate from UI.
* Follow the approved wireframe/UI.
* Follow PRD and SRS requirements.
* Validate inputs.
* Handle errors properly.
* Protect API keys.
* Avoid unnecessary dependencies.
* Avoid unnecessary complexity.
* Test every completed feature.
* Do not modify unrelated files.
* Do not introduce unapproved features.

## 3. Technology Stack

Use the approved stack:

* Next.js
* React
* TypeScript
* Tailwind CSS
* Next.js server/API routes
* External Gold/Silver price API
* External AI API
* Server-side PDF generation
* Git/GitHub
* Vercel

MVP does NOT require:

* Database
* Authentication
* User accounts
* History
* Saved calculations

## 4. Development Phases

Development should happen in the following order.

### Phase 1 — Project Setup

Tasks:

* Create/setup Next.js project.
* Configure TypeScript.
* Configure Tailwind CSS.
* Establish basic project structure.
* Configure `.gitignore`.
* Configure environment variable strategy.
* Verify the application runs locally.

Do not add unnecessary dependencies.

### Phase 2 — UI Foundation

Tasks:

* Establish global layout.
* Establish typography.
* Establish reusable UI components.
* Establish buttons.
* Establish inputs.
* Establish cards.
* Establish alerts.
* Establish loading states.
* Establish responsive layout rules.
* Establish English/Urdu foundation.
* Establish RTL support.

Do not build the complete calculator yet.

### Phase 3 — Landing Page

Implement the approved landing page:

1. Header
2. Hero
3. Trust/User Insights
4. Problems
5. Solution/Value
6. Features
7. How It Works
8. Privacy/Trust
9. FAQs
10. Final CTA

Requirements:

* Match approved UI/UX.
* Responsive.
* English/Urdu.
* No login/register.

Test:

* Desktop
* Tablet
* Mobile
* Navigation
* Language switch
* CTA buttons

### Phase 4 — Eligibility / Nisab

Implement:

* Eligibility screen
* Nisab information
* Gold price display
* Silver price display
* Continue/back navigation

Before finalizing calculation behavior, confirm:

* Zakat rate
* Gold Nisab
* Silver Nisab
* Price basis/source
* Hawl/eligibility methodology

If not confirmed, mark implementation as:

**Requires Methodology Confirmation**

Do not invent religious rules.

### Phase 5 — Calculator UI

Implement the approved calculator flow:

```text
Eligibility
→ Assets
→ Liabilities
→ Review
→ Result
```

Implement asset categories:

* Cash & Savings
* Gold
* Silver
* Investments
* Business Assets
* Receivables

Implement:

* Forms
* Navigation
* Validation
* Temporary state
* Error states
* Review screen

Do NOT implement calculation logic inside individual UI components.

### Phase 6 — Zakat Calculation Engine

Create isolated calculation/business logic.

Conceptually:

`calculateZakat(input)`

Responsibilities:

* Calculate asset totals.
* Calculate applicable liabilities.
* Calculate net zakatable amount.
* Evaluate Nisab according to approved methodology.
* Apply approved Zakat rate.
* Return structured calculation results.

The calculation engine must be:

* Independent from UI.
* Testable.
* Deterministic.
* Easy to review.

Do not hard-code unapproved religious methodology.

Methodology requiring confirmation:

* Zakat rate
* Nisab values
* Price basis
* Hawl treatment
* Liability treatment
* Business asset treatment
* Receivable treatment
* Investment treatment

### Phase 7 — Gold/Silver Price API

Implement live price integration.

Flow:

```text
Frontend
→ Next.js Server/API
→ External Price API
→ Server
→ Frontend
```

Requirements:

* API keys remain server-side.
* No secrets in client-side code.
* Validate API responses.
* Handle timeout/failure.
* Handle missing/invalid price data.
* Show loading state.
* Show user-friendly errors.

Example:

**Fetching current gold price...**

Error:

**We couldn't fetch the current gold price. Please try again.**

Apply equivalent behavior for silver.

### Phase 8 — AI Zakat Chatbot

Implement:

* Floating chatbot button
* Chat window
* Messages
* Suggested questions
* Loading state
* Error state
* Backend/API route
* AI API integration

Approved chatbot scope:

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

Rules:

* AI is NOT the calculation engine.
* AI must not invent religious rulings.
* AI must remain within approved scope.
* Unrelated questions should be politely redirected.
* AI failure must not break the calculator.

### Phase 9 — Result Screen

Implement the approved result screen.

Display:

* Zakat Payable
* Total Assets
* Applicable Liabilities
* Net Zakatable Amount
* Zakat Rate
* Nisab information/value used
* Final Zakat amount

Actions:

* Download PDF
* Start New Calculation

Verify that the calculation breakdown matches the calculation engine.

### Phase 10 — PDF Generation

Implement server-side PDF generation.

Flow:

```text
Calculation Result
→ PDF Generation
→ PDF Response
→ User Download
```

PDF should contain:

* Calculation date
* Nisab information
* Asset breakdown
* Liabilities
* Net zakatable amount
* Zakat rate
* Final Zakat amount
* Methodology/disclaimer

Do not permanently store PDFs in the MVP.

### Phase 11 — Validation and Error Handling

Review all forms and services.

Test:

* Empty fields
* Invalid numbers
* Negative values
* Extremely large values
* Missing API response
* Invalid API response
* API timeout
* AI failure
* PDF failure
* Calculation edge cases

User-facing errors must be understandable.

Do not expose:

* Stack traces
* API keys
* Internal implementation details

### Phase 12 — Responsive and Accessibility Review

Verify:

### Mobile

* No horizontal scrolling.
* Buttons are touch-friendly.
* Forms are usable.
* Text is readable.
* Chatbot is usable.

### Tablet

* Layout remains balanced.
* Forms and cards work correctly.

### Desktop

* Content width is comfortable.
* Navigation works.
* Layout remains consistent.

Accessibility:

* Semantic HTML
* Proper labels
* Keyboard navigation
* Focus states
* Clear errors
* Logical headings
* Sufficient contrast

### Phase 13 — Language and RTL Review

Test every relevant screen in:

* English / LTR
* Urdu / RTL

Verify:

* Text direction
* Alignment
* Navigation
* Forms
* Buttons
* Cards
* Chatbot
* Result screen
* Error messages
* Responsive behavior

Ensure temporary calculation values are not unnecessarily lost when switching language.

### Phase 14 — Testing and QA

Perform:

#### Functional Testing

Verify every approved feature.

#### UI Testing

Compare implementation against approved wireframes/UI specification.

#### Requirement Testing

Check every PRD/SRS requirement.

#### Edge Case Testing

Test unusual and invalid inputs.

#### Integration Testing

Verify:

* Frontend ↔ backend
* Backend ↔ price API
* Backend ↔ AI API
* Backend ↔ PDF generation
* Calculation engine ↔ result UI

#### Regression Testing

Ensure new changes do not break existing functionality.

## 5. Team Development Workflow

Use feature branches.

Main branch:

```text
main
```

Feature branches:

```text
feature/landing-page
feature/calculator
feature/calculation-engine
feature/bullion-api
feature/chatbot
feature/pdf
feature/security
feature/qa
```

Workflow:

```text
Task
→ Create/Use Feature Branch
→ Implement
→ Run Locally
→ Test
→ Code Review
→ Fix Issues
→ Pull Request
→ Team Review
→ Merge
```

Do not perform normal feature development directly on `main`.

## 6. AI-Assisted Development Workflow

AI tools are development assistants, not project architects.

Before every AI implementation task:

1. Inspect the project.
2. Read the relevant documentation.
3. Identify the exact requirement.
4. Identify files that need modification.
5. Explain the implementation plan.
6. Implement only the requested task.
7. Run/test the relevant functionality.
8. Report files changed and test results.

AI must NOT:

* Invent features.
* Add login/register.
* Add history.
* Add dashboard.
* Add database without explicit approval.
* Change architecture without approval.
* Change approved UI without approval.
* Install unnecessary packages.
* Rewrite working code unnecessarily.
* Modify unrelated files.
* Expose secrets.

If requirements are unclear or conflicting:

**Stop and ask for clarification.**

## 7. Antigravity and Qoder Workflow

To prevent conflicting AI changes:

* Do not let Antigravity and Qoder edit the same files simultaneously.

Recommended role separation:

### Antigravity

Use primarily for:

* Implementation
* Feature development
* Refactoring when explicitly requested

### Qoder

Use primarily for:

* Code review
* Debugging
* Requirement validation
* Finding bugs
* Checking PRD/SRS compliance

Qoder should review without modifying files unless explicitly instructed.

## 8. Task Size Rule

Use small development tasks.

Good task:

**"Implement the landing page header according to UI_UX.md."**

Bad task:

**"Build the entire Zakat Companion application."**

Each task should ideally result in:

* Small code change
* Easy testing
* Easy review
* Easy rollback

## 9. Integration Order

Integrate features in this order:

1. Project setup
2. UI foundation
3. Landing page
4. Eligibility/Nisab UI
5. Calculator UI
6. Calculation engine
7. Gold/Silver API
8. Result screen
9. AI chatbot
10. PDF generation
11. Validation/error handling
12. Accessibility
13. Language/RTL review
14. Final QA
15. Deployment

## 10. Security Development Rules

During development:

* Never commit API keys.
* Never place secrets in client-side code.
* Use environment variables.
* Validate server requests.
* Avoid unnecessary logging of financial values.
* Do not store unnecessary personal information.
* Review API endpoints before deployment.
* Ensure AI and external API credentials are protected.

## 11. Zakat Methodology Confirmation Gate

Before implementing final calculation behavior, the team must confirm the approved methodology.

Required confirmations:

* Zakat rate
* Gold Nisab
* Silver Nisab
* Gold/Silver price basis
* Hawl/eligibility treatment
* Liability deduction methodology
* Business asset treatment
* Receivable treatment
* Investment treatment

Until confirmation:

**Do not invent or assume religious rules.**

Mark affected implementation tasks:

**Requires Methodology Confirmation**

## 12. Testing Strategy

Every feature should be tested at three levels where appropriate:

### Unit Testing

For isolated business logic such as:

* Zakat calculation
* Asset totals
* Liability calculations
* Nisab comparison

### Integration Testing

For:

* API routes
* External APIs
* AI service
* PDF generation

### UI/Functional Testing

For:

* Navigation
* Forms
* Validation
* Language switching
* Responsive behavior
* Result display

## 13. Requirement Traceability

Before final release, verify:

```text
PRD Requirement
→ SRS Requirement
→ Architecture
→ UI/UX
→ Implementation
→ Test
```

Every approved requirement should have a corresponding implementation and test.

Any feature without an approved requirement should be reviewed before inclusion.

## 14. Final QA Checklist

Before deployment verify:

### Product

* [ ] Landing page complete
* [ ] Eligibility/Nisab complete
* [ ] Asset inputs complete
* [ ] Liability inputs complete
* [ ] Review screen complete
* [ ] Calculation complete
* [ ] Result screen complete
* [ ] PDF download complete
* [ ] AI chatbot complete
* [ ] FAQs complete

### UI/UX

* [ ] Matches approved wireframe
* [ ] Mobile tested
* [ ] Tablet tested
* [ ] Desktop tested
* [ ] English tested
* [ ] Urdu tested
* [ ] RTL tested
* [ ] Loading states tested
* [ ] Error states tested
* [ ] Validation tested

### Security

* [ ] No API keys in source code
* [ ] Environment variables configured
* [ ] Server-side secrets protected
* [ ] Sensitive data not unnecessarily logged
* [ ] API endpoints reviewed

### Requirements

* [ ] PRD reviewed
* [ ] SRS reviewed
* [ ] Architecture reviewed
* [ ] UI/UX reviewed
* [ ] No unapproved features
* [ ] No login/register
* [ ] No calculation history
* [ ] No database persistence in MVP

## 15. Deployment Plan

Deployment flow:

```text
Local Development
→ GitHub
→ Vercel
→ Production
```

Before deployment:

* Run tests.
* Build production version locally.
* Verify environment variables.
* Check API integrations.
* Test production configuration.
* Verify responsive UI.
* Perform final requirement review.

## 16. Definition of Done

A feature is considered complete only when:

* PRD requirement is satisfied.
* SRS requirement is satisfied.
* Architecture is respected.
* UI/UX specification is respected.
* Approved wireframe is followed.
* Mobile works.
* Tablet works.
* Desktop works.
* English works.
* Urdu/RTL works where applicable.
* Validation works.
* Error handling works.
* Tests pass.
* No secrets are exposed.
* Code is reviewed.
* No unrelated files were modified.
* No unapproved feature was introduced.

## 17. MVP Completion Criteria

The MVP is complete when the user can successfully:

```text
Open Landing Page
→ Start Calculation
→ Understand Eligibility/Nisab
→ Enter Assets
→ Enter Liabilities
→ Review Information
→ Calculate Zakat
→ View Detailed Result
→ Download PDF Summary
```

The AI chatbot must also provide approved general Zakat/application guidance without interfering with the calculator.

The MVP must remain:

* Simple
* Responsive
* Secure
* Testable
* Maintainable
* Aligned with PRD/SRS/UI/Architecture

## 18. Post-MVP Possibilities

Future features may include:

* Authentication
* User accounts
* Database
* Calculation history
* Saved calculations

These are NOT part of the current MVP.

Do not implement them unless separately approved.
