import { ofetch } from "ofetch";
import { getRequestURL, readBody } from "h3";

import { setCookie } from "h3";
import { setUserSessionCookieType } from "../util";

export default defineEventHandler(async (event) => {
  const currentUrl = getRequestURL(event);
  //const session = getUserSession(event);
  try {
    const params = await readBody(event);
    //console.log("event", event.req.headers);
    // 비동기 요청을 처리하기 위해 await를 사용합니다.
    //console.log(currentUrl.origin);

    const res = await ofetch(`${currentUrl.origin}/serverApi/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...event.headers,
      },
      body: JSON.stringify(params),
    }).catch((e) => e);
    console.log("data", res);
    if (res?.success) {
      // 토큰을 저장합니다.
      //console.log(res.data.accessToken);
    }
    await setUserSessionCookieType(event, {
      user: {
        name: res?.data?.name,
        role: res?.data?.role,
        token: res?.data?.accessToken,
        time: new Date().getTime(),
      },
      secure: res?.data?.accessToken,
    });

    return {
      aaa: 1234,
      response: res,
    };
  } catch (error) {
    // 오류가 발생한 경우 콘솔에 출력합니다.
    console.error("Error:", error);
    // 에러 메시지를 반환합니다.
    return {
      aaa: 1234,
      error: "API 요청 중 오류가 발생했습니다.",
    };
  }
});
