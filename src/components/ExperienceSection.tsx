import { personalData } from "@/data/personalData";
import { Stagger } from "@/components/Reveal";

const experiences = personalData.experience ?? [];

export function ExperienceSection() {
  if (experiences.length === 0) return null;

  return (
    <section id="work">
      <h2 className="font-display text-xl font-semibold text-heading mb-6">
        Work
      </h2>

      <ul className="space-y-6">
        {experiences.map((exp) => (
          <li key={`${exp.company}-${exp.role}`}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
              <h3 className="font-display text-base font-semibold text-heading">
                {exp.company}
              </h3>
              <span className="text-xs text-subtle">{exp.period}</span>
            </div>
            <p className="text-body text-sm italic mb-2">{exp.role}</p>
            <p className="text-body text-sm leading-relaxed mb-2">
              {exp.description}
            </p>
            <Stagger className="space-y-1" staggerMs={70}>
              {exp.highlights.slice(0, 3).map((h, i) => (
                <div key={i} className="text-body text-sm leading-relaxed flex gap-2">
                  <span className="text-subtle flex-shrink-0">-</span>
                  <span>{h}</span>
                </div>
              ))}
            </Stagger>
          </li>
        ))}
      </ul>
    </section>
  );
}
