import { createTypedSchema, yup } from "@/lib/validator";
import { DISABLE_PASSWORD_VALIDATION } from "@/constants/flags";

export const signInSchema = createTypedSchema({
  email: yup.string().email("Digite um email válido").trim().required("Email é obrigatório"),

  password: yup
    .string()
    .when([], {
      is: () => !DISABLE_PASSWORD_VALIDATION,
      then: (schema) =>
        schema
          .min(8, "A senha deve conter pelo menos 8 caracteres")
          .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "A senha deve seguir as regras"),
    })
    .trim()
    .required("A senha é obrigatória"),

  rememberMe: yup.boolean().default(false),
});

export const forgotPasswordSchema = createTypedSchema({
  email: yup.string().email("Digite um email válido").trim().required("Email é obrigatório"),
});

export const resetPasswordSchema = createTypedSchema({
  password: yup
    .string()
    .when([], {
      is: () => DISABLE_PASSWORD_VALIDATION,
      then: (schema) =>
        schema
          .min(8, "A senha deve conter pelo menos 8 caracteres")
          .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "A senha deve seguir as regras"),
    })
    .transform((value) => value?.trim())
    .required("A senha é obrigatória"),
  confirmPassword: yup
    .string()
    .required("Confirme sua senha")
    .transform((value) => value?.trim())
    .oneOf([yup.ref("password")], "As senhas não conferem"),
});
