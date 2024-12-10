import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      react: path.resolve("./node_modules/react"),
      "react-dom": path.resolve("./node_modules/react-dom"),
      "react-dnd": path.resolve("./node_modules/react-dnd"),
      "react-dnd-html5-backend": path.resolve(
        "./node_modules/react-dnd-html5-backend"
      ),
    },
  },
});
