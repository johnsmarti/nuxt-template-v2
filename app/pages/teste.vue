<template>
  <div class="card flex justify-center">
    <Form :resolver @submit="onFormSubmit" class="flex flex-col gap-4 w-full">
      <FormField v-slot="$field" name="username" initialValue="">
        <InputText name="username" label="Username" :errorMessage="$field.error?.message" />
      </FormField>
      <FormField v-slot="$field" name="password" initialValue="">
        <Password name="password" label="Password" :errorMessage="$field.error?.message" />
      </FormField>
      <FormField v-slot="$field" name="cnpj" initialValue="2312312312312">
        <InputMask name="cnpj" label="CNPJ" :errorMessage="$field.error?.message" :mask="'99.999.999/9999-99'"
          v-model="$field.value" />
      </FormField>
      <FormField v-slot="$field" name="city" initialValue="">
        <Select name="city" label="Cidade" :errorMessage="$field.error?.message" :options="cities" optionLabel="name"
          optionValue="code" v-model="$field.value" />
      </FormField>
      <button type="submit">Submit</button>
    </Form>
  </div>
</template>

<script setup>
import InputMask from '~/components/volt/InputMask.vue';
import InputText from '~/components/volt/InputText.vue';
import Password from '~/components/volt/Password.vue';
import Select from '~/components/volt/Select.vue';
import { Form, FormField } from '@primevue/forms';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';


const resolver = zodResolver(
  z.object({
    username: z.string().min(1, { message: 'Username Obrigatório' }),
    password: z.string().min(1, { message: 'Password Obrigatório' }),
    cnpj: z.string().min(1, { message: 'CNPJ Obrigatório' }),
    city: z.string().min(1, { message: 'Cidade Obrigatória' }),
  })
);

const cities = ref([
  { name: 'São Paulo', code: 'SP' },
  { name: 'Rio de Janeiro', code: 'RJ' },
  { name: 'Minas Gerais', code: 'MG' },
  { name: 'São Paulo', code: 'SP' },
  { name: 'Rio de Janeiro', code: 'RJ' },
  { name: 'Minas Gerais', code: 'MG' },
  { name: 'São Paulo', code: 'SP' },
  { name: 'Rio de Janeiro', code: 'RJ' },
  { name: 'Minas Gerais', code: 'MG' },
]);
const onFormSubmit = ({ valid, values }) => {
  if (valid) {
    console.log('Form is submitted.', values);
  }
};
</script>
