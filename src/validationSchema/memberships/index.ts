import * as yup from 'yup';

export const membershipValidationSchema = yup.object().shape({
  start_date: yup.date().required(),
  end_date: yup.date().required(),
  user_id: yup.string().nullable().required(),
  gym_id: yup.string().nullable().required(),
});
