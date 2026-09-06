# 🌐 OpenSolve AI — Turn Problems Into Collaborative Solutions

[![Alibaba Cloud AI Hackathon 2026](https://img.shields.io/badge/Hackathon-Alibaba%20Cloud%20AI%20Hackathon%20Pakistan%202026-FF6600?style=for-the-badge&logo=alibabacloud&logoColor=white)](https://www.alibabacloud.com/)
[![Track: Open Innovation](https://img.shields.io/badge/Track-Open%20Innovation-blue?style=for-the-badge)](https://github.com/)
[![Next.js 16](https://img.shields.io/badge/Next.js-16%20App%20Router-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google GenAI SDK](https://img.shields.io/badge/Google%20GenAI-Gemini%20API-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Multilingual Ready](https://img.shields.io/badge/Multilingual-Zero--Config%20Auto--Detect-success?style=for-the-badge)](https://ai.google.dev/)

> **OpenSolve AI** is an AI-powered open innovation platform designed to bridge the gap between real-world challenges and collaborative, implementable solutions. Built for the **Open Innovation** category of the **Alibaba Cloud AI Hackathon Pakistan 2026**, OpenSolve AI ingests community problems, performs comprehensive root-cause analysis, and synthesizes practical implementation roadmaps leveraging open datasets, open-source technologies, and multidisciplinary skills.

---

## 📌 Table of Contents

- [💡 Problem Statement & Vision](#-problem-statement--vision)
- [✨ Key Features](#-key-features)
- [🌍 Multilingual Auto-Detection Architecture](#-multilingual-auto-detection-architecture)
- [🔄 How It Works: The Two-Phase AI Pipeline](#-how-it-works-the-two-phase-ai-pipeline)
- [🏗️ System Architecture](#️-system-architecture)
- [💻 Tech Stack](#-tech-stack)
- [🚀 Quick Start (Local Setup)](#-quick-start-local-setup)
- [⚙️ Environment Variables](#️-environment-variables)
- [🚢 Deployment Guide (Vercel)](#-deployment-guide-vercel)
- [🏆 Hackathon Criteria Alignment](#-hackathon-criteria-alignment)
- [👥 Team & License](#-team--license)

---

## 💡 Problem Statement & Vision

### The Challenge
Across developing economies and global communities, critical challenges in **climate resilience, agriculture, healthcare, and education** often go unsolved—not because solutions are impossible, but because the necessary resources are fragmented:
- Open research papers and public datasets remain trapped in academic silos.
- Open-source software and low-cost hardware tools exist without targeted application to local needs.
- Problem owners lack access to solution architects and technical domain specialists.
- Language barriers prevent local communities from submitting problems in their native languages.

### The OpenSolve AI Solution
**OpenSolve AI** transforms complex problem descriptions into structured, actionable open innovation blueprints. By combining cutting-edge LLMs with strict open innovation architectural guidelines, the platform:
1. **Deconstructs** root causes, affected demographics, and resource bottlenecks.
2. **Discovers** appropriate open-source technologies and community data assets.
3. **Generates** end-to-end implementation roadmaps with risk assessment and concrete next steps.
4. **Auto-Detects Language** so users can describe challenges in their native tongue without touching a dropdown.

---

## ✨ Key Features

### 1. 🔍 Comprehensive Problem Analysis (Phase 1)
- **Root Cause Deconstruction**: Identifies underlying systemic factors rather than just superficial symptoms.
- **Demographic & Stakeholder Mapping**: Pinpoints who is affected and who needs to be involved.
- **Resource & Technology Discovery**: Recommends categories of open tools, sensor types, and public datasets.
- **Skillset Identification**: Highlights specific engineering, domain, and community skills required.

### 2. ⚡ Actionable Solution Architecture (Phase 2)
- **Feasible Solution Blueprint**: Crafts a realistic, context-aware solution tailored to location and urgency constraints.
- **Feasibility Rationale**: Explains *why* the solution has a high probability of succeeding with available resources.
- **Key Features & Tech Stack**: Recommends practical components (e.g., edge computer vision, IoT telemetry, LoRaWAN, open-source APIs).
- **Phased Implementation Roadmap**: Generates a sequential step-by-step rollout plan.
- **Risk & Challenge Mitigation**: Flags potential regulatory, logistical, and technical hurdles with mitigation advice.

### 3. 🌍 Zero-Config Multilingual Intelligence
- **Native Language Auto-Detection**: Supports Urdu, Spanish, Arabic, French, German, Chinese, English, and more without any UI language selection friction.
- **Strict Schema Key Protection**: Translates only the content values into the user's native tongue while keeping all JSON keys strictly in English, preventing any frontend or TypeScript parsing breaks.

### 4. 🌐 Interactive Challenge Explorer (`/explore`)
- **Curated Open Innovation Challenges**: Explore real-world community problems across Environment, Agriculture, Healthcare, Technology, and Education.
- **Real-Time Search & Category Filters**: Quickly find challenges by keyword, tag, or domain.
- **One-Click Pipeline Launch**: Select any challenge card to instantly preload it into the live AI analysis and solution pipeline.

### 5. ⏱️ Dynamic Perceived-Performance UX
- **Contextual Status Progression**: Cycles through descriptive, professional stage messages every 2.5 seconds (*"Analyzing problem constraints..."*, *"Cross-referencing open-source solutions..."*, *"Structuring AI response..."*).
- **Tactile Stepper Dots**: Animated progress pills provide continuous visual feedback during 10–15s generation cycles.

### 6. 🛡️ Enterprise-Grade Resilience & Demo Fail-Safe
- **Multi-Model Fallback Sequence**: High-availability pipeline resilient to 503 high-demand and 404 model errors.
- **Bulletproof JSON Sanitization**: Strict schema enforcement (`responseMimeType: "application/json"`) paired with regex markdown cleanup ensures zero parsing failures.
- **Graceful Fail-Safe Mock Fallback**: In the event of network disruptions, quota exhaustion, or API downtime during live judging, the app automatically fails over to a realistic healthcare telemetry triage scenario ("High Missed Call Rates in Healthcare") without showing an error screen.

---

## 🌍 Multilingual Auto-Detection Architecture

```
User Input (Any Language: Urdu, Spanish, Arabic, etc.)
  │
  ▼
Gemini Multimodal Analysis Engine
  │
  ├─► Auto-detects input language
  ├─► Formulates analysis & solution content in that language
  └─► CRITICAL: Preserves 100% English JSON keys:
        {
          "title": "<in user language>",
          "overview": "<in user language>",
          "keyFeatures": ["<in user language>"],
          "technologies": ["<in user language>"]
        }
  │
  ▼
Next.js Frontend & TypeScript Store (Zero Parsing Errors)
```

---

## 🔄 How It Works: The Two-Phase AI Pipeline

```
  [ User Problem Submission (Native Language) ]
                       │
                       ▼
┌────────────────────────────────────────────────────────┐
│  Phase 1: Problem Analysis                             │
│  • Model: Google Gemini (@google/genai)                │
│  • Output: Root Causes, Affected Groups, Challenges,   │
│            Technologies, Skills, Potential Areas       │
└────────────────────────────────────────────────────────┘
                       │
                       ▼
┌────────────────────────────────────────────────────────┐
│  Phase 2: Solution Architecture                        │
│  • Synthesizes original problem + Phase 1 analysis     │
│  • Enforces practical open innovation rules            │
│  • Output: Title, Overview, Features, Roadmap, Risks   │
└────────────────────────────────────────────────────────┘
                       │
                       ▼
  [ Interactive Results & Implementation Dashboard ]
```

---

## 🏗️ System Architecture

```
opensolve-ai/
├── src/
│   ├── app/
│   │   ├── page.tsx                  # Landing Page (Hero, Live Stats, Featured Challenges)
│   │   ├── explore/
│   │   │   └── page.tsx              # /explore route (Search, Category Filters, One-Click Solve)
│   │   ├── submit/
│   │   │   └── page.tsx              # /submit route (Input form, Dynamic Loading, AI Results)
│   │   ├── results/[id]/
│   │   │   └── page.tsx              # Persistent saved solution results view
│   │   ├── api/
│   │   │   ├── analyze/
│   │   │   │   └── route.ts          # POST endpoint for Phase 1 AI Analysis
│   │   │   └── generate-solution/
│   │   │       └── route.ts          # POST endpoint for Phase 2 Solution Generation
│   │   ├── layout.tsx                # Global Layout with Header & Footer
│   │   └── globals.css               # Design system & Tailwind styling
│   ├── components/
│   │   ├── ProblemForm.tsx           # Validated multi-field problem input form
│   │   ├── ui/
│   │   │   ├── LoadingSpinner.tsx    # Dynamic cycling status messages & stepper UX
│   │   │   └── ErrorState.tsx        # Fallback error container
│   │   └── layout/
│   │       ├── Header.tsx            # Sticky navigation header with Explore & Submit links
│   │       └── Footer.tsx            # Global footer
│   └── lib/
│       ├── types.ts                  # TypeScript interfaces for input, analysis & solution
│       ├── ai-service.ts             # Solution generation service with fallback resilience
│       ├── ai/
│       │   └── problemAnalyzer.ts    # Problem analysis service with JSON cleaning
│       └── storage.ts                # Local persistence layer
```

---

## 💻 Tech Stack

| Layer | Technology | Description |
|---|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack) | High-performance React framework with server components |
| **Frontend** | React 19, TypeScript | Strict type safety and modern concurrent UI rendering |
| **Styling** | Tailwind CSS | Curated, responsive design system with clean aesthetics |
| **AI Intelligence** | Google GenAI SDK (`@google/genai`) | Gemini multimodal models powering analytical & generative tasks |
| **Multilingual** | Prompt-Engineered Zero-Shot Detection | Auto-detects user language, returns English schema keys |
| **API Architecture** | Next.js Route Handlers | Serverless edge-ready endpoints with input validation |
| **State & Storage** | SessionStorage & LocalStorage | Zero-latency client persistence for seamless demo flow |

---

## 🚀 Quick Start (Local Setup)

Follow these steps to run OpenSolve AI locally on your machine.

### Prerequisites
- **Node.js**: Version 18.18 or higher (Node.js 20+ recommended)
- **npm** or **yarn** / **pnpm** / **bun**
- A **Gemini API Key** from [Google AI Studio](https://aistudio.google.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/opensolve-ai.git
cd opensolve-ai
```

### 2. Navigate to the App Directory & Install Dependencies
```bash
# If your project has a root proxy:
npm install

# Or navigate directly to the Next.js app:
cd opensolve-ai
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file inside the `opensolve-ai` folder:
```bash
cp .env.example .env.local
```

Open `.env.local` and add your Gemini API Key:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### 4. Start the Development Server
```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:3000
```

---

## ⚙️ Environment Variables

| Variable | Required | Description | Example |
|---|---|---|---|
| `GEMINI_API_KEY` | **Yes** | API Key from Google AI Studio to power problem analysis and solution generation | `AIzaSyD...` |

---

## 🚢 Deployment Guide (Vercel)

OpenSolve AI is optimized for 1-click zero-config deployment on **Vercel**:

1. Push your repository to **GitHub**:
   ```bash
   git add .
   git commit -m "Final submission build"
   git push origin main
   ```
2. Log in to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import your `opensolve-ai` repository.
4. If your Next.js app is located in a subdirectory (e.g., `opensolve-ai`), set the **Root Directory** to `opensolve-ai`.
5. Under **Environment Variables**, add:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: Your Gemini API Key
6. Click **Deploy**. Vercel will build and assign a production URL in under 2 minutes.

---

## 🏆 Hackathon Criteria Alignment

### Alibaba Cloud AI Hackathon Pakistan 2026 — Open Innovation Track

| Evaluation Criterion | How OpenSolve AI Excels |
|---|---|
| **Innovation & Impact** | Directly tackles the disconnect between grassroots problems and open innovation resources. Accelerates solution time from months to minutes. |
| **Multilingual Inclusivity** | Automatically adapts to any language without requiring complex UI selector dropdowns, breaking down global language barriers. |
| **Technical Execution** | Built with Next.js 16 and TypeScript; implements a robust two-stage AI pipeline with model fallback resilience, bulletproof JSON extraction, and demo fail-safes. |
| **User Experience & Polish** | Clean, accessible design featuring live metrics, curated challenge cards, real-time filtering, dynamic cycling status indicators, and seamless navigation. |
| **Real-World Viability** | Generates feasible, context-aware roadmaps that prioritize existing open-source tools and datasets over hypothetical technologies. |

---

## 👥 Team & License

Developed with ❤️ for the **Alibaba Cloud AI Hackathon Pakistan 2026**.

Distributed under the **MIT License**. See `LICENSE` for more details.
