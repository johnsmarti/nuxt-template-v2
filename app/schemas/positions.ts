import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";

const positionsSchema = z.object({
    name: z.string().min(1, "O nome da posição é obrigatório"),
    description: z.string(),
    max_candidates: z.number().min(1, "O número máximo de candidatos é obrigatório").min(1),
    election_id: z.string().min(1, "A eleição é obrigatória").uuid("Eleição inválida"),
})

export const positionsResolver = zodResolver(positionsSchema)