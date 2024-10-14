export default defineNuxtRouteMiddleware(async (to, from) => {
  const { loggedIn, session, fetch } = useUserSession();

  await fetch();
  const isNotAuth = to.path === "/" || to.path === "/signin";
  //console.log("status.value:", status.value, isNotAuth);
  if (!isNotAuth && !loggedIn?.value) {
    return navigateTo("/signin");
  }
  // console.log(status.value);
  if (!isNotAuth && loggedIn?.value) {
    const user = session.value.user;
    if (!user) {
      return navigateTo("/signin");
    }
  }
  // if (!sss.role || sss.role === "ROLE") {
  //   return navigateTo("/signin");
  // }
});
