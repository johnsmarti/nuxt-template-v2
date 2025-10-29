import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

const positionsSchema = toTypedSchema(
    yup.object({
        name: yup.string().required('O nome da posição é obrigatório'),
        description: yup.string(),
        order_index: yup.string().required('O índice de ordem é obrigatório').typeError('O índice de ordem deve ser um número'),
        max_candidates: yup.string().typeError('O número máximo de candidatos deve ser um número').required('O número máximo de candidatos é obrigatório').min(1),
        election_uuid: yup.string().required('A eleição é obrigatória'),
    })
)

export { positionsSchema }