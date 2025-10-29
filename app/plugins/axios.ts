// plugins/axios.ts
import axios, { type AxiosInstance } from "axios";
import { defineNuxtPlugin, useCookie } from "#app";

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
      const token = useCookie<string | null>("token"); // Lido no contexto reativo
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
    (response) => response,
    (error) => {
      const status = error?.response?.status;

      if (status === 401) {
        console.warn("⚠️ Sessão expirada. Redirecionando para login...");
        const token = useCookie("token");
        token.value = null;
        return navigateTo("/login");
      }

      return Promise.reject(error);
    },
  );

  /**
   * ✅ 5. Injeta globalmente como `$axios` (padrão de mercado)
   */
  nuxtApp.provide("axios", api);
});
