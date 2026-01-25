import { ExternalLink } from "lucide-react";

const experiences = [
  {
    role: "Senior Software Engineer",
    company: "TechCorp AI",
    companyUrl: "#",
    period: "2022 — Present",
    description: `Leading the development of AI-powered developer tools that help engineering teams ship faster. I work across the stack, from designing system architecture to implementing ML pipelines and crafting intuitive user interfaces.`,
    highlights: [
      "Architected a real-time code analysis system processing 10M+ daily requests",
      "Reduced inference latency by 60% through model optimization and caching strategies",
      "Mentored 4 junior engineers, helping them grow into senior contributors",
    ],
    tags: ["TypeScript", "Python", "Kubernetes", "ML Systems"],
  },
  {
    role: "Software Engineer",
    company: "ScaleUp Inc",
    companyUrl: "#",
    period: "2019 — 2022",
    description: `Built core infrastructure for a B2B SaaS platform serving 500+ enterprise customers. Focused on reliability, performance, and developer experience.`,
    highlights: [
      "Designed and implemented a multi-tenant architecture supporting 99.99% uptime",
      "Led migration from monolith to microservices, reducing deployment time by 80%",
      "Created internal tooling that improved developer productivity by 40%",
    ],
    tags: ["Go", "PostgreSQL", "AWS", "Terraform"],
  },
  {
    role: "Full Stack Developer",
    company: "Startup Labs",
    companyUrl: "#",
    period: "2017 — 2019",
    description: `Early engineer at a seed-stage startup, wearing many hats from frontend development to DevOps. This is where I learned to move fast and iterate based on user feedback.`,
    highlights: [
      "Built MVP that secured $2M seed funding",
      "Implemented real-time collaboration features using WebSockets",
      "Established engineering practices that scaled with the team",
    ],
    tags: ["React", "Node.js", "MongoDB", "Redis"],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-heading mb-4">
            Experience
          </h2>
          <div className="divider-subtle mb-12" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <article
                key={exp.company}
                className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-border"
              >
                <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-primary -translate-x-[3.5px]" />
                
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
                  <h3 className="font-display text-xl font-semibold text-heading">
                    {exp.role}
                  </h3>
                  <span className="text-subtle text-sm">{exp.period}</span>
                </div>
                
                <a
                  href={exp.companyUrl}
                  className="inline-flex items-center gap-1 text-primary font-medium mb-4 hover:underline"
                >
                  {exp.company}
                  <ExternalLink size={14} />
                </a>
                
                <p className="prose-blog mb-4">{exp.description}</p>
                
                <ul className="space-y-2 mb-4">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="flex gap-2 text-body">
                      <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
