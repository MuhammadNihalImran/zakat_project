"use client";

import React, { createContext, useContext, useState } from "react";
import {
  CalculatorState,
  initialCalculatorState,
  NisabStandard,
  CashSavingsData,
  GoldData,
  SilverData,
  InvestmentsData,
  BusinessAssetsData,
  ReceivablesData,
  LiabilitiesData,
} from "@/types/calculator";

interface CalculatorContextType {
  state: CalculatorState;
  setNisabStandard: (standard: NisabStandard) => void;
  updateCashSavings: (data: Partial<CashSavingsData>) => void;
  updateGold: (data: Partial<GoldData>) => void;
  updateSilver: (data: Partial<SilverData>) => void;
  updateInvestments: (data: Partial<InvestmentsData>) => void;
  updateBusinessAssets: (data: Partial<BusinessAssetsData>) => void;
  updateReceivables: (data: Partial<ReceivablesData>) => void;
  updateLiabilities: (data: Partial<LiabilitiesData>) => void;
  resetCalculator: () => void;

  // Helper getters for entered totals
  getCashSavingsTotal: () => number;
  getGoldTotal: () => number;
  getSilverTotal: () => number;
  getInvestmentsTotal: () => number;
  getBusinessAssetsTotal: () => number;
  getReceivablesTotal: () => number;
  getTotalAssets: () => number;
  getLiabilitiesTotal: () => number;
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(
  undefined
);

const parseNum = (val: string): number => {
  const parsed = parseFloat(val);
  return isNaN(parsed) || parsed < 0 ? 0 : parsed;
};

export const CalculatorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<CalculatorState>(initialCalculatorState);

  const setNisabStandard = (standard: NisabStandard) => {
    setState((prev) => ({ ...prev, nisabStandard: standard }));
  };

  const updateCashSavings = (data: Partial<CashSavingsData>) => {
    setState((prev) => ({
      ...prev,
      cashSavings: { ...prev.cashSavings, ...data },
    }));
  };

  const updateGold = (data: Partial<GoldData>) => {
    setState((prev) => ({
      ...prev,
      gold: { ...prev.gold, ...data },
    }));
  };

  const updateSilver = (data: Partial<SilverData>) => {
    setState((prev) => ({
      ...prev,
      silver: { ...prev.silver, ...data },
    }));
  };

  const updateInvestments = (data: Partial<InvestmentsData>) => {
    setState((prev) => ({
      ...prev,
      investments: { ...prev.investments, ...data },
    }));
  };

  const updateBusinessAssets = (data: Partial<BusinessAssetsData>) => {
    setState((prev) => ({
      ...prev,
      businessAssets: { ...prev.businessAssets, ...data },
    }));
  };

  const updateReceivables = (data: Partial<ReceivablesData>) => {
    setState((prev) => ({
      ...prev,
      receivables: { ...prev.receivables, ...data },
    }));
  };

  const updateLiabilities = (data: Partial<LiabilitiesData>) => {
    setState((prev) => ({
      ...prev,
      liabilities: { ...prev.liabilities, ...data },
    }));
  };

  const resetCalculator = () => {
    setState(initialCalculatorState);
  };

  const getCashSavingsTotal = (): number => {
    return (
      parseNum(state.cashSavings.cashInHand) +
      parseNum(state.cashSavings.bankSavings) +
      parseNum(state.cashSavings.otherCash)
    );
  };

  const getGoldTotal = (): number => {
    return parseNum(state.gold.estimatedValue);
  };

  const getSilverTotal = (): number => {
    return parseNum(state.silver.estimatedValue);
  };

  const getInvestmentsTotal = (): number => {
    return (
      parseNum(state.investments.stocks) +
      parseNum(state.investments.mutualFunds) +
      parseNum(state.investments.otherInvestments)
    );
  };

  const getBusinessAssetsTotal = (): number => {
    return (
      parseNum(state.businessAssets.tradeStock) +
      parseNum(state.businessAssets.cashReserves)
    );
  };

  const getReceivablesTotal = (): number => {
    return parseNum(state.receivables.expectedRepayments);
  };

  const getTotalAssets = (): number => {
    return (
      getCashSavingsTotal() +
      getGoldTotal() +
      getSilverTotal() +
      getInvestmentsTotal() +
      getBusinessAssetsTotal() +
      getReceivablesTotal()
    );
  };

  const getLiabilitiesTotal = (): number => {
    return (
      parseNum(state.liabilities.shortTermDebts) +
      parseNum(state.liabilities.immediateExpenses)
    );
  };

  return (
    <CalculatorContext.Provider
      value={{
        state,
        setNisabStandard,
        updateCashSavings,
        updateGold,
        updateSilver,
        updateInvestments,
        updateBusinessAssets,
        updateReceivables,
        updateLiabilities,
        resetCalculator,
        getCashSavingsTotal,
        getGoldTotal,
        getSilverTotal,
        getInvestmentsTotal,
        getBusinessAssetsTotal,
        getReceivablesTotal,
        getTotalAssets,
        getLiabilitiesTotal,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculator = (): CalculatorContextType => {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error("useCalculator must be used within a CalculatorProvider");
  }
  return context;
};
