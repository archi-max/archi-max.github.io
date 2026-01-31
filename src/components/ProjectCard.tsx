import { ExternalLink, Github, Star } from "lucide-react";
import type { Project } from "@/data/personalData";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <article
      className="card-blog flex flex-col cursor-pointer group break-inside-avoid mb-4"
      onClick={onClick}
    >
      {project.image && (
        <div className="relative w-full rounded-t-lg overflow-hidden -mt-4 -mx-4 mb-4" style={{ width: 'calc(100% + 2rem)' }}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
        </div>
      )}

      <div className="flex items-start justify-between gap-4 mb-2">
        <h3 className="font-display text-lg font-semibold text-heading group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <div className="flex items-center gap-1 text-subtle text-sm flex-shrink-0">
          <Star size={14} className="text-primary fill-primary/20" />
          <span>{project.stars}</span>
        </div>
      </div>

      <p className="prose-blog text-sm flex-grow mb-3 line-clamp-3">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-xs font-medium rounded-full bg-accent/70 text-accent-foreground"
          >
            {tag}
          </span>
        ))}
        {project.tags.length > 4 && (
          <span className="px-2 py-0.5 text-xs text-subtle">
            +{project.tags.length - 4}
          </span>
        )}
      </div>

      <div className="flex items-center gap-4 pt-3 border-t border-border/50">
        <a
          href={project.link}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          <ExternalLink size={14} />
          <span>View</span>
        </a>
        <a
          href={project.github}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 text-sm text-body hover:text-primary transition-colors"
        >
          <Github size={14} />
          <span>Source</span>
        </a>
      </div>
    </article>
  );
}
