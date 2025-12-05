import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
const electionTypeEnum = z.enum(['public', 'private'] as const);

const electionsSchema = z.object({
    title: z.string().min(1, 'O título da eleição é obrigatório'),
    description: z.string(),
    max_votes_per_voter: z.number().min(1, 'O número máximo de votos por eleitor é obrigatório'),
    allow_abstention: z.boolean().default(false),
    results_visibility: electionTypeEnum.default('private'),
    election_type: z.string().min(1, 'O tipo de eleição é obrigatório'),
    start_date: z.string('A data e hora de início são obrigatórias').min(1, 'A data e hora de início são obrigatórias'),
    end_date: z.string('A data e hora de término são obrigatórias').min(1, 'A data e hora de término são obrigatórias'),
}).superRefine((data, ctx) => {
    const now = new Date();
    const startDate = new Date(data.start_date);
    const endDate = new Date(data.end_date);

    // Verifica se as datas são válidas
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        ctx.addIssue({
            path: ["start_date"],
            code: "custom",
            message: "Datas inválidas. Use um formato válido (ex: YYYY-MM-DD HH:mm).",
        });
        return;
    }

    // Valida se a data inicial não é menor que hoje
    if (startDate < now) {
        ctx.addIssue({
            path: ["start_date"],
            code: "custom",
            message: "A data de início não pode ser anterior à data atual",
        });
    }

    // Valida se a data final é maior que a inicial
    if (endDate <= startDate) {
        ctx.addIssue({
            path: ["end_date"],
            code: "custom",
            message: "A data e hora de término devem ser posteriores à data e hora de início",
        });
    }
});

export const electionsResolver = zodResolver(electionsSchema);
