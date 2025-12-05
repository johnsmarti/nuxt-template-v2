<template>
  <div v-if="isPending">
    <!-- Carregamento -->
    <div class="flex items-center justify-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  </div>
  <Form v-slot="$form" :resolver="validationSchema" @submit="submit" :initial-values="initialValues" v-if="!isPending">
    <div class="my-6 rounded-xl bg-white p-6 shadow-sm">
      <div class="flex items-center gap-4">
        <div class="flex h-[60px] w-[60px] items-center justify-center rounded-[20px] bg-[#E7EDFF]">
          <Icon name="lucide:building-2" class="text-[22px] text-[#0063FF]" />
        </div>
        <div>
          <h2 class="lont-semibold font-bold text-[#2F2F2F] text-[22px]">Perfil da Empresa</h2>
          <p class="lont-normal le text-lg font-normal text-[#6E8899]">Informações básicas da sua organização</p>
        </div>
      </div>
      <hr class="my-5 h-[2px] bg-[#CFE8FF] text-[#CFE8FF]" />
      <div class="flex flex-col gap-4">
        <div class="grid grid-cols-2 gap-4">
          <FormField v-slot="$field" name="name">
            <InputText name="name" label="Nome da Empresa" :errorMessage="$field.error?.message" />
          </FormField>
          <FormField name="cnpj" v-slot="$field">
            <InputMask name="cnpj" label="CNPJ" :errorMessage="$field.error?.message" :mask="'99.999.999/9999-99'"
              v-model="$field.value" />
          </FormField>
        </div>
        <FormField v-slot="$field" name="description">
          <InputTextArea name="description" label="Descrição" :errorMessage="$field.error?.message"
            placeholder="Descreva sua empresa" />
        </FormField>
        <FormField v-slot="$field" name="segment">
          <Select name="segment" label="Segmento" optionLabel="label" optionValue="value" :options="segmentOptions"
            v-model="$field.value" :errorMessage="$field.error?.message" />
        </FormField>
      </div>
    </div>
    <div class="my-6 rounded-xl bg-white p-6 shadow-sm">
      <div class="mb-5 flex items-center gap-4">
        <div class="flex h-[60px] w-[60px] items-center justify-center rounded-[20px] bg-[#E7EDFF]">
          <Icon name="lucide:phone" class="text-[22px] text-[#0063FF]" />
        </div>
        <div>
          <h2 class="lfoni-s-mibold text-[22px] font-semibold text-[#2F2F2F]">Informações de Contato</h2>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <div class="grid grid-cols-2 gap-4">
          <FormField v-slot="$field" name="phone">
            <InputMask name="phone" label="Telefone" :errorMessage="$field.error?.message" :mask="'(99) 99999-9999'"
              v-model="$field.value" />
          </FormField>
          <FormField v-slot="$field" name="email">
            <InputText name="email" label="Email" :errorMessage="$field.error?.message" v-model="$field.value" />
          </FormField>
        </div>
        <FormField v-slot="$field" name="website">
          <InputText name="website" label="Website" :errorMessage="$field.error?.message" v-model="$field.value" />
        </FormField>
      </div>
    </div>
    <div class="my-6 rounded-xl bg-white p-6 shadow-sm">
      <div class="mb-5 flex items-center gap-4">
        <div class="flex h-[60px] w-[60px] items-center justify-center rounded-[20px] bg-[#E7EDFF]">
          <Icon name="lucide:map-pin" class="text-[22px] text-[#0063FF]" />
        </div>
        <div>
          <h2 class="lfoni-s-mibold text-[22px] font-semibold text-[#2F2F2F]">Endereço</h2>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <FormField v-slot="$field" name="address">
          <InputText name="address" label="Endereço" :errorMessage="$field.error?.message" v-model="$field.value" />
        </FormField>
        <div class="grid grid-cols-3 gap-4">
          <FormField v-slot="$field" name="city">
            <InputText name="city" label="Cidade" :errorMessage="$field.error?.message" v-model="$field.value" />
          </FormField>
          <FormField v-slot="$field" name="state">
            <InputText name="state" label="Estado" :errorMessage="$field.error?.message" v-model="$field.value" />
          </FormField>
          <FormField v-slot="$field" name="zip_code">
            <InputMask name="zip_code" label="CEP" :errorMessage="$field.error?.message" :mask="'99999-999'"
              v-model="$field.value" />
          </FormField>
        </div>
      </div>
    </div>
    <div class="my-6 rounded-xl bg-white p-6 shadow-sm">

      <div class="flex items-center gap-4">
        <div class="flex h-[60px] w-[60px] items-center justify-center rounded-[20px] bg-[#E7EDFF]">
          <Icon name="lucide:building-2" class="text-[22px] text-[#0063FF]" />
        </div>
        <div>
          <h2 class="lont-semibold font-bold text-[#2F2F2F] text-[22px]">Logo da Empresa</h2>
          <p class="lont-normal le text-lg font-normal text-[#6E8899]">Adicione o logo da sua empresa para personalizar
            a plataforma</p>
        </div>
      </div>
      <hr class="my-5 h-[2px] bg-[#CFE8FF] text-[#CFE8FF]" />
      <!-- WRAPPER DO UPLOAD -->
      <div
        class="cursor-pointer rounded-xl border border-dashed border-[#D8E6F7] bg-[#F6FAFF] py-10 px-4 text-center transition"
        @click="fileInput?.click()" role="button">
        <input ref="fileInput" type="file" class="hidden" accept="image/*" @change="handleFileChange" />

        <!-- SEM IMAGEM (estado inicial) -->
        <div v-if="!previewImage && !initialValues.logo_url">

          <!-- ÍCONE DENTRO DO CÍRCULO AZUL -->
          <div class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#007BFF] shadow-sm">
            <i class="pi pi-upload text-white text-xl"></i>
          </div>

          <!-- TEXTO PRINCIPAL -->
          <p class="text-[#007BFF] font-medium">
            Clique para adicionar a foto
          </p>

          <!-- TEXTO SECUNDÁRIO -->
          <p class="mt-1 text-sm text-[#6B7280]">
            JPG, PNG | Máx. 5MB
          </p>
        </div>

        <!-- QUANDO TEM IMAGEM -->
        <div v-else>
          <img :src="previewImage || initialValues.logo_url" alt="Logo"
            class="mx-auto h-28 w-28 rounded-full object-cover shadow-md mb-3" />

          <p class="text-[#007BFF] font-medium">Alterar foto</p>

          <button type="button" @click.stop="removeLogo" class="mt-2 text-sm text-red-500 hover:text-red-700">
            Remover foto
          </button>
        </div>
      </div>


    </div>
    <div class="flex justify-end">
      <ButtonPrimary label="Salvar Alterações" :loading="updateCompany.isPending.value" type="submit" />
    </div>
  </Form>
