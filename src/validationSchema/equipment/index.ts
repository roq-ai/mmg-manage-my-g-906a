import * as yup from 'yup';

export const equipmentValidationSchema = yup.object().shape({
  name: yup.string().required(),
  last_maintenance: yup.date().required(),
  gym_id: yup.string().nullable().required(),
});
