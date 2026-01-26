import { ArrowDown, ExternalLink, MapPin } from "lucide-react";
import { fullName, personalData } from "@/data/personalData";

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-16">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="animate-fade-in-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
            <p className="text-primary font-medium mb-4 tracking-wide uppercase text-sm">
              {personalData.tagline}
            </p>
          </div>
          
          <h1 
            className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-heading mb-6 leading-tight animate-fade-in-up"
            style={{ animationDelay: "0.2s", opacity: 0 }}
          >
            {fullName}
          </h1>
          
          <p 
            className="text-xl md:text-2xl text-body mb-6 font-light animate-fade-in-up"
            style={{ animationDelay: "0.3s", opacity: 0 }}
          >
            {personalData.role}
          </p>
          
          <div 
            className="flex items-center justify-center gap-2 text-subtle mb-8 animate-fade-in-up"
            style={{ animationDelay: "0.4s", opacity: 0 }}
          >
            <MapPin size={16} />
            <span>{personalData.location || personalData.address}</span>
          </div>
          
          <p 
            className="prose-blog max-w-2xl mx-auto mb-12 text-lg animate-fade-in-up"
            style={{ animationDelay: "0.5s", opacity: 0 }}
          >
            {personalData.summary}
          </p>
          
          <div
            className="flex flex-wrap items-center justify-center gap-6 animate-fade-in-up"
            style={{ animationDelay: "0.6s", opacity: 0 }}
          >
            <a
              href="#about"
              className="inline-flex items-center gap-2 text-primary hover:text-heading transition-colors"
            >
              <span className="font-medium">Read more below</span>
              <ArrowDown size={18} className="animate-bounce" />
            </a>
            {personalData.resume_url && (
              <a
                href={personalData.resume_url}
                className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-heading hover:border-primary hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>View resume</span>
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
