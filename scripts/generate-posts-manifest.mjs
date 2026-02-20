/**
 * Scans blog/pages/posts/*.mdx for frontmatter and writes
 * public/blog/posts.json (the manifest WritingSection.tsx fetches).
 *
 * No external deps — uses a simple regex frontmatter parser.
 */
import fs from "fs";
import path from "path";
import { globSync } from "glob";

const root = process.cwd();
const postsDir = path.join(root, "blog", "pages", "posts");
const outFile = path.join(root, "public", "blog", "posts.json");

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const fm = {};
  for (const line of match[1].split("\n")) {
    const m = line.match(/^(\w[\w\s]*?):\s*(.+)/);
    if (!m) continue;
    let val = m[2].trim();
    // Strip wrapping quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    // Parse arrays like ["a", "b"]
    if (val.startsWith("[")) {
      try { val = JSON.parse(val); } catch { /* keep as string */ }
    }
    fm[m[1].trim()] = val;
  }
  return fm;
}

const files = globSync(path.join(postsDir, "*.mdx"));
const posts = files
  .map((file) => {
    const content = fs.readFileSync(file, "utf8");
    const fm = parseFrontmatter(content);
    const slug = path.basename(file, ".mdx");
    return {
      title: fm.title || slug,
      date: fm.date || "",
      tags: Array.isArray(fm.tags) ? fm.tags : fm.tags ? [fm.tags] : [],
      slug,
      link: `/blog/posts/${slug}/`,
    };
  })
  .sort((a, b) => {
    // Newest first
    const da = new Date(a.date || 0);
    const db = new Date(b.date || 0);
    return db - da;
  });

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify({ posts }, null, 2), "utf8");
console.log(`Wrote ${posts.length} posts to ${outFile}`);
