// vite.config.ts
import { defineConfig, loadEnv } from "file:///Users/shareit/shareit-coll/bobi-topo/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/shareit/shareit-coll/bobi-topo/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import * as path from "path";
import { viteMockServe } from "file:///Users/shareit/shareit-coll/bobi-topo/node_modules/vite-plugin-mock/dist/index.mjs";
import vueJsx from "file:///Users/shareit/shareit-coll/bobi-topo/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import Components from "file:///Users/shareit/shareit-coll/bobi-topo/node_modules/unplugin-vue-components/dist/vite.js";
import { AntDesignVueResolver } from "file:///Users/shareit/shareit-coll/bobi-topo/node_modules/unplugin-vue-components/dist/resolvers.js";
import vitePluginRequire from "file:///Users/shareit/shareit-coll/bobi-topo/node_modules/vite-plugin-require/dist/index.js";
import { chunkSplitPlugin } from "file:///Users/shareit/shareit-coll/bobi-topo/node_modules/vite-plugin-chunk-split/dist/index.mjs";
import svgLoader from "file:///Users/shareit/shareit-coll/bobi-topo/node_modules/vite-svg-loader/index.js";
import viteImagemin from "file:///Users/shareit/shareit-coll/bobi-topo/node_modules/vite-plugin-imagemin/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///Users/shareit/shareit-coll/bobi-topo/node_modules/vite-plugin-svg-icons/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/shareit/shareit-coll/bobi-topo";
var env = loadEnv("development", process.cwd()).VITE_ENV === "development" ? loadEnv("development", process.cwd()) : loadEnv("production", process.cwd());
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    // TODO: svg变成雪碧图
    createSvgIconsPlugin({
      iconDirs: [path.join(__vite_injected_original_dirname, "src/assets/svgs")]
    }),
    viteMockServe({
      mockPath: path.resolve(__vite_injected_original_dirname, "src/mock"),
      watchFiles: true,
      enable: true
    }),
    vueJsx(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false
          // css in js
        })
      ]
    }),
    // TODO: 踩坑：require使用vite-plugin-require插件适配
    // @ts-expect-error
    vitePluginRequire.default(),
    chunkSplitPlugin({
      // TODO: 踩坑：包分离优化使用正则 ，用数组会报错
      strategy: "default",
      customSplitting: {
        // `react` and `react-dom` 会被打包到一个名为`render-vendor`的 chunk 里面(包括它们的一些依赖，如 object-assign)
        "vue-vendor": [
          /node_modules\/vue/,
          /node_modules\/vue-router/,
          /node_modules\/pinia/
        ],
        lodash: [/node_modules\/lodash*/],
        "ali-oss": [/node_modules\/ali-oss/]
        // 源码中 utils 目录的代码都会打包进 `utils` 这个 chunk 中
      }
    }),
    // TODO: 图片资源压缩
    viteImagemin({
      optipng: {
        optimizationLevel: 7
      },
      pngquant: {
        quality: [0.8, 0.9]
      },
      mozjpeg: {
        quality: 50
      },
      svgo: {
        plugins: [
          {
            name: "removeViewBox"
          },
          {
            name: "removeEmptyAttrs",
            active: false
          }
        ]
      }
    })
  ],
  css: {
    preprocessorOptions: {}
  },
  resolve: {
    // TODO:踩坑：忘了在tsconfig.json中命名
    alias: {
      "@": path.join(__vite_injected_original_dirname, "./src"),
      // prettier-ignore
      "com": path.resolve(__vite_injected_original_dirname, "src/components"),
      // prettier-ignore
      "assets": path.resolve(__vite_injected_original_dirname, "src/assets"),
      // prettier-ignore
      "utils": path.resolve(__vite_injected_original_dirname, "src/utils"),
      // prettier-ignore
      "types": path.resolve(__vite_injected_original_dirname, "src/types"),
      // prettier-ignore
      "router": path.resolve(__vite_injected_original_dirname, "src/router"),
      // prettier-ignore
      "view": path.resolve(__vite_injected_original_dirname, "src/view"),
      // prettier-ignore
      "api": path.resolve(__vite_injected_original_dirname, "src/api"),
      // prettier-ignore
      "store": path.resolve(__vite_injected_original_dirname, "src/store"),
      // prettier-ignore
      "i18n": path.resolve(__vite_injected_original_dirname, "src/i18n")
    },
    extensions: [".js", ".cjs", ".json", ".ts", ".vue"]
  },
  optimizeDeps: {
    force: true
    // 强制进行依赖预构建
  },
  server: {
    hmr: true,
    open: true,
    host: true,
    // 在局域网内进行热更新,
    proxy: {
      "/api": {
        target: env.VITE_TEST_HOST,
        changeOrigin: true,
        rewrite: (path2) => path2.replace(/^\/api/, "")
      },
      "/upload": {
        target: env.VITE_TEST_HOST_UPLOAD,
        changeOrigin: true,
        rewrite: (path2) => path2.replace(/^\/upload/, "")
      }
    }
  },
  // 配置静态资源基础路径
  base: env.NODE_ENV === "development" ? "" : env.ASSETS_PATH,
  build: {
    outDir: "./dist",
    assetsDir: "./static",
    // 单文件or內联临界值
    assetsInlineLimit: 8 * 1024,
    rollupOptions: {
      // external: Object.keys(externalGlobalsObj)
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvc2hhcmVpdC9zaGFyZWl0LWNvbGwvYm9iaS10b3BvXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvc2hhcmVpdC9zaGFyZWl0LWNvbGwvYm9iaS10b3BvL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9zaGFyZWl0L3NoYXJlaXQtY29sbC9ib2JpLXRvcG8vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG4vLyBUT0RPOlx1OEUyOVx1NTc1MSBcdTRGN0ZcdTc1MjggaW1wb3J0ICogYXMgcGF0aCBcdTVGMTVcdTUxNjVcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB7IHZpdGVNb2NrU2VydmUgfSBmcm9tICd2aXRlLXBsdWdpbi1tb2NrJ1xuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCB7IEFudERlc2lnblZ1ZVJlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xuaW1wb3J0IHZpdGVQbHVnaW5SZXF1aXJlIGZyb20gJ3ZpdGUtcGx1Z2luLXJlcXVpcmUnXG5pbXBvcnQgeyBjaHVua1NwbGl0UGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tY2h1bmstc3BsaXQnXG4vLyBpbXBvcnQgaW1wb3J0VG9DRE4gZnJvbSBcInZpdGUtcGx1Z2luLWNkbi1pbXBvcnRcIjtcbmltcG9ydCBzdmdMb2FkZXIgZnJvbSAndml0ZS1zdmctbG9hZGVyJ1xuLy8gXHVEODNDXHVERjM4IHZpdGVcdTUzOEJcdTdGMjlcdTU2RkVcdTcyNDdcdThENDRcdTZFOTBcbmltcG9ydCB2aXRlSW1hZ2VtaW4gZnJvbSAndml0ZS1wbHVnaW4taW1hZ2VtaW4nXG4vLyBcdUQ4M0NcdURGMzggaWNvblx1NzUxRlx1NjIxMFx1OTZFQVx1NzhBN1x1NTZGRVx1NTM4Qlx1N0YyOVxuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnXG4vLyBjb25zdCBleHRlcm5hbEdsb2JhbHNPYmogPSB7XG4vLyAgIHZ1ZTogJ1Z1ZScsXG4vLyAgICd2dWUtcm91dGVyJzogJ3JvdXRlcidcbi8vIH1cblxuY29uc3QgZW52ID1cbiAgbG9hZEVudignZGV2ZWxvcG1lbnQnLCBwcm9jZXNzLmN3ZCgpKS5WSVRFX0VOViA9PT0gJ2RldmVsb3BtZW50J1xuICAgID8gbG9hZEVudignZGV2ZWxvcG1lbnQnLCBwcm9jZXNzLmN3ZCgpKVxuICAgIDogbG9hZEVudigncHJvZHVjdGlvbicsIHByb2Nlc3MuY3dkKCkpXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICBzdmdMb2FkZXIoKSxcbiAgICAvLyBUT0RPOiBzdmdcdTUzRDhcdTYyMTBcdTk2RUFcdTc4QTdcdTU2RkVcbiAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XG4gICAgICBpY29uRGlyczogW3BhdGguam9pbihfX2Rpcm5hbWUsICdzcmMvYXNzZXRzL3N2Z3MnKV1cbiAgICB9KSxcbiAgICB2aXRlTW9ja1NlcnZlKHtcbiAgICAgIG1vY2tQYXRoOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL21vY2snKSxcbiAgICAgIHdhdGNoRmlsZXM6IHRydWUsXG4gICAgICBlbmFibGU6IHRydWVcbiAgICB9KSxcbiAgICB2dWVKc3goKSxcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIHJlc29sdmVyczogW1xuICAgICAgICBBbnREZXNpZ25WdWVSZXNvbHZlcih7XG4gICAgICAgICAgaW1wb3J0U3R5bGU6IGZhbHNlIC8vIGNzcyBpbiBqc1xuICAgICAgICB9KVxuICAgICAgXVxuICAgIH0pLFxuICAgIC8vIFRPRE86IFx1OEUyOVx1NTc1MVx1RkYxQXJlcXVpcmVcdTRGN0ZcdTc1Mjh2aXRlLXBsdWdpbi1yZXF1aXJlXHU2M0QyXHU0RUY2XHU5MDAyXHU5MTREXG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgIHZpdGVQbHVnaW5SZXF1aXJlLmRlZmF1bHQoKSxcbiAgICBjaHVua1NwbGl0UGx1Z2luKHtcbiAgICAgIC8vIFRPRE86IFx1OEUyOVx1NTc1MVx1RkYxQVx1NTMwNVx1NTIwNlx1NzlCQlx1NEYxOFx1NTMxNlx1NEY3Rlx1NzUyOFx1NkI2M1x1NTIxOSBcdUZGMENcdTc1MjhcdTY1NzBcdTdFQzRcdTRGMUFcdTYyQTVcdTk1MTlcbiAgICAgIHN0cmF0ZWd5OiAnZGVmYXVsdCcsXG4gICAgICBjdXN0b21TcGxpdHRpbmc6IHtcbiAgICAgICAgLy8gYHJlYWN0YCBhbmQgYHJlYWN0LWRvbWAgXHU0RjFBXHU4OEFCXHU2MjUzXHU1MzA1XHU1MjMwXHU0RTAwXHU0RTJBXHU1NDBEXHU0RTNBYHJlbmRlci12ZW5kb3JgXHU3Njg0IGNodW5rIFx1OTFDQ1x1OTc2MihcdTUzMDVcdTYyRUNcdTVCODNcdTRFRUNcdTc2ODRcdTRFMDBcdTRFOUJcdTRGOURcdThENTZcdUZGMENcdTU5ODIgb2JqZWN0LWFzc2lnbilcbiAgICAgICAgJ3Z1ZS12ZW5kb3InOiBbXG4gICAgICAgICAgL25vZGVfbW9kdWxlc1xcL3Z1ZS8sXG4gICAgICAgICAgL25vZGVfbW9kdWxlc1xcL3Z1ZS1yb3V0ZXIvLFxuICAgICAgICAgIC9ub2RlX21vZHVsZXNcXC9waW5pYS9cbiAgICAgICAgXSxcbiAgICAgICAgbG9kYXNoOiBbL25vZGVfbW9kdWxlc1xcL2xvZGFzaCovXSxcbiAgICAgICAgJ2FsaS1vc3MnOiBbL25vZGVfbW9kdWxlc1xcL2FsaS1vc3MvXVxuICAgICAgICAvLyBcdTZFOTBcdTc4MDFcdTRFMkQgdXRpbHMgXHU3NkVFXHU1RjU1XHU3Njg0XHU0RUUzXHU3ODAxXHU5MEZEXHU0RjFBXHU2MjUzXHU1MzA1XHU4RkRCIGB1dGlsc2AgXHU4RkQ5XHU0RTJBIGNodW5rIFx1NEUyRFxuICAgICAgfVxuICAgIH0pLFxuICAgIC8vIFRPRE86IFx1NTZGRVx1NzI0N1x1OEQ0NFx1NkU5MFx1NTM4Qlx1N0YyOVxuICAgIHZpdGVJbWFnZW1pbih7XG4gICAgICBvcHRpcG5nOiB7XG4gICAgICAgIG9wdGltaXphdGlvbkxldmVsOiA3XG4gICAgICB9LFxuICAgICAgcG5ncXVhbnQ6IHtcbiAgICAgICAgcXVhbGl0eTogWzAuOCwgMC45XVxuICAgICAgfSxcbiAgICAgIG1vempwZWc6IHtcbiAgICAgICAgcXVhbGl0eTogNTBcbiAgICAgIH0sXG4gICAgICBzdmdvOiB7XG4gICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAncmVtb3ZlVmlld0JveCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdyZW1vdmVFbXB0eUF0dHJzJyxcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH1cbiAgICB9KVxuICBdLFxuICBjc3M6IHtcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7fVxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgLy8gVE9ETzpcdThFMjlcdTU3NTFcdUZGMUFcdTVGRDhcdTRFODZcdTU3Mjh0c2NvbmZpZy5qc29uXHU0RTJEXHU1NDdEXHU1NDBEXG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4vc3JjJyksXG4gICAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICdjb20nOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2NvbXBvbmVudHMnKSxcbiAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgJ2Fzc2V0cyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvYXNzZXRzJyksXG4gICAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICd1dGlscyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvdXRpbHMnKSxcbiAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgJ3R5cGVzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy90eXBlcycpLFxuICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAncm91dGVyJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9yb3V0ZXInKSxcbiAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgJ3ZpZXcnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3ZpZXcnKSxcbiAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgJ2FwaSc6cGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9hcGknKSxcbiAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgJ3N0b3JlJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9zdG9yZScpLFxuICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAnaTE4bic6cGF0aC5yZXNvbHZlKF9fZGlybmFtZSwnc3JjL2kxOG4nKVxuICAgIH0sXG4gICAgZXh0ZW5zaW9uczogWycuanMnLCAnLmNqcycsICcuanNvbicsICcudHMnLCAnLnZ1ZSddXG4gIH0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGZvcmNlOiB0cnVlIC8vIFx1NUYzQVx1NTIzNlx1OEZEQlx1ODg0Q1x1NEY5RFx1OEQ1Nlx1OTg4NFx1Njc4NFx1NUVGQVxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBobXI6IHRydWUsXG4gICAgb3BlbjogdHJ1ZSxcbiAgICBob3N0OiB0cnVlLCAvLyBcdTU3MjhcdTVDNDBcdTU3REZcdTdGNTFcdTUxODVcdThGREJcdTg4NENcdTcwRURcdTY2RjRcdTY1QjAsXG4gICAgcHJveHk6IHtcbiAgICAgICcvYXBpJzoge1xuICAgICAgICB0YXJnZXQ6IGVudi5WSVRFX1RFU1RfSE9TVCxcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpXG4gICAgICB9LFxuICAgICAgJy91cGxvYWQnOiB7XG4gICAgICAgIHRhcmdldDogZW52LlZJVEVfVEVTVF9IT1NUX1VQTE9BRCxcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvdXBsb2FkLywgJycpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICAvLyBcdTkxNERcdTdGNkVcdTk3NTlcdTYwMDFcdThENDRcdTZFOTBcdTU3RkFcdTc4NDBcdThERUZcdTVGODRcbiAgYmFzZTogZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnID8gJycgOiBlbnYuQVNTRVRTX1BBVEgsXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiAnLi9kaXN0JyxcbiAgICBhc3NldHNEaXI6ICcuL3N0YXRpYycsXG4gICAgLy8gXHU1MzU1XHU2NTg3XHU0RUY2b3JcdTUxNjdcdTgwNTRcdTRFMzRcdTc1NENcdTUwM0NcbiAgICBhc3NldHNJbmxpbmVMaW1pdDogOCAqIDEwMjQsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgLy8gZXh0ZXJuYWw6IE9iamVjdC5rZXlzKGV4dGVybmFsR2xvYmFsc09iailcbiAgICB9XG4gIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWlTLFNBQVMsY0FBYyxlQUFlO0FBQ3ZVLE9BQU8sU0FBUztBQUVoQixZQUFZLFVBQVU7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
