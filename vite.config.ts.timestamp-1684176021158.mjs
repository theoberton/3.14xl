// vite.config.ts
import { defineConfig } from "file:///Users/nick/Documents/Projects/3.14xl/node_modules/vite/dist/node/index.js";
import svgr from "file:///Users/nick/Documents/Projects/3.14xl/node_modules/vite-plugin-svgr/dist/index.mjs";
import react from "file:///Users/nick/Documents/Projects/3.14xl/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "node:path";
import { nodePolyfills } from "file:///Users/nick/Documents/Projects/3.14xl/node_modules/vite-plugin-node-polyfills/dist/index.js";
var __vite_injected_original_dirname = "/Users/nick/Documents/Projects/3.14xl";
var vite_config_default = defineConfig({
  base: "./",
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          access: ["@thirdweb-dev/storage", "@orbs-network/ton-access"],
          tonconnect: ["@tonconnect/ui-react"],
          formik: ["formik", "yup", "date-fns"]
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  plugins: [react(), nodePolyfills(), svgr()]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbmljay9Eb2N1bWVudHMvUHJvamVjdHMvMy4xNHhsXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbmljay9Eb2N1bWVudHMvUHJvamVjdHMvMy4xNHhsL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9uaWNrL0RvY3VtZW50cy9Qcm9qZWN0cy8zLjE0eGwvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCBzdmdyIGZyb20gJ3ZpdGUtcGx1Z2luLXN2Z3InO1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcbmltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCc7XG5pbXBvcnQgeyBub2RlUG9seWZpbGxzIH0gZnJvbSAndml0ZS1wbHVnaW4tbm9kZS1wb2x5ZmlsbHMnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcblx0YmFzZTogJy4vJyxcblx0YnVpbGQ6IHtcblx0XHRzb3VyY2VtYXA6IGZhbHNlLFxuXHRcdHJvbGx1cE9wdGlvbnM6IHtcblx0XHRcdG91dHB1dDoge1xuXHRcdFx0XHRtYW51YWxDaHVua3M6IHtcblx0XHRcdFx0XHRhY2Nlc3M6IFsnQHRoaXJkd2ViLWRldi9zdG9yYWdlJywgJ0BvcmJzLW5ldHdvcmsvdG9uLWFjY2VzcyddLFxuXHRcdFx0XHRcdHRvbmNvbm5lY3Q6IFsnQHRvbmNvbm5lY3QvdWktcmVhY3QnXSxcblx0XHRcdFx0XHRmb3JtaWs6IFsnZm9ybWlrJywgJ3l1cCcsICdkYXRlLWZucyddLFxuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHR9LFxuXHR9LFxuXHRyZXNvbHZlOiB7XG5cdFx0YWxpYXM6IHtcblx0XHRcdCdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXG5cdFx0fSxcblx0fSxcblx0cGx1Z2luczogW3JlYWN0KCksIG5vZGVQb2x5ZmlsbHMoKSwgc3ZncigpXSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpUyxTQUFTLG9CQUFvQjtBQUM5VCxPQUFPLFVBQVU7QUFDakIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixTQUFTLHFCQUFxQjtBQUo5QixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMzQixNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsSUFDTixXQUFXO0FBQUEsSUFDWCxlQUFlO0FBQUEsTUFDZCxRQUFRO0FBQUEsUUFDUCxjQUFjO0FBQUEsVUFDYixRQUFRLENBQUMseUJBQXlCLDBCQUEwQjtBQUFBLFVBQzVELFlBQVksQ0FBQyxzQkFBc0I7QUFBQSxVQUNuQyxRQUFRLENBQUMsVUFBVSxPQUFPLFVBQVU7QUFBQSxRQUNyQztBQUFBLE1BQ0Q7QUFBQSxJQUNEO0FBQUEsRUFDRDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1IsT0FBTztBQUFBLE1BQ04sS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3JDO0FBQUEsRUFDRDtBQUFBLEVBQ0EsU0FBUyxDQUFDLE1BQU0sR0FBRyxjQUFjLEdBQUcsS0FBSyxDQUFDO0FBQzNDLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
