import { Github, Linkedin, Link2, Mail, Twitter } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { personalData, type SocialType } from "@/data/personalData";

const baseSocialLinks = personalData.contact?.socials ?? [];

const socialLinks = personalData.resume_url
  ? [
      ...baseSocialLinks,
      {
        type: "website" as const,
        label: "Resume",
        url: personalData.resume_url,
        handle: "Download PDF",
      },
    ]
  : baseSocialLinks;

const iconMap: Record<SocialType, LucideIcon> = {
  email: Mail,
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  website: Link2,
};

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
            {socialLinks.map((link) => {
              const Icon = iconMap[link.type as SocialType] ?? Link2;

              return (
                <a
                  key={`${link.label}-${link.url}`}
                  href={link.url}
                  className="card-blog flex items-center gap-3 px-6 py-4 min-w-[200px]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-heading text-sm">{link.label}</p>
                    <p className="text-subtle text-xs">{link.handle}</p>
                  </div>
                </a>
              );
            })}
          </div>

          <div className="text-subtle text-sm space-y-1">
            <p>Based in {personalData.location || personalData.contact?.address}</p>
            <p>
              {personalData.contact?.email}
              {personalData.contact?.phone ? ` · ${personalData.contact.phone}` : ""}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
