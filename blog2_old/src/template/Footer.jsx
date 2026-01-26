import ScratchBadge from './ScratchBadge';
import Copyright from './Copyright';

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-1 py-8 text-sm" style={{ color: "hsl(var(--text-subtle))" }}>
      <ScratchBadge />
      <Copyright />
    </footer>
  );
}
