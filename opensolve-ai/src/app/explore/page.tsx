"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Category, Urgency, ProblemInput } from "@/lib/types";

interface ExploreProblem extends ProblemInput {
  id: string;
  tags: string[];
  stats: {
    contributors: number;
    daysActive: number;
  };
}

const MOCK_PROBLEMS: ExploreProblem[] = [
  {
    id: "prob-1",
    title: "Urban Heat Island Mitigation in High-Density Housing",
    category: "Environment",
    urgency: "high",
    location: "Metro Cities (South & Southeast Asia)",
    affectedUsers: "Over 45,000 low-income residents and elderly populations",
    description:
      "Densely built concrete neighborhoods experience severe localized heat traps, with nighttime temperatures up to 8°C higher than surrounding areas, causing acute respiratory distress without HVAC access.",
    tags: ["IoT Thermal Sensors", "Reflective Cool Roofs", "Micro-Forestry"],
    stats: { contributors: 28, daysActive: 14 },
  },
  {
    id: "prob-2",
    title: "Early Detection of Cassava & Maize Crop Blight",
    category: "Agriculture",
    urgency: "critical",
    location: "Sub-Saharan Farming Cooperatives",
    affectedUsers: "12,000+ smallholder farming households",
    description:
      "Aggressive fungal blight destroys over 30% of staple food harvests before laboratory diagnostics can be processed and distributed to remote agricultural districts.",
    tags: ["Edge Computer Vision", "Offline Mobile AI", "Open Pathology Data"],
    stats: { contributors: 42, daysActive: 21 },
  },
  {
    id: "prob-3",
    title: "Decentralized Drinking Water Contaminant Alert Network",
    category: "Healthcare",
    urgency: "high",
    location: "Andes Watershed & Rural Community Wells",
    affectedUsers: "8,500 villagers across 14 municipal districts",
    description:
      "Intermittent heavy metal and runoff contamination occurs upstream from artisanal mining, with zero real-time telemetry reaching downstream domestic well consumers.",
    tags: ["Low-Cost Spectrometry", "SMS Early Warning", "Community Science"],
    stats: { contributors: 35, daysActive: 9 },
  },
  {
    id: "prob-4",
    title: "Last-Mile Cold Chain Monitoring for Rural Vaccine Delivery",
    category: "Healthcare",
    urgency: "critical",
    location: "Remote Island & Mountain Health Clinics",
    affectedUsers: "Infants and high-risk patients in off-grid medical outposts",
    description:
      "Thermal spoilage accounts for significant wastage of temperature-sensitive biologics during transit across rough terrain with irregular generator power.",
    tags: ["Phase-Change Insulators", "Low-Power LoRaWAN", "Predictive Logistics"],
    stats: { contributors: 19, daysActive: 6 },
  },
  {
    id: "prob-5",
    title: "Community E-Waste Refurbishment & Micro-Recycling Hubs",
    category: "Technology",
    urgency: "medium",
    location: "Secondary Urban Centers (Latin America)",
    affectedUsers: "Informal waste workers and local trade schools",
    description:
      "Discarded consumer electronics fill informal landfills without structured component salvage protocols, while vocational schools face severe hardware shortages.",
    tags: ["Modular Repair Guides", "Component Inventory API", "Safe Battery Disposal"],
    stats: { contributors: 23, daysActive: 18 },
  },
  {
    id: "prob-6",
    title: "Off-Grid Micro-Hydroelectric Load Balancing for Hill Tribes",
    category: "Environment",
    urgency: "medium",
    location: "Himalayan Foothills",
    affectedUsers: "6 isolated mountain villages (approx. 3,200 people)",
    description:
      "Seasonal stream flow fluctuations create chronic voltage surges that damage community grain mills and domestic equipment without automated dump-load controls.",
    tags: ["Open Hardware Controllers", "Dynamic Ballast Loads", "Micro-Grid SCADA"],
    stats: { contributors: 16, daysActive: 30 },
  },
];

