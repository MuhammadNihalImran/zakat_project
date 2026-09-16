# Zakat Companion — Project Files

## 1. Project Documentation

| File                  | Purpose                                                                                     | Status  |
| --------------------- | ------------------------------------------------------------------------------------------- | ------- |
| `PRD.md`              | Product Requirements Document — defines the approved product scope and requirements.        | Planned |
| `SRS.md`              | Software Requirements Specification — defines functional and non-functional requirements.   | Planned |
| `ARCHITECTURE.md`     | System architecture, technology stack, data flow, integrations, and technical decisions.    | Planned |
| `UI_UX.md`            | Approved UI/UX structure, screen flow, components, and design requirements.                 | Planned |
| `DEVELOPMENT_PLAN.md` | Development phases, team responsibilities, Git workflow, and AI-assisted development rules. | Planned |
| `docs/ZAKAT_METHODOLOGY_CONFIRMATION.md` | Religious reviewer decision table & methodology confirmation questions. | Created |

## 2. Source of Truth

The following documents are the project's source of truth:

1. `PRD.md`
2. `SRS.md`
3. `ARCHITECTURE.md`
4. `UI_UX.md`
5. `DEVELOPMENT_PLAN.md`

AI coding agents must follow these documents.

They must NOT:

* invent new features
* add authentication/login/register
* add calculation history
* change the approved user flow
* redesign approved UI without approval
* change the architecture without approval
* install unnecessary dependencies
* modify unrelated files

If a requirement is unclear or conflicts with another document, STOP and ask for clarification instead of making assumptions.

## 3. Important MVP Scope

Product type: Responsive Web Application.

Core flow:

Landing Page
→ Eligibility / Nisab
→ Assets
→ Liabilities
→ Review
→ Zakat Result
→ PDF Summary

Approved MVP features include:

* English + Urdu
* Eligibility / Nisab guidance
* Cash and savings
* Gold
* Silver
* Investments
* Business assets
* Receivables
* Liabilities / debts
* Zakat calculation
* Detailed calculation breakdown
* Gold/Silver live price API
* AI Zakat chatbot
* PDF summary
* FAQs
* Privacy/security
* Responsive mobile and desktop UI

Not included in MVP:

* Login
* Register
* User accounts
* Calculation history
* User dashboard
* Native Android/iOS application
* Payment/donation processing
* Bank integration
* Crypto wallet integration
* Social/community features

## 4. Development Rule

Use controlled AI-assisted development.

One task → one implementation → test → review → merge.

Do not allow multiple AI agents to independently modify the same files at the same time.

## 5. Future Files

Additional documentation and source files may be added later.

When a new important documentation file is created, update `FILES.md` accordingly.
