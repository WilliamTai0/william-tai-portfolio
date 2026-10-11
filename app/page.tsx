import Header from "@/components/Header";
import ProjectVideo from "@/components/ProjectVideo";

const projects = [
  {
    title: "AI-Powered Multi-Modal Health Platform",
    desc: "HKUST Final Year Project (Grade A) backend serving 30+ endpoints with APScheduler resets. Accelerated local OCR via OpenVINO INT4/INT8 quantization, cutting model size by 56% (1,477MB to 644MB) and CPU latency from 15.5s to 11.5s. Integrated Qwen-2.5-VL-72B with strict schema guards and sub-100 token aggregation budget.",
    tags: ["FastAPI", "OpenVINO (INT4/INT8)", "Qwen-2.5-VL", "Docker Compose"],
    link: "https://github.com/CYNLeo/FYP_AI_Health_APP",
  },
  {
    title: "Smart Trip Planner (Agentic Travel App)",
    desc: "Agentic travel application built with Flutter and Gemini 2.5 Flash Lite tool-calling. Intercepts queries across Amadeus & Google Places APIs to synthesize multi-day itineraries. Features 2-tier caching with Hive NoSQL and in-memory stores via Stale-While-Revalidate refresh, backed by MongoDB Atlas compound indexes.",
    tags: ["Flutter", "Gemini Tool Calling", "Hive NoSQL", "MongoDB Atlas"],
    link: "https://github.com/WilliamTai0/SmartTrip-Planner",
  },
  {
    title: "AI Developer Toolchain & Multi-Agent Pipeline",
    desc: "Deployed containerized Model Context Protocol (MCP) servers in Docker. Designed a 3-stage multi-agent automation pipeline coordinating discovery, rubric-scoring, and Chrome DevTools MCP execution agents for automated DOM extraction and React state synchronization.",
    tags: ["Model Context Protocol", "Chrome DevTools MCP", "Docker", "Multi-Agent"],
    link: null,
  },
  {
    title: "Web Crawler & Inverted Index Search Engine",
    desc: "HKUST COMP4321 Information Retrieval project. Built BFS crawler and 5-table SQLite positional inverted index with HTTP Last-Modified incremental cache invalidation, NLTK Porter stemming, word-position tracking for exact-phrase search, and title-boosted cosine similarity ranking.",
    tags: ["Python", "SQLite", "Information Retrieval", "NLTK", "Cosine Similarity"],
    link: null,
  },
  {
    title: "TimeLock Anti-Addiction Android App",
    desc: "Native Android application built with Kotlin, Jetpack Compose, and Room. Features a persistent StateFlow heartbeat engine to eliminate background coroutine freezes, single-use token emergency pass, and Xiaomi background suppression bypass.",
    tags: ["Kotlin", "Jetpack Compose", "Room / SQLite", "Material 3"],
    link: "https://github.com/WilliamTai0/TimeLockApp",
  },
  {
    title: "React Testing & CI Pipeline Showcase",
    desc: "Production-grade integration test suite using Vitest and React Testing Library with Mock Service Worker (MSW) simulating 401, 404, and 500 network states. Configured automated test runs and coverage reporting via GitHub Actions CI.",
    tags: ["Vitest", "React Testing Library", "MSW", "GitHub Actions"],
    link: "https://github.com/WilliamTai0/react-vitest-ci-showcase",
  },
];

const skillCategories = [
  {
    name: "AI & Agent Systems",
    items: [
      "Model Context Protocol (MCP)",
      "Multi-Agent Orchestration",
      "LLM Tool Calling & Interception",
      "Chrome DevTools MCP",
      "OpenVINO (Model Quantization INT4/INT8)",
      "Structured Output & JSON Schema",
      "Prompt Engineering",
    ],
  },
  {
    name: "Backend, Cloud & Linux",
    items: [
      "Python (FastAPI)",
      "RESTful API Design",
      "Docker & Docker Compose",
      "Linux (Ubuntu, CentOS, systemd, SSSD)",
      "Microservice Integration",
      "Azure (SQL PaaS, Key Vault RBAC)",
    ],
  },
  {
    name: "Web & Mobile Platforms",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "Kotlin (Jetpack Compose)",
      "Flutter",
      "Tailwind CSS",
    ],
  },
  {
    name: "Databases & Storage",
    items: [
      "MongoDB Atlas",
      "GridFS (Binary Media Storage)",
      "Hive (Local NoSQL KV Store)",
      "MySQL",
      "Azure SQL (T-SQL)",
      "SQLite / Room",
    ],
  },
  {
    name: "Testing & DevOps",
    items: [
      "Vitest",
      "React Testing Library",
      "Mock Service Worker (MSW)",
      "GitHub Actions (CI/CD Pipelines)",
      "Git / Postman",
    ],
  },
  {
    name: "Programming Languages",
    items: [
      "Python",
      "Kotlin",
      "TypeScript",
      "JavaScript",
      "SQL",
      "C++",
      "Java",
      "Dart",
    ],
  },
];