const URGENCY_BADGES: Record<Urgency, { label: string; badge: string; dot: string }> = {
  low: { label: "Low Urgency", badge: "bg-green-50 text-green-700 border-green-200", dot: "bg-green-500" },
  medium: { label: "Medium Urgency", badge: "bg-yellow-50 text-yellow-700 border-yellow-200", dot: "bg-yellow-500" },
  high: { label: "High Urgency", badge: "bg-orange-50 text-orange-700 border-orange-200", dot: "bg-orange-500" },
  critical: { label: "Critical", badge: "bg-red-50 text-red-700 border-red-200", dot: "bg-red-500" },
};

const CATEGORIES: Array<Category | "All"> = [
  "All",
  "Environment",
  "Agriculture",
  "Healthcare",
  "Technology",
  "Education",
  "Community",
  "Business",
];

export default function ExplorePage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProblems = useMemo(() => {
    return MOCK_PROBLEMS.filter((problem) => {
      const matchesCategory =
        selectedCategory === "All" || problem.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        problem.title.toLowerCase().includes(query) ||
        problem.description.toLowerCase().includes(query) ||
        problem.location?.toLowerCase().includes(query) ||
        problem.tags.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  function handleSolveInPipeline(problem: ExploreProblem) {
    if (typeof window !== "undefined") {
      const input: ProblemInput = {
        title: problem.title,
        description: problem.description,
        category: problem.category,
        location: problem.location,
        affectedUsers: problem.affectedUsers,
        urgency: problem.urgency,
      };
      sessionStorage.setItem("opensolve_pending_problem", JSON.stringify(input));
      router.push("/submit");
    }
  }

  return (
    <div className="flex flex-1 flex-col bg-gray-50 py-10 sm:py-14">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3.5 py-1 text-xs font-semibold text-indigo-700">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                Open Innovation Repository
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Explore Real-World Challenges
              </h1>
              <p className="mt-2 max-w-2xl text-base text-gray-600">
                Browse open innovation problems submitted by communities worldwide. Choose a challenge to run through our AI analysis and solution architect pipeline.
              </p>
            </div>
            <Link
              href="/submit"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Submit New Problem
            </Link>
          </div>

          {/* Search & Category Filter */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <svg
                className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search challenges by keyword, tag, location..."
                className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3 text-xs font-semibold text-gray-400 hover:text-gray-600"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="text-xs font-medium text-gray-500">
              Showing <span className="font-semibold text-gray-900">{filteredProblems.length}</span> problems
            </div>
          </div>

          {/* Category Pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "border border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Problems Grid */}
        {filteredProblems.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-gray-900">No matching problems found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search terms or filter criteria.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-4 inline-flex items-center rounded-lg bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-200"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProblems.map((prob) => {
              const urgencyInfo = URGENCY_BADGES[prob.urgency];
              return (
                <div
                  key={prob.id}
                  className="flex flex-col justify-between rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div>
                    {/* Badges */}
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                        {prob.category}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-0.5 text-xs font-medium ${urgencyInfo.badge}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${urgencyInfo.dot}`} />
                        {urgencyInfo.label}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mb-2 text-lg font-bold text-gray-900 leading-snug">
                      {prob.title}
                    </h3>

                    {/* Description */}
                    <p className="mb-4 text-xs leading-relaxed text-gray-600 line-clamp-3">
                      {prob.description}
                    </p>

                    {/* Meta info */}
                    <div className="mb-4 space-y-1.5 border-t border-gray-100 pt-3 text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <svg className="h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        <span className="truncate">{prob.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span className="truncate">{prob.affectedUsers}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="mb-5 flex flex-wrap gap-1.5">
                      {prob.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="border-t border-gray-100 pt-4">
                    <button
                      type="button"
                      onClick={() => handleSolveInPipeline(prob)}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-indigo-700"
                    >
                      <span>Analyze & Solve</span>
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
