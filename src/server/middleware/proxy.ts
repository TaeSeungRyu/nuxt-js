import { getUserSessionCookieType } from "../util";

// /server/middleware/proxy.ts
export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();

  if (!event.node.req.url?.startsWith("/serverApi")) return;
  const session = await getUserSessionCookieType(event);
  const proxyServerUrl: any =
    runtimeConfig.public.apiBase || process.env.SERVER_API_URL;
  const target = new URL(
    event.node.req.url.replace("/serverApi", ""),
    proxyServerUrl
  );

  if (session && session.user && session.user) {
    console.log("ok", session);
    const user: any = session.user;
    const token: any = user?.token;
    event.node.req.headers["Authorization"] = `Bearer ${token}`;
  }

  return proxyRequest(event, target.toString(), {
    headers: {
      host: target.host,
      origin: target.origin,
    },
  });
});
