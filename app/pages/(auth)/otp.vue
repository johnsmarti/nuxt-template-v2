<template>
  <AuthLayout>
    <template #left>
      <!-- Conteúdo padrão -->
      <div class="mb-8 flex items-center space-x-2">
        <i class="pi pi-shield text-3xl"></i>
        <span class="text-2xl font-semibold">VoteSecure</span>
      </div>

      <div>
        <h1 class="mb-4 text-3xl leading-snug font-bold">Bem-vindo ao seu Portal<br />de Votação e Compatibilidade</h1>
        <p class="text-white/90">
          Acesse sua conta de eleitor de forma rápida e segura. Participe das eleições da sua organização com total
          transparência e confiabilidade.
        </p>
      </div>
    </template>
    <template #top>
      <div class="flex h-[10vh] w-full justify-around gap-4">
        <div class="flex cursor-pointer items-center gap-4 text-blue-600" @click="goBack">
          <ButtonPrimary icon="pi pi-check" aria-label="Filter" rounded>
            <template #icon>
              <Icon name="lucide:arrow-left" />
            </template>
          </ButtonPrimary>
          <span>Voltar</span>
        </div>
        <div class="flex items-center space-x-3 text-sm">
          <span>Primeira vez aqui?</span>
          <ButtonPrimary variant="outlined" label="Cadastrar como Eleitor" @click="goRegister" />
        </div>
      </div>
    </template>
    <template #right>
      <div class="mt-16 w-full max-w-md">
        <div
          class="relative flex w-full shrink-0 flex-col content-stretch items-center justify-center gap-[16px] text-center text-black">
          <p class="relative shrink-0 font-['DM_Sans:SemiBold',_sans-serif] text-[32px] leading-[1.1] font-semibold tracking-[-0.96px] text-nowrap whitespace-pre"
            style="font-variation-settings: 14">
            Acesso do Eleitor
          </p>
          <div
            class="relative w-[min-content] min-w-full shrink-0 font-['DM_Sans:Regular',_sans-serif] text-[18px] leading-[1.35] font-normal"
            style="font-variation-settings: 14">
            <p class="mb-0">Entre com seus dados para votar</p>
            <p>&nbsp;</p>
          </div>
        </div>

        <Form :resolver="otpResolver" @submit="onSubmit" class="flex flex-col gap-4 w-full max-w-md">
          <FormField v-slot="$field" name="otp">
            <InputOtp v-model="$field.value" />
          </FormField>
          <ButtonPrimary label="Enviar" class="w-full !border-blue-600 !bg-blue-600 hover:!bg-blue-700" type="submit" />
        </Form>
      </div>
    </template>
  </AuthLayout>
</template>

<script setup lang="ts">
import type { OTPCodePayload } from "@/api/auth/interfaces";
import { useOTPCode } from "@/api/auth/mutations";
import { otpResolver } from "@/schemas/auth";
import ButtonPrimary from "@/components/volt/ButtonPrimary.vue";
import InputOtp from "@/components/volt/InputOtp.vue";
import { Form, FormField } from "@primevue/forms";
import { useRouter } from "vue-router";

definePageMeta({
  layout: "auth",
});

const router = useRouter();
const { mutate } = useOTPCode();

const onSubmit = ({ valid, values }: { valid: boolean; values: Record<string, unknown> }) => {
  if (valid) {
    const payload = values as unknown as OTPCodePayload;
    mutate(payload);
  }
};

const goBack = async () => router.back();
const goRegister = async () => router.push("/register");
</script>
