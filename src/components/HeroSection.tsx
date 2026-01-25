import { ArrowDown, MapPin } from "lucide-react";

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-16">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="animate-fade-in-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
            <p className="text-primary font-medium mb-4 tracking-wide uppercase text-sm">
              Welcome to my corner of the internet
            </p>
          </div>
          
          <h1 
            className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-heading mb-6 leading-tight animate-fade-in-up"
            style={{ animationDelay: "0.2s", opacity: 0 }}
          >
            Alex Morgan
          </h1>
          
          <p 
            className="text-xl md:text-2xl text-body mb-6 font-light animate-fade-in-up"
            style={{ animationDelay: "0.3s", opacity: 0 }}
          >
            Software Engineer & Product Thinker
          </p>
          
          <div 
            className="flex items-center justify-center gap-2 text-subtle mb-8 animate-fade-in-up"
            style={{ animationDelay: "0.4s", opacity: 0 }}
          >
            <MapPin size={16} />
            <span>San Francisco, CA</span>
          </div>
          
          <p 
            className="prose-blog max-w-2xl mx-auto mb-12 text-lg animate-fade-in-up"
            style={{ animationDelay: "0.5s", opacity: 0 }}
          >
            I build thoughtful software products and write about technology, 
            design systems, and the intersection of human behavior and machines. 
            Currently exploring AI-assisted development at scale.
          </p>
          
          <a
            href="#about"
            className="inline-flex items-center gap-2 text-primary hover:text-heading transition-colors animate-fade-in-up"
            style={{ animationDelay: "0.6s", opacity: 0 }}
          >
            <span className="font-medium">Read more below</span>
            <ArrowDown size={18} className="animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
