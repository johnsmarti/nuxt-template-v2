<template>
  <div class="container mx-auto px-4">
    <div class="flex items-center justify-between py-4">
      <div>
        <h1 class="text-2xl font-bold">Editar Eleição</h1>
        <p class="text-sm text-gray-500">Painel ADMIN | Eleições | Editar</p>
      </div>
    </div>

    <div class="rounded-2xl bg-white p-15 shadow">
      <Form v-slot="$form" :resolver="electionsResolver" :initial-values="initialValues" @submit="handleUpdateElections">
        <div class="grid gap-4">
          <FormField v-slot="$field" name="title">
            <InputText label="Título da eleição *" placeholder="Ex: Eleição para Presidente da Associação" :error-message="$field.error?.message" />
          </FormField>
          <FormField v-slot="$field" name="description">
            <InputTextArea label="Descrição" placeholder="Descreva o objetivo e as regras da eleição" :error-message="$field.error?.message" />
          </FormField>
          <FormField v-slot="$field" name="election_type">
            <Select label="Tipo de eleição *" placeholder="Selecione o tipo" :options="typeOptions" optionLabel="label" optionValue="value" :error-message="$field.error?.message" />
          </FormField>

          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField v-slot="$field" name="start_date">
              <InputDate label="Data de início *" placeholder="DD/MM/AAAA" :error-message="$field.error?.message" />
            </FormField>
            <FormField v-slot="$field" name="end_date">
              <InputDate label="Data de término *" placeholder="DD/MM/AAAA" :error-message="$field.error?.message" />
            </FormField>
          </div>

          <hr class="my-3 border border-surface-200">
          <div class="flex flex-row items-center justify-between gap-2">
            <div>
              <label for="allow_abstention">Permitir abstenção</label>
              <p class="text-sm text-gray-500">Selecione se os eleitores podem votar em branco</p>
            </div>
            <FormField v-slot="$field" name="allow_abstention">
              <ToggleSwitch v-model="$field.value" :error-message="$field.error?.message" />
            </FormField>
          </div>

          <hr class="my-3 border border-surface-200">
          <div class="flex flex-row items-center justify-between gap-2">
            <div>
              <label for="results_visibility">Visibilidade dos resultados *</label>
              <p class="text-sm text-gray-500">Selecione se os resultados serão visíveis de forma pública ou privada apenas para os eleitores</p>
            </div>
            <FormField v-slot="$field" name="results_visibility">
              <Select placeholder="Selecione a visibilidade" :options="resultsVisibilityOptions" optionLabel="label" v-model="$field.value" optionValue="value" :error-message="$field.error?.message" />
            </FormField>
          </div>

          <hr class="my-3 border border-surface-200">
          <div class="flex flex-row items-center justify-between gap-2">
            <div>
              <label for="max_votes_per_voter">Maximo de votos por eleitor *</label>
              <p class="text-sm text-gray-500">Selecione o maximo de votos que cada eleitor pode votar</p>
            </div>
            <FormField v-slot="$field" name="max_votes_per_voter">
              <InputNumber v-model="$field.value" inputId="horizontal-buttons" showButtons buttonLayout="horizontal" :step="1" :min="0" :max="20" :width="'100px'">
                <template #incrementbuttonicon>
                  <span class="pi pi-plus" />
                </template>
                <template #decrementbuttonicon>
                  <span class="pi pi-minus" />
                </template>
              </InputNumber>
            </FormField>
          </div>

          <div class="flex justify-end gap-2">
            <ButtonSecondary label="Cancelar" @click="cancel" />
            <ButtonPrimary label="Salvar Alterações" class="!bg-blue-600 !border-blue-600" type="submit" />
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Form, FormField } from '@primevue/forms'
import ButtonPrimary from '@/components/volt/ButtonPrimary.vue'
import ButtonSecondary from '@/components/volt/ButtonSecondary.vue'
import InputDate from '@/components/volt/InputDate.vue'
import InputNumber from '@/components/volt/InputNumber.vue'
import InputText from '@/components/volt/InputText.vue'
import InputTextArea from '@/components/volt/InputTextArea.vue'
import Select from '@/components/volt/Select.vue'
import ToggleSwitch from '@/components/volt/ToggleSwitch.vue'
import { electionsResolver } from '@/schemas/elections'
import { useElection } from '@/api/elections/queries'
import { useElectionUpdate } from '@/api/elections/mutations'
import type { Election } from '@/api/elections/interfaces'

definePageMeta({ middleware: 'auth', layout: 'default' })

const route = useRoute()
const router = useRouter()
const uuid = route.params.uuid as string
const { data: electionRes } = useElection(uuid)
const { mutateAsync } = useElectionUpdate()

const typeOptions = [
  { label: 'Geral', value: 'general' },
  { label: 'Conselho', value: 'council' },
  { label: 'Diretoria', value: 'board' },
  { label: 'Comissão', value: 'commission' },
  { label: 'Presidente', value: 'president' },
  { label: 'Partido', value: 'party' }
]

const resultsVisibilityOptions = [
  { label: 'Público', value: 'public' },
  { label: 'Privado', value: 'private' }
]

const initialValues = ref({
  title: '',
  description: '',
  election_type: '',
  max_votes_per_voter: 1,
  allow_abstention: false,
  results_visibility: 'private',
  start_date: '',
  end_date: ''
})

watchEffect(() => {
  const resp = electionRes?.value as any
  const data = resp?.data as Election | undefined
  if (data) {
    initialValues.value = {
      title: (data as any).title || '',
      description: (data as any).description || '',
      election_type: (data as any).election_type || '',
      max_votes_per_voter: (data as any).max_votes_per_voter ?? 1,
      allow_abstention: (data as any).allow_abstention ?? false,
      results_visibility: (data as any).results_visibility || 'private',
      start_date: (data as any).date_start || (data as any).start_date || '',
      end_date: (data as any).date_end || (data as any).end_date || '',
    }
  }
})

function cancel() { router.back() }

const handleUpdateElections = async ({ valid, values }: { valid: boolean; values: Record<string, unknown> }) => {
  if (!valid) return
  const payload = { ...(values as any), uuid }
  await mutateAsync(payload)
}
</script>
