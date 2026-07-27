import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  app.use(express.json());
  const PORT = 3000;

  let aiClient: GoogleGenAI | null = null;
  function getAI(): GoogleGenAI {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY environment variable is missing.");
      }
      aiClient = new GoogleGenAI({ apiKey });
    }
    return aiClient;
  }

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "HUMAN Relationship Intelligence" });
  });

  // API Endpoint 1: The Correspondence - Message Tailoring Studio
  app.post("/api/tailor-correspondence", async (req, res) => {
    try {
      const { draft, intent, recipientContext } = req.body;
      if (!draft) {
        return res.status(400).json({ error: "Draft message is required." });
      }

      const prompt = `You are the AI Atelier Communications Master for 'HUMAN', a luxury relationship intelligence platform.
Your task is to refine and tailor a raw message draft into a thoughtful, clear, and dignified piece of correspondence.

Draft Message: "${draft}"
Desired Tone / Intent: "${intent || 'Balanced, empathetic, and clear'}"
Recipient Context: "${recipientContext || 'A meaningful connection on HUMAN'}"

Respond in clean valid JSON with the following structure:
{
  "tailoredMessage": "The refined, beautifully phrased final message",
  "keyShift": "One short sentence describing what was changed (e.g., 'Transmuted defensive tone into grounded clarity')",
  "emotionalNuance": "Brief breakdown of the psychological tone (e.g., 'Warmth (40%), Precision (40%), Vulnerability (20%)')",
  "atelierNote": "An insightful 1-2 sentence note explaining why this phrasing fosters deeper understanding."
}`;

      const ai = getAI();
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const text = response.text;
      const data = JSON.parse(text || "{}");
      return res.json(data);
    } catch (error: any) {
      console.error("Error in /api/tailor-correspondence:", error);
      return res.status(500).json({
        error: error.message || "Failed to tailor correspondence.",
        fallback: {
          tailoredMessage: req.body?.draft || "",
          keyShift: "Direct representation of initial draft.",
          emotionalNuance: "Authentic, Unfiltered",
          atelierNote: "Configured local fallback mode."
        }
      });
    }
  });

  // API Endpoint 2: Harmonic Alignment - Deep Compatibility & Relationship Dynamics
  app.post("/api/harmonic-alignment", async (req, res) => {
    try {
      const { charA, charB } = req.body;
      if (!charA || !charB) {
        return res.status(400).json({ error: "Both characters are required for alignment analysis." });
      }

      const prompt = `You are the AI Relationship Intelligence Engine for 'HUMAN'.
Perform a deep, haute-couture level compatibility analysis between two individuals.

Person A:
Name: ${charA.name}
Role: ${charA.role}
Core Values: ${charA.values?.join(", ")}
Communication Style: ${charA.communicationStyle}
Archetype Description: ${charA.provenance}

Person B:
Name: ${charB.name}
Role: ${charB.role}
Core Values: ${charB.values?.join(", ")}
Communication Style: ${charB.communicationStyle}
Archetype Description: ${charB.provenance}

Provide an analysis in valid JSON with this exact structure:
{
  "alignmentTitle": "A poetic 3-5 word title for their resonance (e.g., 'Resonance of Structure & Grace')",
  "harmonyScore": 88,
  "coreResonance": "A 2-3 sentence analysis of how their fundamental values and approaches complement each other.",
  "creativeTension": "A 2-3 sentence exploration of where healthy friction or growth opportunities lie.",
  "conversationStarters": [
    "A deep, compelling open question tailored for their first conversation",
    "Another thought-provoking invitation for shared exploration"
  ],
  "materialAnalogy": "A physical imagery comparison (e.g., 'Like carved alabaster supporting woven golden silk, structure gives freedom to form.')"
}`;

      const ai = getAI();
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const data = JSON.parse(response.text || "{}");
      return res.json(data);
    } catch (error: any) {
      console.error("Error in /api/harmonic-alignment:", error);
      return res.status(500).json({
        error: error.message || "Failed to compute harmonic alignment.",
      });
    }
  });

  // API Endpoint 3: Curate Experience - Date & Atmosphere Visualizer
  app.post("/api/curate-experience", async (req, res) => {
    try {
      const { location, mood, mutualInterests } = req.body;

      const prompt = `You are the Haute Couture Experience Curator for 'HUMAN'.
Curate an extraordinary, intimate date experience based on the following parameters:

Location/City: ${location || 'Florence'}
Desired Mood: ${mood || 'Atmospheric & Intellectual'}
Mutual Interests: ${mutualInterests || 'Architecture, Philosophy, Fine Wine'}

Respond in valid JSON with this exact format:
{
  "experienceTitle": "An evocative 3-5 word title (e.g., 'Twilight Reverie at the Medici Observatory')",
  "settingDescription": "A rich 2-3 sentence sensory description of the environment, lighting, and mood.",
  "curatedProgression": [
    { "phase": "Arrival", "detail": "Description of the initial entry and atmosphere" },
    { "phase": "The Core Interaction", "detail": "Description of the main shared activity or private view" },
    { "phase": "The Reflection", "detail": "Description of the late-night quiet moment" }
  ],
  "sensoryPalette": ["Warm Travertine", "Aged Amber", "Quiet Cello", "Smoked Oak"],
  "signaturePrompt": "An intriguing, unpretentious conversation invitation for the evening."
}`;

      const ai = getAI();
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const data = JSON.parse(response.text || "{}");
      return res.json(data);
    } catch (error: any) {
      console.error("Error in /api/curate-experience:", error);
      return res.status(500).json({
        error: error.message || "Failed to curate experience.",
      });
    }
  });

  // Vite middleware for dev or static server for prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`HUMAN flagship server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
