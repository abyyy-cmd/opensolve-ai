import Link from "next/link";

const steps = [
  {
    number: "1",
    title: "Submit",
    description: "Describe a real-world problem you or your organization face.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    ),
  },
  {
    number: "2",
    title: "Analyze",
    description: "AI breaks down root causes, challenges, and key requirements.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    number: "3",
    title: "Solve",
    description: "Receive an actionable solution with implementation steps.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
];

const stats = [
  { value: "1,420+", label: "Problems Submitted", description: "Real-world challenges mapped" },
  { value: "890+", label: "Solutions Generated", description: "Actionable technical blueprints" },
  { value: "45+", label: "Countries Represented", description: "Global grassroots collaboration" },
  { value: "94%", label: "Feasibility Rating", description: "Verified open-source tech stacks" },
];

const featuredProblems = [
  {
    id: "prob-1",
    title: "Urban Heat Island Mitigation in High-Density Housing",
    category: "Environment",
    urgency: "High",
    urgencyBadge: "bg-orange-50 text-orange-700 border-orange-200",
    dotColor: "bg-orange-500",
    location: "Metro Cities (South & Southeast Asia)",
    affectedUsers: "Over 45,000 low-income residents and elderly",
    description:
      "Densely built concrete neighborhoods experience severe heat traps, with nighttime temperatures up to 8°C higher than surrounding areas without cooling access.",
    tags: ["IoT Thermal Sensors", "Reflective Cool Roofs", "Micro-Forestry"],
  },
  {
    id: "prob-2",
    title: "Early Detection of Cassava & Maize Crop Blight",
    category: "Agriculture",
    urgency: "Critical",
    urgencyBadge: "bg-red-50 text-red-700 border-red-200",
    dotColor: "bg-red-500",
    location: "Sub-Saharan Farming Cooperatives",
    affectedUsers: "12,000+ smallholder farming households",
    description:
      "Aggressive fungal blight destroys over 30% of staple food harvests before laboratory diagnostics can be processed and distributed to remote agricultural districts.",
    tags: ["Edge Computer Vision", "Offline Mobile AI", "Open Pathology Data"],
  },
  {
    id: "prob-3",
    title: "Decentralized Drinking Water Contaminant Alert Network",
    category: "Healthcare",
    urgency: "High",
    urgencyBadge: "bg-orange-50 text-orange-700 border-orange-200",
    dotColor: "bg-orange-500",
    location: "Andes Watershed & Rural Community Wells",
    affectedUsers: "8,500 villagers across 14 municipal districts",
    description:
      "Intermittent heavy metal and runoff contamination occurs upstream from artisanal mining, with zero real-time telemetry reaching downstream domestic well consumers.",
    tags: ["Low-Cost Spectrometry", "SMS Early Warning", "Community Science"],
  },
];

const features = [
  "AI-powered problem analysis",
  "Root cause identification",
  "Technology recommendations",
  "Actionable solution proposals",
  "Implementation roadmaps",
  "Resource discovery",
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white px-4 pb-12 pt-20 sm:px-6 sm:pb-16 sm:pt-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-white to-white" />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
            AI-Powered Open Innovation
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Turn Problems Into
            <br />
            <span className="text-indigo-600">Collaborative Solutions</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-600">
            OpenSolve AI helps people and organizations transform real-world
            problems into actionable solutions by using AI to analyze
            challenges, discover resources, and support collaboration.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/submit"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-indigo-600 px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
            >
              Submit a Problem
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <span className="text-sm text-gray-400">or</span>
            <Link
              href="/explore"
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
            >
              Explore Problems
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="relative -mt-2 px-4 pb-12 sm:px-6">
        <div className="mx-auto max-w-5xl rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:divide-x md:divide-gray-100">
            {stats.map((stat, idx) => (
              <div key={stat.label} className={`text-center ${idx > 0 ? "md:pl-6" : ""}`}>
                <div className="text-3xl font-extrabold text-indigo-600 sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-900">
                  {stat.label}
                </div>
                <div className="mt-0.5 text-xs text-gray-500">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Open Innovation Problems */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                Live Community Challenges
              </div>
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Featured Open Innovation Problems
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Real-world problems awaiting collaborative solutions and technical roadmaps.
              </p>
            </div>
            <Link
              href="/explore"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-800"
            >
              View All Problems
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredProblems.map((prob) => (
              <div
                key={prob.id}
                className="flex flex-col justify-between rounded-2xl border border-gray-200/70 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div>
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                      {prob.category}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium ${prob.urgencyBadge}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${prob.dotColor}`} />
                      {prob.urgency}
                    </span>
                  </div>

                  <h3 className="mb-2 text-base font-bold text-gray-900 leading-snug">
                    {prob.title}
                  </h3>

                  <p className="mb-4 text-xs leading-relaxed text-gray-600 line-clamp-3">
                    {prob.description}
                  </p>

                  <div className="mb-4 space-y-1 border-t border-gray-100 pt-3 text-xs text-gray-500">
                    <p className="truncate font-medium text-gray-600">
                      📍 {prob.location}
                    </p>
                    <p className="truncate text-gray-500">
                      👥 {prob.affectedUsers}
                    </p>
                  </div>

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

                <div className="border-t border-gray-100 pt-4">
                  <Link
                    href="/explore"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-50 px-4 py-2.5 text-xs font-semibold text-indigo-700 transition-colors hover:bg-indigo-600 hover:text-white"
                  >
                    <span>Analyze Problem</span>
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/explore"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:border-gray-300 hover:bg-gray-50"
            >
              Explore All 1,420+ Challenges
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">
              How It Works
            </h2>
            <p className="text-gray-600">
              From problem to solution in three steps.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-gray-100 bg-gray-50/50 p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  {step.icon}
                </div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-indigo-600">
                  Step {step.number}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">
              What You Get
            </h2>
            <p className="text-gray-600">
              AI-powered analysis and solution generation for real-world
              problems.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm"
              >
                <svg
                  className="h-5 w-5 flex-shrink-0 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <span className="text-sm font-medium text-gray-800">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Innovation */}
      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-8 shadow-sm sm:p-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">
              What is Open Innovation?
            </h2>
            <p className="mb-4 text-base leading-relaxed text-gray-600">
              Many real-world problems already have partial solutions, useful
              research, datasets, technologies, or people with the right
              expertise. But these resources are often fragmented and hard to
              find.
            </p>
            <p className="mb-6 text-base leading-relaxed text-gray-600">
              OpenSolve AI bridges this gap by using artificial intelligence to
              connect problems with the knowledge, technology, resources, and
              people needed to solve them.
            </p>
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Link
                href="/submit"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
              >
                Get Started
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
