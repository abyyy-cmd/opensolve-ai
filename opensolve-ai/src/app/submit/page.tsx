"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import ProblemForm from "@/components/ProblemForm";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { ProblemInput, ProblemAnalysis, GeneratedSolution } from "@/lib/types";
import { saveProblem } from "@/lib/storage";

const STORAGE_KEY = "opensolve_pending_problem";
const ANALYSIS_STORAGE_KEY = "opensolve_analysis";

type ViewState =
  | "form"
  | "loading"
  | "analysis"
  | "solution-loading"
  | "solution"
  | "error"
  | "solution-error";

const URGENCY_COLORS: Record<string, string> = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-orange-100 text-orange-700",
  critical: "bg-red-100 text-red-700",
};

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">{title}</h3>
      {children}
    </div>
  );
}

function TagList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <span
          key={i}
          className="inline-flex items-center rounded-lg bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-sm text-gray-700">
          <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
            {i + 1}
          </span>
          <span className="pt-0.5 leading-relaxed">{item}</span>
        </li>
      ))}
    </ol>
  );
}

function getInitialViewState(): {
  view: ViewState;
  problem: ProblemInput | null;
} {
  if (typeof window === "undefined") return { view: "form", problem: null };
  const stored = sessionStorage.getItem(STORAGE_KEY);
  if (!stored) return { view: "form", problem: null };
  try {
    const parsed = JSON.parse(stored) as ProblemInput;
    sessionStorage.removeItem(STORAGE_KEY);
    return { view: "loading", problem: parsed };
  } catch {
    sessionStorage.removeItem(STORAGE_KEY);
    return { view: "form", problem: null };
  }
}

