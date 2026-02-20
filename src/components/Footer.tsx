import { fullName } from "@/data/personalData";

export function Footer() {
  return (
    <footer className="mt-20 mb-12">
      <div className="container mx-auto px-6 max-w-2xl">
        <hr className="divider-subtle mb-8" />

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-subtle">
          <span>{fullName}</span>
          <span>·</span>
          <a
            href="mailto:ansht2@illinois.edu"
            className="hover:text-heading transition-colors"
          >
            ansht2@illinois.edu
          </a>
          <span>·</span>
          <a
            href="https://twitter.com/__ansht"
            className="hover:text-heading transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            @__ansht
          </a>
          <span>·</span>
          <a
            href="https://github.com/archi-max"
            className="hover:text-heading transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            github
          </a>
        </div>

        <p className="text-[11px] text-subtle/50 mt-4">
          React + Tailwind. Sakura boots a real RISC-V kernel in your browser.
        </p>
      </div>
    </footer>
  );
}
