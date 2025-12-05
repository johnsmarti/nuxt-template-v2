<template>
  <AuthLayout>
    <template #left>
      <div class="mb-8 flex items-center space-x-2">
        <i class="pi pi-shield text-3xl"></i>
        <span class="text-2xl font-semibold">VoteSecure</span>
      </div>
      <div>
        <h1 class="mb-4 text-3xl leading-snug font-bold">Bem-vindo ao seu Portal<br />de Votação e Compatibilidade</h1>
        <p class="text-white/90">Acesse sua conta de eleitor de forma rápida e segura. Participe das eleições da sua
          organização com total transparência e confiabilidade.</p>
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
          <ButtonPrimary variant="outlined" label="Faça login" @click="goLogin" />
        </div>
      </div>
    </template>
    <template #right>
      <div class="mt-16 w-full max-w-md">
        <div class="text-center">
          <p class="text-[32px] font-semibold tracking-[-0.96px]">Criar Conta</p>
          <p class="text-[14px] text-gray-600">Preencha os dados para se cadastrar</p>
        </div>

        <div class="mt-6 flex flex-col gap-4">
          <Form :resolver="registerUserResolver" :initial-values="form" @submit="onRegister">
            <FormField v-slot="$field" name="name">
              <InputText v-model="$field.value" label="Nome Completo" placeholder="João Pedro"
                :errorMessage="$field.error?.message" />
            </FormField>
            <FormField v-slot="$field" name="email">
              <InputText v-model="$field.value" label="E-mail" placeholder="email@exemplo.com"
                :errorMessage="$field.error?.message" />
            </FormField>
            <FormField v-slot="$field" name="password">
              <Password v-model="$field.value" label="Senha" placeholder="****************"
                :errorMessage="$field.errors" />
            </FormField>
            <FormField v-slot="$field" name="password_confirm">
              <Password v-model="$field.value" label="Confirmar Senha" placeholder="****************"
                :errorMessage="$field.errors" />
            </FormField>

            <ButtonPrimary label="Cadastrar" iconPos="right" type="submit"
              class="w-full !border-blue-600 !bg-blue-600 hover:!bg-blue-700">
              <template #icon>
                <Icon name="lucide:arrow-right" />
              </template>
            </ButtonPrimary>
          </Form>
        </div>
        <p class="mt-10 text-center text-xs text-gray-400">Termos e Condições | Perguntas Frequentes | Fale Conosco</p>
      </div>
    </template>
  </AuthLayout>
</template>

<script setup lang="ts">
import type { RegisterPayload } from '@/api/auth/interfaces'
import { useRegister } from '@/api/auth/mutations'
import AuthLayout from '@/components/layout/AuthLayout.vue'
import ButtonPrimary from '@/components/volt/ButtonPrimary.vue'
import InputText from '@/components/volt/InputText.vue'
import Password from '@/components/volt/Password.vue'
import { registerUserResolver } from '@/schemas/auth'
import { Form, FormField } from '@primevue/forms'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
const { mutate } = useRegister()

definePageMeta({ layout: 'auth' })

const router = useRouter()
const form = reactive({ name: '', email: '', password: '', password_confirm: '' })

function goBack() { router.back() }
function goLogin() { router.push('/login') }

const onRegister = async ({ valid, values }: { valid: boolean; values: Record<string, unknown> }) => {
  if (valid) {
    const payload = values as unknown as RegisterPayload;
    mutate(payload);
  }
}
</script>