export default function SubmitPage() {
  const [initial] = useState(getInitialViewState);
  const [view, setView] = useState<ViewState>(initial.view);
  const [problem, setProblem] = useState<ProblemInput | null>(initial.problem);
  const [analysis, setAnalysis] = useState<ProblemAnalysis | null>(null);
  const [solution, setSolution] = useState<GeneratedSolution | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [solutionError, setSolutionError] = useState<string | null>(null);

  const runAnalysis = useCallback(async (problemData: ProblemInput) => {
    setProblem(problemData);
    setView("loading");
    setError(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(problemData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Analysis failed. Please try again.");
      }

      setAnalysis(data.analysis);
      sessionStorage.setItem(
        ANALYSIS_STORAGE_KEY,
        JSON.stringify({ problem: problemData, analysis: data.analysis })
      );
      setView("analysis");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "We couldn't analyze this problem right now. Please try again.";
      setError(message);
      setView("error");
    }
  }, []);

  const handleGenerateSolution = useCallback(async () => {
    if (!problem || !analysis) return;

    setView("solution-loading");
    setSolutionError(null);

    try {
      const res = await fetch("/api/generate-solution", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problem, analysis }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(
          data.error || "Solution generation failed. Please try again."
        );
      }

      setSolution(data.solution);

      const resultId = crypto.randomUUID();
      saveProblem({
        id: resultId,
        problem,
        analysis,
        solution: data.solution,
        createdAt: new Date().toISOString(),
      });

      sessionStorage.removeItem(ANALYSIS_STORAGE_KEY);
      setView("solution");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "We couldn't generate a solution right now. Please try again.";
      setSolutionError(message);
      setView("solution-error");
    }
  }, [problem, analysis]);

  const pendingProblem = initial.problem;
  const needsInitialAnalysis =
    initial.view === "loading" && pendingProblem !== null;

  useEffect(() => {
    if (!needsInitialAnalysis || !pendingProblem) return;
    let cancelled = false;

    fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pendingProblem),
    })
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (!data.success) {
          throw new Error(data.error || "Analysis failed.");
        }
        setAnalysis(data.analysis);
        setProblem(pendingProblem);
        sessionStorage.setItem(
          ANALYSIS_STORAGE_KEY,
          JSON.stringify({ problem: pendingProblem, analysis: data.analysis })
        );
        setView("analysis");
      })
      .catch((err) => {
        if (cancelled) return;
        const message =
          err instanceof Error
            ? err.message
            : "We couldn't analyze this problem right now.";
        setError(message);
        setView("error");
      });

    return () => {
      cancelled = true;
    };
  }, [needsInitialAnalysis, pendingProblem]);

  function handleFormSubmit(data: ProblemInput) {
    runAnalysis(data);
  }

  function handleRetry() {
    if (problem) {
      runAnalysis(problem);
    }
  }

  function handleSolutionRetry() {
    handleGenerateSolution();
  }

  // Analysis loading
  if (view === "loading") {
    return (
      <div className="flex flex-1 items-center justify-center px-4 py-20">
        <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-sm sm:p-10">
          <LoadingSpinner
            size="lg"
            messages={[
              "Analyzing problem constraints...",
              "Deconstructing root causes...",
              "Mapping affected user groups...",
              "Identifying technical bottlenecks...",
              "Structuring problem analysis...",
            ]}
            intervalMs={2500}
            subtext="OpenSolve AI is breaking down your problem into structured open innovation requirements."
          />
        </div>
      </div>
    );
  }

  // Solution loading
  if (view === "solution-loading") {
    return (
      <div className="flex flex-1 items-center justify-center px-4 py-20">
        <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-sm sm:p-10">
          <LoadingSpinner
            size="lg"
            messages={[
              "Analyzing problem constraints...",
              "Cross-referencing open-source solutions...",
              "Identifying required technical resources...",
              "Structuring AI response...",
              "Finalizing solution architecture...",
            ]}
            intervalMs={2500}
            subtext="OpenSolve AI is formulating a feasible technical blueprint and phased implementation roadmap."
          />
        </div>
      </div>
    );
  }

  // Analysis error
  if (view === "error") {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="rounded-2xl border border-red-100 bg-red-50 p-8 text-center sm:p-12">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-7 w-7 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl">
            Analysis failed
          </h1>
          <p className="mb-6 text-gray-600">{error}</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={handleRetry}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
            >
              Try Again
            </button>
            <button
              type="button"
              onClick={() => {
                setProblem(null);
                setAnalysis(null);
                setError(null);
                setView("form");
              }}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
            >
              Submit New Problem
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Solution generation error
  if (view === "solution-error") {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="rounded-2xl border border-red-100 bg-red-50 p-8 text-center sm:p-12">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-7 w-7 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl">
            Solution generation failed
          </h1>
          <p className="mb-6 text-gray-600">{solutionError}</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={handleSolutionRetry}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
            >
              Try Again
            </button>
            <button
              type="button"
              onClick={() => {
                setSolution(null);
                setSolutionError(null);
                setView("analysis");
              }}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
            >
              Back to Analysis
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Solution results
  if (view === "solution" && solution && problem) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Problem header */}
        <div className="mb-10">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-lg bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
              {problem.category}
            </span>
            <span
              className={`inline-flex items-center rounded-lg px-3 py-1 text-xs font-medium ${URGENCY_COLORS[problem.urgency]}`}
            >
              {problem.urgency.charAt(0).toUpperCase() +
                problem.urgency.slice(1)}{" "}
              urgency
            </span>
          </div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            {problem.title}
          </h1>
          <p className="text-gray-600">{problem.description}</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500">
            {problem.location && <span>Location: {problem.location}</span>}
            <span>Affected: {problem.affectedUsers}</span>
          </div>
        </div>

        {/* Generated Solution */}
        <div className="mb-4">
          <h2 className="mb-2 text-xl font-bold text-gray-900">
            Generated Solution
          </h2>
          <p className="mb-6 text-sm text-gray-500">
            AI-powered solution based on the problem analysis
          </p>
        </div>

        <div className="space-y-4">
          {/* Solution Title + Overview */}
          <SectionCard title={solution.title}>
            <p className="text-sm leading-relaxed text-gray-700">
              {solution.overview}
            </p>
          </SectionCard>

          {/* Problem Addressed + Why It Could Work */}
          <div className="grid gap-4 sm:grid-cols-2">
            <SectionCard title="Problem Addressed">
              <p className="text-sm leading-relaxed text-gray-700">
                {solution.problemAddressed}
              </p>
            </SectionCard>
            <SectionCard title="Why It Could Work">
              <p className="text-sm leading-relaxed text-gray-700">
                {solution.whyItCouldWork}
              </p>
            </SectionCard>
          </div>

          {/* Key Features */}
          <SectionCard title="Key Features">
            <TagList items={solution.keyFeatures} />
          </SectionCard>

          {/* Technologies + Required Skills */}
          <div className="grid gap-4 sm:grid-cols-2">
            <SectionCard title="Technologies">
              <TagList items={solution.technologies} />
            </SectionCard>
            <SectionCard title="Required Skills">
              <TagList items={solution.requiredSkills} />
            </SectionCard>
          </div>

          {/* Required Resources */}
          <SectionCard title="Required Resources">
            <TagList items={solution.requiredResources} />
          </SectionCard>

          {/* Implementation Roadmap */}
          <SectionCard title="Implementation Roadmap">
            <NumberedList items={solution.implementationSteps} />
          </SectionCard>

          {/* Potential Challenges + Next Steps */}
          <div className="grid gap-4 sm:grid-cols-2">
            <SectionCard title="Potential Challenges">
              <TagList items={solution.potentialChallenges} />
            </SectionCard>
            <SectionCard title="Next Steps">
              <NumberedList items={solution.nextSteps} />
            </SectionCard>
          </div>
        </div>

        {/* Bottom actions */}
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => {
              setProblem(null);
              setAnalysis(null);
              setSolution(null);
              setView("form");
            }}
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
          >
            Submit Another Problem
          </button>
          <Link
            href="/"
            className="inline-flex h-11 items-center gap-2 rounded-xl text-sm font-semibold text-gray-600 transition-colors hover:text-gray-900"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Analysis results
  if (view === "analysis" && analysis && problem) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Problem header */}
        <div className="mb-10">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-lg bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
              {problem.category}
            </span>
            <span
              className={`inline-flex items-center rounded-lg px-3 py-1 text-xs font-medium ${URGENCY_COLORS[problem.urgency]}`}
            >
              {problem.urgency.charAt(0).toUpperCase() +
                problem.urgency.slice(1)}{" "}
              urgency
            </span>
          </div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            {problem.title}
          </h1>
          <p className="text-gray-600">{problem.description}</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500">
            {problem.location && <span>Location: {problem.location}</span>}
            <span>Affected: {problem.affectedUsers}</span>
          </div>
        </div>

        {/* AI Analysis */}
        <div className="mb-4">
          <h2 className="mb-6 text-xl font-bold text-gray-900">AI Analysis</h2>
        </div>
        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          <SectionCard title="Summary">
            <p className="text-sm leading-relaxed text-gray-700">
              {analysis.summary}
            </p>
          </SectionCard>

          <SectionCard title="Root Causes">
            <TagList items={analysis.rootCauses} />
          </SectionCard>

          <SectionCard title="Affected Users">
            <TagList items={analysis.affectedUsers} />
          </SectionCard>

          <SectionCard title="Key Challenges">
            <TagList items={analysis.keyChallenges} />
          </SectionCard>

          <SectionCard title="Required Resources">
            <TagList items={analysis.requiredResources} />
          </SectionCard>

          <SectionCard title="Technologies">
            <TagList items={analysis.relevantTechnologies} />
          </SectionCard>

          <SectionCard title="Required Skills">
            <TagList items={analysis.requiredSkills} />
          </SectionCard>

          <SectionCard title="Potential Solution Areas">
            <TagList items={analysis.potentialSolutionAreas} />
          </SectionCard>
        </div>

        {/* Generate Solution — enabled */}
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-8 text-center">
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            Ready for the next step?
          </h3>
          <p className="mb-6 text-sm text-gray-500">
            The AI solution generator will create an actionable proposal based
            on this analysis.
          </p>
          <button
            type="button"
            onClick={handleGenerateSolution}
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-indigo-600 px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
          >
            Generate Solution
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>

        {/* Bottom actions */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => {
              setProblem(null);
              setAnalysis(null);
              setView("form");
            }}
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
          >
            Submit Another Problem
          </button>
          <Link
            href="/"
            className="inline-flex h-11 items-center gap-2 rounded-xl text-sm font-semibold text-gray-600 transition-colors hover:text-gray-900"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Form
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-8">
        <h1 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">
          Share a problem worth solving.
        </h1>
        <p className="mb-3 text-base leading-relaxed text-gray-600">
          Tell us about a real-world challenge. OpenSolve AI will analyze it
          and help identify potential solution paths, resources, and
          collaborators.
        </p>
        <p className="text-sm text-gray-400">
          The more context you provide, the better the AI analysis can be.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <ProblemForm onSubmit={handleFormSubmit} />
      </div>
    </div>
  );
}
