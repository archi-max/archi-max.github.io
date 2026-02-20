import { useEffect, useRef, useState } from "react";

export function AnimatedDivider() {
  const ref = useRef<HTMLHRElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <hr
      ref={ref}
      className="divider-subtle my-12"
      style={{
        transformOrigin: "left",
        transform: visible ? "scaleX(1)" : "scaleX(0)",
        transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    />
  );
}
