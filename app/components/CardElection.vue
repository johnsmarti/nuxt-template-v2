<template>
  <!-- Card 1: Comitê de Ética -->
  <div
    class="card card-animate relative rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
  >
    <span :class="'badge-float rounded-full px-4 py-1.5 text-xs font-semibold ' + statusColor">{{
      statusTranslation
    }}</span>

    <h3 class="mt-2 mb-2 text-xl font-semibold text-gray-800">{{ props.title }}</h3>
    <p class="mb-4 text-sm text-gray-500">{{ props.description }}</p>

    <div class="mb-6 flex items-center gap-2 text-sm text-gray-600">
      <Icon name="lucide:calendar" />
      <span>{{ formatDates }}</span>
    </div>

    <div class="flex gap-3">
      <button
        class="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-3 font-bold text-gray-700 transition-colors hover:bg-gray-200"
        @click="edit(props.uuid)"
      >
        <Icon name="lucide:edit" class="h-5 w-5" />
        <span>Editar</span>
      </button>
      <button
        class="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-pink-50 px-4 py-3 font-bold text-pink-600 transition-colors hover:bg-pink-100"
        @click="remove(props.uuid)"
      >
        <Icon name="lucide:trash-2" class="h-5 w-5" />
        <span>Excluir</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  status: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dateStart: {
    type: String,
    required: true,
  },
  dateEnd: {
    type: String,
    required: true,
  },
  uuid: {
    type: String,
    required: true,
  },
});

const statusColor = computed(() => {
  switch (props.status) {
    case "active":
      return "text-green-500 bg-green-100";
    case "scheduled":
      return "text-blue-500 bg-blue-100";
    case "closed":
      return "text-red-500 bg-red-100";
    case "draft":
      return "text-yellow-500 bg-yellow-100";
    default:
      return "text-gray-500 bg-gray-100";
  }
});

// Retornar apenas dd/mm - dd/mm
const formatDates = computed(() => {
  const startDate = new Date(props.dateStart);
  const endDate = new Date(props.dateEnd);
  return `${startDate.getDate()}/${startDate.getMonth() + 1} - ${endDate.getDate()}/${endDate.getMonth() + 1}`;
});

const statusTranslation = computed(() => {
  switch (props.status) {
    case "active":
      return "Ativo";
    case "scheduled":
      return "Agendado";
    case "closed":
      return "Encerrado";
    case "draft":
      return "Rascunho";
    default:
      return "Desconhecido";
  }
});

const emit = defineEmits(["edit", "remove"]);

const edit = (uuid: string) => {
  emit("edit", uuid);
};

const remove = (uuid: string) => {
  emit("remove", uuid);
};
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  width: 400px !important;
  max-width: 400px !important;
  min-width: 400px !important;
}

.card-animate {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

.card-animate:nth-child(1) {
  animation-delay: 0.1s;
}

.card-animate:nth-child(2) {
  animation-delay: 0.2s;
}

.card-animate:nth-child(3) {
  animation-delay: 0.3s;
}

.card-animate:nth-child(4) {
  animation-delay: 0.4s;
}

.badge-float {
  position: absolute;
  top: 70px;
  right: -15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.text-pink-600 {
  color: #ff075f;
}

.bg-pink-50 {
  background-color: #ffe0eb;
}

.bg-pink-100 {
  background-color: #ffcdd2;
}
</style>
