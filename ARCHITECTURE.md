# Zakat Companion — System Architecture

## 1. Architecture Overview

Zakat Companion is a responsive web application designed to guide users, particularly first-time Zakat givers, through understanding Zakat eligibility and calculating Zakat.

The system uses a simple modular web architecture:

```text
User
 → Next.js / React Frontend
 → Next.js Server/API Layer
 → External Services (Gold/Silver API, AI API)
```

The application is a monolithic Next.js application. It is **NOT** a microservices system.

## 2. Architecture Goals

* Simple and maintainable architecture suitable for a university MVP.
* Clear separation of UI rendering and core business/calculation logic.
* Secure handling of external API keys strictly on the server side.
* Accurate, deterministic, and testable Zakat calculation engine.
* Fully responsive frontend supporting mobile, tablet, and desktop viewports.
* Bilingual support (English and Urdu) with RTL (Right-to-Left) layout support for Urdu.
* Reliable and graceful error handling across API and feature failures.
* Structured for easy AI-assisted development and code reviews.
* Scalable modular foundation for future extensions without adding premature complexity.

## 3. High-Level Architecture

### Frontend
* **Next.js / React / TypeScript / Tailwind CSS**
* Responsive, mobile-first UI components.
* Dual language handling (English / Urdu) with RTL support.
* Guided calculator wizard screens (Eligibility, Assets, Liabilities, Review).
* Prominent Zakat Result display screen.
* Client-side PDF summary download trigger.
* Embedded AI Chatbot interface drawer/widget.

### Application / Server Layer
Implemented using Next.js Server-Side API Routes / Server Actions.

Responsibilities:
* Receive and sanitize incoming frontend requests.
* Validate input data before server-side processing.
* Call external Gold/Silver Price API securely using server environment variables.
* Delegate calculation requests to the business logic layer.
* Proxy AI chatbot prompts and responses securely.
* Handle server-side PDF document generation.
* Prevent exposure of sensitive API keys or credentials to client browser bundles.

### Business Logic Layer
Keep Zakat calculation engine logic completely separated from UI components.

Conceptual interface:
`calculateZakat(input)`

Responsibilities:
* Summarize asset totals across all supported categories.
* Compute deductible liability totals.
* Calculate net zakatable wealth amount.
* Evaluate against approved Nisab thresholds (Gold/Silver).
* Apply approved Zakat rate.
* Output itemized calculation result breakdown.

*Note: Religious calculation rules that have not been officially confirmed must be marked as **"Requires Methodology Confirmation"**.*

## 4. External Services

### Gold/Silver Price API

**Purpose**: Retrieve real-time or updated gold and silver market prices for Nisab threshold assessment.

**Flow**:
```text
Frontend
 → Next.js API/Server
 → Gold/Silver API
 → Next.js API/Server
 → Frontend
```

**Important Rules**:
* API keys/secrets must remain strictly server-side.
* Never expose API credentials in client-side code.
* Handle API timeouts, rate limits, and network failures gracefully.
* Display a user-friendly error or fallback rate if prices cannot be retrieved.

### AI API

**Purpose**: Power the Zakat Companion AI chatbot assistant for guidance and general Zakat questions.

**Flow**:
```text
Chatbot UI
 → Next.js API/Server
 → External AI API
 → Next.js API/Server
 → Chatbot UI
```

**Important Rules**:
* AI is strictly for user guidance and educational information.
* AI must **NOT** serve as the Zakat calculation engine.
* AI must not invent or present unsupported religious rulings as facts.
* AI chatbot prompts must be scoped strictly to Zakat-related topics and calculator assistance.
* If the AI service fails or is unreachable, the core calculator must remain fully functional.

## 5. PDF Generation

Flow:
```text
Completed Calculation
 → Server-side PDF Generation
 → PDF Response Stream
 → User Download
```

The generated PDF summary contains:
* Calculation date
* Nisab information used
* Asset breakdown by category
* Deductible liabilities
* Net zakatable amount
* Zakat rate applied
* Final Zakat amount payable
* Methodology disclaimer

Generated PDFs are streamed directly to the user for download and are **NOT** permanently stored on the server in the MVP.

## 6. Data Flow

Complete User Journey Flow:
```text
Landing Page
 → Eligibility / Nisab
 → Assets
 → Liabilities
 → Review
 → Zakat Result
 → PDF Summary
```

During this journey, temporary state (selected currency, entered asset values, liabilities) moves sequentially through react component state or temporary session state.

