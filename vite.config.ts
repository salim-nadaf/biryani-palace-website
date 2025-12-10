import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (/node_modules\/(react|react-dom)(\/|$)/.test(id)) {
              return 'vendor';
            }
            // Group UI libraries together - lazy load these
            if (/node_modules\/(lucide-react)(\/|$)/.test(id)) {
              return 'icons';
            }
            if (/node_modules\/(@radix-ui)(\/|$)/.test(id)) {
              return 'ui';
            }
            // Separate recharts (heavy)
            if (/node_modules\/(recharts|d3)(\/|$)/.test(id)) {
              return 'charts';
            }
            return;
          }
          // Separate Menu page into its own chunk
          if (id.includes('/pages/Menu')) {
            return 'menu';
          }
        },
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return `assets/[name]-[hash][extname]`;
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          } else if (/mp4|webm|ogg|mp3|wav|flac|aac/i.test(ext)) {
            return `assets/media/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      }
    },
    cssCodeSplit: true,
    target: 'es2020',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
        passes: 3,
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
    chunkSizeWarningLimit: 500,
    assetsInlineLimit: 2048,
    modulePreload: {
      polyfill: false,
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
}));
