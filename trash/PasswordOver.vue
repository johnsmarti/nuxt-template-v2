<template>
  <div class="field relative mb-4">
    <div class="input-wrapper relative">
      <Password
        unstyled
        :pt="theme"
        :ptOptions="{
            mergeProps: ptViewMerge
        }"
        v-model="value"
        :placeholder="placeholder"
        :feedback="false"
        toggleMask
      >
        <template #maskicon="{ toggleCallback }">
            <EyeSlashIcon @click="toggleCallback" class="end-3 text-surface-500 absolute top-1/2 -mt-2 w-4 h-4 cursor-pointer" />
        </template>
        <template #unmaskicon="{ toggleCallback }">
            <EyeIcon @click="toggleCallback" class="end-3 text-surface-500 absolute top-1/2 -mt-2 w-4 h-4 cursor-pointer" />
        </template>
      </Password>
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
import { ptViewMerge } from '@/volt/utils';
import EyeIcon from '@primevue/icons/eye';
import EyeSlashIcon from '@primevue/icons/eyeslash';
import Message from 'primevue/message';
import Password, { type PasswordPassThroughOptions, type PasswordProps } from 'primevue/password';
import { ref } from 'vue';

interface Props extends /* @vue-ignore */ PasswordProps {
  label: string;
  placeholder?: string;
  errorMessage?: string;
}

defineProps<Props>();
const value = ref("");

const theme = ref<PasswordPassThroughOptions>({
    root: `inline-flex relative p-fluid:flex`,
    pcInputText: {
        root: ({ props }) => [
          `appearance-none rounded-md outline-hidden
          bg-surface-0
          p-filled:bg-surface-50
          text-surface-700
          placeholder:text-surface-500
          border border-surface-300
          enabled:hover:border-surface-400
          enabled:focus:border-primary
          disabled:bg-surface-200 disabled:text-surface-500
          p-invalid:border-red-400
          p-invalid:placeholder:text-red-600
          px-3 py-2 p-fluid:w-full p-has-e-icon:pe-10
          p-small:text-sm p-small:px-[0.625rem] p-small:py-[0.375rem]
          p-large:text-lg p-large:px-[0.875rem] p-large:py-[0.625rem]
          transition-colors duration-200 shadow-[0_1px_2px_0_rgba(18,18,23,0.05)]`,
          props.invalid && 'border-red-400'
        ]
    },
    overlay: `p-3 rounded-md p-portal-self:min-w-full
        bg-surface-0
        border border-surface-200
        text-surface-700
        shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px rgba(0,0,0,0.1)]`,
    content: `flex flex-col gap-2`,
    meter: `h-3 bg-surface-200 rounded-md`,
    meterLabel: `h-full w-0 transition-[width] duration-1000 ease-in-out rounded-md
        p-weak:bg-red-500
        p-medium:bg-amber-500
        p-strong:bg-green-500`,
    meterText: ``,
    transition: {
        enterFromClass: 'opacity-0 scale-y-75',
        enterActiveClass: 'transition duration-120 ease-[cubic-bezier(0,0,0.2,1)]',
        leaveActiveClass: 'transition-opacity duration-100 ease-linear',
        leaveToClass: 'opacity-0'
    }
});
</script>

<style scoped>
/* Estilos para quando o input está focado */
:deep(.p-password:focus-within) ~ .label {
  color: var(--p-primary-color);
}

:deep(.p-password.p-invalid:focus-within) ~ .label {
  color: #ef4444; /* Tailwind red-500 equivalent */
}
</style>