<template>
  <div class="field relative mb-4">
    <div class="input-wrapper relative">
      <Select
        unstyled
        :pt="theme"
        :ptOptions="{
          mergeProps: ptViewMerge
        }"
        v-model="modelValue"
        :placeholder="placeholder"
        :invalid="!!errorMessage"
        :options="options"
        :optionLabel="optionLabel"
        :optionValue="optionValue"
      >
        <template #dropdownicon>
            <ChevronDownIcon class="w-4 h-4 text-surface-500" />
        </template>
        <template #loadingicon>
            <SpinnerIcon class="animate-spin w-4 h-4 text-surface-500" />
        </template>
        <template #filtericon>
            <SearchIcon class="text-surface-400 w-4 h-4" />
        </template>
        <template #clearicon="{ clearCallback }">
            <TimesIcon 
              @click="clearCallback" 
              class="text-surface-400 absolute top-1/2 -mt-2 end-10 w-4 h-4 cursor-pointer" 
            />
        </template>
        <!-- Permite passar slots personalizados para o overlay (header, item, etc.) -->
        <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
            <slot :name="slotName" v-bind="slotProps ?? {}" />
        </template>
      </Select>

      <label 
        for="modelValue" 
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
import ChevronDownIcon from '@primevue/icons/chevrondown';
import SearchIcon from '@primevue/icons/search';
import SpinnerIcon from '@primevue/icons/spinner';
import TimesIcon from '@primevue/icons/times';
import Message from 'primevue/message';
import Select, { type SelectPassThroughOptions, type SelectProps } from 'primevue/select';
import { defineModel, ref } from 'vue';

// Tipagem genérica para o modelo, permitindo string, number, object, ou null
type SelectModel = string | number | object | null | undefined;

interface Props extends /* @vue-ignore */ SelectProps {
  label: string;
  placeholder?: string;
  errorMessage?: string;
  options: any[];
  optionLabel?: string;
  optionValue?: string;
}

const props = defineProps<Props>();
// Implementa v-model bidirecional
const modelValue = defineModel<SelectModel>({ default: null });


const theme = ref<SelectPassThroughOptions>({
    root: `inline-flex cursor-pointer relative select-none rounded-md p-fluid:flex
        bg-surface-0
        border border-surface-300 hover:border-surface-400
        p-focus:border-primary
        p-filled:bg-surface-50
        p-invalid:border-red-400
        p-disabled:bg-surface-200 p-disabled:text-surface-500 p-disabled:pointer-events-none
        shadow-[0_1px_2px_0_rgba(18,18,23,0.05)]
        transition-colors duration-200`,
    label: `block whitespace-nowrap overflow-hidden flex-auto w-[1%]
        py-2 px-3 overflow-ellipsis
        p-clearable:pe-7 p-empty:overflow-hidden p-empty:opacity-0 p-editable:cursor-default
        text-surface-700 bg-transparent border-none outline-none
        p-placeholder:text-surface-500
        p-disabled:text-surface-500
        p-small:text-sm p-small:px-[0.625rem] p-small:py-[0.375rem]
        p-large:text-lg p-large:px-[0.875rem] p-large:py-[0.625rem]`,
    dropdown: `flex items-center justify-center shrink-0 bg-transparent
        text-surface-400 w-10 rounded-e-md`,
    overlay: `absolute top-0 left-0 rounded-md p-portal-self:min-w-full
        bg-surface-0
        border border-surface-200
        text-surface-700
        shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px rgba(0,0,0,0.1)]`,
    header: `pt-2 pb-1 px-4`,
    pcFilterContainer: {
        root: `relative`
    },
    pcFilter: {
        root: `w-full appearance-none rounded-md outline-hidden
            bg-surface-0
            text-surface-700
            placeholder:text-surface-500
            border border-surface-300
            enabled:hover:border-surface-400
            enabled:focus:border-primary
            disabled:bg-surface-200 disabled:text-surface-500
            ps-3 pe-10 py-2 p-fluid:w-full
            transition-colors duration-200 shadow-[0_1px_2px_0_rgba(18,18,23,0.05)]`
    },
    pcFilterIconContainer: {
        root: `absolute top-1/2 -mt-2 leading-none end-3 z-1`
    },
    listContainer: `overflow-auto`,
    list: `m-0 p-1 list-none gap-[2px] flex flex-col`,
    optionGroup: `m-0 px-3 py-2 bg-transparent text-surface-500 font-semibold`,
    optionGroupLabel: ``,
    option: `cursor-pointer font-normal whitespace-nowrap relative overflow-hidden flex items-center
        px-3 py-2 border-none text-surface-700 bg-transparent rounded-sm
        p-focus:bg-surface-100 p-focus:text-surface-800
        p-selected:bg-highlight p-focus:p-selected:bg-highlight-emphasis
        transition-colors duration-200`,
    optionLabel: ``,
    optionCheckIcon: `relative -ms-[0.375rem] me-[0.375rem] text-surface-700`,
    optionBlankIcon: ``,
    emptyMessage: `px-3 py-2`,
    virtualScroller: ``,
    transition: {
        enterFromClass: 'opacity-0 scale-y-75',
        enterActiveClass: 'transition duration-120 ease-[cubic-bezier(0,0,0.2,1)]',
        leaveActiveClass: 'transition-opacity duration-100 ease-linear',
        leaveToClass: 'opacity-0'
    }
});
</script>

<style scoped>
/* Aplica a cor primária à label quando o Select está focado (overlay aberto) */
:deep(.p-select:focus-within) ~ .label {
  color: var(--p-primary-color);
}

/* Aplica a cor de erro à label quando o Select está inválido E focado */
:deep(.p-select.p-invalid:focus-within) ~ .label {
  color: #ef4444; /* Tailwind red-500 */
}
</style>