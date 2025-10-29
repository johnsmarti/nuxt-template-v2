import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useNuxtApp, useCookie } from "#app";
import type {
  LoginPayload,
  RegisterPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  IdentityPayload,
  AccessIdentityPayload,
} from "./interfaces";

export function useLogin() {
  const { $axios } = useNuxtApp();
  const queryClient = useQueryClient();

  const accessToken = useCookie<string | null>("access_token", { path: "/", sameSite: "lax" });
  const refreshToken = useCookie<string | null>("refresh_token", { path: "/", sameSite: "lax" });

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const response = await $axios.post("/auth/login", payload);
      const data = response.data ?? {};
      accessToken.value = data.access_token ?? data.token ?? null;
      refreshToken.value = data.refresh_token ?? null;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}

export function useLogout() {
  const { $axios } = useNuxtApp();
  const queryClient = useQueryClient();

  const accessToken = useCookie<string | null>("access_token", { path: "/", sameSite: "lax" });
  const refreshToken = useCookie<string | null>("refresh_token", { path: "/", sameSite: "lax" });

  return useMutation({
    mutationFn: async () => {
      try {
        const response = await $axios.post("/auth/logout");
        return response.data;
      } finally {
        accessToken.value = null;
        refreshToken.value = null;
      }
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
}

export function useRegister() {
  const { $axios } = useNuxtApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const response = await $axios.post("/auth/register", payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}

export function useForgotPassword() {
  const { $axios } = useNuxtApp();

  return useMutation({
    mutationFn: async (payload: ForgotPasswordPayload) => {
      const response = await $axios.post("/auth/forgot-password", payload);
      return response.data;
    },
  });
}

export function useResetPassword() {
  const { $axios } = useNuxtApp();

  return useMutation({
    mutationFn: async (payload: ResetPasswordPayload) => {
      const response = await $axios.post("/auth/reset-password", payload);
      return response.data;
    },
  });
}

export function useLoginIdentity() {
  const { $axios } = useNuxtApp();
  console.log("ewrew");
  const tempToken = useCookie<string | null>("temp_token", { path: "/", sameSite: "lax" });

  return useMutation({
    mutationFn: async (payload: IdentityPayload) => {
      console.log(payload, "fdsf");
      const response = await $axios.post("/auth/identifier-login", payload);
      const data = response.data ?? {};
      // Se o backend retornar apenas "temp_token", podemos armazenar temporariamente
      tempToken.value = data.temp_token ?? null;
      return data;
    },
  });
}

export function useAccessIdentity() {
  const { $axios } = useNuxtApp();

  const accessToken = useCookie<string | null>("access_token", { path: "/", sameSite: "lax" });
  const refreshToken = useCookie<string | null>("refresh_token", { path: "/", sameSite: "lax" });

  return useMutation({
    mutationFn: async (payload: AccessIdentityPayload) => {
      const response = await $axios.post("/auth/access-identifier", payload);
      const data = response.data ?? {};
      accessToken.value = data.access_token ?? null;
      refreshToken.value = data.refresh_token ?? null;
      return data;
    },
  });
}
