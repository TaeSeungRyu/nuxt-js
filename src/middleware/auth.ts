export default defineNuxtRouteMiddleware(async (to, from) => {
  const { status, getSession } = useAuth();
  const isNotAuth = to.path === "/" || to.path === "/signin";
  //console.log("status.value:", status.value, isNotAuth);
  if (!isNotAuth && status.value === "unauthenticated") {
    return navigateTo("/signin");
  }
  // console.log(status.value);
  const sss = await getSession();
  if (!sss.role) {
    return navigateTo("/signin");
  }
  // if (!sss.role || sss.role === "ROLE") {
  //   return navigateTo("/signin");
  // }
});
