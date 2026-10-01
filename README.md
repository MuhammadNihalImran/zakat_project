This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# Zakat Companion

A simple, guided, and privacy-conscious **Zakat Calculator** designed for Muslims in Pakistan, with support for **English and Urdu**.

Zakat Companion helps users understand Zakat eligibility, enter different types of assets and liabilities, review their information, and receive a clear Zakat calculation with a detailed breakdown.

> **Important:** The calculator currently uses development methodology defaults that are **pending religious review**. It is an educational calculation tool and **not an official religious ruling or fatwa**.

---

## ✨ Features

### 🧮 Guided Zakat Calculator

Step-by-step calculation flow:

1. Eligibility & Nisab
2. Cash & Savings
3. Gold
4. Silver
5. Investments
6. Business Assets
7. Receivables
8. Liabilities
9. Review
10. Zakat Result

### 💰 Supported Assets

* Cash in hand
* Bank savings
* Other cash
* Gold
* Silver
* Investments
* Business assets
* Receivables

### 📉 Liabilities

Users can enter eligible liabilities and immediate expenses according to the configured methodology.

### 🪙 Live Gold & Silver Valuation

The application supports live gold and silver pricing through the configured metals API.

Metal valuation considers:

* Current market price
* Weight
* Gold purity / karat
* Silver weight

### 🌐 English & Urdu

* English interface
* Urdu interface
* RTL support for Urdu
* Language switching without losing entered calculation data

### 🤖 AI Assistant

The integrated AI assistant provides educational guidance about:

* Zakat
* Nisab
* Supported calculator methodology
* General calculation concepts

The assistant does not provide personalized religious rulings or fatwas.

### 📄 PDF Summary

Users can generate a downloadable calculation summary containing:

* Asset breakdown
* Liabilities
* Net zakatable wealth
* Nisab value
* Zakat amount
* Calculation details

English and Urdu PDF output are supported.

### 🔒 Privacy-Conscious MVP

The MVP does not require:

* Login
* Registration
* User accounts
* Calculation history
* Database persistence

Calculation data remains part of the current session.

### 📱 Responsive Design

Designed for:

* Mobile
* Tablet
* Desktop

The interface supports both English LTR and Urdu RTL layouts.

---

## 🧭 User Flow

```text
Landing Page
     ↓
Eligibility / Nisab
     ↓
Assets
 ├── Cash & Savings
 ├── Gold
 ├── Silver
 ├── Investments
 ├── Business Assets
 └── Receivables
     ↓
Liabilities
     ↓
Review
     ↓
Zakat Result
     ↓
PDF Summary
```

The AI assistant is available throughout relevant parts of the experience.

---

## 🕌 Calculation Methodology

The calculation methodology is centralized in:

```text
lib/zakat/methodology.ts
```

Current development defaults include:

| Method         | Current Development Default                     |
| -------------- | ----------------------------------------------- |
| Zakat Rate     | 2.5%                                            |
| Gold Nisab     | 87.48 g                                         |
| Silver Nisab   | 612.36 g                                        |
| Default Nisab  | Silver                                          |
| Hawl           | Assumes entered assets completed one lunar year |
| Gold Jewelry   | 100% entered value                              |
| Silver         | 100% entered value                              |
| Investments    | 100% entered market value                       |
| Business Stock | 100% entered value                              |
| Receivables    | 100% entered expected repayment                 |
| Liabilities    | Configured deduction                            |
| Final Zakat    | Rounded to nearest integer                      |

Gold valuation uses the applicable spot price and purity ratio:

```text
Gold Value = Spot Price × Weight × (Karat / 24)
```

### ⚠️ Religious Review

The above values are **development defaults** and require confirmation by a qualified religious scholar before being presented as authoritative religious methodology.

The project intentionally keeps these decisions centralized so that they can be reviewed and updated without changing the calculation engine.

---

## 🏗️ Tech Stack

### Frontend

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS

### Backend

* Next.js API Routes
* Server-side PDF generation
* Gemini API
* Metals API

### Testing

* Custom TypeScript test runner
* Unit tests
* Accessibility tests
* Internationalization tests
* API tests
* PDF generation tests

### Deployment

The project is compatible with modern Next.js hosting platforms such as:

* Vercel
* Other Node.js-compatible hosting platforms

---

## 📁 Project Structure

