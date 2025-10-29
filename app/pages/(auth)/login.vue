<template>
  <NuxtLayout name="auth">
    <div class="absolute top-6 left-6 flex cursor-pointer items-center gap-2 text-blue-600" @click="goBack">
      <i class="pi pi-arrow-left"></i>
      <span>Voltar</span>
    </div>
    <div class="absolute top-6 right-6 flex items-center space-x-3 text-sm">
      <span>Primeira vez aqui?</span>
      <Button
        label="Cadastrar como Eleitor"
        class="p-button-outlined p-button-sm !border-blue-600 !text-blue-600"
        @click="goRegister"
      />
    </div>
    <div class="mt-16 w-full max-w-md">
      <div
        class="relative flex w-full shrink-0 flex-col content-stretch items-center justify-center gap-[16px] text-center text-black"
      >
        <p
          class="relative shrink-0 font-['DM_Sans:SemiBold',_sans-serif] text-[32px] leading-[1.1] font-semibold tracking-[-0.96px] text-nowrap whitespace-pre"
          style="font-variation-settings: 14"
        >
          Acesso do Eleitor
        </p>
        <div
          class="relative w-[min-content] min-w-full shrink-0 font-['DM_Sans:Regular',_sans-serif] text-[18px] leading-[1.35] font-normal"
          style="font-variation-settings: 14"
        >
          <p class="mb-0">Entre com seus dados para votar</p>
          <p>&nbsp;</p>
        </div>
      </div>

      <div class="mb-4">
        <InputOverText id="cpf" v-model="cpf" placeholder="000.000.000-00" class="w-full"
          >CPF ou Matrícula
        </InputOverText>
      </div>
      <div class="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-3 text-center text-sm text-blue-700">
        <i class="pi pi-info-circle mr-1"></i>
        <strong>Como Acessar:</strong><br />
        Use o mesmo CPF ou matrícula que você utilizou durante o cadastro de eleitor.
      </div>

      <Button
        label="Acessar"
        icon="pi pi-arrow-right"
        iconPos="right"
        class="w-full !border-blue-600 !bg-blue-600 hover:!bg-blue-700"
        @click="login"
      />

      <p class="mt-6 text-center text-sm text-gray-600">
        Não consegue entrar?
        <a href="#" class="font-medium text-blue-600 hover:underline">Entre em Contato</a>
      </p>

      <p class="mt-10 text-center text-xs text-gray-400">Termos e Condições | Perguntas Frequentes | Fale Conosco</p>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import InputOverText from "@/volt/InputOverText.vue";
import Button from "primevue/button";
import { useLoginIdentity } from "@/api/auth/mutations";
const { mutate } = useLoginIdentity();

const router = useRouter();
const cpf = ref("");

const goBack = () => router.back();
const goRegister = () => router.push("/register");
const login = () => {
  if (!cpf.value) return alert("Informe seu CPF ou matrícula.");
  // lógica de autenticação
  // router.push("/dashboard");
  //
  mutate({ identifier: cpf.value });
};
definePageMeta({
  layout: "auth",
});
</script>

<style scoped>
body {
  font-family: "Inter", sans-serif;
}
</style>
