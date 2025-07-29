// This file is now only used for Lovable compatibility
// The main app is now in apps/portal/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@shared": path.resolve(__dirname, "./packages"),
      "@portal/shared-ui": path.resolve(__dirname, "./packages/shared-ui/src"),
      "@portal/shared-types": path.resolve(__dirname, "./packages/shared-types/src"),
    },
  },
}));
