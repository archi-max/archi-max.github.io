import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { existsSync } from "fs";
import { componentTagger } from "lovable-tagger";

/**
 * Rewrites /blog/* and /sakura/* directory URLs to their index.html
 * so Vite serves the static file instead of the SPA fallback.
 */
function staticSubpaths(): Plugin {
  return {
    name: "static-subpaths",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const url = req.url ?? "";

        if (url.startsWith("/blog") || url.startsWith("/sakura")) {
          if (!path.extname(url)) {
            const rewritten = url.endsWith("/")
              ? url + "index.html"
              : url + "/index.html";
            const filePath = path.join(server.config.publicDir, rewritten);
            if (existsSync(filePath)) {
              req.url = rewritten;
            }
          }
        }

        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    headers: {
      // Required for SharedArrayBuffer (QEMU WebAssembly)
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "credentialless",
    },
  },
  plugins: [
    staticSubpaths(),
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
