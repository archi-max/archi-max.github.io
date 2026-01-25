import { Mail, Github, Linkedin, Twitter } from "lucide-react";

const socialLinks = [
  {
    name: "Email",
    href: "mailto:alex@example.com",
    icon: Mail,
    handle: "alex@example.com",
  },
  {
    name: "GitHub",
    href: "https://github.com",
    icon: Github,
    handle: "@alexmorgan",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: Linkedin,
    handle: "in/alexmorgan",
  },
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: Twitter,
    handle: "@alexmorgan",
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-heading mb-4">
            Get in Touch
          </h2>
          <div className="divider-subtle max-w-xs mx-auto mb-8" />

          <p className="prose-blog text-lg max-w-xl mx-auto mb-12">
            I'm always interested in hearing about new opportunities, interesting
            projects, or just connecting with fellow builders. Feel free to reach
            out!
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="card-blog flex items-center gap-3 px-6 py-4 min-w-[200px]"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <link.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-heading text-sm">{link.name}</p>
                  <p className="text-subtle text-xs">{link.handle}</p>
                </div>
              </a>
            ))}
          </div>

          <p className="text-subtle text-sm">
            Currently open to senior engineering roles and technical advising opportunities.
          </p>
        </div>
      </div>
    </section>
  );
}
