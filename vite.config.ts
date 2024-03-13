import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", manifest: {
        name: 'Taquin',
        short_name: 'Taquin',
        description: 'A simple Taquin game',
        display: 'standalone',
        theme_color: '#000',
      }
    })
  ],
  base: "",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
