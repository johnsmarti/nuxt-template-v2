<template>
  <FormField v-slot="slotProps" :name="name">
    <div class="relative inline-block w-full">
      <div class="p-float-label w-full">
        <InputMask
          v-bind="forwardProps(slotProps)"
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
import InputMask, { type InputMaskPassThroughOptions, type InputMaskProps } from "primevue/inputmask";
import { ref } from "vue";
import { ptViewMerge } from "../app/volt/utils";

interface Props extends /* @vue-ignore */ Omit<InputMaskProps, "modelValue"> {
  name?: string;
  label?: string;
  modelValue?: string;
  error?: string;
  invalid?: boolean;
  overActive?: boolean;
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  overActive: false,
  placeholder: " ",
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const isFocused = ref(false);
const inputId = `input-${Math.random().toString(36).substr(2, 9)}`;

// Tipagem explícita do slot do FormField
type MaskError = { message?: string };
interface FormFieldSlotProps {
  value?: string | null;
  invalid?: boolean;
  error?: MaskError | undefined;
  props?: Partial<InputMaskProps>;
}

// 🔹 Compatível com o formato atual de slotProps
const modelValueValue = (slotProps?: FormFieldSlotProps): string => {
  const v = slotProps?.value ?? props.modelValue ?? "";
  return typeof v === "string" ? v : v == null ? "" : String(v);
};

const emitValue = (slotProps: FormFieldSlotProps | undefined, value: string) => {
  // Atualiza o valor dentro do form (quando existe)
  if (slotProps) slotProps.value = value;
  emit("update:modelValue", value);
};

const errorMessage = (slotProps?: FormFieldSlotProps): string => slotProps?.error?.message ?? props.error ?? "";

// Mescla props vindas do FormField com as props declaradas no componente,
// garantindo que a máscara e demais opções não sejam perdidas quando slotProps.props existir
function forwardProps(slotProps?: FormFieldSlotProps): Partial<InputMaskProps> {
  const slot = slotProps?.props ?? {};
  // Evita conflito com props controladas explicitamente
  const { modelValue, invalid, placeholder, pt, ptOptions, mask: maskFromSlot, ...restSlot } = slot as any;
  return {
    // Primeiro props vindas do slot (como aria, class, etc.)
    ...restSlot,
    // Depois as props do componente, garantindo que 'mask' não seja sobrescrita por undefined
    ...props,
    mask: props.mask ?? maskFromSlot,
  } as Partial<InputMaskProps>;
}

const theme = ref<InputMaskPassThroughOptions>({
  root: `appearance-none rounded-md outline-hidden
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
    px-3 py-2 w-full
    p-small:text-sm p-small:px-[0.625rem] p-small:py-[0.375rem]
    p-large:text-lg p-large:px-[0.875rem] p-large:py-[0.625rem]
    transition-colors duration-200 shadow-[0_1px_2px_0_rgba(18,18,23,0.05)]`,
});
</script>
