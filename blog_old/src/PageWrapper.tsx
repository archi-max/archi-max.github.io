import React from "react";
import "./tailwind.css";

type Props = {
  children: React.ReactNode;
};

export default function PageWrapper({ children }: Props) {
  return (
    <div className="min-h-screen bg-background text-body">
      <header className="border-b border-border bg-card/70 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <a href="/" className="font-display text-xl text-heading hover:text-primary transition-colors">
            Ansh Tulsyan
          </a>
          <div className="flex items-center gap-4 text-sm text-subtle">
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <span className="text-border">|</span>
            <span className="font-medium text-heading">Blog</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 lg:py-16">
        <div className="max-w-3xl mx-auto">
          {children}
        </div>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-subtle">
        <p>Essays on engineering, product, and systems thinking.</p>
        <p className="mt-1">LessWrong-inspired typography · MDX-powered</p>
      </footer>
    </div>
  );
}
