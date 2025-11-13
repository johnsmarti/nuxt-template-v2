<template>
  <FormField v-slot="slotProps" :name="name">
    <div class="relative inline-block w-full">
      <div class="p-float-label overflow w-full">
        <Select
          v-bind="slotProps?.props"
          :id="selectId"
          unstyled
          :pt="theme"
          :options="options"
          optionLabel="label"
          optionValue="value"
          class="w-full"
          :invalid="slotProps?.invalid ?? invalid"
          :model-value="modelValueValue(slotProps)"
          :placeholder="placeholder"
          @update:model-value="emitValue(slotProps, $event)"
          @focus="isFocused = true"
          @blur="isFocused = false"
          :ptOptions="{ mergeProps: ptViewMerge }"
        >
          <template #dropdownicon>
            <ChevronDownIcon class="text-surface-400 h-4 w-4" />
          </template>

          <template #empty>
            <div class="text-surface-500 px-3 py-2">Nenhuma opção disponível</div>
          </template>
        </Select>

        <label
          :for="selectId"
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

      <small v-if="(slotProps?.invalid || invalid) && errorMessage(slotProps)" class="mt-1 block text-xs text-red-500">
        {{ errorMessage(slotProps) }}
      </small>
    </div>
  </FormField>
</template>

<script setup lang="ts">
import { FormField } from "@primevue/forms";
import ChevronDownIcon from "@primevue/icons/chevrondown";
import Select, { type SelectPassThroughOptions } from "primevue/select";
import { ref } from "vue";
import { ptViewMerge } from "../app/volt/utils";

interface Option {
  label: string;
  value: string | number;
}

interface Props {
  name?: string;
  label?: string;
  modelValue?: string | number;
  options?: Option[];
  invalid?: boolean;
  error?: string;
  overActive?: boolean;
  placeholder?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const isFocused = ref(false);
const selectId = `select-${Math.random().toString(36).substr(2, 9)}`;

const modelValueValue = (slotProps: any) => slotProps?.value ?? props.modelValue ?? "";

const emitValue = (slotProps: any, value: any) => {
  if (slotProps) slotProps.value = value;
  emit("update:modelValue", value);
};

const errorMessage = (slotProps: any) => slotProps?.error?.message ?? props.error ?? "";

const theme = ref<SelectPassThroughOptions>({
  root: `flex items-center justify-between appearance-none rounded-md outline-hidden
    bg-surface-0 text-surface-700 border border-surface-300
    hover:border-surface-400 focus:border-primary
    disabled:bg-surface-200 disabled:text-surface-500
    p-invalid:border-red-400 transition-colors duration-200 shadow-[0_1px_2px_0_rgba(18,18,23,0.05)]
    w-full px-3 py-2`,

  label: `flex items-center flex-auto bg-transparent border-none outline-none
    placeholder:text-surface-500 text-base text-surface-700`,

  dropdown: `flex items-center justify-center shrink-0 bg-transparent 
    text-surface-400 w-5 h-5`,

  overlay: `absolute top-0 left-0 rounded-md p-portal-self:min-w-full
    bg-surface-0 border border-surface-200 text-surface-700 overflow-auto
    shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]`,

  option: `cursor-pointer font-normal whitespace-nowrap flex items-center
    px-3 py-2 rounded-sm hover:bg-surface-100 text-surface-700
    transition-colors duration-200`,
});
</script>
