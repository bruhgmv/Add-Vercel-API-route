import { useState, useEffect } from "react";
import { ViewState, HardwareInput, AnalysisResult, UsageLimit } from "./types";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import FAQ from "./components/FAQ";
import Analyzer from "./components/Analyzer";
import ResultsView from "./components/ResultsView";
import SEOConfig from "./components/SEOConfig";
import { AboutView, PrivacyView, TermsView, CookiesView, ContactView } from "./components/LegalPages";
import { motion, AnimatePresence } from "motion/react";

// Google Analytics placeholder tracker
function trackPageView(viewName: string) {
  console.log(`[Google Analytics Placeholder] Tracking view change: /${viewName}`);
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("config", "G-PLACEHOLDER", {
      page_path: `/${viewName}`
    });
  }
}

export default function App() {
  const [currentView, setView] = useState<ViewState>("home");
  const [activeSpecs, setActiveSpecs] = useState<HardwareInput | null>(null);
  const [activeResult, setActiveResult] = useState<AnalysisResult | null>(null);
  const [remainingAnalyses, setRemainingAnalyses] = useState(3);

  // Initialize and check usage limits on mount
  useEffect(() => {
    const limits = localStorage.getItem("ratemypc_usage_limits");
    const now = new Date();

    if (!limits) {
      // First time initialization
      const initialLimit: UsageLimit = {
        count: 3,
        lastReset: now.toISOString()
      };
      localStorage.setItem("ratemypc_usage_limits", JSON.stringify(initialLimit));
      setRemainingAnalyses(3);
    } else {
      try {
        const parsed: UsageLimit = JSON.parse(limits);
        const lastResetDate = new Date(parsed.lastReset);
        const hoursPassed = (now.getTime() - lastResetDate.getTime()) / (1000 * 60 * 60);

        if (hoursPassed >= 24) {
          // Reset limit since 24 hours have elapsed
          const resetLimit: UsageLimit = {
            count: 3,
            lastReset: now.toISOString()
          };
          localStorage.setItem("ratemypc_usage_limits", JSON.stringify(resetLimit));
          setRemainingAnalyses(3);
        } else {
          setRemainingAnalyses(parsed.count);
        }
      } catch (err) {
        console.error("Failed to parse local storage limits:", err);
        setRemainingAnalyses(3);
      }
    }
  }, [currentView]);

  // Track page views in analytics whenever currentView shifts
  useEffect(() => {
    trackPageView(currentView);
  }, [currentView]);

  const handleAnalysisSuccess = (specs: HardwareInput, results: AnalysisResult) => {
    setActiveSpecs(specs);
    setActiveResult(results);
    // Smooth transition into the results view state
    setView("analyzer");
  };

  const handleBackToScan = () => {
    setActiveResult(null);
    setActiveSpecs(null);
  };

  // Safe navigation wrapper
  const navigateTo = (view: ViewState) => {
    setView(view);
    // If navigating away from the analyzer, reset current results so they can run new ones later
    if (view !== "analyzer") {
      handleBackToScan();
    }
  };

  // Render the matching component view
  const renderViewContent = () => {
    switch (currentView) {
      case "analyzer":
        if (activeSpecs && activeResult) {
          return (
            <ResultsView
              specs={activeSpecs}
              results={activeResult}
              onBackClick={handleBackToScan}
            />
          );
        }
        return (
          <Analyzer
            onAnalysisSuccess={handleAnalysisSuccess}
            remainingAnalyses={remainingAnalyses}
            setRemainingAnalyses={setRemainingAnalyses}
          />
        );
      case "about":
        return <AboutView onCtaClick={() => navigateTo("analyzer")} />;
      case "privacy":
        return <PrivacyView />;
      case "terms":
        return <TermsView />;
      case "cookies":
        return <CookiesView />;
      case "contact":
        return <ContactView />;
      default:
        // Home landing page view
        return (
          <div key="home" className="space-y-4">
            <Hero
              onStartClick={() => navigateTo("analyzer")}
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
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#030303] text-white font-sans selection:bg-cyan-500 selection:text-black">
      {/* Dynamic SEO Injector */}
      <SEOConfig
        view={currentView}
        score={activeResult?.score}
        cpu={activeSpecs?.cpu}
        gpu={activeSpecs?.gpu}
      />

      {/* Global Navbar */}
      <Navbar
        currentView={currentView}
        setView={navigateTo}
        remainingAnalyses={remainingAnalyses}
      />

      {/* Main Content Area with Animated Layout Transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView + (activeResult ? "-results" : "-form")}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {renderViewContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer containing compliant links */}
      <Footer setView={navigateTo} />
    </div>
  );
}
