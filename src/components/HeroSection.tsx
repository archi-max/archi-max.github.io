import { Github, Linkedin, Mail, Twitter, ExternalLink } from "lucide-react";
import { fullName, personalData } from "@/data/personalData";

export function HeroSection() {
  return (
    <section className="pt-20 pb-6 relative">
      {/* Subtle dot grid background */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <p
        className="font-mono text-xs tracking-widest uppercase text-primary mb-4 opacity-0 animate-fade-in"
        style={{ animationDelay: "0.05s" }}
      >
        {personalData.tagline}
      </p>

      <h1
        className="font-display text-4xl md:text-5xl font-bold text-heading mb-3 tracking-tight opacity-0 animate-fade-in"
        style={{ animationDelay: "0.1s" }}
      >
        {fullName}
      </h1>

      <p
        className="text-body text-lg mb-6 opacity-0 animate-fade-in"
        style={{ animationDelay: "0.2s" }}
      >
        {personalData.role}
      </p>

      <div
        className="prose-blog text-base mb-8 max-w-xl opacity-0 animate-fade-in"
        style={{ animationDelay: "0.3s" }}
      >
        <p>{personalData.summary}</p>
      </div>

      <div
        className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm opacity-0 animate-fade-in"
        style={{ animationDelay: "0.4s" }}
      >
        {[
          { href: "mailto:ansht2@illinois.edu", icon: Mail, label: "email", external: false },
          { href: "https://github.com/archi-max", icon: Github, label: "github", external: true },
          { href: "https://twitter.com/__ansht", icon: Twitter, label: "twitter", external: true },
          { href: "https://www.linkedin.com/in/anshtulsyan", icon: Linkedin, label: "linkedin", external: true },
        ].map(({ href, icon: Icon, label, external }) => (
          <a
            key={label}
            href={href}
            className="inline-flex items-center gap-1.5 text-subtle hover:text-primary transition-all duration-200 hover-lift"
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
          >
            <Icon size={14} />
            {label}
          </a>
        ))}
        {personalData.resume_url && (
          <a
            href={personalData.resume_url}
            className="inline-flex items-center gap-1.5 text-subtle hover:text-primary transition-all duration-200 hover-lift"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink size={14} />
            resume
          </a>
        )}
      </div>
    </section>
  );
}
