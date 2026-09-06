import { NextRequest, NextResponse } from "next/server";
import { generateSolution } from "@/lib/ai-service";
import { ProblemInput, ProblemAnalysis } from "@/lib/types";

interface SolutionRequest {
  problem: ProblemInput;
  analysis: ProblemAnalysis;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SolutionRequest;

    if (!body.problem || !body.analysis) {
      return NextResponse.json(
        {
          success: false,
          error: "Both problem and analysis are required.",
        },
        { status: 400 }
      );
    }

    const { title, description, category, affectedUsers, urgency } =
      body.problem;
    if (!title || !description || !category || !affectedUsers || !urgency) {
      return NextResponse.json(
        {
          success: false,
          error: "Problem is missing required fields.",
        },
        { status: 400 }
      );
    }

    const { summary, rootCauses, keyChallenges } = body.analysis;
    if (!summary || !rootCauses || !keyChallenges) {
      return NextResponse.json(
        {
          success: false,
          error: "Analysis is missing required fields.",
        },
        { status: 400 }
      );
    }

    const solution = await generateSolution(body.problem, body.analysis);
    return NextResponse.json({ success: true, solution });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to generate a solution.";

    console.error("[/api/generate-solution]", message);

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
