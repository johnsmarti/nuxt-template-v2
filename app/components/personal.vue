<template>
  <Form v-slot="$form">
    <div class="rounded-2xl bg-white p-8 shadow-lg my-4">
      <!-- HEADER -->
      <div class="flex items-center gap-4">
        <div class="flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-[#E7EDFF]">
          <Icon name="lucide:book-user" class="text-[22px] text-[#0063FF]" />
        </div>

        <h2 class="text-[22px] font-semibold text-[#2F2F2F]">
          Informações Pessoais
        </h2>
      </div>

      <hr class="my-6 border-0 h-[2px] bg-[#CFE8FF]" />

      <!-- CONTENT WRAPPER -->
      <div class="grid grid-cols-[140px_1fr] gap-10">
        <!-- FOTO -->
        <div class="flex flex-col items-center gap-3">
          <div class="relative">
            <!-- PREVIEW -->
            <img :src="avatarPreview" class="h-[120px] w-[120px] rounded-full object-cover shadow" />

            <!-- BOTÃO PARA ABRIR O FILE INPUT -->
            <button type="button" @click="triggerFileInput"
              class="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#0063FF] shadow-md cursor-pointer">
              <Icon name="lucide:camera" class="text-white text-[18px]" />
            </button>

            <!-- INPUT INVISÍVEL -->
            <input ref="fileInput" type="file" accept="image/png, image/jpeg" class="hidden" @change="onFileChange" />
          </div>

          <div class="text-center text-sm">
            <p class="text-[#2F2F2F] font-medium">Altere sua Foto</p>
            <p class="text-[#6F6F6F] text-xs">JPG, PNG até 2MB</p>
          </div>
        </div>

        <!-- FORM FIELDS -->
        <div class="grid grid-cols-2 gap-4">
          <FormField v-slot="$field" name="name">
            <InputText name="name" label="Nome Completo" :errorMessage="$field.error?.message" v-model="$field.value"
              placeholder="Informe seu nome" />
          </FormField>
          <FormField v-slot="$field" name="email">
            <InputText name="email" label="Email" :errorMessage="$field.error?.message" v-model="$field.value"
              placeholder="Informe seu email" />
          </FormField>
          <FormField v-slot="$field" name="phone">
            <InputMask name="phone" label="Telefone" :errorMessage="$field.error?.message" v-model="$field.value"
              :mask="'(99) 99999-9999'" placeholder="(00) 00000-0000" />
          </FormField>
        </div>
      </div>
    </div>
    <div class="rounded-2xl bg-white p-8 shadow-lg my-4">
      <div class="flex items-center gap-4">
        <div class="flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-[#E7EDFF]">
          <Icon name="lucide:shield" class="text-[22px] text-[#0063FF]" />
        </div>
        <h2 class="text-[22px] font-semibold text-[#2F2F2F]">
          Segurança
        </h2>
      </div>
    </div>
  </Form>
</template>

<script setup lang="ts">
import InputMask from '@/components/volt/InputMask.vue';
import InputText from '@/components/volt/InputText.vue';
import { Form, FormField } from '@primevue/forms';
import { ref } from 'vue';

definePageMeta({
  layout: 'default',
  middleware: 'auth',
});

const fileInput = ref<HTMLInputElement | null>(null);
const avatarPreview = ref("https://i.pravatar.cc/300"); // foto inicial / do usuário

const triggerFileInput = () => {
  fileInput.value?.click();
};

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) return;

  // Validação por tamanho
  if (file.size > 2 * 1024 * 1024) {
    alert("O arquivo deve ter no máximo 2MB");
    return;
  }

  // Validação por tipo
  if (!["image/jpeg", "image/png"].includes(file.type)) {
    alert("A imagem deve ser JPG ou PNG");
    return;
  }

  // Atualiza preview
  const reader = new FileReader();
  reader.onload = () => {
    avatarPreview.value = reader.result as string;
  };
  reader.readAsDataURL(file);

  // Aqui você pode enviar para o backend:
  // const formData = new FormData();
  // formData.append("avatar", file);
  // await api.put("/profile/avatar", formData);
};

</script>

<style scoped></style>
