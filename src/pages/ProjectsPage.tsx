import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github, FileText } from "lucide-react";
import { personalData, type Project } from "@/data/personalData";

const allProjects = personalData.projects ?? [];

// Collect all unique tags across projects
const allTags = Array.from(
  new Set(allProjects.flatMap((p) => p.tags))
).sort();

export default function ProjectsPage() {
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filtered = useMemo(() => {
    if (activeTags.length === 0) return allProjects;
    return allProjects.filter((p) =>
      activeTags.some((tag) => p.tags.includes(tag))
    );
  }, [activeTags]);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-6 max-w-2xl py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-subtle hover:text-heading transition-colors mb-10"
        >
          <ArrowLeft size={14} />
          home
        </Link>

        <h1 className="font-display text-3xl font-semibold text-heading mb-3">
          Projects
        </h1>
        <p className="text-body text-sm mb-8">
          Things I've built across classes, hackathons, research, and weekends.
          Some have writeups, some are just code.
        </p>

        {/* Tag filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {allTags.map((tag) => {
            const isActive = activeTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border/60 text-subtle hover:text-heading hover:border-border"
                }`}
              >
                {tag}
              </button>
            );
          })}
          {activeTags.length > 0 && (
            <button
              onClick={() => setActiveTags([])}
              className="px-2.5 py-1 text-xs text-subtle hover:text-heading transition-colors"
            >
              clear
            </button>
          )}
        </div>

        {/* Project list */}
        {filtered.length === 0 ? (
          <p className="text-subtle text-sm py-8">
            No projects match those tags.
          </p>
        ) : (
          <ul className="space-y-8">
            {filtered.map((project) => (
              <ProjectItem key={project.title} project={project} />
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

function ProjectItem({ project }: { project: Project }) {
  const hasLink = project.link && project.link !== "#";
  const hasGithub = project.github && project.github !== "#";
  const hasBlog = project.blog && project.blog !== "#";

  return (
    <li>
      <div className="flex items-baseline gap-3 mb-1 flex-wrap">
        <h2 className="font-display text-base font-semibold text-heading">
          {project.title}
        </h2>
        <span className="inline-flex items-center gap-3 flex-shrink-0">
          {hasLink && (
            <a
              href={project.link}
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={11} />
              demo
            </a>
          )}
          {hasGithub && (
            <a
              href={project.github}
              className="inline-flex items-center gap-1 text-xs text-subtle hover:text-heading transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={12} />
              code
            </a>
          )}
          {hasBlog && (
            <a
              href={project.blog}
              className="inline-flex items-center gap-1 text-xs text-subtle hover:text-heading transition-colors"
            >
              <FileText size={11} />
              writeup
            </a>
          )}
        </span>
      </div>
      <p className="text-body text-sm leading-relaxed mb-2">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span key={tag} className="text-xs text-subtle">
            {tag}
          </span>
        ))}
      </div>
    </li>
  );
}
