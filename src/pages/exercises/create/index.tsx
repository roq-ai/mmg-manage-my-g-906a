import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createExercise } from 'apiSdk/exercises';
import { Error } from 'components/error';
import { exerciseValidationSchema } from 'validationSchema/exercises';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { WorkoutPlanInterface } from 'interfaces/workout-plan';
import { getWorkoutPlans } from 'apiSdk/workout-plans';
import { ExerciseInterface } from 'interfaces/exercise';

function ExerciseCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ExerciseInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createExercise(values);
      resetForm();
      router.push('/exercises');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ExerciseInterface>({
    initialValues: {
      name: '',
      sets: 0,
      reps: 0,
      workout_plan_id: (router.query.workout_plan_id as string) ?? null,
    },
    validationSchema: exerciseValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Exercise
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
            {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="sets" mb="4" isInvalid={!!formik.errors?.sets}>
            <FormLabel>Sets</FormLabel>
            <NumberInput
              name="sets"
              value={formik.values?.sets}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('sets', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.sets && <FormErrorMessage>{formik.errors?.sets}</FormErrorMessage>}
          </FormControl>
          <FormControl id="reps" mb="4" isInvalid={!!formik.errors?.reps}>
            <FormLabel>Reps</FormLabel>
            <NumberInput
              name="reps"
              value={formik.values?.reps}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('reps', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.reps && <FormErrorMessage>{formik.errors?.reps}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<WorkoutPlanInterface>
            formik={formik}
            name={'workout_plan_id'}
            label={'Select Workout Plan'}
            placeholder={'Select Workout Plan'}
            fetcher={getWorkoutPlans}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'exercise',
  operation: AccessOperationEnum.CREATE,
})(ExerciseCreatePage);
