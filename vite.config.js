import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/api/v1": {
        target: "http://localhost:5000", // Correct backend URL
        changeOrigin: true, // Ensure the origin is changed to the target URL
        secure: false, // Allow self-signed certificates (if applicable)
        rewrite: (path) => path.replace(/^\/api\/v1/, ""), // Remove /api/v1 prefix
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});