<template>
  <Toast
    unstyled
    :pt="theme"
    :ptOptions="{ mergeProps: ptViewMerge }"
  >
    <template #closeicon>
      <TimesIcon class="w-4 h-4" />
    </template>

    <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps ?? {}" />
    </template>
  </Toast>
</template>

<script setup lang="ts">
import TimesIcon from "@primevue/icons/times";
import Toast, { type ToastPassThroughOptions, type ToastProps } from "primevue/toast";
import { ref } from "vue";
import { ptViewMerge } from "./utils";

interface Props extends /* @vue-ignore */ ToastProps {}
defineProps<Props>();

const theme = ref<ToastPassThroughOptions>({
  root: `
    w-96 rounded-xl overflow-hidden
    bg-white/80 shadow-lg
    p-top-center:-translate-x-1/2 p-bottom-center:-translate-x-1/2
    p-center:min-w-[20vw] p-center:-translate-x-1/2 p-center:-translate-y-1/2
  `,

  message: `
    flex items-start gap-3 p-4 border-l-4 rounded-lg transition-all duration-300
    p-success:border-l-green-500 p-success:bg-green-50
    p-error:border-l-red-500 p-error:bg-red-50
    p-warn:border-l-yellow-500 p-warn:bg-yellow-50
    p-info:border-l-blue-500 p-info:bg-blue-50
  `,

  messageContent: `flex items-start gap-3 w-full`,

  messageIcon: `
    flex items-center justify-center w-5 h-5 mt-[2px]
    p-success:text-green-600 p-error:text-red-600 p-warn:text-yellow-600 p-info:text-blue-600
  `,

  messageText: `flex flex-col flex-1 gap-1`,

  summary: `font-semibold text-sm tracking-tight
    p-success:text-green-700 p-error:text-red-700 p-warn:text-yellow-700 p-info:text-blue-700
  `,

  detail: `text-sm text-gray-600`,

  closeButton: `
    flex items-center justify-center ml-auto p-1 rounded-md cursor-pointer
    text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all
  `,

  closeIcon: `w-4 h-4`,

  transition: {
    enterFromClass: "opacity-0 translate-y-2",
    enterActiveClass: "transition-all duration-300 ease-out",
    leaveActiveClass: "transition-all duration-300 ease-in",
    leaveToClass: "opacity-0 translate-y-2",
  },
});
</script>
