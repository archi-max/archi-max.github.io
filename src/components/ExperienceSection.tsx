import { ExternalLink } from "lucide-react";
import { personalData } from "@/data/personalData";

const experiences = personalData.experience ?? [];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-heading mb-4">
            Experience
          </h2>
          <div className="divider-subtle mb-12" />

          {experiences.length === 0 ? (
            <p className="text-subtle">
              Add your experience entries to personal_data.json to see them here.
            </p>
          ) : (
            <div className="space-y-12">
              {experiences.map((exp) => (
                <article
                  key={`${exp.company}-${exp.role}`}
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
          )}
        </div>
      </div>
    </section>
  );
}
