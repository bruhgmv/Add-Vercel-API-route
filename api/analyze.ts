import { ReactNode } from "react";

// Helper to extract JSON from markdown if present
function cleanJsonResponse(text: string): string {
  let cleaned = text.trim();
  
  // Strip Markdown code blocks
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

    const systemPrompt = `You are RateMyPC AI.
You are a professional PC hardware benchmark analyst.
Analyze the provided PC build.
Return ONLY valid JSON.

{
  "score": 0,
  "tier": "",
  "valorant_fps": 0,
  "fortnite_fps": 0,
  "minecraft_fps": 0,
  "gta5_fps": 0,
  "cyberpunk_fps": 0,
  "bottleneck": "",
  "upgrade_priority": "",
  "summary": ""
}

Rules:
- Use realistic estimates.
- Be conservative.
- Never exaggerate performance.
- Handle old hardware.
- Handle unknown hardware.
- Return only JSON.`;

    const userMessage = `Please analyze this PC build:
CPU: ${cpu}
GPU: ${gpu}
RAM: ${ram}`;

    console.log("Sending analysis request to OpenCode API for:", { cpu, gpu, ram });

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
      console.error("OpenCode API error response:", errorText);
      return res.status(response.status).json({
        error: `API returned an error code: ${response.status}. Please check your credentials.`
      });
    }

    const responseData = await response.json();
    const rawContent = responseData.choices?.[0]?.message?.content;

    if (!rawContent) {
      throw new Error("Empty response content from OpenCode API.");
    }

    const cleanedContent = cleanJsonResponse(rawContent);
    try {
      const parsedData = JSON.parse(cleanedContent);
      return res.status(200).json(parsedData);
    } catch (parseError) {
      console.error("Failed to parse JSON content from LLM response:", rawContent);
      return res.status(500).json({
        error: "AI returned invalid JSON format. Please try again.",
        rawContent
      });
    }
  } catch (error: any) {
    console.error("Analysis route error:", error);
    return res.status(500).json({
      error: error.message || "An unexpected error occurred while analyzing the system."
    });
  }
}
