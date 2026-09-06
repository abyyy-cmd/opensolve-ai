"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ProblemResult } from "@/lib/types";

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

function loadProblem(id: string): ProblemResult | null {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("opensolve_problems");
  if (!data) return null;
  const problems: ProblemResult[] = JSON.parse(data);
  return problems.find((p) => p.id === id) ?? null;
}

export default function ResultsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [result] = useState<ProblemResult | null>(() => loadProblem(id));

  if (!result) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Problem Not Found
        </h1>
        <p className="mb-6 text-gray-600">
          This problem may have been removed or the link is invalid.
        </p>
        <Link
          href="/submit"
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
        >
          Submit a New Problem
        </Link>
      </div>
    );
  }

  const { problem, analysis, solution } = result;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      {/* Header */}
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

        <SectionCard title="Solution Areas">
          <TagList items={analysis.potentialSolutionAreas} />
        </SectionCard>
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

      <div className="mb-10 space-y-4">
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

      {/* CTA */}
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-8 text-center sm:flex-row sm:text-left">
        <div className="flex-1">
          <h3 className="mb-1 text-lg font-semibold text-gray-900">
            Want to explore more?
          </h3>
          <p className="text-sm text-gray-600">
            Submit another problem or share this result with collaborators.
          </p>
        </div>
        <Link
          href="/submit"
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
        >
          Submit Another Problem
        </Link>
      </div>
    </div>
  );
}
