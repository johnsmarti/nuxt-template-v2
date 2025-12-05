<template>
  <NuxtLink :to="item.to" class="block" :class="[isActive ? 'active' : 'hover:bg-white/20']">
    <div class="nav-link relative flex cursor-pointer items-center rounded-md px-5 py-4 text-base font-medium">
      <Icon v-if="item.lucide" :name="item.lucide" class="mr-3" />
      <i v-else :class="[item.icon, 'mr-3', 'icon-transition']"></i>
      <span>{{ item.label }}</span>
      <span v-if="item.badge" class="ml-auto rounded-full bg-white px-2 py-0.5 text-xs font-bold text-blue-600">{{
        item.badge }}</span>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { MenuItem } from './menuItems'
import { computed } from 'vue'
import { useRoute } from 'vue-router'


const props = defineProps<{ item: MenuItem }>()
const route = useRoute()
const isActive = computed(() => route.path === props.item.to)
</script>

<style scoped>
.nav-link {
  margin: 5px 20px;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: left center;
}

.nav-link:hover:not(.active) {
  transform: translateX(5px);
}

.active {
  background: #fff;
  color: #0356d6 !important;
  font-weight: bold;
  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px;
  margin-right: -1px;
  position: relative;
  animation: slideInPill 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 0 0 2px rgba(255, 255, 255, 0.2);
}

.active .icon-transition {
  animation: iconBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

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
</style>