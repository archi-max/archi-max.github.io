import { fullName } from "@/data/personalData";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-subtle text-sm">
            © {currentYear} {fullName || "Portfolio"}. All rights reserved.
          </p>
          <p className="text-subtle text-sm">
            Built with React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