```text
zakat-companion/
│
├── app/
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.ts
│   │   ├── metals/
│   │   │   └── route.ts
│   │   └── pdf/
│   │       └── route.ts
│   │
│   ├── calculator/
│   │   ├── assets/
│   │   │   ├── cash-savings/
│   │   │   ├── gold/
│   │   │   ├── silver/
│   │   │   ├── investments/
│   │   │   ├── business-assets/
│   │   │   └── receivables/
│   │   ├── eligibility/
│   │   ├── liabilities/
│   │   ├── review/
│   │   ├── result/
│   │   └── layout.tsx
│   │
│   ├── error.tsx
│   ├── globals.css
│   ├── icon.svg
│   ├── favicon.ico
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── chatbot/
│   ├── landing/
│   └── ui/
│
├── context/
│   ├── CalculatorContext.tsx
│   └── LanguageContext.tsx
│
├── docs/
│   └── ZAKAT_METHODOLOGY_CONFIRMATION.md
│
├── lib/
│   ├── api/
│   ├── i18n/
│   ├── pdf/
│   ├── zakat/
│   ├── accessibility.test.ts
│   └── validation.ts
│
├── public/
│
├── types/
│   └── calculator.ts
│
├── .env.example
├── .gitignore
├── ARCHITECTURE.md
├── DEVELOPMENT_PLAN.md
├── PRD.md
├── README.md
├── SRS.md
├── UI_UX.md
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd zakat-companion
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a local environment file:

```bash
cp .env.example .env.local
```

Then add the required API credentials.

Example:

```env
GOLD_SILVER_API_KEY=
GOLD_SILVER_API_URL=

GEMINI_API_KEY=
GEMINI_API_URL=
GEMINI_MODEL=
```

> Never commit `.env.local` or real API keys to GitHub.

### 4. Start Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🧪 Testing

Run the complete test suite:

```bash
npm test
```

The project currently contains **89 automated tests** covering:

* Zakat calculation engine
* Nisab calculation
* Metal valuation
* Input validation
* Internationalization
* Accessibility
* Gemini integration logic
* Metals API integration
* PDF generation

### Production Build

```bash
npm run build
```

The production build should complete successfully before deployment.

---

## 🔐 Environment Variables

| Variable              | Purpose                         |
| --------------------- | ------------------------------- |
| `GOLD_SILVER_API_KEY` | API key for gold/silver pricing |
| `GOLD_SILVER_API_URL` | Gold/silver API endpoint        |
| `GEMINI_API_KEY`      | Gemini API authentication       |
| `GEMINI_API_URL`      | Gemini API endpoint             |
| `GEMINI_MODEL`        | Gemini model override           |

Use `.env.example` as the template.

**Never publish real API keys in source code, GitHub, screenshots, logs, or documentation.**

---

## 📄 Documentation

The project includes dedicated documentation for development and product decisions:

* `PRD.md` — Product requirements
* `SRS.md` — Software requirements
* `ARCHITECTURE.md` — System architecture
* `UI_UX.md` — UI/UX specifications
* `DEVELOPMENT_PLAN.md` — Development plan
* `docs/ZAKAT_METHODOLOGY_CONFIRMATION.md` — Religious methodology decisions and review status

These documents should be treated as the project's development source of truth.

---

## 🚫 MVP Scope

### Included

* Guided Zakat calculation
* Nisab eligibility
* Cash & savings
* Gold
* Silver
* Investments
* Business assets
* Receivables
* Liabilities
* Calculation breakdown
* English/Urdu
* RTL support
* AI educational assistant
* PDF summary
* Responsive interface

### Not Included in MVP

* User accounts
* Login / registration
* Calculation history
* Database persistence
* Payments
* Donations
* Bank integration
* Cryptocurrency
* Full financial management
* Native mobile application
* Personalized religious rulings
* Complex administrative dashboards

### Future Scope

The following are intentionally outside the current MVP:

* Real estate / investment property calculations
* Retirement, pension, and provident funds
* User accounts and saved calculation history
* Additional methodology options after scholar review

---

## 🔒 Privacy

Zakat Companion is designed with privacy in mind.

The MVP does not require users to create an account or provide personal identity information to perform a calculation.

No calculation history is stored in a database in the MVP.

Users should still avoid entering unnecessary sensitive personal information into the AI assistant.

---

## ⚠️ Disclaimer

Zakat Companion is an educational and calculation-support tool.

Its current calculation methodology contains **development defaults pending review by a qualified religious scholar**.

The application does not constitute:

* A fatwa
* An official religious ruling
* Personalized religious advice
* A substitute for consultation with a qualified scholar

Users should consult a qualified scholar for questions involving personal or complex Zakat circumstances.

---

## 🛠️ Development Principles

The project follows these principles:

1. Keep the MVP simple.
2. Avoid unnecessary features.
3. Keep calculation methodology centralized.
4. Separate UI from calculation logic.
5. Do not store user calculations in the MVP.
6. Protect API credentials.
7. Support English and Urdu consistently.
8. Preserve calculation data when changing language.
9. Test calculation logic independently.
10. Do not present development defaults as definitive religious rulings.

---

## 📌 Current Project Status

**Status: MVP Development Complete**

Current verification:

```text
Automated Tests:   89 / 89 PASS
Production Build:  PASS
Languages:         English + Urdu
RTL Support:       PASS
PDF Generation:    PASS
AI Assistant:      Integrated
Gold/Silver API:   Integrated
Responsive UI:     Verified
Favicon:           Added
```

The project is ready for source-control publication and deployment after final environment-variable configuration and production verification.

---

## 👥 Project

**Zakat Companion**

Built as a guided Zakat calculation experience for users in Pakistan, with a focus on simplicity, transparency, privacy, and accessibility.

---

## 📜 License

Add the project's chosen license here before public release.

If the repository is intended to remain private or academic, keep the repository access restricted according to the project's requirements.
