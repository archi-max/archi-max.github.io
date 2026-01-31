import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ExternalLink, Github, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/personalData";

interface ProjectDetailModalProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectDetailModal({ project, open, onOpenChange }: ProjectDetailModalProps) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-background">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <DialogTitle className="font-display text-2xl text-heading">
              {project.title}
            </DialogTitle>
            <div className="flex items-center gap-1 text-subtle text-sm flex-shrink-0 mt-1">
              <Star size={14} className="text-primary fill-primary/20" />
              <span>{project.stars}</span>
            </div>
          </div>
          <DialogDescription className="sr-only">
            Details about {project.title}
          </DialogDescription>
        </DialogHeader>

        {project.image && (
          <div className="relative w-full rounded-lg overflow-hidden border border-border/50">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <div className="space-y-4">
          <p className="prose-blog">{project.description}</p>
          
          {project.longDescription && (
            <div className="prose-blog text-sm space-y-3 border-t border-border/50 pt-4">
              {project.longDescription.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-medium rounded-full bg-accent text-accent-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-border/50">
            <Button asChild variant="default" size="sm">
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={14} />
                View Project
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github size={14} />
                Source Code
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
