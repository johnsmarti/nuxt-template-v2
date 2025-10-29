import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
const CandidatesSchema = toTypedSchema(
  yup.object({
    name: yup.string().required('O nome do candidato é obrigatório'),
    number: yup.string().required('O número do candidato é obrigatório'),
    party: yup.string(),
    photo_url: yup.string(),
    position_id: yup.number().required('A posição é obrigatória'),
    election_id: yup.number().required('A eleição é obrigatória'),
  })
)
export default CandidatesSchema