</template>
<script setup lang="ts">
import { useUpdateCompanyMutation } from "@/api/company/mutations";
import { useCompanyQuery } from "@/api/company/queries";
import ButtonPrimary from "@/components/volt/ButtonPrimary.vue";
import InputMask from "@/components/volt/InputMask.vue";
import InputText from "@/components/volt/InputText.vue";
import InputTextArea from "@/components/volt/InputTextArea.vue";
import Select from "@/components/volt/Select.vue";
import { companyResolver } from "@/schemas/companies";

import { Form, FormField } from "@primevue/forms";
import { ref } from "vue";



definePageMeta({
  title: "Home",
  colorMode: "light",
  layout: "default",
});

const { data, isPending } = useCompanyQuery();
console.log(data.value);
const validationSchema = companyResolver;

// Garante que initialValues sempre seja um objeto
const fileInput = ref<HTMLInputElement | null>(null);
const previewImage = ref<string | null>(null);
const selectedFile = ref<File | null>(null);

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];

    // Validação básica de tipo e tamanho (5MB)
    if (!file.type.match('image.*')) {
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
    fileInput.value.value = '';
  }
  selectedFile.value = null;
  previewImage.value = null;
  // Se quiser remover o logo existente do servidor também
  // initialValues.value.logo_url = '';
};

const initialValues = computed(() => ({
  name: data.value?.name || '',
  cnpj: data.value?.cnpj || '',
  description: data.value?.description || '',
  segment: data.value?.segment || 'tecnologia',
  phone: data.value?.phone || '',
  email: data.value?.email || '',
  website: data.value?.website || '',
  address: data.value?.address || '',
  city: data.value?.city || '',
  state: data.value?.state || '',
  zip_code: data.value?.zip_code || '',
  logo_url: data.value?.logo_url || ''
}));

const updateCompany = useUpdateCompanyMutation();


const submit = async ({ valid, values }) => {
  try {
    const formData = new FormData();

    // Adiciona todos os valores do formulário
    Object.entries(values).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value as string);
      }
    });

    // Se houver um arquivo selecionado, adiciona ao FormData
    if (selectedFile.value) {
      formData.append('logo', selectedFile.value);
    }

    // Envia o formulário com o header multipart/form-data
    await updateCompany.mutateAsync(formData);

    // Limpa o preview após o envio bem-sucedido 
    previewImage.value = null;
    selectedFile.value = null;

  } catch (error) {
    console.error('Erro ao atualizar empresa:', error);
  }
};

const segmentOptions = ref([
  { label: "Tecnologia", value: "tecnologia" },
  { label: "Saúde", value: "saude" },
  { label: "Educação", value: "educacao" },
  { label: "Finanças", value: "financas" },
  { label: "Varejo", value: "varejo" },
  { label: "Serviços", value: "servicos" },
  { label: "Marketing", value: "marketing" },
  { label: "Outros", value: "outros" },
]);

</script>

<style scoped>
/* Estilos adicionais se necessário */
</style>