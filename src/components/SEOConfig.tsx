import { useEffect } from "react";
import { ViewState } from "../types";

interface SEOConfigProps {
  view: ViewState;
  score?: number;
  cpu?: string;
  gpu?: string;
}

export default function SEOConfig({ view, score, cpu, gpu }: SEOConfigProps) {
  useEffect(() => {
    let title = "RateMyPC AI | Free AI-Powered PC Benchmark & Bottleneck Calculator";
    let description = "Input any CPU, GPU, and RAM setup to instantly get your PC gaming score, FPS estimates for top games, bottleneck analysis, and smart hardware upgrade priorities.";
    
    // Choose SEO details based on current tab view
    switch (view) {
      case "analyzer":
        title = "Analyze Your PC Hardware | RateMyPC AI Benchmarks";
        description = "Enter any combination of processor (CPU), graphics card (GPU), and memory (RAM) to check your gaming performance and identify hardware bottlenecks.";
        break;
      case "about":
        title = "About Our Hardware Evaluation | RateMyPC AI";
        description = "Discover the methodologies behind RateMyPC AI. Learn how we utilize advanced machine learning to estimate real-world gaming performance conservatively.";
        break;
      case "privacy":
        title = "Privacy Policy | RateMyPC AI Hardware Diagnostics";
        description = "Our privacy practices outline how we maintain user diagnostic parameters securely without collecting personal details. Clean, safe, and transparent.";
        break;
      case "terms":
        title = "Terms of Service | RateMyPC AI Benchmarking Rules";
        description = "Review the standard terms and guidelines for using the RateMyPC AI analysis tools, usage limits, and resource distribution limits.";
        break;
      case "cookies":
        title = "Cookie Policy | RateMyPC AI Local Persistence Settings";
        description = "Learn how we use light local storage and standard browser cookies to count daily rates and deliver high-performance gaming evaluations.";
        break;
      case "contact":
        title = "Contact Support & Inquiries | RateMyPC AI";
        description = "Get in touch with the RateMyPC AI hardware engineering and growth marketing teams for advertising, feedback, or hardware suggestions.";
        break;
      default:
        // Home view
        if (score && cpu && gpu) {
          title = `My RateMyPC AI Score: ${score}/100 | ${cpu} & ${gpu} Review`;
          description = `My PC build scored ${score}/100 on RateMyPC AI. Check out the complete gaming FPS estimates, bottleneck indicators, and recommended hardware upgrades!`;
        }
        break;
    }

    // Set document title
    document.title = title;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    // Update or create Open Graph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute("content", title);

    // Update or create Open Graph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement("meta");
      ogDesc.setAttribute("property", "og:description");
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute("content", description);

    // Update Twitter Cards
    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (!twitterTitle) {
      twitterTitle = document.createElement("meta");
      twitterTitle.setAttribute("name", "twitter:title");
      document.head.appendChild(twitterTitle);
    }
    twitterTitle.setAttribute("content", title);

    let twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (!twitterDesc) {
      twitterDesc = document.createElement("meta");
      twitterDesc.setAttribute("name", "twitter:description");
      document.head.appendChild(twitterDesc);
    }
    twitterDesc.setAttribute("content", description);

    // Inject Structured Data (JSON-LD)
    const existingScript = document.getElementById("structured-data-jsonld");
    if (existingScript) {
      existingScript.remove();
    }

    // Prepare JSON-LD schemas
    const schemas: any[] = [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "RateMyPC AI",
        "url": window.location.origin,
        "logo": `${window.location.origin}/logo.png`,
        "description": "AI-powered PC hardware analyzer providing benchmark scores, bottlenecks, and upgrade insights.",
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer support",
          "email": "support@ratemypc.ai"
        }
      }
    ];

    if (view === "home") {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does RateMyPC AI calculate scores and FPS?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our hardware benchmark model calculates values utilizing detailed hardware architectures, clock speed, core counts, and standard historical hardware benchmarks. These estimates are generated conservatively to match real-world sustained performance rather than peak theoretical numbers."
            }
          },
          {
            "@type": "Question",
            "name": "What is considered a bottleneck?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A bottleneck occurs when one component (often the CPU or GPU) limits the overall gaming performance, preventing other components from working at full capacity. We analyze your CPU/GPU parity to identify where performance is being throttled."
            }
          },
          {
            "@type": "Question",
            "name": "Is RateMyPC AI free to use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! RateMyPC AI is completely free to use, with a reasonable daily limit of 3 comprehensive hardware analyses to protect API server resources."
            }
          }
        ]
      });
    }

    const script = document.createElement("script");
    script.id = "structured-data-jsonld";
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(schemas);
    document.head.appendChild(script);

    return () => {
      // Cleanup script when view changes
      const cleanupScript = document.getElementById("structured-data-jsonld");
      if (cleanupScript) {
        cleanupScript.remove();
      }
    };
  }, [view, score, cpu, gpu]);

  return null;
}
