export default function Header({ base = '' }) {
  return (
    <header
      className="border-b bg-card/70 backdrop-blur-sm"
      style={{ borderColor: "hsl(var(--border))" }}
    >
      <div className="container mx-auto px-6 py-5 flex items-center justify-between">
        <a
          href="/"
          className="font-display text-xl font-semibold hover:text-primary transition-colors"
          style={{ color: "hsl(var(--text-heading))" }}
        >
          Ansh Tulsyan
        </a>
        <nav className="flex items-center gap-4 text-sm" style={{ color: "hsl(var(--text-subtle))" }}>
          <a href={`${base || ''}/`} className="hover:text-primary transition-colors">Blog Home</a>
          <a href="/" className="hover:text-primary transition-colors">Portfolio</a>
          <a href="/#contact" className="hover:text-primary transition-colors">Contact</a>
        </nav>
      </div>
    </header>
  );
}
