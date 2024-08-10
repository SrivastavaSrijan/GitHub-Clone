import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), checker({ typescript: true })],
  define: {
    "process.env": process.env,
    VITE_GIT_TOKEN: process.env.VITE_GIT_TOKEN,
  },
});
