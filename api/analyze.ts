// Helper to extract JSON from markdown if present
function cleanJsonResponse(text: string): string {
  let cleaned = text.trim();
  
  // Strip Markdown code blocks if any
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.substring(7);
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.substring(3);
  }
  if (cleaned.endsWith("```")) {
    cleaned = cleaned.substring(0, cleaned.length - 3);
  }
  cleaned = cleaned.trim();

  // Find boundaries of actual JSON object
  const startIdx = cleaned.indexOf("{");
  const endIdx = cleaned.lastIndexOf("}");
  if (startIdx !== -1 && endIdx !== -1) {
    cleaned = cleaned.substring(startIdx, endIdx + 1);
  }
  return cleaned;
}

export default async function handler(req: any, res: any) {
  // Check request method
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { cpu, gpu, ram } = req.body || {};

    if (!cpu || !gpu || !ram) {
      return res.status(400).json({
        error: "Missing required fields: CPU, GPU, and RAM must be provided."
      });
    }

    const apiKey = process.env.OPENCODE_API_KEY;
    if (!apiKey) {
      console.warn("OPENCODE_API_KEY environment variable is not defined");
      return res.status(500).json({
        error: "API key is not configured. Please add OPENCODE_API_KEY to your Secrets panel or .env file."
      });
    }

    const systemPrompt = `You are RateMyPC AI, an elite hardware benchmark expert and PC hardware architect.
Analyze the provided hardware specs (CPU, GPU, RAM) and produce a detailed, premium diagnostic report.

You MUST respond with ONLY a single, valid JSON object following this EXACT schema:
{
  "score": 0,
  "tier": "",
  "performance": {
    "gaming": 0,
    "productivity": 0,
    "streaming": 0,
    "programming": 0,
    "video_editing": 0
  },
  "games": {
    "valorant": {
      "fps": 0,
      "preset": "",
      "rating": ""
    },
    "fortnite": {
      "fps": 0,
      "preset": "",
      "rating": ""
    },
    "minecraft": {
      "fps": 0,
      "preset": "",
      "rating": ""
    },
    "gta5": {
      "fps": 0,
      "preset": "",
      "rating": ""
    },
    "cyberpunk2077": {
      "fps": 0,
      "preset": "",
      "rating": ""
    }
  },
  "bottleneck": {
    "component": "",
    "severity": "",
    "reason": ""
  },
  "upgrade": {
    "component": "",
    "priority": "",
    "recommended_part": "",
    "expected_gain_percent": 0,
    "reason": ""
  },
  "summary": ""
}

Rules & Directives:
1. "score" must be an integer between 0 and 100 representing overall desktop/gaming performance.
2. "tier" must be one of: "Potato", "Budget", "Mid-Range", "High-End", "Enthusiast", "Ultimate".
3. "performance" sub-ratings must be integers between 0 and 100 for each workload.
4. "games" estimates: Use realistic, conservative 1080p gaming estimates.
   - For Cyberpunk 2077, target 1080p (High or Medium preset).
   - For Fortnite, Valorant, Minecraft, GTA V, use appropriate realistic presets (e.g. Competitive, High, Ultra) and conservative FPS counts.
   - Game rating must be "Excellent", "Great", "Playable", or "Poor".
5. "bottleneck": Determine the primary bottleneck component (CPU, GPU, RAM, or Balanced), specify "severity" (Low, Medium, High, Extreme, None), and provide a technical reason.
6. "upgrade": Recommend the most impactful hardware upgrade, set "priority" (Low, Medium, High, Critical, None), list a specific "recommended_part" (e.g., "Ryzen 7 5700X3D", "RTX 4060"), "expected_gain_percent" as integer, and a comprehensive explanation "reason".
7. Be highly expert and accurate regarding:
   - Desktop and Laptop variants of CPUs and GPUs (e.g., RTX 3060 Mobile vs Desktop).
   - Integrated graphics capabilities (e.g., Intel Iris Xe, AMD Radeon 780M, Intel HD Graphics).
   - Legacy, ancient, OEM, or rare configurations. If hardware is unknown, base estimates on the closest equivalent hardware class and mention it in the summary.
8. NEVER hallucinate impossible frames or exaggerate performance. Be realistic and conservative.
9. DO NOT include any markdown blocks (like \`\`\`json), comments, text prefix/suffix, or explanations in the response. Just pure, parsable JSON.`;

    const userMessage = `Please analyze this PC configuration:
CPU: ${cpu}
GPU: ${gpu}
RAM: ${ram}`;

    console.log("Requesting OpenCode DeepSeek analysis for configuration:", { cpu, gpu, ram });

    const response = await fetch("https://opencode.ai/zen/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-v4-flash-free",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage }
        ],
        temperature: 0.2
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenCode API error status:", response.status, "Body:", errorText);
      return res.status(response.status).json({
        error: `API backend error (Status ${response.status}). Please verify API key setup.`
      });
    }

    const responseData = await response.json();
    const rawContent = responseData.choices?.[0]?.message?.content;

    if (!rawContent) {
      throw new Error("No output was received from deepseek-v4-flash-free.");
    }

    const cleanedContent = cleanJsonResponse(rawContent);
    try {
      const parsedData = JSON.parse(cleanedContent);
      return res.status(200).json(parsedData);
    } catch (parseError) {
      console.error("Failed to parse raw content from LLM response:", rawContent);
      return res.status(500).json({
        error: "Hardware analysis output format was non-standard. Please try again.",
        rawContent
      });
    }
  } catch (error: any) {
    console.error("Backend exception during specs analysis:", error);
    return res.status(500).json({
      error: error.message || "An unexpected error occurred during PC benchmarking."
    });
  }
}
