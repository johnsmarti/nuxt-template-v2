<template>
  <Tab
    :value="props.value"
    unstyled
    :pt="theme"
    :ptOptions="{
      mergeProps: ptViewMerge,
    }"
  >
    <slot></slot>
  </Tab>
</template>

<script setup lang="ts">
import Tab, { type TabPassThroughOptions, type TabProps } from "primevue/tab";
import { ref } from "vue";
import { ptViewMerge } from "./utils";

interface Props extends /* @vue-ignore */ TabProps {}
const props = defineProps<Props>();

const theme = ref<TabPassThroughOptions>({
  root: `inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium relative cursor-pointer select-none transition-colors duration-200 disabled:pointer-events-none disabled:opacity-60
        text-surface-700
        hover:bg-surface-50
        data-[selected]:bg-primary-100 data-[selected]:text-primary-700
        focus-visible:z-10 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[-1px] focus-visible:outline-primary`,
});
</script>
