import { personalData } from "@/data/personalData";

const skillCategories = Object.entries(personalData.skills ?? {}).map(
  ([title, skills]) => ({ title, skills })
);

export function SkillsSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-heading mb-4">
            Skills & Technologies
          </h2>
          <div className="divider-subtle mb-12" />

          {skillCategories.length === 0 ? (
            <p className="text-subtle">
              Add skill categories to personal_data.json to list them here.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {skillCategories.map((category) => (
                <div key={category.title}>
                  <h3 className="font-display text-lg font-semibold text-heading mb-4">
                    {category.title}
                  </h3>
                  <ul className="space-y-2">
                    {category.skills.map((skill) => (
                      <li
                        key={skill}
                        className="flex items-center gap-2 text-body"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
