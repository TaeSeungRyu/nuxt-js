import type { UseFetchOptions } from "#app";
import { ofetch } from "ofetch";

export const useCustomFetch = (url: string, options?: any) => {
  return ofetch(url, {
    ...options,
    async onResponse({ request, response, options }) {
      console.log("[fetch response]");
    },
    async onResponseError({ request, response, options }) {
      console.log("[fetch response error]");
    },
    async onRequest({ request, options }) {
      console.log("[fetch request]");
    },
  });

  // return useFetch(url, {
  //   ...options,
  //   async onResponse({ request, response, options }) {
  //     console.log("[fetch response]");
  //   },
  //   async onResponseError({ request, response, options }) {
  //     console.log("[fetch response error]");
  //   },

  //   async onRequest({ request, options }) {
  //     console.log("[fetch request]");
  //   },
  //   async onRequestError({ request, options, error }) {
  //     console.log("[fetch request error]");
  //   },
  // });
};
