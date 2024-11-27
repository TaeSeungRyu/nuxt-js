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

/***
 * 랜덤한 문자열을 반환 합니다(캡차 내부 텍스트용)
 */
export function randomString(length: number) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function isEmpty(str: string) {
  if (str === null || str === undefined || str.length === 0) {
    return true;
  }
  return false;
}
