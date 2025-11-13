<template>
    <div class="field relative mb-4">
    <div class="input-wrapper relative">
  <InputText
    unstyled
    :pt="theme"
    :ptOptions="{
      mergeProps: ptViewMerge,
    }"
    :placeholder="placeholder"
  />
  <label 
        for="value" 
        class="label bg-[var(--p-surface-0)] pointer-events-none absolute left-3 px-1 transition-all duration-200 text-base leading-[1.2rem] text-surface-700 -top-2 z-10"
      >
        {{ label }}
      </label>
    </div>
    
      <Message 
      class="p-error mt-2 text-red-600 text-sm" 
      severity="error" 
      v-if="errorMessage"
    >
      {{ errorMessage }}
    </Message>
    </div>
</template>

<script setup lang="ts">
import InputText, { type InputTextPassThroughOptions, type InputTextProps } from "primevue/inputtext";
import Message from 'primevue/message';
import { ref } from "vue";
import { ptViewMerge } from "./utils";

interface Props extends /* @vue-ignore */ InputTextProps {
    label: string;
    errorMessage?: string;
    placeholder?: string;
}
defineProps<Props>();

const theme = ref<InputTextPassThroughOptions>({
  root: `appearance-none rounded-md outline-hidden
        bg-surface-0 p-filled:bg-surface-50
        text-surface-700 placeholder:text-surface-500
        border border-surface-300 enabled:hover:border-surface-400
        enabled:focus:border-primary
        disabled:bg-surface-200 disabled:text-surface-500
        p-invalid:border-red-400
        p-invalid:placeholder:text-red-600
        px-3 py-3 p-fluid:w-full
        p-small:text-sm p-small:px-[0.625rem] p-small:py-[0.375rem]
        p-large:text-lg p-large:px-[0.875rem] p-large:py-[0.625rem]
        transition-colors duration-200 shadow-[0_1px_2px_0_rgba(18,18,23,0.05)] w-full`,
});
</script>
