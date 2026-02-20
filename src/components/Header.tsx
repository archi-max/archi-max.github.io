import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { fullName } from "@/data/personalData";

const navLinks = [
  { label: "Writing", href: "#writing" },
  { label: "Projects", href: "#projects" },
  { label: "Work", href: "#work" },
];

function useTheme() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return [dark, () => setDark((d) => !d)] as const;
}

export function Header() {
  const [dark, toggleTheme] = useTheme();

  return (
    <header
      className="pt-8 pb-2 opacity-0 animate-fade-in"
      style={{ animationDelay: "0s" }}
    >
      <div className="container mx-auto px-6 max-w-2xl">
        <nav className="flex items-center justify-between text-sm">
          <a
            href="#"
            className="font-display text-base font-semibold text-heading hover:text-primary transition-colors"
          >
            {fullName}
          </a>

          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-subtle hover:text-heading transition-colors link-underline"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={toggleTheme}
              className="text-subtle hover:text-heading transition-colors p-1"
              aria-label="Toggle theme"
            >
              {dark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
