import { useState } from "react";
import {
  Calendar,
  Clock,
  ArrowUp,
  MessageSquare,
  Bookmark,
  TrendingUp,
  Filter,
} from "lucide-react";

const categories = [
  "All",
  "Engineering",
  "Architecture",
  "AI/ML",
  "Leadership",
  "Career",
  "Tools",
];

const articles = [
  {
    id: 1,
    title: "Building Reliable Distributed Systems: Lessons from Production",
    excerpt:
      "After running distributed systems at scale for 5 years, here are the patterns and anti-patterns I've learned to watch for. This post covers consensus algorithms, failure modes, and the human factors that often get overlooked in system design.",
    date: "Jan 15, 2025",
    readTime: "12 min",
    link: "#",
    category: "Engineering",
    karma: 247,
    comments: 89,
    featured: true,
    pinned: true,
  },
  {
    id: 2,
    title: "Why I Switched from Microservices Back to a Modular Monolith",
    excerpt:
      "The trade-offs nobody talks about when splitting services, and when it actually makes sense to stay monolithic. A retrospective on 3 years of microservices architecture and the surprising conclusion we reached.",
    date: "Dec 8, 2024",
    readTime: "8 min",
    link: "#",
    category: "Architecture",
    karma: 189,
    comments: 156,
    featured: true,
    pinned: false,
  },
  {
    id: 3,
    title: "The Art of Technical Decision Making Under Uncertainty",
    excerpt:
      "A framework for making better technical decisions when you don't have all the information. Drawing from decision theory and my experience leading engineering teams through ambiguous situations.",
    date: "Nov 22, 2024",
    readTime: "6 min",
    link: "#",
    category: "Leadership",
    karma: 134,
    comments: 42,
    featured: false,
    pinned: false,
  },
  {
    id: 4,
    title: "Understanding AI Code Assistants: A Technical Deep Dive",
    excerpt:
      "How modern AI code assistants work under the hood, their limitations, and where they're headed. I analyze the transformer architectures, training data considerations, and practical implications for developers.",
    date: "Oct 15, 2024",
    readTime: "15 min",
    link: "#",
    category: "AI/ML",
    karma: 312,
    comments: 127,
    featured: true,
    pinned: false,
  },
  {
    id: 5,
    title: "On Becoming a Staff Engineer: The Invisible Skills Nobody Teaches",
    excerpt:
      "The technical skills that got you to senior won't get you to staff. Here's what actually changes at the staff+ level and how to develop the meta-skills that matter most.",
    date: "Sep 30, 2024",
    readTime: "10 min",
    link: "#",
    category: "Career",
    karma: 423,
    comments: 98,
    featured: false,
    pinned: false,
  },
  {
    id: 6,
    title: "A Critique of Modern Frontend Tooling",
    excerpt:
      "We've made tremendous progress in frontend development, but at what cost? An honest look at the complexity we've introduced and whether it's all necessary.",
    date: "Sep 12, 2024",
    readTime: "7 min",
    link: "#",
    category: "Tools",
    karma: 178,
    comments: 234,
    featured: false,
    pinned: false,
  },
];

function KarmaIndicator({ karma }: { karma: number }) {
  return (
    <div className="flex flex-col items-center gap-1 min-w-[48px]">
      <button className="p-1 rounded hover:bg-accent transition-colors group">
        <ArrowUp
          size={20}
          className="text-subtle group-hover:text-primary transition-colors"
        />
      </button>
      <span className="font-semibold text-heading text-sm">{karma}</span>
    </div>
  );
}

