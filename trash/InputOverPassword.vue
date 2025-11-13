<template>
  <FormField v-slot="slotProps" :name="name">
    <div class="relative inline-block w-full">
      <div class="p-float-label w-full">
        <Password
          v-bind="slotProps?.props"
          :id="inputId"
          :pt="theme"
          :pt-options="{ mergeProps: ptViewMerge }"
          unstyled
          class="w-full"
          :placeholder="placeholder"
          :feedback="feedback"
          :toggle-mask="toggleMask"
          :invalid="slotProps?.invalid ?? invalid"
          :model-value="modelValueValue(slotProps)"
          @update:model-value="emitValue(slotProps, $event)"
          @focus="isFocused = true"
          @blur="isFocused = false"
        >
          <!-- Custom Feedback Panel -->
          <template #footer>
            <div v-if="feedback" class="mt-2 space-y-1 text-sm">
              <div :class="feedbackClass('length')">
                <i :class="feedbackIcon('length')" class="mr-2"></i>
                Mínimo de 3 caracteres
              </div>
              <div :class="feedbackClass('uppercase')">
                <i :class="feedbackIcon('uppercase')" class="mr-2"></i>
                Pelo menos uma letra maiúscula
              </div>
              <div :class="feedbackClass('lowercase')">
                <i :class="feedbackIcon('lowercase')" class="mr-2"></i>
                Pelo menos uma letra minúscula
              </div>
              <div :class="feedbackClass('number')">
                <i :class="feedbackIcon('number')" class="mr-2"></i>
                Pelo menos um número
              </div>
            </div>
          </template>
        </Password>

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

    <!-- Mensagem de erro -->
    <small v-if="(slotProps?.invalid || invalid) && errorMessage(slotProps)" class="mt-1 block text-xs text-red-500">
      {{ errorMessage(slotProps) }}
    </small>
  </FormField>
</template>

<script setup lang="ts">
import { FormField } from "@primevue/forms";
import Password, { type PasswordPassThroughOptions } from "primevue/password";
import { computed, ref } from "vue";
import { ptViewMerge } from "../app/volt/utils";

interface Props {
  name?: string;
  label?: string;
  modelValue?: string;
  error?: string;
  invalid?: boolean;
  overActive?: boolean;
  placeholder?: string;
  feedback?: boolean;
  toggleMask?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const isFocused = ref(false);
const inputId = `password-${Math.random().toString(36).substr(2, 9)}`;
const value = ref(props.modelValue ?? "");

// Obtém o valor atual do slot ou prop
const modelValueValue = (slotProps: any) => slotProps?.value ?? props.modelValue ?? "";

// Emite valor atualizado
const emitValue = (slotProps: any, val: string) => {
  if (slotProps) slotProps.value = val;
  value.value = val;
  emit("update:modelValue", val);
};

// Mensagem de erro
const errorMessage = (slotProps: any) => slotProps?.error?.message ?? props.error ?? "";

// Validação dinâmica do feedback
const feedbackChecks = computed(() => ({
  length: value.value.length >= 3,
  uppercase: /[A-Z]/.test(value.value),
  lowercase: /[a-z]/.test(value.value),
  number: /\d/.test(value.value),
}));

const feedbackClass = (key: keyof typeof feedbackChecks.value) =>
  feedbackChecks.value[key] ? "text-green-600 flex items-center" : "text-red-500 flex items-center";

const feedbackIcon = (key: keyof typeof feedbackChecks.value) =>
  feedbackChecks.value[key] ? "pi pi-check" : "pi pi-times";

// Tema visual (sem borda dupla)
const theme = ref<PasswordPassThroughOptions>({
  root: `appearance-none rounded-md outline-hidden
    bg-surface-0
    text-surface-700
    border border-surface-300
    hover:border-surface-400
    focus:border-primary
    disabled:bg-surface-200 disabled:text-surface-500
    p-invalid:border-red-400
    transition-colors duration-200
    px-3 py-2 w-full
    shadow-[0_1px_2px_0_rgba(18,18,23,0.05)]`,
  input: "w-full border-none bg-transparent outline-none",
  icon: "text-surface-400 hover:text-surface-600 cursor-pointer",
});
</script>
