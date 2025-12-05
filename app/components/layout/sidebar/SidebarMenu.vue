<template>
  <nav class="mt-6">
    <ul class="space-y-2">
      <li v-for="item in items" :key="item.label" class="relative">
        <!-- Item com submenu -->
        <template v-if="item.children && item.children.length">
          <div @click="toggle(item.label)" :class="[
            'nav-link relative flex cursor-pointer items-center rounded-md px-5 py-4 text-base font-medium',
            (expanded === item.label || hasActiveChild(item)) ? 'active' : 'hover:bg-white/20']">
            <Icon v-if="item.lucide" :name="item.lucide" class="mr-3" />
            <i v-else :class="[item.icon, 'mr-3', 'icon-transition']"></i>
            <span>{{ item.label }}</span>
            <Icon :name="expanded === item.label ? 'lucide:chevron-up' : 'lucide:chevron-down'" class="ml-auto h-5 w-5" />
          </div>

          <transition name="submenu">
            <div v-if="expanded === item.label"
              class="submenu-container mx-4 my-2 overflow-hidden rounded-xl bg-white shadow-lg">
              <ul class="py-2">
                <li v-for="child in item.children" :key="child.label">
                  <NuxtLink :to="child.to" :class="[
                    'submenu-item flex cursor-pointer items-center px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-200 rounded-md',
                    isActive(child.to) ? 'bg-blue-50 text-blue-600 font-semibold' : 'hover:bg-gray-50'
                  ]">
                    <Icon v-if="child.lucide" :name="child.lucide" class="mr-3 text-blue-500" />
                    <i v-else :class="[child.icon, 'mr-3 text-blue-500']"></i>
                    <span>{{ child.label }}</span>
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </transition>
        </template>

        <!-- Item simples -->
        <template v-else>
          <SidebarItem :item="item" />
        </template>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import SidebarItem from './SidebarItem.vue';
import type { MenuItem } from './menuItems';


const props = defineProps<{ items: MenuItem[] }>()
const expanded = ref<string | null>(null)
const route = useRoute()

function toggle(label: string) {
  expanded.value = expanded.value === label ? null : label
}
function isActive(path: string) {
  return route.path === path
}
function hasActiveChild(item: MenuItem) {
  return (item.children || []).some((c) => route.path === c.to || route.path.startsWith(c.to))
}

onMounted(() => {
  const parent = (props.items || []).find((i) => hasActiveChild(i))
  if (parent) expanded.value = parent.label
})
watch(() => route.path, () => {
  const parent = (props.items || []).find((i) => hasActiveChild(i))
  expanded.value = parent ? parent.label : expanded.value
})
</script>

<style scoped>
.nav-link {
  margin: 5px 20px;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: left center;
}

/* Hover suave */
.nav-link:hover:not(.active) {
  transform: translateX(5px);
}

/* Active estilo pill branco com animações */
.active {
  background: #fff;
  color: #0356d6 !important;
  font-weight: bold;
  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px;
  margin-right: -1px;
  position: relative;
  animation: slideInPill 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.1),
    0 0 0 2px rgba(255, 255, 255, 0.2);
}

/* Animação do ícone no item ativo */
.active .icon-transition {
  animation: iconBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Keyframes para o slide do pill */
@keyframes slideInPill {
  0% {
    transform: translateX(-20px);
    opacity: 0;
  }

  60% {
    transform: translateX(5px);
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Keyframes para o bounce do ícone */
@keyframes iconBounce {

  0%,
  100% {
    transform: scale(1) rotate(0deg);
  }

  25% {
    transform: scale(1.2) rotate(-5deg);
  }

  50% {
    transform: scale(1.1) rotate(5deg);
  }

  75% {
    transform: scale(1.15) rotate(-3deg);
  }
}

/* shapes do active com transição suave */
.active::before,
.active::after {
  position: absolute;
  width: 22px;
  height: 22px;
  right: 0;
  content: "";
  pointer-events: none;
  animation: fadeInShape 0.4s ease-out;
}

.active::before {
  top: -20px;
  background: radial-gradient(circle at left top, transparent 20px, white 21px);
}

.active::after {
  bottom: -20px;
  background: radial-gradient(circle at left bottom, transparent 20px, white 21px);
}

/* Animação de fade para as shapes */
@keyframes fadeInShape {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Efeito de pulso sutil no badge quando o item está ativo */
.active .badge {
  animation: badgePulse 2s ease-in-out infinite;
}

@keyframes badgePulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }
}

/* Estilos do Submenu */
.submenu-container {
  animation: submenuSlide 0.3s ease-out;
}

.submenu-item {
  position: relative;
}

.submenu-item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: #0d6efd;
  transform: scaleY(0);
  transition: transform 0.2s ease;
}

.submenu-item:hover::before,
.submenu-item.bg-blue-50::before {
  transform: scaleY(1);
}

/* Transições do Submenu */
.submenu-enter-active,
.submenu-leave-active {
  transition: all 0.3s ease;
}

.submenu-enter-from {
  opacity: 0;
  transform: translateY(-10px);
  max-height: 0;
}

.submenu-enter-to {
  opacity: 1;
  transform: translateY(0);
  max-height: 500px;
}

.submenu-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 500px;
}

.submenu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
  max-height: 0;
}

@keyframes submenuSlide {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes submenuSlide {
  0% {
    opacity: 0;
    transform: translateY(-10px)
  }

  100% {
    opacity: 1;
    transform: translateY(0)
  }
}
</style>