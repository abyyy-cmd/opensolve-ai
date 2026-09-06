export type Category =
  | "Agriculture"
  | "Healthcare"
  | "Education"
  | "Environment"
  | "Business"
  | "Technology"
  | "Community"
  | "Other";

export type Urgency = "low" | "medium" | "high" | "critical";

export interface ProblemInput {
  title: string;
  description: string;
  category: Category;
  location: string;
  affectedUsers: string;
  urgency: Urgency;
}

export interface ProblemAnalysis {
  summary: string;
  rootCauses: string[];
  affectedUsers: string[];
  keyChallenges: string[];
  requiredResources: string[];
  relevantTechnologies: string[];
  requiredSkills: string[];
  potentialSolutionAreas: string[];
}

export interface GeneratedSolution {
  title: string;
  overview: string;
  problemAddressed: string;
  whyItCouldWork: string;
  keyFeatures: string[];
  technologies: string[];
  requiredResources: string[];
  requiredSkills: string[];
  implementationSteps: string[];
  potentialChallenges: string[];
  nextSteps: string[];
}

export interface ProblemResult {
  id: string;
  problem: ProblemInput;
  analysis: ProblemAnalysis;
  solution: GeneratedSolution;
  createdAt: string;
}

export type AppView = "landing" | "submit" | "loading" | "results";
