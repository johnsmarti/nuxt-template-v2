<template>
  <div>
    <!-- Botão Hambúrguer (Mobile) -->
    <button @click="toggleSidebar"
      class="fixed top-4 left-4 z-50 rounded-lg bg-[#0d6efd] p-3 text-white shadow-lg transition-all duration-300 hover:bg-[#0356d6] md:hidden"
      :class="{ 'left-60': isOpen }">
      <i :class="isOpen ? 'pi pi-times' : 'pi pi-bars'" class="text-xl"></i>
    </button>

    <!-- Overlay (Mobile) -->
    <div v-if="isOpen" @click="closeSidebar"
      class="bg-opacity-50 fixed inset-0 z-40 bg-black transition-opacity duration-300 md:hidden"
      :class="isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'"></div>

    <!-- Sidebar -->
    <aside :class="[
      'z-50 flex h-screen w-56 flex-col justify-between bg-gradient-to-b from-[#0d6efd] to-[#0356d6] text-white transition-transform duration-300 ease-in-out',
      'fixed md:relative',
      isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
    ]">
      <div class="">
        <!-- Logo -->
        <div class="p-6 text-2xl font-bold">
          EPIC<br />
          <span class="text-sm">urna digital</span>
        </div>

        <!-- Menu -->
        <nav class="mt-6">
          <ul class="space-y-2">
            <li v-for="item in menuItems" :key="item.label">
              <!-- Item principal -->
              <div @click="selectItem(item)" :class="[
                'nav-link relative flex cursor-pointer items-center rounded-md px-5 py-4 text-base font-medium',
                (activeItem === item.label && !item.hasDropdown) || (item.hasDropdown && isSubmenuOpen) ? 'active' : 'hover:bg-white/20',
              ]">
                <i :class="[item.icon, 'mr-3', 'icon-transition']"></i>
                <span>{{ item.label }}</span>

                <!-- Badge -->
                <span v-if="item.badge"
                  class="ml-auto rounded-full bg-white px-2 py-0.5 text-xs font-bold text-blue-600">
                  {{ item.badge }}
                </span>

                <!-- Seta (submenu) -->
                <Icon v-if="item.hasDropdown" :name="isSubmenuOpen ? 'lucide:chevron-up' : 'lucide:chevron-down'"
                  class="ml-auto h-5 w-5 transition-transform duration-300" />
              </div>

              <!-- Submenu -->
              <transition name="submenu">
                <div v-if="item.hasDropdown && isSubmenuOpen"
                  class="submenu-container mx-4 my-2 overflow-hidden rounded-xl bg-white shadow-lg">
                  <ul class="py-2">
                    <li v-for="subItem in item.submenu" :key="subItem.label" @click.stop="selectSubItem(subItem.label)"
                      :class="[
                        'submenu-item flex cursor-pointer items-center px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-200',
                        activeSubItem === subItem.label
                          ? 'bg-blue-50 text-blue-600 font-semibold'
                          : 'hover:bg-gray-50',
                      ]">
                      <i :class="[subItem.icon, 'mr-3 text-blue-500']"></i>
                      <span>{{ subItem.label }}</span>
                    </li>
                  </ul>
                </div>
              </transition>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Bottom Buttons -->
      <div class="space-y-3 p-6">
        <button class="flex w-full items-center rounded-lg bg-blue-700 px-4 py-2 transition hover:bg-blue-500">
          <i class="pi pi-cog mr-2"></i> Configurações
        </button>
        <button class="flex w-full items-center rounded-lg bg-red-600 px-4 py-2 transition hover:bg-red-500">
          <i class="pi pi-sign-out mr-2"></i> Sair
        </button>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref } from "vue";

const activeItem = ref("Painel Admin");
const activeSubItem = ref("Dashboard");
const isOpen = ref(false);
const isSubmenuOpen = ref(false);

const menuItems = [
  { label: "Dashboard", icon: "pi pi-home" },
  {
    label: "Painel Admin",
    icon: "pi pi-sliders-h",
    hasDropdown: true,
    submenu: [
      { label: "Dashboard", icon: "pi pi-chart-line" },
      { label: "Eleições", icon: "pi pi-calendar" },
      { label: "Cargos", icon: "pi pi-briefcase" },
      { label: "Delegados", icon: "pi pi-users" },
      { label: "Eleitores", icon: "pi pi-id-card" },
      { label: "Candidatos", icon: "pi pi-user" },
    ],
  },
  { label: "Votação", icon: "pi pi-check-square" },
  { label: "Resultados", icon: "pi pi-chart-bar", badge: 50 },
  { label: "Contato", icon: "pi pi-envelope" },
];

function toggleSidebar() {
  isOpen.value = !isOpen.value;
}

function closeSidebar() {
  isOpen.value = false;
}

function selectItem(item) {
  if (item.hasDropdown) {
    isSubmenuOpen.value = !isSubmenuOpen.value;
  } else {
    activeItem.value = item.label;
    isSubmenuOpen.value = false;
    if (window.innerWidth < 768) {
      closeSidebar();
    }
  }
}

function selectSubItem(label) {
  activeSubItem.value = label;
  if (window.innerWidth < 768) {
    closeSidebar();
  }
}
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
</style>