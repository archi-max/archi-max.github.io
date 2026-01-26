import { ExternalLink, Github, Star } from "lucide-react";
import { personalData } from "@/data/personalData";

const projects = [...(personalData.projects ?? [])].sort((a, b) => Number(b.featured) - Number(a.featured));

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-heading mb-4">
            Projects
          </h2>
          <div className="divider-subtle mb-4" />
          <p className="prose-blog mb-12">
            A selection of projects I've built or contributed to. Most are open source
            and available on GitHub.
          </p>

          {projects.length === 0 ? (
            <p className="text-subtle">
              Add your projects to personal_data.json to showcase them here.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <article key={project.title} className="card-blog flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-display text-xl font-semibold text-heading">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-1 text-subtle text-sm flex-shrink-0">
                      <Star size={14} className="text-primary" />
                      <span>{project.stars}</span>
                    </div>
                  </div>

                  <p className="prose-blog text-sm flex-grow mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs font-medium rounded bg-accent text-accent-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-border">
                    <a
                      href={project.link}
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      <ExternalLink size={14} />
                      <span>View Project</span>
                    </a>
                    <a
                      href={project.github}
                      className="inline-flex items-center gap-1 text-sm text-body hover:text-primary transition-colors"
                    >
                      <Github size={14} />
                      <span>Source</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
