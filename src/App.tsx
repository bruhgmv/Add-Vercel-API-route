import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, useSearchParams } from "react-router-dom";
import { ViewState, HardwareInput, AnalysisResult, UsageLimit } from "./types";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SEOConfig from "./components/SEOConfig";
import { motion, AnimatePresence } from "motion/react";

// Route pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import CookiePolicy from "./pages/CookiePolicy";

// Google Analytics page tracking helper
function trackPageView(viewName: string) {
  console.log(`[Google Analytics] Tracking page view: /${viewName}`);
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("config", "G-B4EY6D9XBG", {
      page_path: `/${viewName}`
    });
  }
}

// Scroll to top helper to simulate instant multi-page scroll resets
function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as any });
  }, [pathname, search]);

  return null;
}

// Helper to translate router paths to standard SEO view-state types
function getViewState(pathname: string, isScan: boolean): ViewState {
  if (pathname === "/about") return "about";
  if (pathname === "/contact") return "contact";
  if (pathname === "/privacy-policy") return "privacy";
  if (pathname === "/terms") return "terms";
  if (pathname === "/cookie-policy") return "cookies";
  if (pathname === "/") {
    return isScan ? "analyzer" : "home";
  }
  return "home";
}

function AppContent() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const isScan = searchParams.get("scan") === "true";

  const [activeSpecs, setActiveSpecs] = useState<HardwareInput | null>(null);
  const [activeResult, setActiveResult] = useState<AnalysisResult | null>(null);
  const [remainingAnalyses, setRemainingAnalyses] = useState(3);

  const viewState = getViewState(location.pathname, isScan);

  // Initialize and check usage limits on mount and route changes
  useEffect(() => {
    const limits = localStorage.getItem("ratemypc_usage_limits");
    const now = new Date();

    if (!limits) {
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
  }, [location.pathname, isScan]);

  // Track page views in analytics whenever viewState changes
  useEffect(() => {
    trackPageView(viewState);
  }, [viewState]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#030303] text-white font-sans selection:bg-cyan-500 selection:text-black">
      {/* Dynamic SEO Injector */}
      <SEOConfig
        view={viewState}
        score={activeResult?.score}
        cpu={activeSpecs?.cpu}
        gpu={activeSpecs?.gpu}
      />

      <ScrollToTop />

      {/* Global Navbar */}
      <Navbar remainingAnalyses={remainingAnalyses} />

      {/* Main Content Area with Animated Layout Transitions */}
      <main className="flex-grow flex flex-col justify-start">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname + (isScan ? "-scan" : "-main")}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex-grow flex flex-col justify-start"
          >
            <Routes location={location}>
              <Route
                path="/"
                element={
                  <Home
                    remainingAnalyses={remainingAnalyses}
                    setRemainingAnalyses={setRemainingAnalyses}
                    activeSpecs={activeSpecs}
                    setActiveSpecs={setActiveSpecs}
                    activeResult={activeResult}
                    setActiveResult={setActiveResult}
                  />
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer containing compliant links */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
