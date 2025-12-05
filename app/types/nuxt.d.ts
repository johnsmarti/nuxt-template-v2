// types/nuxt.d.ts
import type { AxiosInstance } from "axios";
import type { ToastServiceMethods } from "primevue/toastservice";

declare module "#app" {
  interface NuxtApp {
    $axios: AxiosInstance;
    $toast: ToastServiceMethods;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $toast: ToastServiceMethods;
  }
}

export { };

// Extensões para configuração de requisição do Axios com suporte a toast de sucesso
declare module "axios" {
  interface AxiosRequestConfig {
    /**
     * Quando verdadeiro, exibe um toast de sucesso na resposta 2xx.
     * Por padrão, só exibe para métodos não-GET.
     */
    showSuccessToast?: boolean;
    /** Mensagem customizada para o toast de sucesso */
    successMessage?: string;
    /** Severidade do toast de sucesso (default: "success") */
    successToastSeverity?: "success" | "info";
    /** Duração do toast de sucesso em ms (default: 3000) */
    successToastLife?: number;
    /** Mensagem customizada para o toast de erro */
    errorMessageOverride?: string;
    /** Severidade do toast de erro (default: "error") */
    errorToastSeverity?: "error" | "warn";
    /** Duração do toast de erro em ms (default: 5000) */
    errorToastLife?: number;
    /** Quando verdadeiro, esconde o toast de erro */
    hideErrorToast?: boolean;
  }
}
