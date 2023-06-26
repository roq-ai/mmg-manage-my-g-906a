import * as yup from 'yup';

export const classRegistrationValidationSchema = yup.object().shape({
  user_id: yup.string().nullable().required(),
  class_id: yup.string().nullable().required(),
});
