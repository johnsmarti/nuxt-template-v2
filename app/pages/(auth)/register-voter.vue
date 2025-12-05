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
        <div class="text-center">
          <p class="text-[32px] font-semibold tracking-[-0.96px]">Cadastro de Eleitor</p>
          <p class="text-[14px] text-gray-600">Preencha seus dados para participar da eleição</p>
        </div>

        <div class="mt-6 flex flex-col gap-4">
          <InputText v-model="form.name" label="Nome Completo" placeholder="João Pedro" />
          <InputText v-model="form.document" label="CPF ou Matrícula" placeholder="000.000.000-00" />
          <InputText v-model="form.email" label="E-mail" placeholder="email@exemplo.com" />
          <InputText v-model="form.phone" label="Telefone ou Celular" placeholder="(00) 0000-0000" />

          <ButtonPrimary label="Cadastrar" iconPos="right"
            class="w-full !border-blue-600 !bg-blue-600 hover:!bg-blue-700" @click="submit">
            <template #icon>
              <Icon name="lucide:arrow-right" />
            </template>
          </ButtonPrimary>

          <p class="mt-6 text-center text-sm text-gray-600">
            Não consegue entrar?
            <NuxtLink to="/contact" class="font-medium text-blue-600 hover:underline">Entre em Contato</NuxtLink>
          </p>

          <p class="mt-10 text-center text-xs text-gray-400">Termos e Condições | Perguntas Frequentes | Fale Conosco
          </p>
        </div>
      </div>
    </template>
  </AuthLayout>
</template>

<script setup lang="ts">
import type { RegisterVoterPayload } from '@/api/auth/interfaces';
import { useRegisterVoter } from "@/api/auth/mutations";
import AuthLayout from "@/components/layout/AuthLayout.vue";
import InputText from "@/components/volt/InputText.vue";
import ButtonPrimary from "@/components/volt/ButtonPrimary.vue";
import { useRouter } from "vue-router";
import { reactive } from 'vue'

const { mutate } = useRegisterVoter();

const router = useRouter();

definePageMeta({
  layout: "auth",
});

const form = reactive<RegisterVoterPayload>({ name: '', document: '', email: '', phone: '', election_id: '' })
function submit() { mutate(form) }

const goBack = async () => router.back();
const goRegister = async () => router.push("/register");

</script>

<style scoped>
/* Estilos customizados se necessário */
</style>
