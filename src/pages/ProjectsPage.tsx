import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { personalData, type Project } from "@/data/personalData";
import { ProjectSearchBar } from "@/components/ProjectSearchBar";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectDetailModal } from "@/components/ProjectDetailModal";

const allProjects = [...(personalData.projects ?? [])].sort(
  (a, b) => Number(b.featured) - Number(a.featured)
);

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    if (!search.trim()) return allProjects;
    const query = search.toLowerCase();
    return allProjects.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some((t) => t.toLowerCase().includes(query))
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-subtle hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-heading mb-4">
            Projects
          </h1>
          <p className="prose-blog mb-8 max-w-2xl">
            A collection of projects I've built or contributed to. Most are open source
            and available on GitHub. Click any project to learn more.
          </p>

          <div className="mb-10">
            <ProjectSearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search by name, description, or technology..."
            />
            {search && (
              <p className="text-sm text-subtle mt-2">
                {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""} found
              </p>
            )}
          </div>

          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-subtle">No projects match your search.</p>
            </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <ProjectDetailModal
        project={selectedProject}
        open={!!selectedProject}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      />
    </div>
  );
}
