# CLAUDE.md

## Project overview

Personal portfolio + blog for Ansh Tulsyan. Vite + React + Tailwind CSS with a separate Scratch-based blog.

## Architecture

- **Portfolio**: Vite + React + TypeScript + Tailwind, single-page app with React Router
- **Blog**: Scratch CLI (MDX → static HTML), built separately and synced into `public/blog/`
- **SakuraOS demo**: Git submodule at `vendor/sakuraos/`, symlinked into `public/sakura/`
- **Data**: All personal content lives in `personal_data.json` (projects, experience, skills, contact)
- **Styling**: LessWrong-inspired warm palette (cream + forest green), Source Serif 4 + Source Sans 3 + JetBrains Mono

## Running locally

### Prerequisites

- Node.js (v20+) — installed at `~/local/node-v20.18.0-linux-x64/bin/node`
- Scratch CLI for blog: `curl -fsSL https://scratch.dev/install.sh | bash`

### Portfolio only

```bash
npm run dev
```

### Portfolio + blog

```bash
# Build the blog and sync into public/blog/, then start dev server
npm run dev:with-blog
```

### Blog only (dev mode with hot reload)

```bash
npm run dev:blog
```

### Production build

```bash
npm run build:blog   # Build blog + sync to public/blog/
npm run build        # Build portfolio (includes synced blog)
```

## Key directories

```
personal_data.json        # All content (projects, experience, skills, contact)
src/
  components/             # React components
    SakuraTerminal.tsx     # Embedded QEMU terminal modal
    Reveal.tsx             # Scroll-triggered animations (Reveal, Stagger)
    AnimatedDivider.tsx    # Scroll-animated dividers
  pages/
    Index.tsx              # Homepage
    ProjectsPage.tsx       # /projects with tag filtering
    BlogPost.tsx           # Blog post wrapper
  data/personalData.ts     # TypeScript types + data loader
  index.css                # Global styles, CSS variables, animations
public/
  blog/                    # Built blog output (generated, don't edit)
  sakura/                  # Symlink → vendor/sakuraos/.../htdocs
vendor/
  sakuraos/                # Git submodule (archi-max/sakuraos)
blog/
  pages/posts/             # Blog MDX source files
tailwind.preset.cjs        # Shared Tailwind config (portfolio + blog)
```

## Git submodule (SakuraOS)

The QEMU web demo is pulled via git submodule:

```bash
# Initial clone (after cloning the portfolio repo)
git submodule update --init

# Pull latest SakuraOS changes
cd vendor/sakuraos && git pull origin main
```

The symlink `public/sakura → ../vendor/sakuraos/riscv-webqemu/web/htdocs` serves the files at `/sakura/`.

## Adding content

### New project

Add an entry to the `projects` array in `personal_data.json`:

```json
{
  "title": "Project Name",
  "description": "One-liner description.",
  "link": "https://demo.example.com",
  "github": "https://github.com/user/repo",
  "blog": "/blog/posts/my-writeup/",
  "tags": ["Python", "ML"],
  "featured": true
}
```

- `featured: true` → shows on homepage (keep to 2-3)
- `link`, `github`, `blog` are all optional — omit if not applicable
- All projects show on `/projects` page with tag filtering

### New blog post

Create an MDX file in `blog/pages/posts/`:

```bash
blog/pages/posts/my-post.mdx
```

Then rebuild: `npm run build:blog`

### Updating experience

Edit the `experience` array in `personal_data.json`.

## Deployment notes

The Vite config sets COOP/COEP headers required for SharedArrayBuffer (QEMU):

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: credentialless
```

Your production hosting must also serve these headers. For Vercel, add to `vercel.json`. For Netlify, add to `_headers`.

The build must include git submodules: `git submodule update --init` before `npm run build`.
