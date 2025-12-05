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

const RegisterVoterSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório."),
  document: z
    .string()
    .min(5, "Número de matrícula/CPF obrigatório.")
    .refine((v) => v.replace(/\D/g, "").length >= 5, "Documento inválido."),
  email: z.string().email("Digite um email válido").min(1, "Email é obrigatório"),
  phone: z
    .string()
    .min(8, "Telefone inválido")
    .refine((v) => v.replace(/\D/g, "").length >= 8, "Telefone inválido"),
  election_id: z.string().uuid("Eleição inválida"),
});

export const registerVoterResolver = zodResolver(RegisterVoterSchema);

const PasswordRequestSchema = z.object({
  email: z.string().email("Digite um email válido").min(1, "Email é obrigatório"),
});

export const passwordRequestResolver = zodResolver(PasswordRequestSchema);

const PasswordResetSchema = z
  .object({
    token: z.string().min(1, "Token é obrigatório"),
    new_password: z
      .string()
      .min(8, "A senha deve conter pelo menos 8 caracteres")
      .refine((value) => /[a-z]/.test(value), "A senha deve conter pelo menos uma letra minúscula")
      .refine((value) => /[A-Z]/.test(value), "A senha deve conter pelo menos uma letra maiúscula")
      .refine((value) => /\d/.test(value), "A senha deve conter pelo menos um número")
      .min(1, "Senha é obrigatória"),
    new_password_confirm: z.string(),
  })
  .refine((data) => data.new_password === data.new_password_confirm, {
    message: "As senhas não coincidem",
    path: ["new_password_confirm"],
  });

export const passwordResetResolver = zodResolver(PasswordResetSchema);

const IdentitySchema = z.object({
  identifier: z.string().min(1, "Identificador é obrigatório."),
});

export const identityResolver = zodResolver(IdentitySchema);

export { AuthSchema };

const RegisterUserSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Digite um email válido").min(1, "Email é obrigatório"),
    password: z
      .string()
      .min(8, "A senha deve conter pelo menos 8 caracteres")
      .refine((value) => /[a-z]/.test(value), "A senha deve conter pelo menos uma letra minúscula")
      .refine((value) => /[A-Z]/.test(value), "A senha deve conter pelo menos uma letra maiúscula")
      .refine((value) => /\d/.test(value), "A senha deve conter pelo menos um número"),
    password_confirm: z.string(),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: "As senhas não coincidem",
    path: ["password_confirm"],
  });

export const registerUserResolver = zodResolver(RegisterUserSchema);
