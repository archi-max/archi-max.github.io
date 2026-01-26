import fs from "fs";
import path from "path";
import { globSync } from "glob";

const root = process.cwd();
const blogDist = path.join(root, "blog", "dist");
const publicBlog = path.join(root, "public", "blog");
const basePath = "/blog";


if (!fs.existsSync(blogDist)) {
  console.error("blog/dist not found. Build the blog first (npm run build --prefix blog).");
  process.exit(1);
}

fs.rmSync(publicBlog, { recursive: true, force: true });
fs.mkdirSync(publicBlog, { recursive: true });
fs.cpSync(blogDist, publicBlog, { recursive: true });

// Patch built HTML to use the /blog base for assets and __SCRATCH_BASE__
const htmlFiles = globSync(path.join(publicBlog, "**/*.html"));

htmlFiles.forEach((file) => {
  const original = fs.readFileSync(file, "utf8");

  const patched = original
    // Set scratch base for runtime asset resolution
    .replace(
      /window.__SCRATCH_BASE__\s*=\s*"";/g,
      `window.__SCRATCH_BASE__ = "${basePath}";`
    )
    // Prefix CSS + favicon + static asset links so they load under /blog
    .replace(/href="\/tailwind-/g, `href="${basePath}/tailwind-`)
    .replace(/href="\/favicon.svg/g, `href="${basePath}/favicon.svg`)
    .replace(/href="\/scratch-logo.svg/g, `href="${basePath}/scratch-logo.svg`)
    .replace(/src="\/scratch-logo.svg/g, `src="${basePath}/scratch-logo.svg`)
    .replace(/src="\/DVD_logo.svg/g, `src="${basePath}/DVD_logo.svg`)
    // Prefix script + chunk paths
    .replace(/src="\/posts\//g, `src="${basePath}/posts/`)
    .replace(/src="\/chunks\//g, `src="${basePath}/chunks/`)
    .replace(/src="\/index-/g, `src="${basePath}/index-`)
    // Prefix any remaining absolute asset links under /components/ if emitted
    .replace(/href="\/components\//g, `href="${basePath}/components/`)
    .replace(/src="\/components\//g, `src="${basePath}/components/`);

  fs.writeFileSync(file, patched, "utf8");

 // Create an extensionless sibling for servers that don't auto-redirect to index.html
 if (file.endsWith("/index.html")) {
   const sibling = file.replace(/\/index\.html$/, "");
   if (sibling !== publicBlog) {
     const target = fs.existsSync(sibling) && fs.lstatSync(sibling).isDirectory()
       ? `${sibling}.html`
       : sibling;
     fs.writeFileSync(target, patched, "utf8");
   }
  }
});

console.log("Copied blog/dist -> public/blog (with base path rewrites)");
