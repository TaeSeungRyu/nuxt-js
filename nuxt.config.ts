// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath, URL } from "node:url";
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { charset: "utf-8" },
      ],
      title: "타이틀",
    },
  },

  srcDir: "src/",
  devtools: { enabled: true },

  experimental: {
    renderJsonPayloads: false,
  },

  modules: [
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@nuxt-alt/proxy",
    "nuxt-auth-utils",
    "@nuxtjs/tailwindcss",
  ],

  pages: true,
  ssr: true,

  runtimeConfig: {
    public: {
      NUXT_PORT: Number(process.env.NUXT_PORT) || 3000,
    },
    session: {
      maxAge: 60 * 30 * 1, // 30분
    },
  },

  components: {
    dirs: ["~/components"],
  },

  pinia: {
    storesDirs: ["~/stores/**"],
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

  tailwindcss: {
    exposeConfig: {
      level: 1,
    },
    config: {},
    viewer: false,
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
          silenceDeprecations: ["legacy-js-api"],
          additionalData: '@use "@/assets/variable.scss" as contants;',
        },
      },
    },
  },

  compatibilityDate: "2024-10-18",
});
