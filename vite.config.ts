import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // 👇 DEV יקבל "/", BUILD ל-GitHub Pages יקבל "/placeecho-stories/"
  base: mode === "production" ? "/placeecho-stories/" : "/",
}));
