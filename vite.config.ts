import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import fs from "fs";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          icon: true,
          exportType: "named",
          namedExport: "ReactComponent",
        },
      }),
    ],

    server: {
      host: true,   
      port: 5124,
      strictPort: true,

      proxy: {
        "/api": {
          target: env.BACKEND_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },

      https: {
        key: fs.readFileSync(path.resolve(__dirname, "ssl/server.key")),
        cert: fs.readFileSync(path.resolve(__dirname, "ssl/server.crt")),
      },
    },
  };
});
