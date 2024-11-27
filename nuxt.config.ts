// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath, URL } from "node:url";
import svgLoader from "vite-svg-loader";
import path from "path";

export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { charset: "utf-8" },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css",
        },
      ],
      title: "타이틀",
    },
    pageTransition: {
      name: "page",
      mode: "out-in", // default
    },
  },
  builder: "vite",
  srcDir: "src/",
  pages: true,
  ssr: !true,
  devtools: { enabled: !true },
  experimental: {
    renderJsonPayloads: false,
  },
  modules: [
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@nuxt-alt/proxy",
    "nuxt-auth-utils",
    "vue3-perfect-scrollbar/nuxt",
    "@nuxtjs/tailwindcss",
  ],
  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      NUXT_PORT: Number(process.env.NUXT_PORT) || 3000,
    },
    session: {
      maxAge: 60 * 30 * 1, // 30분
    },
  },
  // components: {
  //   dirs: ["~/components"],
  //   global: true,
  // },
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
  css: ["~/assets/global.scss", "~/assets/global-tailwind.css"], //
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
      script: {
        propsDestructure: true,
      },
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)), //@ 값 치환
        "~/pages": path.resolve(__dirname, "./src/pages"),
        "~/style": path.resolve(__dirname, "./src/style"),
        "~": path.resolve(__dirname, "./src"),
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
    plugins: [svgLoader()],
  },
  compatibilityDate: "2024-10-18",
});
