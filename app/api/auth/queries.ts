// composables/useAuth.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { useCookie } from "#app";
import type {
  User,
  LoginPayload,
  RegisterPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  IdentityPayload,
} from "./interfaces";

const API_URL = "http://localhost:8000";

export function useAuth() {
  const queryClient = useQueryClient();

  // Cookies para tokens
  const accessToken = useCookie<string | null>("access_token", { path: "/", sameSite: "lax" });
  const refreshToken = useCookie<string | null>("refresh_token", { path: "/", sameSite: "lax" });

  const loginIdentityMutation = useMutation({
    mutationFn: async (payload: IdentityPayload) => {
      console.log("loginIdentityMutation", payload);
      const data = await $fetch<{ identifier: string }>(`${API_URL}/auth/identifier-login`, {
        method: "POST",
        body: payload,
      });
      console.log(data);
      // accessToken.value = data.identifier;
      // refreshToken.value = data.identifier;
    },
  });
  return {
    loginIdentityMutation,
  };
}
