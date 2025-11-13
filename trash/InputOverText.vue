<template>
  <FormField v-slot="slotProps" :name="name">
    <div class="relative inline-block w-full">
      <div class="p-float-label w-full">
        <InputText
          v-bind="slotProps?.props"
          :id="inputId"
          :pt="theme"
          :pt-options="{ mergeProps: ptViewMerge }"
          unstyled
          class="w-full"
          :placeholder="placeholder"
          :invalid="slotProps?.invalid ?? invalid"
          :model-value="modelValueValue(slotProps)"
          @update:model-value="emitValue(slotProps, $event)"
          @focus="isFocused = true"
          @blur="isFocused = false"
        />

        <label
          :for="inputId"
          class="bg-surface-0 pointer-events-none absolute left-3 px-1 transition-all duration-200"
          :class="[
            'text-surface-500',
            isFocused || modelValueValue(slotProps) || overActive
              ? 'text-primary -top-2 text-xs leading-tight'
              : 'top-1/2 -translate-y-1/2 text-base leading-[1.2rem]',
          ]"
        >
          {{ label }}
        </label>
      </div>
    </div>
    <small v-if="(slotProps?.invalid || invalid) && errorMessage(slotProps)" class="mt-1 block text-xs text-red-500">
      {{ errorMessage(slotProps) }}
    </small>
  </FormField>
</template>

<script setup lang="ts">
import { FormField } from "@primevue/forms";
import InputText, { type InputTextPassThroughOptions } from "primevue/inputtext";
import { ref } from "vue";
import { ptViewMerge } from "../app/volt/utils";

interface Props {
  name?: string;
  label?: string;
  modelValue?: string;
  error?: string;
  invalid?: boolean;
  overActive?: boolean;
  placeholder?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const isFocused = ref(false);
const inputId = `input-${Math.random().toString(36).substr(2, 9)}`;

// 🔹 Compatível com o formato atual de slotProps
const modelValueValue = (slotProps: any) => slotProps?.value ?? props.modelValue ?? "";

const emitValue = (slotProps: any, value: string) => {
  // Atualiza o valor dentro do form (quando existe)
  if (slotProps) slotProps.value = value;
  emit("update:modelValue", value);
};

const errorMessage = (slotProps: any) => slotProps?.error?.message ?? props.error ?? "";

const theme = ref<InputTextPassThroughOptions>({
  root: `appearance-none rounded-md outline-hidden
    bg-surface-0
    text-surface-700
    placeholder:text-surface-500
    border border-surface-300
    enabled:hover:border-surface-400
    enabled:focus:border-primary
    disabled:bg-surface-200 disabled:text-surface-500
    p-invalid:border-red-400
    p-invalid:placeholder:text-red-600
    px-3 py-2
    w-full
    transition-colors duration-200
    shadow-[0_1px_2px_0_rgba(18,18,23,0.05)]`,
});
</script>
