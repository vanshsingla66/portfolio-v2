import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2020",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Split long-lived vendor code into its own cacheable chunks so the
        // app chunk stays small and the dependency tree parses faster.
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("framer-motion") || id.includes("motion-dom") || id.includes("motion-utils"))
              return "framer-motion";
            if (id.includes("react-icons")) return "icons";
            if (id.includes("react-dom") || id.includes("react") || id.includes("scheduler"))
              return "react";
          }
        },
      },
    },
  },
});
