
export default defineNuxtRouteMiddleware(async (to) => {
    const accessToken = useCookie<string | null>("access_token", { path: "/", sameSite: "lax" });
    const refreshToken = useCookie<string | null>("refresh_token", { path: "/", sameSite: "lax" });

    if (!accessToken.value) {
        return navigateTo("/login");
    }
    return true;
});

