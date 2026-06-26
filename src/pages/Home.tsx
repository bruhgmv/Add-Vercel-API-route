import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { HardwareInput, AnalysisResult, UsageLimit } from "../types";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import FAQ from "../components/FAQ";
import Analyzer from "../components/Analyzer";
import ResultsView from "../components/ResultsView";

interface HomeProps {
  remainingAnalyses: number;
  setRemainingAnalyses: React.Dispatch<React.SetStateAction<number>>;
  activeSpecs: HardwareInput | null;
  setActiveSpecs: React.Dispatch<React.SetStateAction<HardwareInput | null>>;
  activeResult: AnalysisResult | null;
  setActiveResult: React.Dispatch<React.SetStateAction<AnalysisResult | null>>;
}

export default function Home({
  remainingAnalyses,
  setRemainingAnalyses,
  activeSpecs,
  setActiveSpecs,
  activeResult,
  setActiveResult
}: HomeProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const isScanMode = searchParams.get("scan") === "true";

  const handleAnalysisSuccess = (specs: HardwareInput, results: AnalysisResult) => {
    setActiveSpecs(specs);
    setActiveResult(results);
  };

  const handleBackToScan = () => {
    setActiveResult(null);
    setActiveSpecs(null);
  };

  const startAnalyzing = () => {
    setSearchParams({ scan: "true" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isAdmin = localStorage.getItem("admin") === "true";

  const adminBanner = isAdmin && (
    <div className="w-full max-w-7xl mx-auto px-4 pt-4">
      <div className="bg-gradient-to-r from-cyan-950/50 via-cyan-900/20 to-cyan-950/50 border border-cyan-500/30 rounded-xl py-2.5 px-4 flex items-center justify-between text-cyan-400 text-xs font-mono shadow-[0_0_15px_rgba(6,182,212,0.1)]">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span>Admin Mode Enabled</span>
        </div>
        <button 
          onClick={() => {
            localStorage.removeItem("admin");
            window.location.reload();
          }}
          className="text-[10px] uppercase tracking-wider bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-white rounded px-2.5 py-1 transition-all cursor-pointer"
        >
          Disable
        </button>
      </div>
    </div>
  );

  // If scan is true in URL, and we have activeResult, render the results view
  if (isScanMode) {
    if (activeSpecs && activeResult) {
      return (
        <div className="w-full">
          {adminBanner}
          <ResultsView
            specs={activeSpecs}
            results={activeResult}
            onBackClick={handleBackToScan}
          />
        </div>
      );
    }
    return (
      <div className="w-full py-8">
        {adminBanner}
        <Analyzer
          onAnalysisSuccess={handleAnalysisSuccess}
          remainingAnalyses={remainingAnalyses}
          setRemainingAnalyses={setRemainingAnalyses}
        />
      </div>
    );
  }

  // Otherwise, render the classic feature-rich landing page
  return (
    <div className="space-y-4 w-full">
      {adminBanner}
      <Hero
        onStartClick={startAnalyzing}
        onLearnMoreClick={() => {
          const featuresEl = document.getElementById("features");
          if (featuresEl) {
            featuresEl.scrollIntoView({ behavior: "smooth" });
          }
        }}
      />
      <Features />
      <HowItWorks />
      <FAQ />
    </div>
  );
}
