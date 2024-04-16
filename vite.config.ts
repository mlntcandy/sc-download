import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import monkey, { cdn } from "vite-plugin-monkey";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    monkey({
      entry: "src/main.tsx",
      userscript: {
        name: "sc-download",
        namespace: "mlntcandy",
        author: "mlntcandy",
        updateURL:
          "https:://github.com/mlntcandy/sc-download/raw/main/dist/sc-download.user.js",
        website: "https:://github.com/mlntcandy/sc-download",
        match: ["https://soundcloud.com/*"],
        "run-at": "document-start",
      },
      build: {
        externalGlobals: {
          preact: cdn.jsdelivr("preact", "dist/preact.min.js"),
        },
      },
    }),
  ],
});
