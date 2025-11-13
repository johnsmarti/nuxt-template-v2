<template>
  <!-- Container global de Toast -->
  <Toast position="top-right" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import Toast from "@/volt/Toast.vue";
import { useToast } from "primevue/usetoast";
import { onMounted, onUnmounted } from "vue";

const toast = useToast();
const handler = (e: Event) => {
  const detail = (e as CustomEvent).detail as {
    severity?: "success" | "info" | "warn" | "error";
    summary?: string;
    detail?: string;
    life?: number;
  };
  if (detail) {
    toast.add({
      severity: detail.severity ?? "info",
      summary: detail.summary ?? "",
      detail: detail.detail ?? "",
      life: detail.life ?? 3000,
    });
  }
};

onMounted(() => {
  window.addEventListener("app:toast", handler as EventListener);
});
onUnmounted(() => {
  window.removeEventListener("app:toast", handler as EventListener);
});
</script>
