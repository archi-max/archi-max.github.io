import fs from "fs";
import path from "path";
import fg from "fast-glob";
import matter from "gray-matter";

const root = process.cwd();
const postsPattern = "pages/posts/**/*.mdx";
const distDir = path.join(root, "dist");
const publicBlogDir = path.join(root, "../public/blog2");

function toSlug(filePath, frontmatterSlug) {
  if (frontmatterSlug) return frontmatterSlug;
  return path.basename(filePath, path.extname(filePath));
}

async function buildManifest() {
  const files = await fg(postsPattern, { cwd: root });

  const posts = files
    .map((relativePath) => {
      const absolutePath = path.join(root, relativePath);
      const raw = fs.readFileSync(absolutePath, "utf8");
      const { data } = matter(raw);
      const slug = toSlug(relativePath, data.slug);

      if (!data.title) return null;

      return {
        title: data.title,
        description: data.description || "",
        date: data.date || "",
        readTime: data.readTime || "",
        tags: data.tags || [],
        slug,
        link: `/blog/posts/${slug}/`,
      };
    })
    .filter(Boolean);

  fs.mkdirSync(distDir, { recursive: true });
  const manifest = { generatedAt: new Date().toISOString(), posts };
  fs.writeFileSync(path.join(distDir, "posts.json"), JSON.stringify(manifest, null, 2));

  // Copy for quick preview without interfering with existing blog setup
  fs.mkdirSync(publicBlogDir, { recursive: true });
  fs.writeFileSync(path.join(publicBlogDir, "posts.json"), JSON.stringify(manifest, null, 2));

  console.log(`Manifest generated with ${posts.length} posts.`);
}

buildManifest();
