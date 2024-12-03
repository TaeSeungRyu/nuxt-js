import { setCookie, getCookie } from "h3";

export async function getUserSessionCookieType(event: any) {
  const sessionCookie = getCookie(event, "userSession");
  if (sessionCookie) {
    try {
      return JSON.parse(sessionCookie);
    } catch (error) {
      console.error("Failed to parse session cookie:", error);
    }
  }
  return null;
}

export async function setUserSessionCookieType(event: any, sessionData: any) {
  setCookie(event, "userSession", JSON.stringify(sessionData), {
    //httpOnly: true, // 클라이언트에서 쿠키 접근 방지
    sameSite: true, // 동일 사이트에서만 쿠키 전송
    //secure: process.env.NODE_ENV === "production", // HTTPS에서만 쿠키 전송
    path: "/", // 모든 경로에서 쿠키 유효
    maxAge: 60 * 60 * 24, // 1일 동안 유효
  });
}
