<template>
  <TabPanel value="2">
    <Form v-slot="{ values, errors }" :resolver="validationSchema" :initial-values="company" @submit="submit">
      <div class="rounded-lg bg-white p-6 shadow-sm">
        <div class="flex items-center gap-4">
          <div class="flex h-[60px] w-[60px] items-center justify-center rounded-[20px] bg-[#E7EDFF]">
            <Icon name="lucide:building-2" class="text-[22px] text-[#0063FF]" />
          </div>
          <div>
            <h2 class="lont-semibold font-semiboldli-xt-[#2F2F2F] text-[22px]">Perfil da Empresa</h2>
            <p class="lont-normal le text-lg font-normal text-[#6E8899]">Informações básicas da sua organização</p>
          </div>
        </div>
        <hr class="my-5 h-[2px] bg-[#CFE8FF] text-[#CFE8FF]" />
        <div class="flex flex-col gap-4">
          <div class="grid grid-cols-2 gap-4">
            <InputOverText label="Nome da Empresa" name="name" id="company-name" placeholder="Exemplo Empresa LTDA" />
            <InputOverText label="CNPJ" name="cnpj" id="company-cnpj" placeholder="00.000.000/0000-00" />
          </div>
          <FloatTextarea
            label="Descrição"
            name="description"
            id="company-description"
            placeholder="Descreva sua empresa"
          />
          <InputSelectOver
            name="segment"
            :options="segmentOptions"
            label="Segmento"
            placeholder="Selecione um segmento"
          />
        </div>
      </div>
      <div class="my-3 rounded-lg bg-white p-6 shadow-sm">
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
            <InputOverText label="Telefone" name="phone" id="company-phone" placeholder="(11) 99999-9999" />
            <InputOverText label="Email" name="email" id="company-email" placeholder="contato@empresa.com" />
          </div>
          <InputOverText label="Website" name="website" id="company-website" placeholder="https://www.empresa.com" />
        </div>
      </div>
      <div class="my-3 rounded-lg bg-white p-6 shadow-sm">
        <div class="mb-5 flex items-center gap-4">
          <div class="flex h-[60px] w-[60px] items-center justify-center rounded-[20px] bg-[#E7EDFF]">
            <Icon name="lucide:map-pin" class="text-[22px] text-[#0063FF]" />
          </div>
          <div>
            <h2 class="lfoni-s-mibold text-[22px] font-semibold text-[#2F2F2F]">Endereço</h2>
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <InputOverText label="Endereço" name="address" id="company-address" placeholder="Rua das Flores, 123" />
          <div class="grid grid-cols-3 gap-4">
            <InputOverText label="Cidade" name="city" id="company-city" placeholder="São Paulo" />
            <InputOverText label="Estado" name="state" id="company-state" placeholder="SP" />
            <InputOverText label="CEP" name="zip_code" id="company-zip-code" placeholder="01234-567" />
          </div>
        </div>
      </div>
      <div class="my-3 rounded-lg bg-white p-6 shadow-sm">
        <h2 class="text-[22px] font-semibold text-[#2F2F2F]">Logo da Empresa</h2>
        <p class="le text-lg font-normal text-[#6E8899]">
          Adicione o logo da sua empresa para personalizar a plataforma
        </p>

        <div class="mb-6 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center">
          <div class="mb-4 flex justify-center">
            <button class="rounded-full bg-blue-600 p-3 text-white">
              <i class="pi pi-upload"></i>
            </button>
          </div>
          <p class="mb-1 font-medium text-blue-600">Clique para selecionar o Logo</p>
          <p class="text-sm text-gray-500">JPG, PNG | Máx. 5MB</p>
        </div>

        <div class="flex justify-end">
          <ButtonPrimary label="Salvar Alterações" :loading="updateCompany.isPending.value" type="submit" />
        </div>
      </div>
    </Form>
  </TabPanel>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { Form } from "@primevue/forms";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import InputOverText from "~/volt/InputOverText.vue";
import FloatTextarea from "~/volt/FloatTextarea.vue";
import InputSelectOver from "~/volt/InputSelectOver.vue";
import ButtonPrimary from "~/volt/ButtonPrimary.vue";
import { useCompanyQuery } from "../../api/company/queries";
import { useUpdateCompanyMutation } from "../../api/company/mutations";
import { companySchema } from "../../schemas/companies";

definePageMeta({
  title: "Home",
  colorMode: "light",
  layout: "default",
});

const { data: company } = useCompanyQuery();
const updateCompany = useUpdateCompanyMutation();

const validationSchema = zodResolver(companySchema);

const submit = async (values: any) => {
  await updateCompany.mutateAsync(values);
};

const segmentOptions = ref([
  { label: "Tecnologia", value: "tecnologia" },
  { label: "Saúde", value: "saude" },
  { label: "Educação", value: "educacao" },
  { label: "Finanças", value: "financas" },
  { label: "Varejo", value: "varejo" },
  { label: "Serviços", value: "servicos" },
]);
</script>

<style scoped>
/* Estilos adicionais se necessário */
</style>
