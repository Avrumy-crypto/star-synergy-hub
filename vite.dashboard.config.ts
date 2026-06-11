import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { viteSingleFile } from "vite-plugin-singlefile";
import path from "path";

// Standalone gap-analysis dashboard: builds dashboard/ into a single
// self-contained HTML file that runs locally with no server.
export default defineConfig({
  root: path.resolve(__dirname, "dashboard"),
  plugins: [react(), viteSingleFile()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "dashboard/dist"),
    emptyOutDir: true,
  },
});
