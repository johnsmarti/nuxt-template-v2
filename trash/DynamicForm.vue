<template>
  <Form :resolver="resolver as any" :initial-values="initialValues" @submit="onSubmit">
    <div class="grid gap-4">
      <template v-for="field in schema" :key="field.name">
        <FormField v-slot="slotProps" :name="field.name">
          <div :class="['w-full', field.containerClass]">
            <!-- Campo principal -->
            <div class="group relative w-full">
              <!-- Input padrão -->
              <component
                v-if="field.type !== 'password'"
                :is="baseComponent(field)"
                v-bind="slotProps.props"
                :id="idFor(field)"
                :type="field.type === 'datetime' ? 'datetime-local' : field.type"
                :pt="componentTheme(field)"
                :pt-options="{ mergeProps: ptViewMerge }"
                unstyled
                class="w-full"
                :options="field.options"
                :mask="field.mask"
                :invalid="slotProps.invalid"
                :placeholder="field.placeholder ?? ' '"
              />

              <!-- Password -->
              <Password
                v-else
                v-bind="slotProps.props"
                :id="idFor(field)"
                :feedback="false"
                :toggleMask="false"
                :pt="componentTheme(field)"
                :pt-options="{ mergeProps: ptViewMerge }"
                unstyled
                class="w-full"
                :invalid="slotProps.invalid"
                :placeholder="field.placeholder ?? ' '"
              />

              <!-- Label flutuante -->
              <label
                :for="idFor(field)"
                :class="[
                  'bg-white pointer-events-none absolute left-3 px-1 transition-all duration-200',
                  slotProps.value || alwaysOver
                    ? 'text-primary -top-2 text-xs leading-tight'
                    : 'top-1/2 -translate-y-1/2 text-base leading-[1.2rem]',
                  slotProps.invalid && '!text-red-500',
                ]"
              >
                {{ field.label }}
              </label>

              <!-- Mensagem de erro -->
              <p
                v-if="slotProps.invalid && slotProps.error?.message"
                class="mt-1 text-xs text-red-500"
              >
                {{ slotProps.error.message }}
              </p>
            </div>
          </div>
        </FormField>
      </template>

      <!-- Botão -->
      <div v-if="showSubmit" class="mt-2">
        <ButtonPrimary type="submit" class="w-full">{{ submitText }}</ButtonPrimary>
      </div>
    </div>
  </Form>
</template>

<script setup lang="ts">
import ButtonPrimary from "@/volt/ButtonPrimary.vue";
import { ptViewMerge } from "@/volt/utils";
import { Form, FormField } from "@primevue/forms";
import InputMask from "primevue/inputmask";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Select from "primevue/select";
import Textarea from "primevue/textarea";

type FieldType =
  | "text"
  | "email"
  | "password"
  | "select"
  | "textarea"
  | "date"
  | "datetime"
  | "number"
  | "mask";

interface Option {
  label: string;
  value: string | number | boolean | null;
}

interface FieldSchema {
  name: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  options?: Option[];
  default?: unknown;
  props?: Record<string, unknown>;
  containerClass?: string;
  mask?: string;
}

interface Props {
  schema: FieldSchema[];
  resolver: unknown;
  labelOver?: boolean;
  alwaysOver?: boolean;
  showSubmit?: boolean;
  submitText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  labelOver: true,
  alwaysOver: false,
  showSubmit: true,
  submitText: "Enviar",
});

const emit = defineEmits<{
  (e: "submit", values: Record<string, unknown>): void;
}>();

const initialValues = computed<Record<string, unknown>>(() => {
  const obj: Record<string, unknown> = {};
  for (const f of props.schema) obj[f.name] = f.default ?? "";
  return obj;
});

function idFor(field: FieldSchema) {
  return `df-${field.name}`;
}

function onSubmit(payload: { values: Record<string, unknown>; valid: boolean }) {
  if (!payload?.valid) return;
  emit("submit", payload.values);
}

function baseComponent(field: FieldSchema) {
  switch (field.type) {
    case "text":
    case "email":
    case "number":
      return InputText;
    case "mask":
      return InputMask;
    case "password":
      return Password;
    case "select":
      return Select;
    case "textarea":
      return Textarea;
    case "date":
    case "datetime":
      return "input";
    default:
      return InputText;
  }
}

function componentTheme(field: FieldSchema) {
  const base =
    "appearance-none rounded-md outline-hidden bg-transparent border border-surface-300 text-surface-700 placeholder:text-surface-500 enabled:hover:border-surface-400 enabled:focus:border-primary disabled:bg-surface-100 disabled:text-surface-500 px-3 py-2 w-full transition-colors duration-200 shadow-[0_1px_2px_0_rgba(18,18,23,0.05)]";

  if (field.type === "select") {
    return {
      root: base,
      label:
        "flex items-center flex-auto bg-transparent border-none outline-none placeholder:text-surface-500 text-base text-surface-700",
      dropdown:
        "flex items-center justify-center shrink-0 bg-transparent text-surface-400 w-5 h-5",
    };
  }

  if (field.type === "password") {
    return {
      root: base,
      input: "bg-transparent border-0 outline-none w-full",
      panel: "hidden",
      meter: "hidden",
    };
  }

  return { root: base };
}
</script>

<style scoped>
/* Remove o fundo azul do autofill */
input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px white inset !important;
  box-shadow: 0 0 0 1000px white inset !important;
  -webkit-text-fill-color: #111 !important;
}

/* Password do PrimeVue */
:deep(.p-password input) {
  background: transparent !important;
  border: none !important;
  outline: none !important;
  width: 100%;
}

/* Borda vermelha quando inválido */
:deep([data-pc-name="password"].p-invalid),
:deep(input.p-invalid) {
  border-color: rgb(248 113 113) !important; /* red-400 */
}
</style>
