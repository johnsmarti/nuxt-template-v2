import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
const DelegatesSchema = z.object({
  name: z.string().min(1, "O nome de usuário é obrigatório"),
  email: z.string().email("Email inválido"),
  document: z.string().min(1, "O documento é obrigatório"),
  phone: z.string().optional(),
  election_uuid: z.string().min(1, "A eleição é obrigatória"),
});
export const delegatesResolver = zodResolver(DelegatesSchema);