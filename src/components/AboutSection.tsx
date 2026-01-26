import type { LucideIcon } from "lucide-react";
import { BookOpen, Code2, Lightbulb, Users } from "lucide-react";
import { personalData, type HighlightIcon } from "@/data/personalData";

const highlightIcons: Record<HighlightIcon, LucideIcon> = {
  code2: Code2,
  lightbulb: Lightbulb,
  users: Users,
  bookopen: BookOpen,
};

const highlights = personalData.about?.highlights ?? [];
const aboutParagraphs = personalData.about?.paragraphs ?? [];

const getHighlightIcon = (icon?: HighlightIcon) =>
  highlightIcons[icon ?? "code2"] ?? Code2;

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-heading mb-4">
            About Me
          </h2>
          <div className="divider-subtle mb-8" />
          
          <div className="prose-blog text-lg mb-12">
            {aboutParagraphs.map((paragraph, index) => (
              <p key={index} className={index < aboutParagraphs.length - 1 ? "mb-4" : undefined}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {highlights.map((item, index) => {
              const Icon = getHighlightIcon(item.icon);

              return (
              <div
                key={item.title}
                className="card-blog flex gap-4"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-heading mb-1">
                    {item.title}
                  </h3>
                  <p className="text-body text-sm">{item.description}</p>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
