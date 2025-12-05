// plugins/axios.ts
import { defineNuxtPlugin, navigateTo, useCookie } from "#app";
import axios, { type AxiosError, type AxiosInstance } from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const baseURL = useRuntimeConfig().public.apiBase || "http://localhost:8000/api/v1";

  const api: AxiosInstance = axios.create({
    baseURL: baseURL as string,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    withCredentials: true,
  });

  // ---------------------------
  // 🔐 Interceptor de Requisição
  // ---------------------------
  api.interceptors.request.use((config) => {
    const token = useCookie<string | null>("access_token");
    if (token.value) {
      config.headers.Authorization = `Bearer ${token.value}`;
    }
    return config;
  });

  // ---------------------------
  // 🚨 Função utilitária de erro
  // ---------------------------
  const extractErrorMessage = (error: AxiosError): string => {
    const data = error?.response?.data as any;

    // Prioridade de mensagens
    if (typeof data?.detail === "string") return data.detail;
    if (data?.message) return data.message;

    // FastAPI ValidationError (422)
    if (Array.isArray(data?.detail)) {
      return data.detail
        .map((err: any) => `${err.loc?.join(" → ")}: ${err.msg}`)
        .join("\n");
    }

    if (data?.errors) {
      return Object.values(data.errors).join("\n");
    }

    return error.message || "Ocorreu um erro inesperado.";
  };

  // ---------------------------
  // 🔁 Interceptor de Resposta
  // ---------------------------
  api.interceptors.response.use(
    (response) => {
      const cfg = response.config as typeof response.config & {
        showSuccessToast?: boolean;
        successMessage?: string;
      };

      const isMutation = (cfg.method || "get").toLowerCase() !== "get";

      if (cfg.showSuccessToast || (cfg.showSuccessToast === undefined && isMutation)) {
        window.dispatchEvent(
          new CustomEvent("app:toast", {
            detail: {
              severity: "success",
              summary: "Sucesso",
              detail: cfg.successMessage || "Operação realizada com sucesso",
              life: 3000,
            },
          })
        );
      }

      return response;
    },

    async (error: AxiosError) => {
      const status = error?.response?.status;
      const cfg = error.config as typeof error.config & {
        hideErrorToast?: boolean;
        errorMessageOverride?: string;
        errorToastSeverity?: "error" | "warn";
        _retry?: boolean;
      };

      if (status === 401) {
        console.log("Token expirado, tentando renovar...");
        if (!cfg?._retry) {
          console.log("Tentando renovar token...");
          const rt = useCookie<string | null>("refresh_token", { path: "/", sameSite: "lax" });
          if (rt.value) {
            try {
              cfg._retry = true;
              console.log("Renovando token...");
              const refreshBase = useRuntimeConfig().public.apiBase || "http://localhost:8000/api/v1";
              const url = `${refreshBase}/auth/refresh-token?refresh_token=${encodeURIComponent(rt.value)}`;
              const resp = await axios.post(url, { withCredentials: true });
              const data: { access_token?: string; refresh_token?: string; token?: string } = resp.data ?? {};
              const at = useCookie<string | null>("access_token", { path: "/", sameSite: "lax" });
              const newRt = useCookie<string | null>("refresh_token", { path: "/", sameSite: "lax" });
              at.value = data.access_token ?? data.token ?? at.value ?? null;
              newRt.value = data.refresh_token ?? newRt.value ?? null;
              console.log("Refresh token:", newRt.value);
              if (at.value) {
                cfg.headers = cfg.headers || {};
                (cfg.headers as Record<string, string>).Authorization = `Bearer ${at.value}`;
                return api(cfg);
              }
            } catch {
              const at = useCookie<string | null>("access_token", { path: "/", sameSite: "lax" });
              const newRt = useCookie<string | null>("refresh_token", { path: "/", sameSite: "lax" });
              at.value = null;
              newRt.value = null;
            }
          }
        }

        window.dispatchEvent(
          new CustomEvent("app:toast", {
            detail: {
              severity: "warn",
              summary: "Sessão expirada",
              detail: "Faça login novamente.",
              life: 4000,
            },
          })
        );
        return navigateTo("/login");
      }

      // ---------------------------
      // ❌ Erro Global
      // ---------------------------
      if (!cfg.hideErrorToast) {
        const detail = cfg.errorMessageOverride || extractErrorMessage(error);

        window.dispatchEvent(
          new CustomEvent("app:toast", {
            detail: {
              severity: cfg.errorToastSeverity || "error",
              summary: "Erro",
              detail,
              life: 5000,
            },
          })
        );
      }

      return Promise.reject(error);
    }
  );

  // ---------------------------
  // 🌐 Disponível como $axios
  // ---------------------------
  nuxtApp.provide("axios", api);
});
