import { GoogleGenAI } from "@google/genai";
import { ProblemInput, ProblemAnalysis, GeneratedSolution } from "./types";
import { cleanJsonResponse } from "./ai/problemAnalyzer";

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
  return "Unable to generate solution.";
}

const SOLUTION_PROMPT = (
  problem: ProblemInput,
  analysis: ProblemAnalysis
) => `You are an AI Open Innovation Solution Architect for a platform called OpenSolve AI.

Your task is to generate a practical, actionable solution based on the problem and its analysis. Do NOT simply repeat the analysis. Use the analysis to construct a realistic solution that addresses the root causes and challenges.

PROBLEM:
Title: ${problem.title}
Description: ${problem.description}
Category: ${problem.category}
Location: ${problem.location || "Not specified"}
Who is affected: ${problem.affectedUsers}
Urgency: ${problem.urgency}

PROBLEM ANALYSIS:
Summary: ${analysis.summary}
Root Causes: ${analysis.rootCauses.join(", ")}
Affected Users: ${analysis.affectedUsers.join(", ")}
Key Challenges: ${analysis.keyChallenges.join(", ")}
Required Resources: ${analysis.requiredResources.join(", ")}
Relevant Technologies: ${analysis.relevantTechnologies.join(", ")}
Required Skills: ${analysis.requiredSkills.join(", ")}
Potential Solution Areas: ${analysis.potentialSolutionAreas.join(", ")}

RULES:
- The solution must be realistic and implementable given the context.
- Do not propose technology simply for the sake of using technology.
- Consider the location, category, urgency, and affected users.
- Where appropriate, suggest using existing open-source technologies, public datasets, APIs, or community resources.
- Do NOT invent specific organizations, datasets, APIs, or experts.
- Suggest resource categories (e.g., "crop disease image datasets") rather than specific named resources.
- The solution should directly address the root causes and key challenges identified.

Return ONLY a valid JSON object (no markdown, no code fences, no extra text) with exactly these fields:
{
  "title": "A clear, descriptive title for the proposed solution",
  "overview": "A 2-4 sentence overview of the proposed solution",
  "problemAddressed": "A 1-2 sentence statement connecting the solution to the original problem",
  "whyItCouldWork": "A 2-3 sentence explanation of why this solution could succeed",
  "keyFeatures": ["feature1", "feature2", ...],
  "technologies": ["tech1", "tech2", ...],
  "requiredResources": ["resource1", "resource2", ...],
  "requiredSkills": ["skill1", "skill2", ...],
  "implementationSteps": ["step1", "step2", ...],
  "potentialChallenges": ["challenge1", "challenge2", ...],
  "nextSteps": ["step1", "step2", ...]
}

Rules for each field:
- "keyFeatures": 3-6 core features or capabilities of the solution
- "technologies": 3-6 relevant technologies (e.g., "Computer Vision", "Mobile Application")
- "requiredResources": 3-6 resource categories needed (e.g., "training datasets", "domain expertise")
- "requiredSkills": 3-6 skills needed to build this (e.g., "Machine Learning", "Mobile Development")
- "implementationSteps": 4-6 concrete steps to implement the solution
- "potentialChallenges": 3-5 realistic challenges or risks
- "nextSteps": 3-5 practical next actions the user can take

Return ONLY the JSON object.`;

const ARRAY_FIELDS = [
  "keyFeatures",
  "technologies",
  "requiredResources",
  "requiredSkills",
  "implementationSteps",
  "potentialChallenges",
  "nextSteps",
];

function validateSolution(
  data: Record<string, unknown>
): GeneratedSolution {
  const requiredStringFields = [
    "title",
    "overview",
    "problemAddressed",
    "whyItCouldWork",
  ];
  const requiredArrayFields = ARRAY_FIELDS;

  for (const field of requiredStringFields) {
    if (!data[field] || typeof data[field] !== "string") {
      throw new Error(
        `Invalid AI response: "${field}" must be a non-empty string`
      );
    }
  }

  for (const field of requiredArrayFields) {
    if (!data[field] || !Array.isArray(data[field])) {
      throw new Error(`Invalid AI response: "${field}" must be an array`);
    }
    if ((data[field] as unknown[]).length === 0) {
      throw new Error(
        `Invalid AI response: "${field}" must not be empty`
      );
    }
  }

  return data as unknown as GeneratedSolution;
}

export async function generateSolution(
  problem: ProblemInput,
  analysis: ProblemAnalysis
): Promise<GeneratedSolution> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "AI service not configured. Please set GEMINI_API_KEY in .env.local"
    );
  }

  const ai = new GoogleGenAI({ apiKey });

  const systemInstruction =
    "You are an expert open innovation solution architect. You always respond with valid JSON only. No extra text.";
  const userContent = SOLUTION_PROMPT(problem, analysis);

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
        maxOutputTokens: 2000,
        responseMimeType: "application/json",
      },
    });
  } catch (err) {
    throw new Error(extractGeminiError(err));
  }

  const content = response.text;
  if (!content) throw new Error("AI returned an empty response");

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(cleanJsonResponse(content));
  } catch {
    throw new Error("AI returned invalid JSON. Please try again.");
  }

  return validateSolution(parsed);
}