**The MVP does not persist user calculations or financial information in a database.**
No calculation history or user profile data is retained.

## 7. Zakat Calculation Flow

1. User reviews eligibility & Nisab information (fetched via backend metal prices).
2. User enters values for applicable asset categories.
3. User enters values for applicable deductible liabilities.
4. Application validates numeric inputs.
5. Application computes total assets.
6. Application computes total deductible liabilities.
7. Application calculates net zakatable wealth = (Total Assets - Liabilities).
8. Application evaluates net wealth against approved Nisab methodology.
9. Application applies the approved Zakat rate (Requires Methodology Confirmation).
10. Final result is rendered with a detailed visual breakdown.
11. User can optionally generate and download a PDF summary report.

Religious methodology values and calculation rules require official confirmation before final code implementation:
* Zakat rate (Requires Methodology Confirmation)
* Gold Nisab threshold (Requires Methodology Confirmation)
* Silver Nisab threshold (Requires Methodology Confirmation)
* Metal price source and pricing basis (Requires Methodology Confirmation)
* Hawl / 1-year holding eligibility treatment (Requires Methodology Confirmation)
* Liability deduction methodology (Requires Methodology Confirmation)
* Business asset calculation methodology (Requires Methodology Confirmation)
* Receivable calculation methodology (Requires Methodology Confirmation)
* Investment asset calculation methodology (Requires Methodology Confirmation)

## 8. Temporary State / Data Handling

Because authentication, user accounts, and database persistence are explicitly out of scope for the MVP:
* User calculation data exists only temporarily during the active calculation session.
* No user account creation or registration exists.
* No login/authentication interface exists.
* No saved calculations or calculation history exists.
* No persistent user financial profile is created or stored.

Implementation must minimize logging or temporary caching of sensitive user financial data.

## 9. Security Architecture

### Environment Variables
Store all external secrets (API keys, service endpoints) in `.env.local` for development and Vercel environment variables for production. Never hard-code secret values.

### Server-Side Secrets
All external API keys (Gold/Silver API, AI API) must be accessed exclusively in server-side routes/functions. They must never be prefixed with public variables or bundled into client code.

### Input Validation
Validate and sanitize all incoming form payload inputs on the server before calculation processing or API delegation.

### API Protection
Protect internal Next.js API endpoints against malformed requests and enforce basic server-side request validation.

### Sensitive Data
Do not log user financial values, entered assets, or net Zakat results to server console logs or analytics services.

### AI Safety
Enforce system prompts restricting the AI chatbot to Zakat guidance. Ensure the AI chatbot is clearly labeled as an educational assistant and not a substitute for authoritative scholars or the deterministic calculation engine.

## 10. Error Handling Architecture

### Validation Errors
Displayed when user inputs fail numeric or boundary checks.
*Example*: "Please enter a valid positive amount."

### Gold/Silver API Errors
Displayed when external price feeds time out or fail.
*Example*: "We couldn't fetch current gold prices. Using default fallback rates."

### AI Errors
Displayed when AI chatbot API is unavailable.
*Example*: "Zakat Assistant is currently offline. Please try again later." (Calculator remains unaffected).

### PDF Errors
If PDF generation fails, present a clear notification without breaking or resetting the completed calculation result display.

### General Errors
Catch-all application error boundaries present clean, user-friendly messages without exposing internal stack traces, API keys, or system details.

## 11. Internationalization / RTL Architecture

* English (LTR) and Urdu (RTL) language options supported.
* Urdu interface dynamically applies `dir="rtl"` attribute and mirrors directional UI elements.
* Switching languages preserves entered temporary calculator inputs in session state.
* UI component abstractions support layout flipping and localized text string dictionaries.

## 12. Responsive Architecture

* Mobile-first responsive layout supporting viewports from 320px up to 4K desktops.
* Touch-friendly buttons, form inputs, and modal controls for mobile devices.
* Flexbox and CSS Grid layouts with Tailwind breakpoints (`sm:`, `md:`, `lg:`) for seamless screen adaptation.

## 13. Accessibility

* Semantic HTML5 elements (`<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>`).
* Accessible form inputs with explicit `<label>` bindings and descriptive `aria-describedby` hints.
* Keyboard navigation support (Tab indexing, Escape key modal closing).
* High-contrast typography adhering to WCAG 2.1 AA standards.
* Visible focus rings on all interactive controls.

## 14. Component Architecture

Modular architecture blueprint:

