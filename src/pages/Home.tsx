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

  // If scan is true in URL, and we have activeResult, render the results view
  if (isScanMode) {
    if (activeSpecs && activeResult) {
      return (
        <div className="w-full">
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
