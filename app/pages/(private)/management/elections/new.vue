<template>
  <div class="container mx-auto px-4">
    <div class="flex items-center justify-between py-4">
      <div>
        <h1 class="text-2xl font-bold">Nova Eleição</h1>
        <p class="text-sm text-gray-500">Painel ADMIN | Eleições | Nova Eleição</p>
      </div>
    </div>

    <div class="rounded-2xl bg-white p-15 shadow">
      <Form v-slot="$form" :resolver="electionsResolver" :initial-values="initialValues"
        @submit="handleCreateElections">
        <div class="grid gap-4">
          <FormField v-slot="$field" name="title">
            <InputText label="Título da eleição *" placeholder="Ex: Eleição para Presidente da Associação"
              :error-message="$field.error?.message" />
          </FormField>
          <FormField v-slot="$field" name="description">
            <InputTextArea label="Descrição" placeholder="Descreva o objetivo e as regras da eleição"
              :error-message="$field.error?.message" />
          </FormField>
          <FormField v-slot="$field" name="election_type">
            <Select label="Tipo de eleição *" placeholder="Selecione o tipo" :options="typeOptions" optionLabel="label"
              optionValue="value" :error-message="$field.error?.message" />
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
              <p class="text-sm text-gray-500">Selecione se os resultados serão visíveis de forma pública ou privada
                apenas para os eleitores</p>
            </div>
            <FormField v-slot="$field" name="results_visibility">
              <Select placeholder="Selecione a visibilidade" :options="resultsVisibilityOptions" optionLabel="label"
                v-model="$field.value" optionValue="value" :error-message="$field.error?.message" />
            </FormField>
          </div>
          <hr class="my-3 border border-surface-200">
          <div class="flex flex-row items-center justify-between gap-2">
            <div>
              <label for="max_votes_per_voter">Maximo de votos por eleitor *</label>
              <p class="text-sm text-gray-500">Selecione o maximo de votos que cada eleitor pode votar</p>
            </div>
            <FormField v-slot="$field" name="max_votes_per_voter">
              <InputNumber v-model="$field.value" inputId="horizontal-buttons" showButtons buttonLayout="horizontal"
                :step="1" :min="0" :max="20" :width="'100px'">
                <template #incrementbuttonicon>
                  <span class="pi pi-plus" />
                </template>
                <template #decrementbuttonicon>
                  <span class="pi pi-minus" />
                </template>
              </InputNumber>
            </FormField>
          </div>
          <hr class="my-3 border border-surface-200">
          <div class="rounded-md border border-yellow-200 bg-yellow-50 p-5 text-sm text-yellow-700">
            <strong>Importante:</strong> Após criar a eleição, você precisará adicionar delegados e definir as chaves de
            segurança.
          </div>

          <div class="flex justify-end gap-2">
            <ButtonSecondary label="Cancelar" @click="cancel" />
            <ButtonPrimary label="Criar Eleição" class="!bg-blue-600 !border-blue-600" type="submit" />
          </div>
        </div>
      </Form>
    </div>
  </div>

</template>
<script setup lang="ts">
import type { ElectionCreatePayload } from '@/api/elections/interfaces'
import { useElectionCreate } from '@/api/elections/mutations'
import ButtonPrimary from '@/components/volt/ButtonPrimary.vue'
import ButtonSecondary from '@/components/volt/ButtonSecondary.vue'
import InputDate from '@/components/volt/InputDate.vue'
import InputNumber from '@/components/volt/InputNumber.vue'
import InputText from '@/components/volt/InputText.vue'
import InputTextArea from '@/components/volt/InputTextArea.vue'
import Select from '@/components/volt/Select.vue'
import ToggleSwitch from '@/components/volt/ToggleSwitch.vue'
import { electionsResolver } from '@/schemas/elections'
import { Form, FormField } from "@primevue/forms"
import { useRouter } from 'vue-router'
definePageMeta({ middleware: 'auth', layout: 'default' })

const router = useRouter()
const { mutateAsync } = useElectionCreate()

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
  allow_abstention: true,
  results_visibility: 'private'
})

function cancel() { router.back() }

const handleCreateElections = async ({ valid, values }: { valid: boolean; values: Record<string, unknown> }) => {
  if (!valid) return
  const payload = values as unknown as ElectionCreatePayload
  console.log(payload)
  await mutateAsync(payload)
}

</script>
