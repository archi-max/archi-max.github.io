import { ExternalLink, Github, FileText, Terminal } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { personalData, type Project } from "@/data/personalData";
import { Stagger } from "@/components/Reveal";

const pinned = (personalData.projects ?? []).filter((p) => p.featured);

interface ProjectsSectionProps {
  onOpenTerminal?: () => void;
}

export function ProjectsSection({ onOpenTerminal }: ProjectsSectionProps) {
  return (
    <section id="projects">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="font-display text-xl font-semibold text-heading">
          Selected Projects
        </h2>
        <Link
          to="/projects"
          className="text-xs text-subtle hover:text-primary transition-colors"
        >
          all projects
        </Link>
      </div>

      <Stagger className="space-y-5" staggerMs={100}>
        {pinned.map((project) => {
          const isSakura = project.link?.includes("sakura");

          return (
            <div key={project.title}>
              <div className="flex items-baseline gap-3 mb-1 flex-wrap">
                <h3 className="font-display text-base font-semibold text-heading">
                  {project.title}
                </h3>
                <ProjectLinks
                  project={project}
                  onTerminalClick={isSakura ? onOpenTerminal : undefined}
                />
              </div>
              <p className="text-body text-sm leading-relaxed mb-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono text-subtle bg-muted/60 px-1.5 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </Stagger>

      <div className="mt-8">
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline hover-lift"
        >
          All projects <ArrowRight size={12} />
        </Link>
      </div>
    </section>
  );
}

function ProjectLinks({
  project,
  onTerminalClick,
}: {
  project: Project;
  onTerminalClick?: () => void;
}) {
  const hasLink = project.link && project.link !== "#";
  const hasGithub = project.github && project.github !== "#";
  const hasBlog = project.blog && project.blog !== "#";

  if (!hasLink && !hasGithub && !hasBlog && !onTerminalClick) return null;

  return (
    <span className="inline-flex items-center gap-3 flex-shrink-0">
      {onTerminalClick && (
        <button
          onClick={onTerminalClick}
          className="inline-flex items-center gap-1 text-xs text-primary hover:underline cursor-pointer glow-pulse"
        >
          <Terminal size={11} />
          try live
        </button>
      )}
      {hasLink && (
        <a
          href={project.link}
          className="inline-flex items-center gap-1 text-xs text-subtle hover:text-heading transition-colors hover-lift"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink size={11} />
          link
        </a>
      )}
      {hasGithub && (
        <a
          href={project.github}
          className="inline-flex items-center gap-1 text-xs text-subtle hover:text-heading transition-colors hover-lift"
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
          className="inline-flex items-center gap-1 text-xs text-subtle hover:text-heading transition-colors hover-lift"
        >
          <FileText size={11} />
          writeup
        </a>
      )}
    </span>
  );
}
