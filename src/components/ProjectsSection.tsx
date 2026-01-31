import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { personalData, type Project } from "@/data/personalData";
import { ProjectSearchBar } from "@/components/ProjectSearchBar";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectDetailModal } from "@/components/ProjectDetailModal";

const projects = [...(personalData.projects ?? [])].sort(
  (a, b) => Number(b.featured) - Number(a.featured)
);

// Show featured projects on homepage, limited to 4
const featuredProjects = projects.slice(0, 4);

// Extract top filter categories (you can customize these)
const TOP_FILTER_TAGS = ["AI", "Web", "Data", "DevTools"];

export function ProjectsSection() {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredProjects = useMemo(() => {
    let result = featuredProjects;

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

  return (
    <section id="projects" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-heading mb-4">
            Projects
          </h2>
          <div className="divider-subtle mb-4" />
          <p className="prose-blog mb-8">
            A selection of projects I've built or contributed to. Most are open source
            and available on GitHub.
          </p>

          <div className="mb-8">
            <ProjectSearchBar
              value={search}
              onChange={setSearch}
              placeholder="Filter projects..."
              tags={TOP_FILTER_TAGS}
              selectedTags={selectedTags}
              onTagToggle={handleTagToggle}
            />
          </div>

          {projects.length === 0 ? (
            <p className="text-subtle">
              Add your projects to personal_data.json to showcase them here.
            </p>
          ) : filteredProjects.length === 0 ? (
            <p className="text-subtle py-8 text-center">No projects match your filters.</p>
          ) : (
            <div className="columns-1 md:columns-2 gap-4">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          )}

          {projects.length > 4 && (
            <div className="mt-10 text-center">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
              >
                View all projects
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </div>

      <ProjectDetailModal
        project={selectedProject}
        open={!!selectedProject}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      />
    </section>
  );
}
