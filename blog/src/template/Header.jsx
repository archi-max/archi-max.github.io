import { useState, useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function Header({ base = '' }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 20);
      if (y - lastY.current > 10 && y > 80) {
        setIsHidden(true);
      } else if (lastY.current - y > 10) {
        setIsHidden(false);
      }
      lastY.current = y;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-sm shadow-card'
          : 'bg-transparent'
      } ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className="mx-auto max-w-[1180px] px-6 py-4">
        <nav className="flex items-center justify-between text-sm">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-subtle hover:text-heading transition-colors"
          >
            <ArrowLeft size={14} />
            ansht.dev
          </a>

          <a
            href={`${base}/`}
            className="text-subtle hover:text-heading transition-colors"
          >
            posts
          </a>
        </nav>
      </div>
    </header>
  );
}
