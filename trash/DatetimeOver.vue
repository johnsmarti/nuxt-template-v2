<template>
  <FormField v-slot="slotProps" :name="name">
    <div class="relative inline-block w-full">
      <div class="p-float-label w-full">
        <input
          v-bind="slotProps?.props"
          type="datetime-local"
          :id="inputId"
          class="border-surface-300 bg-surface-0 text-surface-700 hover:border-surface-400 focus:border-primary disabled:bg-surface-200 disabled:text-surface-500 p-invalid:border-red-400 w-full appearance-none rounded-md border px-3 py-2 placeholder-transparent shadow-[0_1px_2px_0_rgba(18,18,23,0.05)] outline-hidden transition-colors duration-200"
          :value="modelValueValue(slotProps)"
          @input="emitValue(slotProps, $event.target.value)"
          @focus="isFocused = true"
          @blur="isFocused = false"
          :aria-invalid="slotProps?.invalid ?? invalid"
          placeholder=" "
        />

        <label
          :for="inputId"
          class="bg-surface-0 pointer-events-none absolute left-3 px-1 transition-all duration-200"
          :class="[
            'text-surface-500',
            isFocused || modelValueValue(slotProps)
              ? 'text-primary -top-2 text-xs leading-tight'
              : 'top-1/2 -translate-y-1/2 text-base leading-[1.2rem]',
          ]"
        >
          {{ label }}
          <span v-if="required" class="text-red-500">*</span>
        </label>
      </div>

      <small v-if="(slotProps?.invalid || invalid) && errorMessage(slotProps)" class="mt-1 block text-xs text-red-500">
        {{ errorMessage(slotProps) }}
      </small>
    </div>
  </FormField>
</template>

<script setup lang="ts">
import { FormField } from "@primevue/forms";
import { ref } from "vue";

interface Props {
  name?: string;
  label?: string;
  modelValue?: string | null;
  required?: boolean;
  invalid?: boolean;
  error?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const isFocused = ref(false);
const inputId = `datetime-${Math.random().toString(36).substr(2, 9)}`;

const modelValueValue = (slotProps: any) => slotProps?.value ?? props.modelValue ?? "";

const emitValue = (slotProps: any, value: string) => {
  if (slotProps) slotProps.value = value;
  emit("update:modelValue", value);
};

const errorMessage = (slotProps: any) => slotProps?.error?.message ?? props.error ?? "";
</script>
