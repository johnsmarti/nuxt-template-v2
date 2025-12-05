Este projeto utiliza um ecossistema moderno e padronizado para construção de interfaces reativas, acessíveis e consistentes.
Toda a stack é integrada para garantir manutenção, escalabilidade e colaboração com agentes de IA.

📦 Stack Tecnológica

Nuxt 4 — Framework Vue com SSR/SPA/SSG

PrimeVue — Biblioteca de UI

PrimeVue Forms — Formulários com validação integrada

Volt UI Kit — Consistência de design

Tailwind CSS 4 — Utilitários usando tema via CSS, sem tailwind.config.js

Zod + zodResolver — Validação tipada

TanStack Vue Query — Camada de cache, mutations e fetch

Axios Plugin — Requisições HTTP com interceptores

📁 Estrutura do Projeto
app/
├─ api/ # Queries e Mutations (Vue Query)
│ └─ company/
│ ├─ mutations.ts
│ └─ queries.ts
├─ assets/
│ └─ css/
│ └─ tailwind.css
├─ components/
│ └─ volt/
│ ├─ InputText.vue
│ ├─ InputMask.vue
│ ├─ InputTextArea.vue
│ ├─ Select.vue
│ └─ ButtonPrimary.vue
├─ composables/
├─ layouts/
├─ middleware/
├─ pages/
├─ plugins/
│ └─ axios.ts
├─ schemas/
│ ├─ auth.ts
│ └─ companies.ts
└─ utils/

🎨 Tailwind CSS v4 — Configuração Oficial

Tailwind 4 não utiliza mais tailwind.config.js.
Toda a configuração é feita via CSS:

📌 Arquivo: app/assets/css/tailwind.css

@import "tailwindcss";

@theme {
--color-primary: #0063ff;
--color-secondary: #e7edff;

--radius-base: 0.5rem;

--font-sans: 'Inter', sans-serif;
}

🧩 Padrão Oficial dos Componentes Volt

Todos os componentes seguem o seguinte contrato:

interface BaseProps {
name: string
label?: string
errorMessage?: string
disabled?: boolean
required?: boolean
class?: string
}

Componentes disponíveis

InputText.vue

InputMask.vue

InputTextArea.vue

Select.vue

DatePicker.vue (opcional, dependendo do módulo)

ButtonPrimary.vue

Cada componente usa:

Tailwind v4

PassThrough (pt) para integração PrimeVue

Label Over (flutuante estilo Volt)

Erros do PrimeVue Forms (errorMessage)

Props padronizadas

🧱 Documentação dos Inputs
🔹 InputText.vue
Props
interface InputTextProps extends BaseProps {
modelValue?: string
type?: 'text' | 'email' | 'password' | 'number'
placeholder?: string
}

Uso
<FormField v-slot="$field" name="email">
<InputText
    name="email"
    label="Email"
    v-model="$field.value"
    :errorMessage="$field.error?.message"
  />
</FormField>

🔹 InputMask.vue
interface InputMaskProps extends BaseProps {
mask: string
modelValue?: string
}

Uso
<FormField v-slot="$field" name="phone">
<InputMask
    name="phone"
    :mask="'(99) 99999-9999'"
    v-model="$field.value"
    :errorMessage="$field.error?.message"
  />
</FormField>

🔹 InputTextArea.vue
interface InputTextAreaProps extends BaseProps {
rows?: number
placeholder?: string
}

Uso
<FormField v-slot="$field" name="description">
<InputTextArea
    name="description"
    label="Descrição"
    placeholder="Descreva sua empresa"
    :errorMessage="$field.error?.message"
  />
</FormField>

🔹 Select.vue
interface SelectProps extends BaseProps {
options: Array<{ label: string; value: any }>
optionLabel?: string
optionValue?: string
modelValue?: any
}

Uso
<FormField v-slot="$field" name="segment">
<Select
    name="segment"
    label="Segmento"
    :options="segmentOptions"
    optionLabel="label"
    optionValue="value"
    v-model="$field.value"
    :errorMessage="$field.error?.message"
  />
</FormField>

📘 Formulários — Padrão Oficial PrimeVue (Volt)

Todos os formulários usam:

<Form
  :resolver="validationSchema"
  :initial-values="initialValues"
  @submit="submit"
  v-slot="$form"
>

Cada campo segue:
<FormField v-slot="$field" name="email">
<InputText
    name="email"
    label="Email"
    v-model="$field.value"
    :errorMessage="$field.error?.message"
  />
</FormField>

🛠️ Zod + zodResolver — Padrão Oficial

Exemplo:

const AuthSchema = z.object({
email: z.string().email("Digite um email válido").min(1, "Email é obrigatório"),
password: z.string()
.min(8, "A senha deve conter pelo menos 8 caracteres")
.refine((v) => /[a-z]/.test(v), "A senha deve conter pelo menos uma letra minúscula")
.refine((v) => /[A-Z]/.test(v), "A senha deve conter pelo menos uma letra maiúscula")
.refine((v) => /\d/.test(v), "A senha deve conter pelo menos um número"),
});
export const authResolver = zodResolver(AuthSchema);

🌐 Vue Query — Queries e Mutations
📄 Query: Company
export const useCompanyQuery = () => {
const { $axios } = useNuxtApp();

return useQuery({
queryKey: ["company"],
queryFn: async () => {
const response = await $axios.get("/companies/1");
return companySchema.parse(response.data);
},
});
};

📝 Mutation: Update Company
export const useUpdateCompanyMutation = () => {
const { $axios } = useNuxtApp()
const queryClient = useQueryClient();

return useMutation({
mutationFn: async (formData: FormData) => {
const response = await $axios.post('/companies/', formData, {
headers: { 'Content-Type': 'multipart/form-data' }
});
return response.data;
},

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company'] });
    },

});
};

🧩 Exemplo Real — Formulário da Empresa

Inclui:

✔ Inputs Volt
✔ Mask
✔ Select
✔ Upload de arquivo
✔ PrimeVue Forms
✔ Tailwind v4
✔ Vue Query
✔ Zod

📌 Este é o padrão oficial para qualquer formulário da aplicação.
(O exemplo completo já está no seu trecho enviado e segue exatamente o padrão descrito nesta documentação.)

🤖 Guia de Prompts para IAs
Criar componentes
Crie um componente seguindo o padrão Volt + PrimeVue + Tailwind v4, com LabelOver, props base e integração com FormField.

Criar queries/mutations
Crie uma mutation usando Axios plugin ($axios), Vue Query e invalide a query relacionada.

Criar formulário completo
Monte um formulário completo usando PrimeVue Forms, FormField e componentes Volt, seguindo o padrão deste projeto.

Refatoração
Refatore o componente abaixo seguindo o padrão de componentes Volt, validando acessibilidade, estilo e consistência com Tailwind v4.

🏁 Conclusão

Este README padroniza:

✔ Estrutura do projeto
✔ Padrões de componente
✔ Uso correto de Tailwind v4
✔ Schemas Zod
✔ Vue Query
✔ PrimeVue Forms
✔ Componentes Volt com Label Over
✔ Integração com backend via Axios

Se quiser, posso gerar também:
