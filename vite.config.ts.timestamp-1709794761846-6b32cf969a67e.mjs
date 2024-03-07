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
var __vite_injected_original_dirname = "/Users/shareit/shareit-coll/bobi-topo";
var env = loadEnv("development", process.cwd()).VITE_ENV == "development" ? loadEnv("development", process.cwd()) : loadEnv("production", process.cwd());
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    svgLoader(),
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
        quality: 8
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
      "store": path.resolve(__vite_injected_original_dirname, "src/store")
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvc2hhcmVpdC9zaGFyZWl0LWNvbGwvYm9iaS10b3BvXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvc2hhcmVpdC9zaGFyZWl0LWNvbGwvYm9iaS10b3BvL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9zaGFyZWl0L3NoYXJlaXQtY29sbC9ib2JpLXRvcG8vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG4vLyBUT0RPOlx1OEUyOVx1NTc1MSBcdTRGN0ZcdTc1MjggaW1wb3J0ICogYXMgcGF0aCBcdTVGMTVcdTUxNjVcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB7IHZpdGVNb2NrU2VydmUgfSBmcm9tICd2aXRlLXBsdWdpbi1tb2NrJ1xuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCB7IEFudERlc2lnblZ1ZVJlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xuaW1wb3J0IHZpdGVQbHVnaW5SZXF1aXJlIGZyb20gJ3ZpdGUtcGx1Z2luLXJlcXVpcmUnXG5pbXBvcnQgeyBjaHVua1NwbGl0UGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tY2h1bmstc3BsaXQnXG4vLyBpbXBvcnQgaW1wb3J0VG9DRE4gZnJvbSBcInZpdGUtcGx1Z2luLWNkbi1pbXBvcnRcIjtcbmltcG9ydCBzdmdMb2FkZXIgZnJvbSAndml0ZS1zdmctbG9hZGVyJ1xuLy8gXHVEODNDXHVERjM4IHZpdGVcdTUzOEJcdTdGMjlcdTU2RkVcdTcyNDdcdThENDRcdTZFOTBcbmltcG9ydCB2aXRlSW1hZ2VtaW4gZnJvbSAndml0ZS1wbHVnaW4taW1hZ2VtaW4nXG4vLyBjb25zdCBleHRlcm5hbEdsb2JhbHNPYmogPSB7XG4vLyAgIHZ1ZTogJ1Z1ZScsXG4vLyAgICd2dWUtcm91dGVyJzogJ3JvdXRlcidcbi8vIH1cblxuY29uc3QgZW52ID1cbiAgbG9hZEVudignZGV2ZWxvcG1lbnQnLCBwcm9jZXNzLmN3ZCgpKS5WSVRFX0VOViA9PSAnZGV2ZWxvcG1lbnQnXG4gICAgPyBsb2FkRW52KCdkZXZlbG9wbWVudCcsIHByb2Nlc3MuY3dkKCkpXG4gICAgOiBsb2FkRW52KCdwcm9kdWN0aW9uJywgcHJvY2Vzcy5jd2QoKSlcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHZ1ZSgpLFxuICAgIHN2Z0xvYWRlcigpLFxuICAgIHZpdGVNb2NrU2VydmUoe1xuICAgICAgbW9ja1BhdGg6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvbW9jaycpLFxuICAgICAgd2F0Y2hGaWxlczogdHJ1ZSxcbiAgICAgIGVuYWJsZTogdHJ1ZVxuICAgIH0pLFxuICAgIHZ1ZUpzeCgpLFxuICAgIENvbXBvbmVudHMoe1xuICAgICAgcmVzb2x2ZXJzOiBbXG4gICAgICAgIEFudERlc2lnblZ1ZVJlc29sdmVyKHtcbiAgICAgICAgICBpbXBvcnRTdHlsZTogZmFsc2UgLy8gY3NzIGluIGpzXG4gICAgICAgIH0pXG4gICAgICBdXG4gICAgfSksXG4gICAgLy8gVE9ETzogXHU4RTI5XHU1NzUxXHVGRjFBcmVxdWlyZVx1NEY3Rlx1NzUyOHZpdGUtcGx1Z2luLXJlcXVpcmVcdTYzRDJcdTRFRjZcdTkwMDJcdTkxNERcbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yXG4gICAgdml0ZVBsdWdpblJlcXVpcmUuZGVmYXVsdCgpLFxuICAgIGNodW5rU3BsaXRQbHVnaW4oe1xuICAgICAgLy8gVE9ETzogXHU4RTI5XHU1NzUxXHVGRjFBXHU1MzA1XHU1MjA2XHU3OUJCXHU0RjE4XHU1MzE2XHU0RjdGXHU3NTI4XHU2QjYzXHU1MjE5IFx1RkYwQ1x1NzUyOFx1NjU3MFx1N0VDNFx1NEYxQVx1NjJBNVx1OTUxOVxuICAgICAgc3RyYXRlZ3k6ICdkZWZhdWx0JyxcbiAgICAgIGN1c3RvbVNwbGl0dGluZzoge1xuICAgICAgICAvLyBgcmVhY3RgIGFuZCBgcmVhY3QtZG9tYCBcdTRGMUFcdTg4QUJcdTYyNTNcdTUzMDVcdTUyMzBcdTRFMDBcdTRFMkFcdTU0MERcdTRFM0FgcmVuZGVyLXZlbmRvcmBcdTc2ODQgY2h1bmsgXHU5MUNDXHU5NzYyKFx1NTMwNVx1NjJFQ1x1NUI4M1x1NEVFQ1x1NzY4NFx1NEUwMFx1NEU5Qlx1NEY5RFx1OEQ1Nlx1RkYwQ1x1NTk4MiBvYmplY3QtYXNzaWduKVxuICAgICAgICAndnVlLXZlbmRvcic6IFtcbiAgICAgICAgICAvbm9kZV9tb2R1bGVzXFwvdnVlLyxcbiAgICAgICAgICAvbm9kZV9tb2R1bGVzXFwvdnVlLXJvdXRlci8sXG4gICAgICAgICAgL25vZGVfbW9kdWxlc1xcL3BpbmlhL1xuICAgICAgICBdLFxuICAgICAgICBsb2Rhc2g6IFsvbm9kZV9tb2R1bGVzXFwvbG9kYXNoKi9dLFxuICAgICAgICAnYWxpLW9zcyc6IFsvbm9kZV9tb2R1bGVzXFwvYWxpLW9zcy9dXG4gICAgICAgIC8vIFx1NkU5MFx1NzgwMVx1NEUyRCB1dGlscyBcdTc2RUVcdTVGNTVcdTc2ODRcdTRFRTNcdTc4MDFcdTkwRkRcdTRGMUFcdTYyNTNcdTUzMDVcdThGREIgYHV0aWxzYCBcdThGRDlcdTRFMkEgY2h1bmsgXHU0RTJEXG4gICAgICB9XG4gICAgfSksXG4gICAgLy8gVE9ETzogXHU1NkZFXHU3MjQ3XHU4RDQ0XHU2RTkwXHU1MzhCXHU3RjI5XG4gICAgdml0ZUltYWdlbWluKHtcbiAgICAgIG9wdGlwbmc6IHtcbiAgICAgICAgb3B0aW1pemF0aW9uTGV2ZWw6IDdcbiAgICAgIH0sXG4gICAgICBwbmdxdWFudDoge1xuICAgICAgICBxdWFsaXR5OiBbMC44LCAwLjldXG4gICAgICB9LFxuICAgICAgbW96anBlZzoge1xuICAgICAgICBxdWFsaXR5OiA4XG4gICAgICB9LFxuICAgICAgc3Znbzoge1xuICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ3JlbW92ZVZpZXdCb3gnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAncmVtb3ZlRW1wdHlBdHRycycsXG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9XG4gICAgfSlcbiAgXSxcbiAgY3NzOiB7XG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge31cbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIC8vIFRPRE86XHU4RTI5XHU1NzUxXHVGRjFBXHU1RkQ4XHU0RTg2XHU1NzI4dHNjb25maWcuanNvblx1NEUyRFx1NTQ3RFx1NTQwRFxuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IHBhdGguam9pbihfX2Rpcm5hbWUsICcuL3NyYycpLFxuICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAnY29tJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9jb21wb25lbnRzJyksXG4gICAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICdhc3NldHMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2Fzc2V0cycpLFxuICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAndXRpbHMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3V0aWxzJyksXG4gICAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICd0eXBlcyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvdHlwZXMnKSxcbiAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgJ3JvdXRlcic6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvcm91dGVyJyksXG4gICAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICd2aWV3JzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy92aWV3JyksXG4gICAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICdhcGknOnBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvYXBpJyksXG4gICAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICdzdG9yZSc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvc3RvcmUnKVxuICAgIH0sXG4gICAgZXh0ZW5zaW9uczogWycuanMnLCAnLmNqcycsICcuanNvbicsICcudHMnLCAnLnZ1ZSddXG4gIH0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGZvcmNlOiB0cnVlIC8vIFx1NUYzQVx1NTIzNlx1OEZEQlx1ODg0Q1x1NEY5RFx1OEQ1Nlx1OTg4NFx1Njc4NFx1NUVGQVxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBobXI6IHRydWUsXG4gICAgb3BlbjogdHJ1ZSxcbiAgICBob3N0OiB0cnVlLCAvLyBcdTU3MjhcdTVDNDBcdTU3REZcdTdGNTFcdTUxODVcdThGREJcdTg4NENcdTcwRURcdTY2RjRcdTY1QjAsXG4gICAgcHJveHk6IHtcbiAgICAgICcvYXBpJzoge1xuICAgICAgICB0YXJnZXQ6IGVudi5WSVRFX1RFU1RfSE9TVCxcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpXG4gICAgICB9LFxuICAgICAgJy91cGxvYWQnOiB7XG4gICAgICAgIHRhcmdldDogZW52LlZJVEVfVEVTVF9IT1NUX1VQTE9BRCxcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvdXBsb2FkLywgJycpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICAvLyBcdTkxNERcdTdGNkVcdTk3NTlcdTYwMDFcdThENDRcdTZFOTBcdTU3RkFcdTc4NDBcdThERUZcdTVGODRcbiAgYmFzZTogZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnID8gJycgOiBlbnYuQVNTRVRTX1BBVEgsXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiAnLi9kaXN0JyxcbiAgICBhc3NldHNEaXI6ICcuL3N0YXRpYycsXG4gICAgLy8gXHU1MzU1XHU2NTg3XHU0RUY2b3JcdTUxNjdcdTgwNTRcdTRFMzRcdTc1NENcdTUwM0NcbiAgICBhc3NldHNJbmxpbmVMaW1pdDogOCAqIDEwMjQsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgLy8gZXh0ZXJuYWw6IE9iamVjdC5rZXlzKGV4dGVybmFsR2xvYmFsc09iailcbiAgICB9XG4gIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWlTLFNBQVMsY0FBYyxlQUFlO0FBQ3ZVLE9BQU8sU0FBUztBQUVoQixZQUFZLFVBQVU7QUFDdEIsU0FBUyxxQkFBcUI7QUFDOUIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsNEJBQTRCO0FBQ3JDLE9BQU8sdUJBQXVCO0FBQzlCLFNBQVMsd0JBQXdCO0FBRWpDLE9BQU8sZUFBZTtBQUV0QixPQUFPLGtCQUFrQjtBQWJ6QixJQUFNLG1DQUFtQztBQW1CekMsSUFBTSxNQUNKLFFBQVEsZUFBZSxRQUFRLElBQUksQ0FBQyxFQUFFLFlBQVksZ0JBQzlDLFFBQVEsZUFBZSxRQUFRLElBQUksQ0FBQyxJQUNwQyxRQUFRLGNBQWMsUUFBUSxJQUFJLENBQUM7QUFFekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osVUFBVTtBQUFBLElB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
