import React from "react";

export default function TOC({ items = [] }) {
  if (!items.length) return null;

  return (
    <aside
      className="hidden lg:block lg:w-64 xl:w-72 pr-6"
      aria-label="Table of contents"
      style={{ color: "hsl(var(--text-subtle))" }}
    >
      <div className="sticky top-24 flex flex-col gap-3 text-sm leading-6">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="hover:text-primary transition-colors"
          >
            {item.title}
          </a>
        ))}
      </div>
    </aside>
  );
}
