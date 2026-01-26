import { useEffect, useState } from "react";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

type Article = {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  link: string;
  category: string;
  isInternal: boolean;
};

const fallbackArticles: Article[] = [
  {
    title: "Building Reliable Distributed Systems: Lessons from Production",
    excerpt:
      "After running distributed systems at scale for 5 years, here are the patterns and anti-patterns I've learned to watch for...",
    date: "Jan 20, 2025",
    readTime: "8 min read",
    link: "/blog/posts/reliability-notes/",
    category: "Engineering",
    isInternal: false,
  },
  {
    title: "Why I Switched from Microservices Back to a Modular Monolith",
    excerpt:
      "The trade-offs nobody talks about when splitting services, and when it actually makes sense to stay monolithic...",
    date: "Dec 8, 2024",
    readTime: "8 min read",
    link: "#",
    category: "Architecture",
    isInternal: false,
  },
  {
    title: "The Art of Technical Decision Making",
    excerpt:
      "A framework for making better technical decisions when you don't have all the information...",
    date: "Nov 22, 2024",
    readTime: "6 min read",
    link: "/blog/",
    category: "Leadership",
    isInternal: false,
  },
  {
    title: "Understanding AI Code Assistants: A Technical Deep Dive",
    excerpt:
      "How modern AI code assistants work under the hood, their limitations, and where they're headed...",
    date: "Oct 15, 2024",
    readTime: "15 min read",
    link: "/blog/",
    category: "AI/ML",
    isInternal: false,
  },
];

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
          excerpt: post.description ?? "",
          date: post.date ?? "",
          readTime: post.readTime ?? "",
          link: post.link ?? `/blog/posts/${post.slug ?? ""}/`,
          category: Array.isArray(post.tags) && post.tags.length > 0 ? post.tags[0] : "Writing",
          isInternal: false,
        }));

        if (mapped.length > 0) {
          setArticles(mapped);
        }
      } catch (error) {
        console.warn("Unable to load blog manifest", error);
      }
    };

    fetchManifest();
  }, []);

  return (
    <section id="writing" className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-heading mb-4">
            Writing
          </h2>
          <div className="divider-subtle mb-4" />
          <p className="prose-blog mb-12">
            I write about software engineering, system design, and lessons learned
            from building products. Here are some recent pieces.
          </p>

          <div className="space-y-6">
            {articles.map((article) => {
              const content = (
                <>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-0.5 text-xs font-medium rounded bg-accent text-accent-foreground">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-4 text-subtle text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {article.readTime}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-semibold text-heading mb-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>

                  <p className="prose-blog text-sm mb-4">{article.excerpt}</p>

                  <span className="inline-flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
                    Read more
                    <ArrowRight size={14} />
                  </span>
                </>
              );

              return (
                <article
                  key={article.title}
                  className="card-blog group cursor-pointer"
                >
                  {article.isInternal ? (
                    <Link to={article.link} className="block">
                      {content}
                    </Link>
                  ) : (
                    <a href={article.link} className="block">
                      {content}
                    </a>
                  )}
                </article>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <a
              href="/blog/"
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
            >
              View all articles
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
