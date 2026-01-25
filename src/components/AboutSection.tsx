import { BookOpen, Code2, Lightbulb, Users } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Engineering",
    description: "8+ years building scalable web applications and distributed systems",
  },
  {
    icon: Lightbulb,
    title: "Product",
    description: "Shipped products used by millions, from 0-1 and beyond",
  },
  {
    icon: Users,
    title: "Leadership",
    description: "Led engineering teams of 5-15 people across multiple time zones",
  },
  {
    icon: BookOpen,
    title: "Writing",
    description: "Published technical articles with 100k+ combined reads",
  },
];

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
            <p className="mb-4">
              I'm a software engineer with a deep interest in building products that 
              genuinely improve people's lives. My work spans from low-level systems 
              programming to high-level product strategy—I believe the best engineers 
              understand the full stack, both technical and human.
            </p>
            <p className="mb-4">
              Before my current role, I spent time at early-stage startups where I 
              learned the value of moving fast while maintaining quality. I've also 
              worked at larger companies where I gained appreciation for the challenges 
              of scale and organizational complexity.
            </p>
            <p>
              When I'm not coding, you'll find me reading about cognitive science, 
              practicing photography, or exploring the Bay Area's hiking trails. I 
              believe in the power of cross-disciplinary thinking—some of my best 
              engineering insights have come from unexpected sources.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {highlights.map((item, index) => (
              <div
                key={item.title}
                className="card-blog flex gap-4"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-heading mb-1">
                    {item.title}
                  </h3>
                  <p className="text-body text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
