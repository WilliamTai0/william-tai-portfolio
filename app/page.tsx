import Header from "@/components/Header";
import ProjectVideo from "@/components/ProjectVideo";

const projects = [
  {
    title: "AI-Powered Multi-Modal Health Platform",
    desc: "HKUST Final Year Project (Grade A) backend serving 30+ RESTful endpoints. Integrated multi-modal LLM pipeline with Qwen-2.5-VL-72B via Hugging Face Router, MongoDB GridFS binary media storage, and containerized deployment in Docker Compose.",
    tags: ["FastAPI", "MongoDB GridFS", "Docker", "Qwen-2.5-VL"],
    link: "https://github.com/CYNLeo/FYP_AI_Health_APP",
  },
  {
    title: "Smart Trip Planner",
    desc: "Agentic travel application built with Flutter and Gemini 2.5 Flash Lite tool-calling. Intercepts queries to trigger Amadeus & Google Places APIs, resolving IATA codes and synthesizing multi-day itineraries persisted in MongoDB Atlas.",
    tags: ["Flutter", "Gemini Tool Calling", "MongoDB Atlas", "MVVM"],
    link: "https://github.com/WilliamTai0/SmartTrip-Planner",
  },
  {
    title: "AI Developer Toolchain & MCP Integration",
    desc: "Deployed containerized Model Context Protocol (MCP) servers in Docker to securely bridge local AI coding assistants with GitHub APIs and filesystem operations via structured JSON schema tool interfaces.",
    tags: ["Model Context Protocol", "Docker", "Python", "Tool Interception"],
    link: null,
  },
  {
    title: "TimeLock Anti-Addiction Android App",
    desc: "Native Android application built with Kotlin, Jetpack Compose, and Room. Features a persistent StateFlow heartbeat engine to eliminate background coroutine freezes, single-use token emergency pass, and Xiaomi background suppression bypass.",
    tags: ["Kotlin", "Jetpack Compose", "Room / SQLite", "Material 3"],
    link: null,
  },
  {
    title: "React Testing & CI Pipeline Showcase",
    desc: "Production-grade integration test suite using Vitest and React Testing Library with Mock Service Worker (MSW) to simulate 401, 404, and 500 network states. Configured automated test runs and coverage reporting via GitHub Actions CI.",
    tags: ["Vitest", "React Testing Library", "MSW", "GitHub Actions"],
    link: "https://github.com/WilliamTai0/react-vitest-ci-showcase",
  },
];

const skillCategories = [
  {
    name: "AI & Agent Systems",
    items: [
      "Model Context Protocol (MCP)",
      "LLM Tool Calling & Interception",
      "Structured Output & JSON Schema",
      "Hugging Face Router",
      "Prompt Engineering",
    ],
  },
  {
    name: "Backend & Systems",
    items: [
      "Python (FastAPI)",
      "RESTful API Design",
      "Docker & Docker Compose",
      "Linux (Ubuntu)",
      "Microservice Integration",
      "Azure (SQL, Key Vault)",
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
      "MySQL",
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