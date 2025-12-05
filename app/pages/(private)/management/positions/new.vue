<template>
  <div class="container mx-auto px-4">
    <div class="flex items-center justify-between py-4">
      <div>
        <h1 class="text-2xl font-bold">Nova Cargo</h1>
        <p class="text-sm text-gray-500">Painel ADMIN | Cargos | Nova Cargo</p>
      </div>
    </div>

    <div class="rounded-2xl bg-white p-15 shadow">
      <Form :initial-values="initialValues" :resolver="positionsResolver" @submit="handleCreatePosition">
        <template #default="{ errors, values, valid }">
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField v-slot="$field" name="name">
              <InputText label="Nome" :error-message="$field.error?.message" placeholder="Ex: Presidente" />
            </FormField>
            <FormField v-slot="$field" name="election_id">
              <Select
                label="Eleição"
                :options="elections"
                option-label="label"
                option-value="value"
                :error-message="$field.error?.message"
                placeholder="Selecione a eleição"
              />
            </FormField>
            <FormField v-slot="$field" name="max_candidates">
              <InputNumber
                label="Máximo de candidatos"
                :error-message="$field.error?.message"
                :width="'100%'"
                :min="0"
                :max="10"
              />
            </FormField>
          </div>
          <div class="mt-6">
            <FormField v-slot="$field" name="description">
              <InputTextArea
                label="Descrição"
                :error-message="$field.error?.message"
                placeholder="Descrição do cargo"
              />
            </FormField>
          </div>
          <div class="flex justify-end gap-2">
            <ButtonSecondary label="Cancelar" @click="cancel" />
            <ButtonPrimary label="Salvar" :disabled="!valid" type="submit" />
          </div>
        </template>
      </Form>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PositionCreatePayload } from "@/api/positions/interfaces";
import { usePositionCreate } from "@/api/positions/mutations";
import ButtonPrimary from "@/components/volt/ButtonPrimary.vue";
import ButtonSecondary from "@/components/volt/ButtonSecondary.vue";
import InputNumber from "@/components/volt/InputNumber.vue";
import InputText from "@/components/volt/InputText.vue";
import InputTextArea from "@/components/volt/InputTextArea.vue";
import Select from "@/components/volt/Select.vue";
import { positionsResolver } from "@/schemas/positions";
import { Form, FormField } from "@primevue/forms";
import { useElections } from "~/api/elections/queries";
definePageMeta({ middleware: "auth", layout: "default" });

const router = useRouter();
const { mutateAsync } = usePositionCreate();
const { data } = useElections();

// value and label only draft
const elections = computed(
  () =>
    data?.value?.data
      ?.filter((e: any) => e.status === "draft")
      ?.map((e: any) => ({
        value: e.uuid,
        label: e.title,
      })) || [],
);
const initialValues = ref({
  name: "",
  description: "",
  max_candidates: 1,
  election_id: "",
});

function cancel() {
  router.back();
}

const handleCreatePosition = async ({ valid, values }: { valid: boolean; values: Record<string, unknown> }) => {
  if (!valid) return;
  const payload = values as unknown as PositionCreatePayload;
  console.log(payload);
  await mutateAsync(payload);
};
</script>
