import { ofetch } from "ofetch";

export const useCustomFetch = (url: string, options?: any) => {
  return ofetch(url, {
    ...options,
    async onResponse({ request, response, options }) {
      console.log("[fetch response]");
      if (response.status === 401) {
        console.log("401 error");
      }
    },
    async onResponseError({ request, response, options }) {
      console.log("[fetch response error]");
    },
    async onRequest({ request, options }) {
      console.log("[fetch request]");
    },
  });
};
