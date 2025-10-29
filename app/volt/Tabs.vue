<template>
    <Tabs
        :value="props.value"
        unstyled
        :pt="theme"
        :ptOptions="{
            mergeProps: ptViewMerge
        }"
    >
        <slot></slot>
    </Tabs>
</template>

<script setup lang="ts">
import Tabs, { type TabsPassThroughOptions, type TabsProps } from 'primevue/tabs';
import { ref, provide } from 'vue';
import { ptViewMerge } from './utils';

interface Props extends /* @vue-ignore */ TabsProps {}
const props = defineProps<Props>();

// Fornecer a injeção necessária para os componentes filhos
provide('$pcTabList', {});

const theme = ref<TabsPassThroughOptions>({
    root: `w-full flex flex-col`
});
</script>
