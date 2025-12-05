<template>
  <div class="container mx-auto px-4">
    <div class="flex items-center justify-between py-4">
      <div>
        <h1 class="text-2xl font-bold">Nova Eleição</h1>
        <p class="text-sm text-gray-500">Painel ADMIN | Eleições | Nova Eleição</p>
      </div>
    </div>

    <div class="rounded-2xl bg-white p-6 shadow">
      <Form v-slot="$form" :resolver="delegatesResolver" @submit="create">
        <div class="grid gap-4">
          <FormField v-slot="$field">
            <Select v-model="$field.value" :options="typeOptions" label="Tipo de Eleição"
              placeholder="Selecione uma eleição" />
          </FormField>
          <FormField>
            <InputText name="name" label="Nome Completo" placeholder="Nome do Delegado" />
          </FormField>
          <FormField>
            <InputText name="email" label="E-mail*" placeholder="Email@exemplo.com" />
          </FormField>
          <div class="grid grid-cols-2 gap-4">
            <FormField>
              <InputText name="document" label="CPF/Documento" placeholder="000.000.000-00" />
            </FormField>
            <FormField v-slot="$field">
              <InputMask name="phone" label="Telefone" placeholder="(00) 00000-0000" mask="(99) 99999-9999"
                v-model="$field.value" />
            </FormField>
          </div>
          <div class="flex justify-end gap-2">
            <ButtonSecondary label="Cancelar" @click="cancel" />
            <ButtonPrimary label="Criar Eleição" class="!bg-blue-600 !border-blue-600" @click="create" />
          </div>
        </div>
      </Form>
    </div>
  </div>

</template>
<script setup lang="ts">
import { useNuxtApp } from '#app';
import ButtonPrimary from '@/components/volt/ButtonPrimary.vue';
import ButtonSecondary from '@/components/volt/ButtonSecondary.vue';
import InputMask from "@/components/volt/InputMask.vue";
import InputText from "@/components/volt/InputText.vue";
import Select from "@/components/volt/Select.vue";
import { delegatesResolver } from '@/schemas/delegates';
import { Form, FormField } from "@primevue/forms";
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

definePageMeta({ middleware: 'auth', layout: 'default' })

const router = useRouter()
const { $axios } = useNuxtApp()

const form = reactive({ name: '', description: '', type: null as any, starts_at: '', ends_at: '' })
const typeOptions = [
  { label: 'Geral', value: 'general' },
  { label: 'Conselho', value: 'council' },
  { label: 'Diretoria', value: 'board' },
  { label: 'Comissão', value: 'commission' },
  { label: 'Presidente', value: 'president' },
  { label: 'Partido', value: 'party' }
]

function cancel() { router.back() }
async function create() {
  const payload = { ...form }
  await $axios.post('/elections', payload)
  router.push('/(private)/elections')
}
</script>
