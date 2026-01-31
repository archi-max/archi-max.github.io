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

// Top filter categories for the projects page
const TOP_FILTER_TAGS = ["AI", "Hardware", "Web", "Data", "Mobile", "DevTools"];

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredProjects = useMemo(() => {
    let result = allProjects;

    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query))
      );
    }

    if (selectedTags.length > 0) {
      result = result.filter((p) =>
        selectedTags.some((tag) =>
          p.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase()))
        )
      );
    }

    return result;
  }, [search, selectedTags]);

  const resultCount = filteredProjects.length;
  const hasFilters = search.trim() || selectedTags.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-subtle hover:text-primary transition-colors"
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

          <div className="mb-8">
            <ProjectSearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search by name, description, or technology..."
              tags={TOP_FILTER_TAGS}
              selectedTags={selectedTags}
              onTagToggle={handleTagToggle}
            />
            {hasFilters && (
              <p className="text-sm text-subtle mt-3">
                {resultCount} project{resultCount !== 1 ? "s" : ""} found
              </p>
            )}
          </div>

          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-subtle">No projects match your filters.</p>
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
