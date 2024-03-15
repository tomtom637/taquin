import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["vite.svg", "bg.jpg"],
      manifest: {
        name: "Taquin",
        short_name: "Taquin",
        scope: "/",
        description: "A simple Taquin game",
        display: "standalone",
        theme_color: "#000",
        icons: [
          {
            src: "192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      }
    })
  ],
  base: "/taquin/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