function ArticleCard({
  article,
  variant = "default",
}: {
  article: (typeof articles)[0];
  variant?: "featured" | "default";
}) {
  const isFeatured = variant === "featured";

  return (
    <article
      className={`group ${
        isFeatured
          ? "card-blog border-l-4 border-l-primary"
          : "bg-transparent hover:bg-card rounded-lg transition-colors p-4 -mx-4"
      }`}
    >
      <div className="flex gap-4">
        <KarmaIndicator karma={article.karma} />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="px-2 py-0.5 text-xs font-medium rounded bg-accent text-accent-foreground">
              {article.category}
            </span>
            {article.pinned && (
              <span className="px-2 py-0.5 text-xs font-medium rounded bg-primary/10 text-primary flex items-center gap-1">
                <TrendingUp size={10} />
                Pinned
              </span>
            )}
          </div>

          <a href={article.link} className="block group/link">
            <h3
              className={`font-display font-semibold text-heading mb-2 group-hover/link:text-primary transition-colors ${
                isFeatured ? "text-xl" : "text-lg"
              }`}
            >
              {article.title}
            </h3>
          </a>

          <p
            className={`prose-blog mb-3 line-clamp-2 ${
              isFeatured ? "text-base" : "text-sm"
            }`}
          >
            {article.excerpt}
          </p>

          <div className="flex items-center gap-4 text-subtle text-xs">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {article.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {article.readTime}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare size={12} />
              {article.comments} comments
            </span>
            <button className="ml-auto p-1 rounded hover:bg-accent transition-colors opacity-0 group-hover:opacity-100">
              <Bookmark size={14} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export function WritingSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"recent" | "top">("recent");

  const filteredArticles = articles.filter(
    (article) => activeCategory === "All" || article.category === activeCategory
  );

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortBy === "top") {
      return b.karma - a.karma;
    }
    return 0; // Keep original order for recent
  });

  const featuredArticles = sortedArticles.filter((a) => a.featured);
  const regularArticles = sortedArticles.filter((a) => !a.featured);

  return (
    <section id="writing" className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-heading mb-4">
              Writing
            </h2>
            <div className="divider-subtle mb-4" />
            <p className="prose-blog">
              Long-form thoughts on software engineering, system design, and lessons
              learned from building products. Sorted by community engagement and
              recency.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 pb-6 border-b border-border">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 flex-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-accent"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <Filter size={14} className="text-subtle" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "recent" | "top")}
                className="text-sm bg-transparent border border-border rounded-md px-2 py-1.5 text-body focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="recent">Most Recent</option>
                <option value="top">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Featured Posts */}
          {featuredArticles.length > 0 && activeCategory === "All" && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-subtle uppercase tracking-wider mb-4">
                Featured Posts
              </h3>
              <div className="space-y-4">
                {featuredArticles.slice(0, 2).map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    variant="featured"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Divider */}
          {featuredArticles.length > 0 && activeCategory === "All" && (
            <div className="divider-subtle my-8" />
          )}

          {/* Regular Posts */}
          <div>
            <h3 className="text-sm font-semibold text-subtle uppercase tracking-wider mb-4">
              {activeCategory === "All" ? "All Posts" : activeCategory}
            </h3>
            <div className="space-y-2">
              {(activeCategory === "All" ? regularArticles : sortedArticles).map(
                (article) => (
                  <ArticleCard key={article.id} article={article} />
                )
              )}
            </div>
          </div>

          {/* Stats Footer */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <p className="text-2xl font-display font-semibold text-heading">
                  {articles.length}
                </p>
                <p className="text-sm text-subtle">Articles</p>
              </div>
              <div>
                <p className="text-2xl font-display font-semibold text-heading">
                  {articles.reduce((acc, a) => acc + a.karma, 0).toLocaleString()}
                </p>
                <p className="text-sm text-subtle">Total Karma</p>
              </div>
              <div>
                <p className="text-2xl font-display font-semibold text-heading">
                  {articles.reduce((acc, a) => acc + a.comments, 0).toLocaleString()}
                </p>
                <p className="text-sm text-subtle">Comments</p>
              </div>
              <div>
                <p className="text-2xl font-display font-semibold text-heading">
                  100k+
                </p>
                <p className="text-sm text-subtle">Readers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
