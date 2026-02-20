import { useEffect, useState } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Stagger } from "@/components/Reveal";

type Article = {
  title: string;
  date: string;
  link: string;
  category: string;
};

const fallbackArticles: Article[] = [
  {
    title: "First Blog!",
    date: "2026-02-20",
    link: "/blog/posts/hello/",
    category: "meta",
  },
  {
    title: "Reliability Notes: Designing for Failure",
    date: "2025-01-20",
    link: "/blog/posts/reliability-notes/",
    category: "Engineering",
  },
];

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  } catch {
    return dateStr;
  }
}

export function WritingSection() {
  const [articles, setArticles] = useState<Article[]>(fallbackArticles);

  useEffect(() => {
    const fetchManifest = async () => {
      try {
        const res = await fetch("/blog/posts.json");
        if (!res.ok) return;
        const data = await res.json();
        if (!Array.isArray(data.posts)) return;

        const mapped: Article[] = data.posts.map((post: any) => ({
          title: post.title,
          date: post.date ?? "",
          link: post.link ?? `/blog/posts/${post.slug ?? ""}/`,
          category:
            Array.isArray(post.tags) && post.tags.length > 0
              ? post.tags[0]
              : "Writing",
        }));

        if (mapped.length > 0) {
          setArticles(mapped);
        }
      } catch {
        // fallback articles are already set
      }
    };

    fetchManifest();
  }, []);

  return (
    <section id="writing">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="font-display text-xl font-semibold text-heading">
          Writing
        </h2>
        <a
          href="/blog/"
          className="text-xs text-subtle hover:text-primary transition-colors"
        >
          all posts
        </a>
      </div>

      <Stagger className="space-y-3" staggerMs={80}>
        {articles.map((article) => (
          <a
            key={article.title}
            href={article.link}
            className="group flex items-center gap-4 py-1.5 -mx-3 px-3 rounded-md hover:bg-muted/40 transition-colors"
          >
            <span className="text-xs text-subtle tabular-nums flex-shrink-0 w-16">
              {formatDate(article.date)}
            </span>
            <span className="text-body group-hover:text-heading transition-colors text-sm leading-snug flex-1">
              {article.title}
            </span>
            <ChevronRight
              size={14}
              className="text-subtle opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 flex-shrink-0"
            />
          </a>
        ))}
      </Stagger>

      <div className="mt-6">
        <a
          href="/blog/"
          className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline hover-lift"
        >
          More writing <ArrowRight size={12} />
        </a>
      </div>
    </section>
  );
}
