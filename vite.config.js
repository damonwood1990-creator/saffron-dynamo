import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Saffron Dynamo U13 Wolves Stats",
        short_name: "DynamoStats",
        start_url: "/",
        display: "standalone",
        background_color: "#111111",
        theme_color: "#ff0000",
        icons: [
          {
            src: "/favicon.ico",
            sizes: "64x64",
            type: "image/x-icon"
          }
        ]
      }
    })
  ]
});