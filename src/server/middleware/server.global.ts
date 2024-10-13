import { getServerSession } from "#auth";

export default eventHandler(async (event) => {
  const session: any = await getServerSession(event);
  if (session && session.accessToken) {
    const token = session.accessToken;
    event.node.req.headers["Authorization"] = `Bearer ${token}`;
  }
  event.node.res.on("finish", () => {
    //console.log("req end", event.node.res.statusCode);
  });
});
