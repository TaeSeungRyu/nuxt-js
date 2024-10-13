// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath, URL } from "node:url";
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { charset: "utf-8" },
      ],
      title: "hello world",
    },
  },
  srcDir: "src/",
  devtools: { enabled: true },
  experimental: {
    renderJsonPayloads: false,
  },
  modules: [
    // 피니아
    "@pinia/nuxt", // 피니아 플러그인
    "pinia-plugin-persistedstate/nuxt", //nuxt 프록시 모듈
    "@nuxt-alt/proxy",
    "@sidebase/nuxt-auth",
  ],
  pages: true,
  ssr: true,
  runtimeConfig: {
    public: {
      NUXT_PORT: Number(process.env.NUXT_PORT) || 3000,
    },
  },
  components: {
    dirs: ["~/components"],
  },
  pinia: {
    storesDirs: ["~/stores/**"],
  },
  auth: {
    baseURL: process.env.AUTH_ORIGIN,
    provider: {
      type: "authjs",
      trustHost: false,
      defaultProvider: "credentials",
      addDefaultCallbackUrl: false,
    },
  },
  nitro: {
    routeRules: {
      "/_nuxt/**": {
        headers: { "cache-control": `no-cache` },
      },
    },
    compressPublicAssets: {
      brotli: true,
      gzip: true,
    },
  },
  css: ["~/assets/global.scss"],
  proxy: {
    proxies: {
      "/serverApi": {
        target: process.env.SERVER_API_URL,
        changeOrigin: true,
        agent: false,
        rewrite: (path: string) => {
          console.log("path:", path);
          return path.replace(/^\/serverApi/, "");
        },
      },
    },
  },
  vite: {
    vue: {
      customElement: true,
      script: {
        propsDestructure: true,
      },
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)), //@ 값 치환
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler", // or "modern"
          additionalData: '@import "@/assets/variable.scss";',
        },
      },
    },
  },
});
