import * as yup from 'yup';

export const exerciseValidationSchema = yup.object().shape({
  name: yup.string().required(),
  sets: yup.number().integer().required(),
  reps: yup.number().integer().required(),
  workout_plan_id: yup.string().nullable().required(),
});
