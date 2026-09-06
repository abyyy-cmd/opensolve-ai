import { NextRequest, NextResponse } from "next/server";
import { callAnalysisAPI } from "@/lib/ai/problemAnalyzer";
import { ProblemInput } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<ProblemInput>;

    const title = body.title?.trim();
    const description = body.description?.trim();
    const category = body.category?.trim();
    const affectedUsers = body.affectedUsers?.trim();
    const urgency = body.urgency?.trim();

    if (!title || !description || !category || !affectedUsers || !urgency) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: title, description, category, affectedUsers, and urgency are all required.",
        },
        { status: 400 }
      );
    }

    const problem: ProblemInput = {
      title,
      description,
      category: category as ProblemInput["category"],
      location: body.location?.trim() ?? "",
      affectedUsers,
      urgency: urgency as ProblemInput["urgency"],
    };

    const analysis = await callAnalysisAPI(problem);

    return NextResponse.json({ success: true, analysis });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to analyze the problem.";

    console.error("[/api/analyze]", message);

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
