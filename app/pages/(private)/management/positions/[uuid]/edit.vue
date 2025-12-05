<template>
  <div class="container mx-auto px-4">
    <div class="flex items-center justify-between py-4">
      <div>
        <h1 class="text-2xl font-bold">Editar Cargo</h1>
        <p class="text-sm text-gray-500">Painel ADMIN | Cargos | Editar</p>
      </div>
    </div>

    <div class="rounded-2xl bg-white p-15 shadow">
      <Form :initial-values="initialValues" :resolver="positionsResolver" @submit="handleUpdatePosition">
        <template #default="{ errors, values, valid }">
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField v-slot="$field" name="name">
              <InputText label="Nome" :error-message="$field.error?.message" placeholder="Ex: Presidente" />
            </FormField>

            <FormField v-slot="$field" name="election_id">
              <Select
                label="Eleição"
                :options="electionOption"
                option-label="label"
                option-value="value"
                :error-message="$field.error?.message"
                placeholder="Eleição"
                disabled
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
import { ref, computed, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Form, FormField } from "@primevue/forms";
import ButtonPrimary from "@/components/volt/ButtonPrimary.vue";
import ButtonSecondary from "@/components/volt/ButtonSecondary.vue";
import InputNumber from "@/components/volt/InputNumber.vue";
import InputText from "@/components/volt/InputText.vue";
import InputTextArea from "@/components/volt/InputTextArea.vue";
import Select from "@/components/volt/Select.vue";
import { positionsResolver } from "@/schemas/positions";
import { usePosition } from "@/api/positions/queries";
import { usePositionUpdate } from "@/api/positions/mutations";
import type { Position } from "@/api/positions/interfaces";

definePageMeta({ middleware: "auth", layout: "default" });

const route = useRoute();
const router = useRouter();
const uuid = route.params.uuid as string;
const { data: positionRes } = usePosition(uuid);
const { mutateAsync } = usePositionUpdate();

const initialValues = ref({
  name: "",
  description: "",
  max_candidates: 1,
  election_id: "",
});

const electionOption = computed(() => {
  const resp = positionRes?.value as any;
  const data = resp?.data as Position | undefined;
  if (!data) return [] as any[];
  const label = (data as any).election?.title || "Eleição";
  return [{ value: (data as any).election_id, label }];
});

watchEffect(() => {
  const resp = positionRes?.value as any;
  const data = resp?.data as Position | undefined;
  if (data) {
    initialValues.value = {
      name: data.name || "",
      description: data.description || "",
      max_candidates: data.max_candidates ?? 1,
      election_id: (data as any).election_id || "",
    };
  }
});

function cancel() {
  router.back();
}

const handleUpdatePosition = async ({ valid, values }: { valid: boolean; values: Record<string, unknown> }) => {
  if (!valid) return;
  const payload = { ...(values as any), id: uuid, uuid };
  await mutateAsync(payload);
};
</script>
