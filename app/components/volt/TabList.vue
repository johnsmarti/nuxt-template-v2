<template>
  <TabList unstyled :pt="theme" :ptOptions="{ mergeProps: ptViewMerge }" class="pc-tablist-custom">
    <slot></slot>
  </TabList>
</template>

<script setup lang="ts">
import TabList, { type TabListPassThroughOptions, type TabListProps } from "primevue/tablist";
import { ref } from "vue";
import { ptViewMerge } from "./utils";

interface Props extends /* @vue-ignore */ TabListProps { }
defineProps<Props>();

const navButton = `!absolute flex-shrink-0 top-0 z-20 h-full flex items-center justify-center cursor-pointer
  bg-[#E7EDFF] text-surface-500 hover:text-surface-700 w-8 sm:w-10
  focus-visible:z-10 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[-1px] focus-visible:outline-primary
  transition-colors duration-200`;

const theme = ref<TabListPassThroughOptions>({
  root: `
    inline-flex items-center justify-between w-full bg-transparent
    p-1 overflow-x-auto scrollbar-hide
  `,
  prevButton: `hidden`,
  nextButton: `hidden`,
  content: `
    flex items-center gap-2 sm:gap-3
    overflow-x-auto scroll-smooth
    scrollbar-hide px-2 sm:px-4
  `,
  tabList: `
    flex flex-row flex-wrap items-center gap-1 sm:gap-2
  `,
  activeBar: `hidden`,
});
</script>

<style scoped>
/* Oculta scrollbar em todos os navegadores */
.scrollbar-hide {
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Alvo: o TabList do PrimeVue renderiza botões com role="tab".
   Usamos :deep() para alcançar elementos internos mesmo com scoped CSS. */
.pc-tablist-custom :deep(button[role="tab"]) {
  /* base das tabs */
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  padding: 0.625rem 1rem;
  border-radius: 0.5rem;
  background-clip: padding-box;
  transition:
    color 300ms cubic-bezier(0.4, 0, 0.2, 1),
    background-color 300ms cubic-bezier(0.4, 0, 0.2, 1),
    border-color 300ms cubic-bezier(0.4, 0, 0.2, 1),
    transform 300ms cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  white-space: nowrap;
  font-weight: 600;
  font-size: 0.9375rem;
  color: #4b5563;
  overflow: hidden;
}

/* Efeito de pseudo-elemento para animação de fundo */
.pc-tablist-custom :deep(button[role="tab"])::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.1), transparent);
  transition: left 500ms cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 0;
}

/* Hover: borda cinza superior e leve background */
.pc-tablist-custom :deep(button[role="tab"]:hover) {
  color: #111827;
  background-color: rgba(0, 0, 0, 0.02);
  transform: translateY(-1px);
}

/* Hover effect no pseudo-elemento */
.pc-tablist-custom :deep(button[role="tab"]:hover)::before {
  left: 100%;
}

/* Active: efeito principal quando a tab está selecionada */
.pc-tablist-custom :deep(button[role="tab"][aria-selected="true"]) {
  color: #0ea5e9;
  background-color: rgba(14, 165, 233, 0.06);
  /* transform: translateY(-1px) scale(1.02); */
  /* box-shadow:
    0 4px 12px -2px rgba(14, 165, 233, 0.2),
    0 2px 8px -1px rgba(14, 165, 233, 0.15); */
  z-index: 10;
}

/* Efeito de brilho ao ativar */
.pc-tablist-custom :deep(button[role="tab"][aria-selected="true"])::before {
  left: 100%;
  animation: shimmer 1.5s ease-in-out;
}

/* Animação de shimmer para o efeito ativo */
@keyframes shimmer {
  0% {
    left: -100%;
  }

  50% {
    left: 100%;
  }

  100% {
    left: 100%;
  }
}

/* Efeito de pulso sutil para a tab ativa */
.pc-tablist-custom :deep(button[role="tab"][aria-selected="true"])::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 50%;
  width: 0;
  height: 2px;
  background: #0ea5e9;
  animation: pulseWidth 600ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes pulseWidth {
  0% {
    width: 0;
    left: 50%;
  }

  100% {
    width: 80%;
    left: 10%;
  }
}

/* Afastamento entre as abas e responsividade */
.pc-tablist-custom :deep(.p-tablist) {
  display: flex;
  gap: 0.5rem;
}

/* Garante scroll suave e comportamento móvel */
.pc-tablist-custom :deep(.p-tablist__nav) {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

/* Pequeno ajuste: quando houver muitos items, permitir scroll mantendo padding */
.pc-tablist-custom :deep(.p-tablist__content) {
  padding-inline: 0.25rem;
}

/* remover outline feio e melhorar foco acessível */
.pc-tablist-custom :deep(button[role="tab"]:focus-visible) {
  outline: none;
  box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.15);
  z-index: 30;
}

/* Transição suave para mudanças de estado */
.pc-tablist-custom :deep(.p-tablist) {
  transition: all 300ms ease;
}

/* Melhoria para mobile: reduzir efeitos em telas menores */
@media (max-width: 640px) {
  .pc-tablist-custom :deep(button[role="tab"][aria-selected="true"]) {
    transform: translateY(-1px) scale(1.01);
    box-shadow:
      0 2px 8px -1px rgba(14, 165, 233, 0.2),
      0 1px 4px -1px rgba(14, 165, 233, 0.15);
  }
}
</style>
