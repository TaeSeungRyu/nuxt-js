//권한에 따른 접근 제어
export default defineNuxtRouteMiddleware(async (to, from) => {
  const { loggedIn, session, fetch, user } = useUserSession();

  await fetch();
  const isNotAuth = to.path === "/" || to.path === "/signin";
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
  if (loggedIn?.value && session && session?.value) {
    console.log(user?.value ?? user); // user가 ref면 value를, 아니면 직접 출력
  }

  // if (!sss.role || sss.role === "ROLE") {
  //   return navigateTo("/signin");
  // }
});
