import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config();
// https://vitejs.dev/config/
// build for target url https://please-leak.com/app
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_URL,
  server: {
    host: "0.0.0.0",
  },
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
        pure_funcs: ["console.log"],
        pure_getters: true,
        collapse_vars: true,
        reduce_funcs: true,
        reduce_vars: true,
        keep_fargs: false,
      },
    },
  },
});
