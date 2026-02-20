import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { WritingSection } from "@/components/WritingSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { AnimatedDivider } from "@/components/AnimatedDivider";
import { SakuraTerminal } from "@/components/SakuraTerminal";

const Index = () => {
  const [terminalOpen, setTerminalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 max-w-2xl">
        <HeroSection />

        <AnimatedDivider />

        <Reveal>
          <WritingSection />
        </Reveal>

        <div className="my-16" />

        <Reveal>
          <ProjectsSection onOpenTerminal={() => setTerminalOpen(true)} />
        </Reveal>

        <AnimatedDivider />

        <Reveal>
          <ExperienceSection />
        </Reveal>
      </main>
      <Footer />

      <SakuraTerminal
        open={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />
    </div>
  );
};

export default Index;
