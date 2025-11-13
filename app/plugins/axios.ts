// plugins/axios.ts
import { defineNuxtPlugin, useCookie } from "#app";
import axios, { type AxiosInstance } from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  /**
   * ✅ 1. Base URL dinâmica via variável de ambiente
   * Evita hardcode e facilita deploy em produção.
   */
  const baseURL = useRuntimeConfig().public.apiBase || "http://localhost:8000/api/v1";

  /**
   * ✅ 2. Criação da instância do Axios
   */
  const api: AxiosInstance = axios.create({
    baseURL: baseURL as string,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    withCredentials: true,
  });

  /**
   * ✅ 3. Interceptor de requisição — injeta token automaticamente
   */
  api.interceptors.request.use(
    (config) => {
      const token = useCookie<string | null>("access_token"); // Lido no contexto reativo
      if (token.value) {
        config.headers.Authorization = `Bearer ${token.value}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  /**
   * ✅ 4. Interceptor de resposta — trata erros globais (ex: 401)
   */
  api.interceptors.response.use(
    (response) => {
      // Toast de sucesso opcional por requisição
      const cfg = response.config as typeof response.config & {
        showSuccessToast?: boolean;
        successMessage?: string;
        successToastSeverity?: "success" | "info";
        successToastLife?: number;
      };

      const method = (cfg.method || "get").toLowerCase();
      const isMutation = method !== "get"; // por padrão, só para não-GET
      if (cfg.showSuccessToast || (cfg.showSuccessToast === undefined && isMutation)) {
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("app:toast", {
              detail: {
                severity: cfg.successToastSeverity || "success",
                summary: "Sucesso",
                detail: cfg.successMessage || "Operação concluída com sucesso",
                life: cfg.successToastLife ?? 3000,
              },
            }),
          );
        }
      }
      return response;
    },
    (error) => {
      const status = error?.response?.status;

      if (status === 401) {
        console.warn("⚠️ Sessão expirada. Redirecionando para login...");
        const token = useCookie("access_token");
        token.value = null;
        // Notifica usuário sobre sessão expirada via evento global (funciona fora de componentes)
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("app:toast", {
              detail: {
                severity: "warn",
                summary: "Sessão expirada",
                detail: "Faça login novamente para continuar.",
                life: 4000,
              },
            }),
          );
        }
        return navigateTo("/login");
      }

      // Exibe toast genérico para outros erros
      const detail =
        error?.response?.data?.message || error?.message || "Ocorreu um erro inesperado. Tente novamente.";
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("app:toast", {
            detail: {
              severity: "error",
              summary: "Erro",
              detail,
              life: 5000,
            },
          }),
        );
      }

      return Promise.reject(error);
    },
  );

  /**
   * ✅ 5. Injeta globalmente como `$axios` (padrão de mercado)
   */
  nuxtApp.provide("axios", api);
  // Também expõe atalho $toast via provide para uso imperativo fora de componentes
  // (já disponível por ToastService, mas isso ajuda em plugins/composables)
  // nuxtApp.$toast já é injetado pelo ToastService
});
