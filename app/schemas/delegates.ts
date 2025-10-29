import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
const DelegatesSchema = toTypedSchema(
  yup.object({
    name: yup.string().required('O nome de usuário é obrigatório'),
    email : yup.string().required('O email é obrigatório'),
    document: yup.string().required('O documento é obrigatório'),
    phone: yup.string(),
    election_uuid: yup.string().required('A eleição é obrigatória'),
  })
)
export default DelegatesSchema