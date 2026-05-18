import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: "autoUpdate",
      manifestFilename: "site.webmanifest",
      includeAssets: ["favicon.ico", "apple-touch-icon.png"],
      manifest: {
        name: "Travel Ravers Checklist",
        short_name: "Travel Ravers",
        description: "Festival travel planning for UK ravers — packing guides, festival profiles, gear reviews.",
        theme_color: "#03060f",
        background_color: "#03060f",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        icons: [
          { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
        runtimeCaching: [
          {
            urlPattern: ({ url }: { url: URL }) => url.origin === self.location.origin,
            handler: "NetworkFirst" as const,
            options: {
              cacheName: "tr-pages",
              expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 7 },
            },
          },
        ],
      },
      devOptions: { enabled: false },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React core + router → react-vendor
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/react-router") ||
            id.includes("node_modules/scheduler/")
          ) {
            return "react-vendor";
          }
          // All React-dependent UI libs → ui-vendor.
          // This ensures vendor-*.js has NO import from react-vendor,
          // eliminating the hash-mismatch "createContext undefined" failure
          // when a subdomain has a stale/partial deployment.
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
          ) {
            return "ui-vendor";
          }
          // Lucide icons → icons-vendor
          if (id.includes("node_modules/lucide-react/")) {
            return "icons-vendor";
          }
          // Animation + query utilities → utils-vendor
          if (
            id.includes("node_modules/framer-motion/") ||
            id.includes("node_modules/@tanstack/") ||
            id.includes("node_modules/date-fns/")
          ) {
            return "utils-vendor";
          }
          // All other node_modules → vendor
          if (id.includes("node_modules/")) {
            return "vendor";
          }
        },
      },
    },
  },
}));
