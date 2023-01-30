import { resolve } from "path";
import handlebars from "vite-plugin-handlebars";

export default {
  root: "src",
  build: {
    outDir: "../",
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, "src/partials"),
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "~@": resolve(__dirname, "src"),
    },
  },
};
