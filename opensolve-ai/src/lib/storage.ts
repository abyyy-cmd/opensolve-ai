import { ProblemResult } from "./types";

const STORAGE_KEY = "opensolve_problems";

function getProblems(): ProblemResult[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveProblems(problems: ProblemResult[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(problems));
}

export function saveProblem(result: ProblemResult): void {
  const problems = getProblems();
  problems.unshift(result);
  saveProblems(problems);
}

export function getProblemById(id: string): ProblemResult | null {
  const problems = getProblems();
  return problems.find((p) => p.id === id) ?? null;
}

export function getAllProblems(): ProblemResult[] {
  return getProblems();
}
