//헤더에 토큰을 넣어주는 미들웨어
export default eventHandler(async (event) => {
  const session = await getUserSession(event);
  if (session && session.user && session.user) {
    const user: any = session.user;
    const token: any = user?.token;
    event.node.req.headers["Authorization"] = `Bearer ${token}`;
  }
  //const { loggedIn, user, session, fetch, clear } = useUserSession();
  // if (session && user && user?.value) {
  //   const token = user?.value;
  //   event.node.req.headers["Authorization"] = `Bearer ${token}`;
  // }
  // event.node.res.on("finish", () => {
  //   //console.log("req end", event.node.res.statusCode);
  // });
});
