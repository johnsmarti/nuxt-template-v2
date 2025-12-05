<template>
  <AuthLayout>
    <template #left>
      <!-- Conteúdo padrão -->
      <div class="mb-8 flex items-center space-x-2">
        <i class="pi pi-shield text-3xl"></i>
        <span class="text-2xl font-semibold">VoteSecure</span>
      </div>

      <div>
        <h1 class="mb-4 text-3xl leading-snug font-bold">
          Bem-vindo ao seu Portal<br />de Votação e Compatibilidade
        </h1>
        <p class="text-white/90">
          Acesse sua conta de eleitor de forma rápida e segura. Participe das eleições da sua organização com total
          transparência e confiabilidade.
        </p>
      </div>
    </template>
    <template #top>
      <div class="flex w-full justify-around gap-4 h-[10vh]">
        <div class="flex cursor-pointer items-center gap-4 text-blue-600" @click="goBack">
          <ButtonPrimary icon="pi pi-check" aria-label="Filter" rounded>
            <template #icon>
              <Icon name="lucide:arrow-left" />
            </template>
          </ButtonPrimary>
          <span>Voltar</span>
        </div>
        <div class="flex items-center space-x-3 text-sm">
          <span>Já tem uma conta?</span>
          <ButtonPrimary variant="outlined" label="Faça o login" @click="goRegister" />
        </div>
      </div>
    </template>
    <template #right>
      <div class="mt-16 w-full max-w-md">
        <div
          class="relative flex w-full shrink-0 flex-col content-stretch items-center justify-center gap-[16px] text-center text-black">
          <p class="relative shrink-0 font-['DM_Sans:SemiBold',_sans-serif] text-[32px] leading-[1.1] font-semibold tracking-[-0.96px] text-nowrap whitespace-pre"
            style="font-variation-settings: 14">
            Cadastro de Eleitor
          </p>
          <div
            class="relative w-[min-content] min-w-full shrink-0 font-['DM_Sans:Regular',_sans-serif] text-[18px] leading-[1.35] font-normal"
            style="font-variation-settings: 14">
            <p class="mb-0">Preencha seus dados para participar da eleição.</p>
            <p>&nbsp;</p>
          </div>
        </div>

        <Form :resolver="authResolver" @submit="onLoginSubmit" class="flex flex-col gap-4 w-full my-4">
          <FormField v-slot="$field" name="email">
            <InputText v-model="$field.value" label="Email" :error-message="$field.error?.message" />
          </FormField>
          <FormField v-slot="$field" name="password">
            <Password v-model="$field.value" name="password" label="Senha" :error-message="$field.errors" />
          </FormField>

          <ButtonPrimary label="Acessar" iconPos="right" class="w-full !border-blue-600 !bg-blue-600 hover:!bg-blue-700"
            type="submit">
            <template #icon>
              <Icon name="lucide:arrow-right" />
            </template>
          </ButtonPrimary>

          <p class="mt-6 text-center text-sm text-gray-600">
            Não consegue entrar?
            <a href="#" class="font-medium text-blue-600 hover:underline">Entre em Contato</a>
          </p>

          <p class="mt-10 text-center text-xs text-gray-400">Termos e Condições | Perguntas Frequentes | Fale Conosco
          </p>
        </Form>
      </div>
    </template>
  </AuthLayout>
</template>

<script setup lang="ts">
import type { LoginPayload } from "@/api/auth/interfaces";
import { useLogin } from "@/api/auth/mutations";
import AuthLayout from "@/components/layout/AuthLayout.vue";
import { authResolver } from "@/schemas/auth";
import ButtonPrimary from "@/components/volt/ButtonPrimary.vue";
import InputText from "@/components/volt/InputText.vue";
import Password from "@/components/volt/Password.vue";
import { Form, FormField } from "@primevue/forms";
import { useRouter } from "vue-router";
definePageMeta({ layout: "auth" });
const { mutate } = useLogin();
const router = useRouter();


const onLoginSubmit = async ({ valid, values }: { valid: boolean; values: Record<string, unknown> }) => {
  if (valid) {
    const payload = values as unknown as LoginPayload;
    mutate(payload);
  }
};

const goBack = async () => router.back();
const goRegister = async () => router.push("/register");
</script>

<style scoped>
/* Estilos customizados se necessário */
</style>
