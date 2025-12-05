<template>
  <div class="field relative mb-4" :style="{ width }">
    <div class="input-wrapper relative w-full">

      <InputNumber unstyled v-bind="$attrs" :pt="theme" :ptOptions="{ mergeProps: ptViewMerge }"
        :placeholder="placeholder" class="w-full">

        <!-- Slots extras -->
        <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
          <slot :name="slotName" v-bind="slotProps ?? {}" />
        </template>

        <!-- Ícone DECREMENTO -->
        <template #decrementicon>
          <AngleDownIcon class="w-3 h-3" />
        </template>
        <!-- Ícone INCREMENTO -->
        <template #incrementicon>
          <AngleUpIcon class="w-3 h-3" />
        </template>

      </InputNumber>

      <!-- LABEL -->
      <label v-if="label" class="label bg-[var(--p-surface-0)] absolute left-3 px-1 -top-2 z-10
               pointer-events-none transition-all duration-200 text-base
               text-surface-700">
        {{ label }}
      </label>
    </div>

    <!-- MENSAGEM DE ERRO -->
    <Message v-if="errorMessage" severity="error" class="p-error mt-2 text-red-600 text-sm">
      {{ errorMessage }}
    </Message>
  </div>
</template>

<script setup lang="ts">
import AngleDownIcon from '@primevue/icons/angledown';
import AngleUpIcon from '@primevue/icons/angleup';
import InputNumber, {
  type InputNumberPassThroughOptions,
  type InputNumberProps
} from 'primevue/inputnumber';
import Message from 'primevue/message';
import { ref } from 'vue';
import { ptViewMerge } from './utils';

interface Props extends /* @vue-ignore */ InputNumberProps {
  label?: string;
  errorMessage?: string;
  placeholder?: string;
  width?: string;
}

defineProps<Props>();

// ==============================
//  THEME — STACKED/VERTICAL STYLE
// ==============================
const theme = ref<InputNumberPassThroughOptions>({
  root: `
    inline-flex items-stretch w-full relative rounded-md 
    border border-surface-300 bg-white overflow-hidden
    focus-within:border-primary transition
  `,

  pcInputText: {
    root: `
      flex-1 appearance-none bg-white outline-none
      text-surface-700 placeholder:text-surface-500
      px-3 py-3
      enabled:hover:border-surface-400
      enabled:focus:border-primary
    `
  },

  buttonGroup: `
    flex flex-col
  `,

  // BTN INCREMENTO (TOPO)
  incrementButton: `
    flex items-center justify-center h-1/2 w-10 cursor-pointer
    border-l border-b border-surface-300
    bg-surface-50 hover:bg-surface-100 active:bg-surface-200
    text-surface-500 hover:text-surface-600
  `,

  // BTN DECREMENTO (BAIXO)
  decrementButton: `
    flex items-center justify-center h-1/2 w-10 cursor-pointer
    border-l border-surface-300
    bg-surface-50 hover:bg-surface-100 active:bg-surface-200
    text-surface-500 hover:text-surface-600
  `,
});
</script>