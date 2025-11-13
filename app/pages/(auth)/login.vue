<template>
  <AuthLayout>
    <div class="flex min-h-screen flex-col items-center justify-center py-8">
      <DynamicForm
        :schema="authSchema"
        :resolver="authResolver"
        label-over
        always-over
        submit-text="Entrar"
        @submit="onSubmit"
      />
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import AuthLayout from "@/layouts/auth.vue";
import DynamicForm from "@/components/DynamicForm.vue";
import { authResolver } from "@/schemas/auth";
import { useDynamicSchema } from "@/composables/useDynamicSchema";
const { authSchema } = useDynamicSchema();

function onSubmit(values: Record<string, any>) {
  // TODO: Integrar com API de autenticação
  console.log("Login:", values);
}
</script>

<style scoped>
/* Estilos customizados se necessário */
</style>
