// composables/useToast.ts
import { useToast } from "primevue/usetoast";

export function useToastComposable() {
  const toast = useToast();

  return {
    toast,
    showToast: (severity: string, summary: string, detail: string, life?: number) => {
      toast.add({
        severity,
        summary,
        detail,
        life,
      });
    },
  };
}