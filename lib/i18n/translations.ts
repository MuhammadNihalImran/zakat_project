export type Language = "en" | "ur";

export interface TranslationDictionary {
  nav: {
    title: string;
    howItWorks: string;
    faqs: string;
    calculateCta: string;
    langSwitch: string;
  };
  hero: {
    badge: string;
    heading: string;
    subheading: string;
    primaryCta: string;
    secondaryCta: string;
  };
  insights: {
    title: string;
    subtitle: string;
    cards: Array<{ title: string; desc: string }>;
  };
  problems: {
    title: string;
    subtitle: string;
    items: Array<{ title: string; desc: string }>;
  };
  solution: {
    title: string;
    subtitle: string;
    points: Array<{ title: string; desc: string }>;
  };
  features: {
    title: string;
    subtitle: string;
    items: Array<{ title: string; desc: string }>;
  };
  howItWorks: {
    title: string;
    subtitle: string;
    steps: Array<{ step: string; title: string; desc: string }>;
  };
  privacy: {
    title: string;
    subtitle: string;
    points: Array<{ title: string; desc: string }>;
  };
  faqs: {
    title: string;
    subtitle: string;
    items: Array<{ question: string; answer: string }>;
  };
  finalCta: {
    heading: string;
    subheading: string;
    ctaButton: string;
  };
  footer: {
    rights: string;
    disclaimer: string;
    notice: string;
  };
  calculator: {
    steps: {
      eligibility: string;
      assets: string;
      liabilities: string;
      review: string;
      result: string;
    };
    eligibility: {
      title: string;
      subtitle: string;
      nisabExplanation: string;
      goldCardTitle: string;
      goldCardDesc: string;
      silverCardTitle: string;
      silverCardDesc: string;
      fetchingPrices: string;
      priceApiError: string;
      retryBtn: string;
      goldPriceLabel: string;
      silverPriceLabel: string;
      lastUpdated: string;
      methodologyNotice: string;
      continueBtn: string;
      backBtn: string;
    };
    assets: {
      title: string;
      subtitle: string;
      totalAssetsLabel: string;
      continueToLiabilitiesBtn: string;
      categories: {
        cashSavings: { name: string; desc: string };
        gold: { name: string; desc: string };
        silver: { name: string; desc: string };
        investments: { name: string; desc: string };
        businessAssets: { name: string; desc: string };
        receivables: { name: string; desc: string };
      };
    };
    forms: {
      backToAssets: string;
      saveAndReturn: string;
      cashSavings: {
        title: string;
        subtitle: string;
        cashInHandLabel: string;
        bankSavingsLabel: string;
        otherCashLabel: string;
      };
      gold: {
        title: string;
        subtitle: string;
        weightLabel: string;
        purityLabel: string;
        estimatedValueLabel: string;
        liveRateLabel: string;
        pricePlaceholder: string;
        methodologyNotice: string;
      };
      silver: {
        title: string;
        subtitle: string;
        weightLabel: string;
        purityLabel: string;
        estimatedValueLabel: string;
        liveRateLabel: string;
        pricePlaceholder: string;
        methodologyNotice: string;
      };
      investments: {
        title: string;
        subtitle: string;
        stocksLabel: string;
        mutualFundsLabel: string;
        otherInvestmentsLabel: string;
      };
      businessAssets: {
        title: string;
        subtitle: string;
        tradeStockLabel: string;
        cashReservesLabel: string;
      };
      receivables: {
        title: string;
        subtitle: string;
        expectedRepaymentsLabel: string;
      };
    };
    liabilities: {
      title: string;
      subtitle: string;
      shortTermDebtsLabel: string;
      immediateExpensesLabel: string;
      totalLiabilitiesLabel: string;
      methodologyNotice: string;
      continueToReviewBtn: string;
      backBtn: string;
    };
    review: {
      title: string;
      subtitle: string;
      totalAssetsLabel: string;
      totalLiabilitiesLabel: string;
      netZakatableLabel: string;
      calculateZakatBtn: string;
      placeholderNotice: string;
      editBtn: string;
      backBtn: string;
    };
    result: {
      title: string;
      subtitle: string;
      statusBadge: string;
      payablePlaceholderLabel: string;
      breakdownTitle: string;
      pdfDisabledBtn: string;
      startNewBtn: string;
      placeholderNotice: string;
    };
  };
  chatbot: {
    floatingBtn: string;
    title: string;
    subtitle: string;
    placeholder: string;
    sendBtn: string;
    suggestedTitle: string;
    suggestedQuestions: string[];
    welcomeMessage: string;
    errorMessage: string;
    retryBtn: string;
    thinking: string;
    clearChat: string;
  };
  validation: {
    emptyInput: string;
    invalidNumber: string;
    negativeValue: string;
    excessiveValue: string;
    reviewStateCorrupted: string;
    fixErrorsPrompt: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    nav: {
      title: "Zakat Companion",
      howItWorks: "How It Works",
      faqs: "FAQs",
      calculateCta: "Calculate My Zakat",
      langSwitch: "اردو",
    },
    hero: {
      badge: "Guided Zakat Assessment for Pakistan",
      heading: "Calculate Your Zakat With Confidence",
      subheading:
        "A simple, transparent, and privacy-conscious guide to help you understand Nisab eligibility and assess your Zakat obligations accurately.",
      primaryCta: "Calculate My Zakat",
      secondaryCta: "How It Works",
    },
    insights: {
      title: "Common Zakat Giver Concerns",
      subtitle:
        "Calculating Zakat accurately can feel complex. Here are the core challenges we help you solve.",
      cards: [
        {
          title: "Uncertainty About Nisab",
          desc: "Many givers struggle to understand whether the Gold or Silver threshold applies to their savings.",
        },
        {
          title: "Asset Classification",
          desc: "Confusion over which assets (cash, gold, investments, business stock) are subject to Zakat.",
        },
        {
          title: "Deductible Liabilities",
          desc: "Unsure how short-term debts or personal liabilities reduce total Zakatable wealth.",
        },
        {
          title: "Privacy & Data Protection",
          desc: "Hesitation to enter personal financial figures into online calculators that store private data.",
        },
      ],
    },
    problems: {
      title: "Are You Facing These Questions?",
      subtitle: "First-time Zakat givers often run into four major obstacles.",
      items: [
        {
          title: "Unsure about Nisab?",
          desc: "Do you know which metal rate standard applies to your current net wealth?",
        },
        {
          title: "Don't know which assets count?",
          desc: "Are you clear on how cash, gold, silver, investments, and receivables are treated?",
        },
        {
          title: "Confused about liabilities?",
          desc: "Are you uncertain which debts can be deducted before calculating Zakat?",
        },
        {
          title: "Difficulty calculating Zakat?",
          desc: "Struggling to figure out the exact net amount and 2.5% payable Zakat?",
        },
      ],
    },
    solution: {
      title: "How Zakat Companion Helps You",
      subtitle: "A clear step-by-step assistant designed for clarity and confidence.",
      points: [
        {
          title: "Nisab Eligibility Guidance",
          desc: "Understand current Gold and Silver Nisab values clearly before calculating.",
        },
        {
          title: "Structured Asset Input",
          desc: "Categorize cash, precious metals, business assets, investments, and receivables easily.",
        },
        {
          title: "Clear Liabilities Deduction",
          desc: "Enter eligible short-term debts transparently according to standard guidelines.",
        },
        {
          title: "Transparent Calculation Breakdown",
          desc: "See exact itemized mathematics showing how your payable Zakat was determined.",
        },
        {
          title: "Exportable PDF Summary",
          desc: "Download a clean calculation report for your personal records or verification.",
        },
        {
          title: "AI Guidance Assistant",
          desc: "Get quick answers to calculator usage questions and general Zakat concepts.",
        },
      ],
    },
    features: {
      title: "Approved Product Scope & Features",
      subtitle: "Everything you need for an accurate, privacy-focused calculation.",
      items: [
        { title: "Eligibility / Nisab Guidance", desc: "Clear explanations of Gold and Silver Nisab standards." },
        { title: "Cash & Savings", desc: "Calculations for cash in hand, bank deposits, and liquid savings." },
        { title: "Gold Assessment", desc: "Inputs for gold weight, purity, and market valuation." },
        { title: "Silver Assessment", desc: "Inputs for silver holdings and current market valuation." },
        { title: "Investments", desc: "Guidance for stocks, mutual funds, and dividend wealth." },
        { title: "Business Assets", desc: "Support for trade stock, inventory, and business liquid capital." },
        { title: "Receivables", desc: "Category for expected debt repayments and loans owed to you." },
        { title: "Deductible Liabilities", desc: "Structured entry for immediate, eligible short-term debts." },
        { title: "Deterministic Calculation Engine", desc: "Mathematically accurate 2.5% Zakat calculation." },
        { title: "Detailed Result Breakdown", desc: "Itemized total assets, liabilities, net wealth, and payable Zakat." },
        { title: "Live Metal Price API", desc: "Server-side retrieval of current Gold and Silver spot prices." },
        { title: "AI Zakat Assistant", desc: "Scoped chatbot for application guidance and concept explanations." },
        { title: "PDF Summary Export", desc: "Downloadable PDF summary of your calculation session." },
        { title: "English & Urdu Support", desc: "Bilingual interface with complete LTR and RTL layout support." },
        { title: "Privacy-Conscious Operation", desc: "No registration, no accounts, and no permanent data storage." },
      ],
    },
    howItWorks: {
      title: "Four Simple Steps to Calculate Zakat",
      subtitle: "Navigate our structured assessment workflow effortlessly.",
      steps: [
        {
          step: "01",
          title: "Check Eligibility",
          desc: "Review Nisab standards and determine if your wealth meets the threshold.",
        },
        {
          step: "02",
          title: "Add Assets",
          desc: "Enter values for cash, gold, silver, investments, business stock, and receivables.",
        },
        {
          step: "03",
          title: "Add Liabilities",
          desc: "Deduct applicable short-term debts and eligible personal liabilities.",
        },
        {
          step: "04",
          title: "Get Your Zakat",
          desc: "View your detailed breakdown, consult the AI guide, and export a PDF summary.",
        },
      ],
    },
    privacy: {
      title: "Privacy & Data Protection",
      subtitle: "Your financial privacy is our core priority in the MVP.",
      points: [
        {
          title: "No Account or Registration",
          desc: "You can use the complete calculator without creating a profile or giving personal contact details.",
        },
        {
          title: "No Permanent Storage",
          desc: "Your entered financial figures are processed temporarily during your active session and are not stored in a database.",
        },
        {
          title: "No Saved Calculation History",
          desc: "No calculation records or persistent financial profiles are created or saved.",
        },
        {
          title: "Secure Server Proxying",
          desc: "External price feeds and AI guidance operate strictly through secure server routes without exposing data.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      subtitle: "Common questions about Zakat Companion, Nisab, and application usage.",
      items: [
        {
          question: "What is Nisab?",
          answer:
            "Nisab is the minimum threshold of wealth a Muslim must possess for one lunar year (Hawl) to be eligible to pay Zakat. It is equivalent to 87.48g of Gold or 612.36g of Silver. (Requires Methodology Confirmation for specific standard choice).",
        },
        {
          question: "Which assets can I include in the calculation?",
          answer:
            "Zakatable assets include liquid cash, bank balances, gold, silver, business inventory, shares/investments, and receivables expected to be recovered.",
        },
        {
          question: "What are deductible liabilities?",
          answer:
            "Short-term debts and immediate personal liabilities that are due within the year can be deducted from your total wealth according to standard Zakat guidelines. (Requires Methodology Confirmation).",
        },
        {
          question: "How does the Zakat Companion calculator work?",
          answer:
            "The calculator sums your total assets, subtracts eligible deductible liabilities to find your Net Zakatable Wealth, checks if it exceeds Nisab, and calculates 2.5% of the net amount.",
        },
        {
          question: "How are Gold and Silver prices obtained?",
          answer:
            "Market prices for Gold and Silver are fetched securely through server-side price API feeds to ensure calculations use updated rates.",
        },
        {
          question: "Is my calculation or financial data saved?",
          answer:
            "No. Zakat Companion operates entirely without user accounts or persistent database storage in the MVP. Your data exists only during your session.",
        },
      ],
    },
    finalCta: {
      heading: "Ready to Calculate Your Zakat?",
      subheading:
        "Join thousands of givers calculating their Zakat with clarity, precision, and complete privacy.",
      ctaButton: "Calculate My Zakat",
    },
    footer: {
      rights: "© 2026 Zakat Companion. All rights reserved.",
      disclaimer:
        "Disclaimer: Zakat Companion provides computational guidance based on standard Zakat practices. Specific complex religious scenarios may require confirmation from qualified Islamic scholars.",
      notice: "Responsive Web Application — MVP Edition",
    },
    calculator: {
      steps: {
        eligibility: "Eligibility",
        assets: "Assets",
        liabilities: "Liabilities",
        review: "Review",
        result: "Result",
      },
      eligibility: {
        title: "Check Your Zakat Eligibility",
        subtitle:
          "Review Nisab threshold standards to understand whether your net wealth is subject to Zakat.",
        nisabExplanation:
          "Nisab is the minimum threshold of net wealth required for Zakat eligibility. If your total net Zakatable wealth equals or exceeds Nisab for one lunar year, Zakat is due at 2.5%.",
        goldCardTitle: "Gold Nisab Standard",
        goldCardDesc: "Threshold equivalent to 87.48 grams (approx. 7.5 Tolas) of pure gold.",
        silverCardTitle: "Silver Nisab Standard",
        silverCardDesc: "Threshold equivalent to 612.36 grams (approx. 52.5 Tolas) of pure silver.",
        fetchingPrices: "Fetching current gold and silver prices...",
        priceApiError: "We couldn't fetch the current gold and silver prices. Please try again.",
        retryBtn: "Retry Fetching Prices",
        goldPriceLabel: "Current Gold Price",
        silverPriceLabel: "Current Silver Price",
        lastUpdated: "Live rates retrieved",
        methodologyNotice: "Requires Methodology Confirmation — Final Nisab metal choice and price basis subject to official approval.",
        continueBtn: "Continue to Assets",
        backBtn: "Back to Home",
      },
      assets: {
        title: "Let's Add Your Assets",
        subtitle: "Select categories and enter values for all Zakatable wealth you own.",
        totalAssetsLabel: "Current Total Assets",
        continueToLiabilitiesBtn: "Continue to Liabilities",
        categories: {
          cashSavings: {
            name: "Cash & Savings",
            desc: "Cash in hand, bank balances, and liquid savings.",
          },
          gold: {
            name: "Gold Holdings",
            desc: "Gold jewelry, coins, bars, and gold assets.",
          },
          silver: {
            name: "Silver Holdings",
            desc: "Silver jewelry, coins, bars, and silver assets.",
          },
          investments: {
            name: "Investments",
            desc: "Stocks, shares, mutual funds, and dividend wealth.",
          },
          businessAssets: {
            name: "Business Assets",
            desc: "Trade stock, inventory, and business cash reserves.",
          },
          receivables: {
            name: "Receivables",
            desc: "Good debts and loans expected to be repaid to you.",
          },
        },
      },
      forms: {
        backToAssets: "Back to Asset Overview",
        saveAndReturn: "Save & Return to Assets",
        cashSavings: {
          title: "Cash & Savings Details",
          subtitle: "Enter liquid monetary amounts in your local currency.",
          cashInHandLabel: "Cash on Hand",
          bankSavingsLabel: "Bank Accounts / Deposits",
          otherCashLabel: "Other Liquid Cash / Foreign Currency",
        },
        gold: {
          title: "Gold Holdings Details",
          subtitle: "Enter gold weight and estimated value.",
          weightLabel: "Gold Weight (grams)",
          purityLabel: "Gold Purity / Carat",
          estimatedValueLabel: "Estimated Total Value",
          liveRateLabel: "Live Market Rate",
          pricePlaceholder: "Live gold spot price feed will be provided here.",
          methodologyNotice: "Requires Methodology Confirmation — Gold valuation criteria require official approval.",
        },
        silver: {
          title: "Silver Holdings Details",
          subtitle: "Enter silver weight and estimated value.",
          weightLabel: "Silver Weight (grams)",
          purityLabel: "Silver Purity / Carat",
          estimatedValueLabel: "Estimated Total Value",
          liveRateLabel: "Live Market Rate",
          pricePlaceholder: "Live silver spot price feed will be provided here.",
          methodologyNotice: "Requires Methodology Confirmation — Silver valuation criteria require official approval.",
        },
        investments: {
          title: "Investment Assets Details",
          subtitle: "Enter marketable investments and stock equity.",
          stocksLabel: "Shares & Stocks Value",
          mutualFundsLabel: "Mutual Funds & Investment Bonds",
          otherInvestmentsLabel: "Other Zakatable Investments",
        },
        businessAssets: {
          title: "Business Wealth Details",
          subtitle: "Enter commercial inventory and business cash.",
          tradeStockLabel: "Trade Inventory / Stock for Sale",
          cashReservesLabel: "Business Cash & Liquid Balances",
        },
        receivables: {
          title: "Receivables & Money Owed",
          subtitle: "Enter debts expected to be collected.",
          expectedRepaymentsLabel: "Expected Debt Repayments to You",
        },
      },
      liabilities: {
        title: "Do You Have Any Liabilities?",
        subtitle: "Enter short-term debts and eligible expenses to deduct from total assets.",
        shortTermDebtsLabel: "Short-Term Debts Due Within 1 Year",
        immediateExpensesLabel: "Immediate Personal / Business Debts",
        totalLiabilitiesLabel: "Total Deductible Liabilities",
        methodologyNotice: "Requires Methodology Confirmation — Deductible liability rules require official approval.",
        continueToReviewBtn: "Continue to Review",
        backBtn: "Back to Assets",
      },
      review: {
        title: "Review Your Information",
        subtitle: "Verify your entered assets and liabilities before calculating Zakat.",
        totalAssetsLabel: "Total Assets",
        totalLiabilitiesLabel: "Total Liabilities",
        netZakatableLabel: "Net Zakatable Amount (Pending Engine)",
        calculateZakatBtn: "Calculate Zakat",
        placeholderNotice: "Calculation engine will process net math in the Zakat Calculation Engine phase.",
        editBtn: "Edit",
        backBtn: "Back to Liabilities",
      },
      result: {
        title: "Zakat Calculation Result",
        subtitle: "Visual breakdown of your Zakat evaluation.",
        statusBadge: "Phase 4 UI Preview",
        payablePlaceholderLabel: "Zakat Payable (Pending Engine)",
        breakdownTitle: "Itemized Breakdown",
        pdfDisabledBtn: "Download PDF Summary (Phase 10)",
        startNewBtn: "Start New Calculation",
        placeholderNotice: "Zakat calculation engine will be connected in the next development phase (Phase 5).",
      },
    },
    chatbot: {
      floatingBtn: "Ask Zakat AI Assistant",
      title: "Zakat AI Assistant",
      subtitle: "Ask questions about Zakat concepts, Nisab, or application usage.",
      placeholder: "Type your Zakat question here...",
      sendBtn: "Send",
      suggestedTitle: "Suggested Questions:",
      suggestedQuestions: [
        "What is Nisab?",
        "Does gold count for Zakat?",
        "What are liabilities?",
        "How do I use the Zakat calculator?",
      ],
      welcomeMessage: "Assalamu Alaikum! I am your Zakat Companion AI Assistant. How can I help you understand Zakat or navigate the calculator today?",
      errorMessage: "Sorry, I'm unable to answer right now. Please try again later.",
      retryBtn: "Retry",
      thinking: "Thinking...",
      clearChat: "Clear conversation",
    },
    validation: {
      emptyInput: "Please enter a value.",
      invalidNumber: "Please enter a valid number.",
      negativeValue: "Please enter a value greater than or equal to zero.",
      excessiveValue: "Amount is too large. Please enter a realistic amount.",
      reviewStateCorrupted: "Some of your entered values are invalid. Please review and correct them.",
      fixErrorsPrompt: "Please fix the errors highlighted below before continuing.",
    },
  },
  ur: {
    nav: {
      title: "زکوٰۃ کمپینین",
      howItWorks: "یہ کیسے کام کرتا ہے",
      faqs: "سوالات و جوابات",
      calculateCta: "زکوٰۃ کا حساب لگائیں",
      langSwitch: "English",
    },
    hero: {
      badge: "پاکستان کے لیے رہنمائی کے ساتھ زکوٰۃ کا حساب",
      heading: "پورے اعتماد کے ساتھ اپنی زکوٰۃ کا حساب لگائیں",
      subheading:
        "ایک سادہ، شفاف اور راز داری پر مبنی رہنما جو آپ کو نصاب کی اہلیت سمجھنے اور زکوٰۃ کا درست اندازہ لگانے میں مدد کرتا ہے۔",
      primaryCta: "زکوٰۃ کا حساب لگائیں",
      secondaryCta: "یہ کیسے کام کرتا ہے",
    },
    insights: {
      title: "زکوٰۃ دینے والوں کے عام خدشات",
      subtitle: "زکوٰۃ کا درست حساب مشکل ہو سکتا ہے۔ ہم ان اہم مسائل کو حل کرنے میں آپ کی مدد کرتے ہیں۔",
      cards: [
        {
          title: "نصاب کے بارے میں ابہام",
          desc: "بہت سے لوگ یہ سمجھنے میں دشواری محسوس کرتے ہیں کہ سونا یا چاندی میں سے کون سا نصاب ان پر لاگو ہوتا ہے۔",
        },
        {
          title: "اثاثوں کی تقسیم",
          desc: "یہ الجھن کہ کون سے اثاثے (نقد رقم، سونا، سرمایہ کاری، تجارتی مال) زکوٰۃ میں شامل ہیں۔",
        },
        {
          title: "منہا ہونے والے واجبات",
          desc: "غیر یقینی صورتحال کہ کون سے واجبات یا قلیل المدتی قرضے کل مالیت سے وضع کیے جا سکتے ہیں۔",
        },
        {
          title: "پرائیویسی اور ڈیٹا کا تحفظ",
          desc: "آن لائن کیلکولیٹر میں ذاتی مالیاتی معلومات درج کرنے کے بارے میں خدشات۔",
        },
      ],
    },
    problems: {
      title: "کیا آپ کو ان سوالات کا سامنا ہے؟",
      subtitle: "پہلی بار زکوٰۃ دینے والوں کو اکثر چار بڑی رکاوٹوں کا سامنا کرنا پڑتا ہے۔",
      items: [
        {
          title: "کیا نصاب کے بارے میں غیر یقینی ہے؟",
          desc: "کیا آپ جانتے ہیں کہ آپ کی موجودہ مالیت پر کون سا معیار لاگو ہوتا ہے؟",
        },
        {
          title: "کون سے اثاثے شامل ہیں؟",
          desc: "کیا آپ کو معلوم ہے کہ نقد رقم، سونا، چاندی اور سرمایہ کاری کا حساب کیسے ہوتا ہے؟",
        },
        {
          title: "واجبات کے بارے میں الجھن؟",
          desc: "کیا آپ غیر یقینی ہیں کہ کون سے قرضے زکوٰۃ کا حساب لگانے سے پہلے وضع کیے جا سکتے ہیں؟",
        },
        {
          title: "حساب کتاب میں دشواری؟",
          desc: "حتمی قابل زکوٰۃ رقم اور 2.5 فیصد زکوٰۃ کا حساب لگانے میں مشکل؟",
        },
      ],
    },
    solution: {
      title: "زکوٰۃ کمپینین آپ کی کیسے مدد کرتا ہے",
      subtitle: "وضاحت اور اعتماد کے لیے تیار کردہ مرحلہ وار معاون۔",
      points: [
        {
          title: "نصاب کی اہلیت کی رہنمائی",
          desc: "حساب شروع کرنے سے پہلے سونے اور چاندی کے موجودہ نصاب کی واضح معلومات۔",
        },
        {
          title: "اثاثوں کے لیے آسان فارم",
          desc: "نقد رقم، قیمتی دھاتیں، تجارتی مال اور سرمایہ کاری آسانی سے شامل کریں۔",
        },
        {
          title: "واجبات کی واضح تفریق",
          desc: "معیاری اصولوں کے مطابق قابل وضع قلیل المدتی قرضے درج کریں۔",
        },
        {
          title: "شفاف حساب کتاب",
          desc: "حتمی زکوٰۃ کی رقم کا تفصیلی اور واضح ریاضیاتی جائزہ دیکھیں۔",
        },
        {
          title: "پی ڈی ایف سمری ڈاؤن لوڈ",
          desc: "اپنے ریکارڈ کے لیے زکوٰۃ کی مکمل رپورٹ ڈاؤن لوڈ کریں۔",
        },
        {
          title: "اے آئی اسسٹنٹ",
          desc: "کیلکولیٹر کے استعمال اور عام سوالات کے فوری جوابات حاصل کریں۔",
        },
      ],
    },
    features: {
      title: "منظور شدہ خصوصیات اور فیچرز",
      subtitle: "درست اور پرائیویسی پر مبنی حساب کے لیے تمام ضروری سہولیات۔",
      items: [
        { title: "نصاب کی رہنمائی", desc: "سونے اور چاندی کے نصاب کی واضح تفصیل۔" },
        { title: "نقد رقم اور بچت", desc: "بینک اور نقد رقم کا آسان حساب۔" },
        { title: "سونے کا حساب", desc: "وزن اور مارکیٹ کی قیمت کے مطابق درج کریں۔" },
        { title: "چاندی کا حساب", desc: "چاندی کی مقدار اور موجودہ ریٹ پر مبنی۔" },
        { title: "سرمایہ کاری", desc: "شیئرز اور سرمایہ کاری کے لیے گائیڈ۔" },
        { title: "تجارتی اثاثے", desc: "کاروباری مالِ تجارت کی درج بندی۔" },
        { title: "قابلِ وصول رقم", desc: "واپس ملنے والے قرضوں کی گنجائش۔" },
        { title: "واجبات کی کٹوتی", desc: "فوری اور جائز قرضوں کی وضع۔" },
        { title: "درست کیلکولیشن انجن", desc: "2.5 فیصد کی بنیاد پر ریاضیاتی حساب۔" },
        { title: "تفصیلی نتائج", desc: "اثاثوں، واجبات اور زکوٰۃ کا مکمل بریک ڈاؤن۔" },
        { title: "لائیو میٹل پرائس API", desc: "سرور سے سونے چاندی کے تازہ ترین ریٹ۔" },
        { title: "اے آئی زکوٰۃ اسسٹنٹ", desc: "رہنمائی اور سوالات کے جوابات کے لیے چیٹ بوٹ۔" },
        { title: "پی ڈی ایف رپورٹ ڈاؤن لوڈ", desc: "حساب کے بعد پرنٹ یا ڈاؤن لوڈ کے لیے فائل۔" },
        { title: "انگریزی اور اردو سپورٹ", desc: "مکمل LTR اور RTL لے آؤٹ کے ساتھ دو زبانیں۔" },
        { title: "پرائیویسی کا تحفظ", desc: "بغیر لاگ ان، بغیر اکاؤنٹ اور بغیر ڈیٹا سیو کیے۔" },
      ],
    },
    howItWorks: {
      title: "زکوٰۃ کا حساب لگانے کے 4 آسان مراحل",
      subtitle: "ہمارے آسان مرحلہ وار عمل کو فالو کریں۔",
      steps: [
        {
          step: "۰۱",
          title: "اہلیت چیک کریں",
          desc: "نصاب کی معلومات دیکھیں اور معلوم کریں کہ کیا زکوٰۃ فرض ہے۔",
        },
        {
          step: "۰۲",
          title: "اثاثے شامل کریں",
          desc: "نقد رقم، سونا، چاندی اور سرمایہ کاری درج کریں۔",
        },
        {
          step: "۰۳",
          title: "واجبات درج کریں",
          desc: "جائز قلیل المدتی قرضے کٹوتی کے لیے درج کریں۔",
        },
        {
          step: "۰۴",
          title: "حتمی زکوٰۃ دیکھیں",
          desc: "تفصیلی بریک ڈاؤن دیکھیں اور پی ڈی ایف رپورٹ حاصل کریں۔",
        },
      ],
    },
    privacy: {
      title: "پرائیویسی اور ڈیٹا کا تحفظ",
      subtitle: "آپ کا مالیاتی ڈیٹا مکمل طور پر محفوظ اور پرائیویٹ رہتا ہے۔",
      points: [
        {
          title: "کوئی اکاؤنٹ یا رجسٹریشن نہیں",
          desc: "آپ بغیر کسی لاگ ان یا ذاتی معلومات کے کیلکولیٹر استعمال کر سکتے ہیں۔",
        },
        {
          title: "ڈیٹا مستقل محفوظ نہیں ہوتا",
          desc: "آپ کا مالیاتی ڈیٹا صرف سیشن کے دوران رہتا ہے اور ڈیٹا بیس میں سیو نہیں ہوتا۔",
        },
        {
          title: "کوئی ہسٹری یا پروفائل نہیں",
          desc: "ایپلی کیشن میں حساب کی پرانی ہسٹری یا پروفائل محفوظ نہیں کی جاتی۔",
        },
        {
          title: "محفوظ سرور روٹس",
          desc: "تمام بیرونی ریٹس سرور کے ذریعے محفوظ طریقے سے لائے جاتے ہیں۔",
        },
      ],
    },
    faqs: {
      title: "اکثر پوچھے جانے والے سوالات",
      subtitle: "نصاب، زکوٰۃ اور ایپ کے استعمال کے بارے میں عام سوالات۔",
      items: [
        {
          question: "نصاب کیا ہے؟",
          answer:
            "نصاب مال کی وہ کم از کم مقدار ہے جس پر سال گزرنے کے بعد زکوٰۃ فرض ہوتی ہے۔ یہ 87.48 گرام سونا یا 612.36 گرام چاندی کے برابر ہوتا ہے۔ (Requires Methodology Confirmation).",
        },
        {
          question: "کون سے اثاثے حساب میں شامل ہو سکتے ہیں؟",
          answer:
            "نقد رقم، بینک میں رقم، سونا، چاندی، مالِ تجارت، شیئرز اور قابلِ وصول قرضے شامل ہیں۔",
        },
        {
          question: "منہا ہونے والے واجبات سے کیا مراد ہے؟",
          answer:
            "فوری یا قلیل المدتی قرضے جو ایک سال کے اندر واجب الادا ہوں، زکوٰۃ کے حساب سے وضع کیے جا سکتے ہیں۔ (Requires Methodology Confirmation).",
        },
        {
          question: "زکوٰۃ کمپینین کیلکولیٹر کیسے کام کرتا ہے؟",
          answer:
            "کیلکولیٹر آپ کے کل اثاثوں میں سے جائز واجبات منفی کر کے خالص رقم کا 2.5 فیصد حساب لگاتا ہے۔",
        },
        {
          question: "سونے اور چاندی کی قیمتیں کیسے حاصل کی جاتی ہیں؟",
          answer:
            "قیمتیں سرور کے ذریعے لائیو میٹل API سے تازہ ترین ریٹ کی بنیاد پر حاصل کی جاتی ہیں۔",
        },
        {
          question: "کیا میرا ڈیٹا محفوظ ہوتا ہے؟",
          answer:
            "جی نہیں، زکوٰۃ کمپینین بغیر لاگ ان اور بغیر ڈیٹا بیس کے کام کرتا ہے۔ ڈیٹا مستقل طور پر سیو نہیں ہوتا۔",
        },
      ],
    },
    finalCta: {
      heading: "کیا آپ زکوٰۃ کا حساب لگانے کے لیے تیار ہیں؟",
      subheading:
        "مکمل شفافیت اور پرائیویسی کے ساتھ آسانی سے اپنی زکوٰۃ کا اندازہ لگائیں۔",
      ctaButton: "زکوٰۃ کا حساب لگائیں",
    },
    footer: {
      rights: "© 2026 زکوٰۃ کمپینین۔ جملہ حقوق محفوظ ہیں۔",
      disclaimer:
        "تنبیہ: زکوٰۃ کمپینین معیاری اصولوں کی بنیاد پر حساب کی رہنمائی فراہم کرتا ہے۔ پیچیدہ دینی مسائل کے لیے مستند علماء سے رجوع کریں۔",
      notice: "ریسپانسیو ویب ایپلی کیشن — ایم وی پی ایڈیشن",
    },
    calculator: {
      steps: {
        eligibility: "اہلیت",
        assets: "اثاثے",
        liabilities: "واجبات",
        review: "جائزہ",
        result: "نتیجہ",
      },
      eligibility: {
        title: "اپنی زکوٰۃ کی اہلیت چیک کریں",
        subtitle: "نصاب کے معیار کو سمجھیں اور معلوم کریں کہ کیا آپ پر زکوٰۃ واجب ہے۔",
        nisabExplanation:
          "نصاب مال کی وہ کم از کم مقدار ہے جو زکوٰۃ کے فرض ہونے کے لیے ضروری ہے۔ اگر آپ کا قابلِ زکوٰۃ مال ایک سال تک نصاب کے برابر یا اس سے زیادہ رہے تو 2.5% زکوٰۃ واجب ہے۔",
        goldCardTitle: "سونے کا نصاب معیار",
        goldCardDesc: "87.48 گرام (تقریباً 7.5 تولے) خالص سونے کے برابر۔",
        silverCardTitle: "چاندی کا نصاب معیار",
        silverCardDesc: "612.36 گرام (تقریباً 52.5 تولے) خالص چاندی کے برابر۔",
        fetchingPrices: "سونے اور چاندی کی تازہ قیمتیں حاصل کی جا رہی ہیں...",
        priceApiError: "سونے اور چاندی کی لائیو قیمتیں حاصل کرنے میں ناکامی ہوئی۔ براہ کرم دوبارہ کوشش کریں۔",
        retryBtn: "قیمتیں دوبارہ حاصل کریں",
        goldPriceLabel: "سونے کی موجودہ قیمت",
        silverPriceLabel: "چاندی کی موجودہ قیمت",
        lastUpdated: "تازہ ترین ریٹس موصول ہو گئے",
        methodologyNotice: "Requires Methodology Confirmation — حتمی دھات کا انتخاب اور قیمت کی بنیاد منظور شدہ اصولوں پر مبنی ہوگی۔",
        continueBtn: "اثاثوں کی طرف بڑھیں",
        backBtn: "ہوم پیج پر واپس جائیں",
      },
      assets: {
        title: "آئیے آپ کے اثاثے شامل کریں",
        subtitle: "کٹیگریز کا انتخاب کریں اور اپنے تمام قابلِ زکوٰۃ مال کی مالیت درج کریں۔",
        totalAssetsLabel: "موجودہ کل اثاثے",
        continueToLiabilitiesBtn: "واجبات کی طرف بڑھیں",
        categories: {
          cashSavings: {
            name: "نقد رقم اور بچت",
            desc: "نقد رقم، بینک میں بچت اور فوری رقم۔",
          },
          gold: {
            name: "سونے کے اثاثے",
            desc: "سونے کے زیورات، سکے اور بسکٹ۔",
          },
          silver: {
            name: "چاندی کے اثاثے",
            desc: "چاندی کے زیورات، سکے اور بسکٹ۔",
          },
          investments: {
            name: "سرمایہ کاری",
            desc: "شیئرز، سٹاکس اور میوچل فنڈز۔",
          },
          businessAssets: {
            name: "کاروباری اثاثے",
            desc: "مالِ تجارت اور کاروباری نقد رقم۔",
          },
          receivables: {
            name: "قابلِ وصول رقم",
            desc: "واپس ملنے والے جائز قرضے۔",
          },
        },
      },
      forms: {
        backToAssets: "اثاثوں کے صفحہ پر واپس",
        saveAndReturn: "محفوظ کریں اور اثاثوں پر واپس جائیں",
        cashSavings: {
          title: "نقد رقم اور بچت کی تفصیلات",
          subtitle: "اپنی موجودہ نقد رقم درج کریں۔",
          cashInHandLabel: "موجودہ نقد رقم",
          bankSavingsLabel: "بینک میں رقم / بچت",
          otherCashLabel: "دیگر نقد رقم / غیر ملکی کرنسی",
        },
        gold: {
          title: "سونے کے اثاثوں کی تفصیلات",
          subtitle: "سونے کا وزن اور تخمینی مالیت درج کریں۔",
          weightLabel: "سونے کا وزن (گرام)",
          purityLabel: "قیراط / خالص پن",
          estimatedValueLabel: "تخمینی کل مالیت",
          liveRateLabel: "مارکیٹ کا موجودہ ریٹ",
          pricePlaceholder: "سونے کا لائیو ریٹ یہاں فراہم کیا جائے گا۔",
          methodologyNotice: "Requires Methodology Confirmation — سونے کی مالیت کا معیار منظور شدہ اصولوں پر مبنی ہوگا۔",
        },
        silver: {
          title: "چاندی کے اثاثوں کی تفصیلات",
          subtitle: "چاندی کا وزن اور تخمینی مالیت درج کریں۔",
          weightLabel: "چاندی کا وزن (گرام)",
          purityLabel: "قیراط / خالص پن",
          estimatedValueLabel: "تخمینی کل مالیت",
          liveRateLabel: "مارکیٹ کا موجودہ ریٹ",
          pricePlaceholder: "چاندی کا لائیو ریٹ یہاں فراہم کیا جائے گا۔",
          methodologyNotice: "Requires Methodology Confirmation — چاندی کی مالیت کا معیار منظور شدہ اصولوں پر مبنی ہوگا۔",
        },
        investments: {
          title: "سرمایہ کاری کی تفصیلات",
          subtitle: "شیئرز اور سٹاکس کی مالیت درج کریں۔",
          stocksLabel: "شیئرز اور سٹاکس کی مالیت",
          mutualFundsLabel: "میوچل فنڈز اور بانڈز",
          otherInvestmentsLabel: "دیگر قابلِ زکوٰۃ سرمایہ کاری",
        },
        businessAssets: {
          title: "کاروباری اثاثوں کی تفصیلات",
          subtitle: "تجارتی مال اور کاروباری نقد رقم درج کریں۔",
          tradeStockLabel: "تجارتی مالِ فروخت",
          cashReservesLabel: "کاروباری نقد رقم",
        },
        receivables: {
          title: "قابلِ وصول رقم کی تفصیلات",
          subtitle: "واپس ملنے والے قرضے درج کریں۔",
          expectedRepaymentsLabel: "قابلِ وصول رقم / قرضے",
        },
      },
      liabilities: {
        title: "کیا آپ پر کوئی واجبات ہیں؟",
        subtitle: "منہا ہونے والے قلیل المدتی قرضے اور اخراجات درج کریں۔",
        shortTermDebtsLabel: "ایک سال کے اندر واجب الادا قرضے",
        immediateExpensesLabel: "فوری ضروری اخراجات",
        totalLiabilitiesLabel: "کل قابلِ کٹوتی واجبات",
        methodologyNotice: "Requires Methodology Confirmation — واجبات کی کٹوتی کے اصول منظور شدہ ہونا ضروری ہیں۔",
        continueToReviewBtn: "جائزہ کی طرف بڑھیں",
        backBtn: "اثاثوں پر واپس",
      },
      review: {
        title: "معلومات کا جائزہ لیں",
        subtitle: "زکوٰۃ کا حساب لگانے سے پہلے درج کردہ تفصیلات دیکھیں۔",
        totalAssetsLabel: "کل اثاثے",
        totalLiabilitiesLabel: "کل واجبات",
        netZakatableLabel: "خالص قابلِ زکوٰۃ مالیت",
        calculateZakatBtn: "زکوٰۃ کا حساب لگائیں",
        placeholderNotice: "حساب کا واقعی عمل اگلے زکوٰۃ کیلکولیشن انجن فیز میں ہوگا۔",
        editBtn: "ترمیم",
        backBtn: "واجبات پر واپس",
      },
      result: {
        title: "زکوٰۃ کا نتیجہ",
        subtitle: "آپ کی زکوٰۃ کی تفصیل کا جائزہ۔",
        statusBadge: "Phase 4 UI Preview",
        payablePlaceholderLabel: "قابلِ ادا زکوٰۃ (پینڈنگ انجن)",
        breakdownTitle: "تفصیلی جائزہ",
        pdfDisabledBtn: "پی ڈی ایف رپورٹ ڈاؤن لوڈ (فیز ۱۰)",
        startNewBtn: "نیا حساب شروع کریں",
        placeholderNotice: "زکوٰۃ کیلکولیشن انجن اگلے ڈیولپمنٹ فیز (Phase 5) میں منسلک ہوگا۔",
      },
    },
    chatbot: {
      floatingBtn: "زکوٰۃ AI اسسٹنٹ سے پوچھیں",
      title: "زکوٰۃ AI اسسٹنٹ",
      subtitle: "زکوٰۃ کے مفاہیم، نصاب، یا ایپ کے استعمال سے متعلق سوالات پوچھیں۔",
      placeholder: "اپنا زکوٰۃ سے متعلق سوال یہاں درج کریں...",
      sendBtn: "ارسال کریں",
      suggestedTitle: "تجویز کردہ سوالات:",
      suggestedQuestions: [
        "نصاب کیا ہے؟",
        "کیا سونا زکوٰۃ میں شامل ہوتا ہے؟",
        "واجبات سے کیا مراد ہے؟",
        "میں زکوٰۃ کیلکولیٹر کیسے استعمال کروں؟",
      ],
      welcomeMessage: "السلام علیکم! میں زکوٰۃ کمپینین کا AI اسسٹنٹ ہوں۔ آج میں زکوٰۃ کے مفاہیم سمجھنے میں آپ کی کیا مدد کر سکتا ہوں؟",
      errorMessage: "معذرت، میں اس وقت جواب دینے سے قاصر ہوں۔ براہ کرم بعد میں دوبارہ کوشش کریں۔",
      retryBtn: "دوبارہ کوشش کریں",
      thinking: "جواب تیار کیا جا رہا ہے...",
      clearChat: "گفتگو صاف کریں",
    },
    validation: {
      emptyInput: "براہ کرم کوئی رقم درج کریں۔",
      invalidNumber: "براہ کرم ایک درست عدد درج کریں۔",
      negativeValue: "براہ کرم صفر یا اس سے زیادہ کی رقم درج کریں۔",
      excessiveValue: "رقم بہت بڑی ہے۔ براہ کرم مناسب رقم درج کریں۔",
      reviewStateCorrupted: "آپ کی درج کردہ کچھ معلومات غیر درست ہیں۔ براہ کرم ان کا جائزہ لیں اور درست کریں۔",
      fixErrorsPrompt: "آگے بڑھنے سے پہلے درج ذیل کی نشاندہی شدہ غلطیاں درست کریں۔",
    },
  },
};