* `components/ui/`: Generic reusable UI primitives (Button, Input, Card, Modal, Tooltip, Badge).
* `components/calculator/`: Step wizard, asset forms, liability form, review step, result card.
* `components/chatbot/`: Floating chat trigger, chat drawer, message history, suggested prompt chips.
* `lib/zakat/`: Pure functions for Zakat calculation engine, Nisab comparison, and validation.
* `lib/api/`: Server-side fetchers and proxy wrappers for external price feeds and AI services.
* `lib/pdf/`: Server-side PDF template renderer and document generator.
* `types/`: TypeScript definitions for asset inputs, calculation results, and API contracts.

*Note: Component files will be implemented in their respective development phases.*

## 15. Suggested Project Structure

```text
zakat-companion/
│
├── app/
│   ├── page.tsx
│   ├── calculator/
│   ├── result/
│   └── api/
│       ├── price/
│       ├── chat/
│       └── pdf/
│
├── components/
│   ├── ui/
│   ├── calculator/
│   └── chatbot/
│
├── lib/
│   ├── zakat/
│   ├── api/
│   └── pdf/
│
├── types/
├── public/
├── docs/
├── .env.local
├── .gitignore
└── package.json
```

*Note: This is the planned structure blueprint for reference during development phases.*

## 16. Architecture Boundaries

### Frontend handles
* UI rendering and page transitions.
* Form state management and temporary client state.
* Localized string presentation and RTL layout toggling.
* Triggering calculation, PDF download, and Chatbot drawer.

### Server handles
* Secure external API requests (Gold/Silver API, AI API).
* API key protection.
* Server-side input validation and error handling.
* PDF document generation.

### Business Logic handles
* Deterministic Zakat math calculations.
* Asset category summation.
* Liability deductions.
* Nisab comparison logic.

### External Services handle
* Real-time gold and silver spot price feeds.
* AI chat completion responses.

## 17. Architecture Decisions

1. **Next.js App Router**: Single unified framework for frontend UI rendering and serverless API endpoints.
2. **TypeScript**: Strict type safety across UI components, calculation functions, and API payload schemas.
3. **Tailwind CSS**: Utility-first CSS for rapid, responsive, and accessible styling.
4. **No Database in MVP**: Zero database overhead; calculator operates cleanly on temporary in-memory state.
5. **No Authentication**: Publicly accessible calculator eliminating friction for users.
6. **Serverless API Proxying**: Protects API keys and prevents client CORS issues.
7. **Isolated Business Logic Engine**: Calculation math decoupled from React UI for easy unit testing.
8. **Decoupled AI Chatbot**: AI failure cannot break the core Zakat calculator.
9. **GitHub + Vercel Deployment**: Automated CI/CD deployment with secure environment variable management.

## 18. Future Scalability

The modular architecture cleanly accommodates future scope additions if explicitly approved:
* Database integration (e.g., PostgreSQL / Supabase) for user accounts.
* User authentication and profiles.
* Multi-year saved calculation history.
* Direct charity payment integration.
* Additional language translations.

*None of these future items are included in the MVP.*

## 19. Deployment Architecture

```text
Developer Push
 → GitHub Repository (main branch)
 → Vercel Automatic Build
 → Vercel Global Edge CDN
 → Next.js Production Web Application
```

Environment variables (`GOLD_SILVER_API_KEY`, `AI_API_KEY`) are securely stored in the Vercel deployment project settings.

## 20. AI-Assisted Development Constraints

AI coding tools (e.g., Antigravity, Qoder AI) must adhere strictly to project documentation as the single source of truth:
1. `PRD.md`
2. `SRS.md`
3. `ARCHITECTURE.md`
4. `UI_UX.md`
5. `DEVELOPMENT_PLAN.md`

AI Development Rules:
* Inspect project files and documentation before editing code.
* Implement only explicit, requested tasks.
* Do NOT invent unapproved features (No login, no database, no calculation history).
* Do NOT change approved user flows or architecture without approval.
* Do NOT expose secrets or write API keys into client code.
* Test code implementation thoroughly before completing tasks.
* Stop and ask for user clarification if requirements are ambiguous.

## 21. Definition of Done — Architecture

The Architecture is complete and verified when:
* Fully aligned with `PRD.md` and `SRS.md`.
* Zero out-of-scope features (auth, history, database) included.
* System boundaries, data flow, external API flows, and security measures are explicitly defined.
* Calculation logic is isolated from UI presentation.
* Error handling strategies defined for all component layers.
* Simple, maintainable monolithic Next.js architecture documented clearly.
