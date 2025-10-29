import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

const electionsSchema = toTypedSchema(
    yup.object({
        title: yup.string().required('O titulo da eleição é obrigatório'),
        description: yup.string(),
        type: yup.string().required('O tipo de eleição é obrigatório'),
        start_date: yup.string().required('A data e hora de início são obrigatórias'),
        status: yup.string(),
        end_date: yup.string()
            .required('A data e hora de término são obrigatórias')
            .test('is-after-start', 'A data de término deve ser posterior à data de início', function (value) {
                const { start_date } = this.parent;
                if (!start_date || !value) return true;
                return new Date(value) > new Date(start_date);
            }),
    })
);

export default electionsSchema;