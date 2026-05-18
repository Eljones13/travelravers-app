import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Native build config for Capacitor.
// Key differences from vite.config.ts:
//   • base: "./" — assets use relative paths, required for file:// loading in the WebView
//   • No VitePWA — service worker registration breaks in a native WebView context
//   • No dev server / componentTagger — not used during native builds
export default defineConfig({
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/react-router") ||
            id.includes("node_modules/scheduler/")
          ) return "react-vendor";
          if (
            id.includes("node_modules/@radix-ui/") ||
            id.includes("node_modules/@floating-ui/") ||
            id.includes("node_modules/class-variance-authority/") ||
            id.includes("node_modules/clsx/") ||
            id.includes("node_modules/tailwind-merge/") ||
            id.includes("node_modules/cmdk/") ||
            id.includes("node_modules/vaul/") ||
            id.includes("node_modules/sonner/") ||
            id.includes("node_modules/next-themes/") ||
            id.includes("node_modules/recharts/") ||
            id.includes("node_modules/input-otp/") ||
            id.includes("node_modules/@hookform/") ||
            id.includes("node_modules/embla-carousel") ||
            id.includes("node_modules/react-day-picker/") ||
            id.includes("node_modules/use-callback-ref/") ||
            id.includes("node_modules/use-sidecar/") ||
            id.includes("node_modules/use-sync-external-store/")
          ) return "ui-vendor";
          if (id.includes("node_modules/lucide-react/")) return "icons-vendor";
          if (
            id.includes("node_modules/framer-motion/") ||
            id.includes("node_modules/@tanstack/") ||
            id.includes("node_modules/date-fns/")
          ) return "utils-vendor";
          if (id.includes("node_modules/")) return "vendor";
        },
      },
    },
  },
});
