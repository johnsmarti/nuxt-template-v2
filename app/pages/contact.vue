<template>
  <div class="container mx-auto px-4">
    <div class="py-4">
      <h1 class="text-2xl font-bold">Contato</h1>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
      <div class="rounded-2xl bg-[#1e213f] p-6 text-white shadow">
        <h2 class="text-xl font-semibold">Envie uma mensagem</h2>
        <p class="mt-1 text-sm opacity-90">Preencha o formulário ao lado e nossa equipe entrará em contato com você o mais rápido possível.</p>
        <div class="mt-6 space-y-3 text-sm">
          <div class="flex items-center gap-2"><i class="pi pi-envelope"></i> suporte@votesecure.com.br</div>
          <div class="flex items-center gap-2"><i class="pi pi-phone"></i> +55 (11) 3456-7890</div>
        </div>
      </div>

      <div class="rounded-2xl bg-white p-6 shadow">
        <div class="grid gap-3">
          <InputText v-model="form.name" label="Nome" placeholder="Seu nome" />
          <InputText v-model="form.email" label="E-mail" placeholder="email@exemplo.com" />
          <InputText v-model="form.subject" label="Assunto" placeholder="Assunto da mensagem" />
          <InputTextArea v-model="form.message" label="Mensagem" placeholder="Digite sua mensagem" />
        </div>
        <div class="mt-4 flex justify-end">
          <ButtonPrimary label="Enviar sua Mensagem" class="!bg-blue-600 !border-blue-600" @click="send" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputText from '@/components/volt/InputText.vue'
import InputTextArea from '@/components/volt/InputTextArea.vue'
import ButtonPrimary from '@/components/volt/ButtonPrimary.vue'
import { reactive } from 'vue'
import { useNuxtApp } from '#app'

definePageMeta({ title: 'Contato', layout: 'default', middleware: 'auth' })

const form = reactive({ name: '', email: '', subject: '', message: '' })
const { $axios } = useNuxtApp()

async function send() {
  await $axios.post('/contact', form)
}
</script>
