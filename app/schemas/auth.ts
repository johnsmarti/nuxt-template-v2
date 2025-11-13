import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";

const AuthSchema = z.object({
  email: z.string().email("Digite um email válido").min(1, "Email é obrigatório"),
  password: z
    .string()
    .min(8, "A senha deve conter pelo menos 8 caracteres")
    .refine((value) => /[a-z]/.test(value), "A senha deve conter pelo menos uma letra minúscula")
    .refine((value) => /[A-Z]/.test(value), "A senha deve conter pelo menos uma letra maiúscula")
    .refine((value) => /\d/.test(value), "A senha deve conter pelo menos um número")
    .min(1, "Senha é obrigatória"),
});

export const authResolver = zodResolver(AuthSchema);

const RegisterVoter = z.object({
  name: z.string("O nome é obrigatório."),
  email: z.string().email("Digite um email válido").min(1, "Email é obrigatório"),
  phone: z.string(),
  document: z.string().min(5, "Número de matricula obrigatório."),
});

// Criar register name, email, password e confirme password

// Criar reset password email.