const experiences = [
  {
    role: "IT Deployment Technician (Contract)",
    company: "Proseek Technology",
    client: "Client: UBS (West Kowloon HQ)",
    period: "Sep 2026 — Present",
    desc: "Deployed enterprise workstations and dual-monitor displays across UBS trading floors, ensuring strict hardware, power distribution, and cable management compliance. Audited enterprise assets, inspected BIOS configs, and cataloged 500+ endpoints.",
    tags: ["Enterprise Infrastructure", "Trading Floor Rollout", "Asset Auditing", "BIOS Config"],
  },
];

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 md:py-20 font-body">
      <Header />

      {/* Projects Section */}
      <section className="mb-20">
        <h2 className="text-headline font-light font-display text-text-primary mb-10">
          Projects
        </h2>
        <div className="flex flex-col gap-10">
          {projects.map((p) => (
            <div
              key={p.title}
              className="flex flex-col md:flex-row gap-4 md:gap-8 justify-between items-start"
            >
              <div className="md:w-1/3 flex flex-col gap-2 shrink-0">
                {p.link ? (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-title font-medium text-text-primary hover:text-mint-patina transition-colors inline-flex items-center gap-1.5"
                  >
                    {p.title}
                    <svg
                      className="w-4 h-4 text-text-muted shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                ) : (
                  <span className="text-title font-medium text-text-primary">
                    {p.title}
                  </span>
                )}
                <div className="font-mono text-xs text-text-muted">
                  {p.tags.join(" / ")}
                </div>
              </div>
              <div className="md:w-2/3">
                <p className="text-text-secondary text-sm font-light leading-relaxed max-w-[65ch]">
                  {p.desc}
                </p>
                {p.title === "AI-Powered Multi-Modal Health Platform" && (
                  <ProjectVideo youtubeId="BA7dbMfby58" />
                )}


              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section className="mb-20">
        <h2 className="text-headline font-light font-display text-text-primary mb-10">
          Experience
        </h2>
        <div className="flex flex-col gap-10">
          {experiences.map((exp) => (
            <div
              key={exp.role}
              className="flex flex-col md:flex-row gap-4 md:gap-8 justify-between items-start"
            >
              <div className="md:w-1/3 flex flex-col gap-1.5 shrink-0">
                <span className="text-title font-medium text-text-primary">
                  {exp.role}
                </span>
                <span className="text-sm text-text-secondary">
                  {exp.company}
                </span>
                <div className="font-mono text-xs text-text-muted">
                  {exp.period}
                </div>
              </div>
              <div className="md:w-2/3 flex flex-col gap-2">
                <span className="text-xs font-mono text-steel-silver tracking-wide">
                  {exp.client}
                </span>
                <p className="text-text-secondary text-sm font-light leading-relaxed max-w-[65ch]">
                  {exp.desc}
                </p>
                <div className="font-mono text-xs text-text-muted mt-1">
                  {exp.tags.join(" / ")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-16">
        <h2 className="text-headline font-light font-display text-text-primary mb-10">
          Skills
        </h2>
        <div className="flex flex-col gap-6">
          {skillCategories.map((cat) => (
            <div
              key={cat.name}
              className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 border-b border-border-subtle/30 pb-4 last:border-0 last:pb-0"
            >
              <h3 className="w-48 text-xs font-mono text-steel-silver uppercase tracking-wider shrink-0">
                {cat.name}
              </h3>
              <p className="text-sm text-text-secondary font-light leading-relaxed">
                {cat.items.join(" / ")}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}