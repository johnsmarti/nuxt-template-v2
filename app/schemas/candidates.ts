import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";

const CandidatesSchema = z.object({
  name: z.string().min(1, "O nome do candidato é obrigatório"),
  number: z.string().min(1, "O número do candidato é obrigatório"),
  party: z.string(),
  photo_url: z.string(),
  position_id: z.string().min(1, "A posição é obrigatória"),
  election_id: z.string().min(1, "A eleição é obrigatória"),
});

export const candidatesResolver = zodResolver(CandidatesSchema);
