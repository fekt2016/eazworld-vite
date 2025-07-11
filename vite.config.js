import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react({ include: [/\.js$/, /\.jsx$/] }), eslint()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ["react/jsx-runtime", "react", "react-dom", "react-router-dom"],
  },
  // base: "/vite-deploy/",
});
