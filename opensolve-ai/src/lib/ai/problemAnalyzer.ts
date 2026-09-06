import { GoogleGenAI } from "@google/genai";
import { ProblemInput, ProblemAnalysis } from "../types";

export function buildAnalysisPrompt(problem: ProblemInput): string {
  const locationLine = problem.location
    ? `Location: ${problem.location}`
    : "Location: Not specified";

  return `You are an AI problem analyst for an open innovation platform called OpenSolve AI.

Analyze the following real-world problem and produce a structured analysis.

Problem Title: ${problem.title}
Description: ${problem.description}
Category: ${problem.category}
${locationLine}
Who is affected: ${problem.affectedUsers}
Urgency: ${problem.urgency}

Your task is to analyze the PROBLEM ONLY. Do NOT generate solutions or proposals.

Return ONLY a valid JSON object (no markdown, no code fences, no extra text) with exactly these fields:
{
  "summary": "A concise 1-2 sentence summary of the problem",
  "rootCauses": ["cause1", "cause2", ...],
  "affectedUsers": ["user1", "user2", ...],
  "keyChallenges": ["challenge1", "challenge2", ...],
  "requiredResources": ["resource1", "resource2", ...],
  "relevantTechnologies": ["tech1", "tech2", ...],
  "requiredSkills": ["skill1", "skill2", ...],
  "potentialSolutionAreas": ["area1", "area2", ...]
}

Rules:
- Return 3-6 items in each array.
- Be specific and practical.
- "potentialSolutionAreas" should describe broad directions, not complete solutions.
- Return ONLY the JSON object. No other text.`;
}

export function cleanJsonResponse(text: string): string {
  let cleaned = text.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.slice(7);
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.slice(3);
  }
  if (cleaned.endsWith("```")) {
    cleaned = cleaned.slice(0, -3);
  }
  return cleaned.trim();
}

export function validateAnalysis(
  data: Record<string, unknown>
): ProblemAnalysis {
  const requiredFields = [
    "summary",
    "rootCauses",
    "affectedUsers",
    "keyChallenges",
    "requiredResources",
    "relevantTechnologies",
    "requiredSkills",
    "potentialSolutionAreas",
  ];

  for (const field of requiredFields) {
    if (!data[field]) {
      throw new Error(`Invalid AI response: missing field "${field}"`);
    }
    if (field !== "summary" && !Array.isArray(data[field])) {
      throw new Error(`Invalid AI response: "${field}" must be an array`);
    }
  }

  if (typeof data.summary !== "string") {
    throw new Error("Invalid AI response: summary must be a string");
  }

  return data as unknown as ProblemAnalysis;
}

function extractGeminiError(err: unknown): string {
  if (err instanceof Error) {
    const msg = err.message;
    try {
      const parsed = JSON.parse(msg);
      if (parsed?.error?.message) {
        const geminiMsg: string = parsed.error.message;
        if (geminiMsg.includes("429") || geminiMsg.includes("RESOURCE_EXHAUSTED")) {
          return "AI service rate limit exceeded. Please try again in a moment.";
        }
        return geminiMsg.slice(0, 200);
      }
    } catch {
      // not JSON, use raw message
    }
    if (msg.includes("429") || msg.includes("RESOURCE_EXHAUSTED")) {
      return "AI service rate limit exceeded. Please try again in a moment.";
    }
    return msg.slice(0, 200);
  }
  return "Unable to analyze the problem.";
}

export async function callAnalysisAPI(
  problem: ProblemInput
): Promise<ProblemAnalysis> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "AI service not configured. Please set GEMINI_API_KEY in .env.local"
    );
  }

  const ai = new GoogleGenAI({ apiKey });

  const systemInstruction =
    "You are an expert problem analyst. You always respond with valid JSON only. No extra text.";
  const userContent = buildAnalysisPrompt(problem);

  let response;
  try {
    response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: userContent }],
        },
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 1000,
        responseMimeType: "application/json",
      },
    });
  } catch (err) {
    throw new Error(extractGeminiError(err));
  }

  const content = response.text;

  if (!content) {
    throw new Error("AI returned an empty response");
  }

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(cleanJsonResponse(content));
  } catch {
    throw new Error("AI returned invalid JSON. Please try again.");
  }

  return validateAnalysis(parsed);
}
