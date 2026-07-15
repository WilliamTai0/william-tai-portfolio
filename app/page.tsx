import Header from "@/components/Header";
import ProjectVideo from "@/components/ProjectVideo";

const projects = [
  {
    title: "AI-Powered Health App",
    desc: "FastAPI backend serving 20+ REST endpoints, LLM integration via Hugging Face (Qwen-2.5-VL), containerized ML pipeline (YOLOv8, PaddleOCR).",
    tags: ["FastAPI", "MongoDB", "Docker", "LLM API"],
    link: "https://github.com/CYNLeo/FYP_AI_Health_APP",
  },
  {
    title: "Smart Trip Planner",
    desc: "AI travel app in Flutter with Gemini 2.5 Flash Lite function-calling, Amadeus + Google Places API integration, MongoDB Atlas backend.",
    tags: ["Flutter", "Gemini API", "MongoDB", "MVVM"],
    link: "https://github.com/WilliamTai0/SmartTrip-Planner",
  },
  {
    title: "AI Developer Assistant Integration",
    desc: "Deployed Model Context Protocol (MCP) servers sandboxed in Docker to extend LLM tool execution and runtime context.",
    tags: ["MCP", "Docker", "AI Agents"],
    link: null,
  },
];

const skillCategories = [
  {
    name: "Languages",
    items: ["Python", "JavaScript", "TypeScript"],
  },
  {
    name: "Frameworks & Libraries",
    items: ["FastAPI", "Next.js", "Flutter"],
  },
  {
    name: "Databases & DevOps",
    items: ["MongoDB", "MySQL", "Docker", "Git/GitHub", "CI/CD"],
  },
  {
    name: "AI & Automation",
    items: ["LLM API Integration", "Prompt Engineering"],
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
                {p.title === "AI-Powered Health App" && (
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