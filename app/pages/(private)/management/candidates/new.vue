<template>
  <div class="container mx-auto px-4">
    <div class="flex items-center justify-between py-4">
      <div>
        <h1 class="text-2xl font-bold">Novo Candidato</h1>
        <p class="text-sm text-gray-500">Painel ADMIN | Candidatos | Novo Candidato</p>
      </div>
    </div>

    <div class="rounded-2xl bg-white p-6 shadow">
      <Form v-slot="$form" :resolver="candidatesResolver" class="p-5" @submit="create">
        <!-- Select election -->
        <div class="flex flex-col flex-wrap gap-5">
          <FormField v-slot="$field" name="election_id">
            <Select
              label="Eleição"
              :options="electionsList"
              option-label="label"
              option-value="value"
              :error-message="$field.error?.message"
              placeholder="Selecione a eleição"
            />
          </FormField>
          <FormField v-slot="$field" name="position_id">
            <Select
              label="Cargo"
              :options="positionsList"
              option-label="label"
              option-value="value"
              :error-message="$field.error?.message"
              placeholder="Selecione um cargo"
            />
          </FormField>
          <FormField v-slot="$field" name="name">
            <InputText
              label="Nome do candidato"
              :error-message="$field.error?.message"
              placeholder="Informe o nome do candidato"
            />
          </FormField>
          <div class="grid grid-cols-2 gap-5">
            <FormField v-slot="$field" name="number">
              <InputNumber
                label="Número do candidato"
                :error-message="$field.error?.message"
                placeholder="Informe o número do candidato"
              />
            </FormField>
            <FormField v-slot="$field" name="party">
              <InputText
                label="Partido"
                :error-message="$field.error?.message"
                placeholder="Informe o partido do candidato"
              />
            </FormField>
          </div>
          <div
            class="cursor-pointer rounded-xl border border-dashed border-[#D8E6F7] bg-[#F6FAFF] px-4 py-10 text-center transition"
            role="button"
            @click="fileInput?.click()"
          >
            <input ref="fileInput" type="file" class="hidden" accept="image/*" @change="handleFileChange" />

            <!-- SEM IMAGEM (estado inicial) -->
            <div v-if="!previewImage">
              <!-- ÍCONE DENTRO DO CÍRCULO AZUL -->
              <div class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#007BFF] shadow-sm">
                <i class="pi pi-upload text-xl text-white"></i>
              </div>

              <!-- TEXTO PRINCIPAL -->
              <p class="font-medium text-[#007BFF]">Clique para adicionar a foto</p>

              <!-- TEXTO SECUNDÁRIO -->
              <p class="mt-1 text-sm text-[#6B7280]">JPG, PNG | Máx. 5MB</p>
            </div>

            <!-- QUANDO TEM IMAGEM -->
            <div v-else>
              <img
                :src="previewImage || ''"
                alt="Logo"
                class="mx-auto mb-3 h-28 w-28 rounded-full object-cover shadow-md"
              />

              <p class="font-medium text-[#007BFF]">Alterar foto</p>

              <button type="button" class="mt-2 text-sm text-red-500 hover:text-red-700" @click.stop="removeLogo">
                Remover foto
              </button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useNuxtApp } from "#app";
import { useElections } from "@/api/elections/queries";
import { usePositions } from "@/api/positions/queries";
import InputNumber from "@/components/volt/InputNumber.vue";
import InputText from "@/components/volt/InputText.vue";
import Select from "@/components/volt/Select.vue";
import { candidatesResolver } from "@/schemas/candidates";
import { Form, FormField } from "@primevue/forms";
import { useRouter } from "vue-router";

definePageMeta({ middleware: "auth", layout: "default" });

const { data: elections } = useElections();
const { data: positions } = usePositions();

const fileInput = ref<HTMLInputElement | null>(null);
const previewImage = ref<string | null>(null);
const selectedFile = ref<File | null>(null);

// value and label only draft
const electionsList = computed(
  () =>
    elections?.value
      ?.filter((e: any) => e.status === "draft")
      ?.map((e: any) => ({
        value: e.uuid,
        label: e.title,
      })) || [],
);

const positionsList = computed(
  () =>
    positions?.value?.map((e: any) => ({
      value: e.uuid,
      label: e.name,
    })) || [],
);

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];

    // Validação básica de tipo e tamanho (5MB)
    if (!file.type.match("image.*")) {
      // Mostrar mensagem de erro
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // Mostrar mensagem de erro
      return;
    }

    selectedFile.value = file;

    // Criar preview da imagem
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const removeLogo = () => {
  if (fileInput.value) {
    fileInput.value.value = "";
  }
  selectedFile.value = null;
  previewImage.value = null;
  // Se quiser remover o logo existente do servidor também
  // initialValues.value.logo_url = '';
};

const router = useRouter();
const { $axios } = useNuxtApp();

const form = reactive({ election_id: null, position_id: null, name: "", number: "", party: "", photo_url: "" });
</script>
