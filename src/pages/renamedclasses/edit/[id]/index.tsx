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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getRenamedclassById, updateRenamedclassById } from 'apiSdk/renamedclasses';
import { Error } from 'components/error';
import { renamedclassValidationSchema } from 'validationSchema/renamedclasses';
import { RenamedclassInterface } from 'interfaces/renamedclass';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { GymInterface } from 'interfaces/gym';
import { getGyms } from 'apiSdk/gyms';

function RenamedclassEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<RenamedclassInterface>(
    () => (id ? `/renamedclasses/${id}` : null),
    () => getRenamedclassById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: RenamedclassInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateRenamedclassById(id, values);
      mutate(updated);
      resetForm();
      router.push('/renamedclasses');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<RenamedclassInterface>({
    initialValues: data,
    validationSchema: renamedclassValidationSchema,
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
            Edit Renamedclass
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
              <FormLabel>Name</FormLabel>
              <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
              {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
            </FormControl>
            <FormControl id="start_time" mb="4">
              <FormLabel>Start Time</FormLabel>
              <Box display="flex" maxWidth="100px" alignItems="center">
                <DatePicker
                  dateFormat={'dd/MM/yyyy'}
                  selected={formik.values?.start_time ? new Date(formik.values?.start_time) : null}
                  onChange={(value: Date) => formik.setFieldValue('start_time', value)}
                />
                <Box zIndex={2}>
                  <FiEdit3 />
                </Box>
              </Box>
            </FormControl>
            <FormControl id="end_time" mb="4">
              <FormLabel>End Time</FormLabel>
              <Box display="flex" maxWidth="100px" alignItems="center">
                <DatePicker
                  dateFormat={'dd/MM/yyyy'}
                  selected={formik.values?.end_time ? new Date(formik.values?.end_time) : null}
                  onChange={(value: Date) => formik.setFieldValue('end_time', value)}
                />
                <Box zIndex={2}>
                  <FiEdit3 />
                </Box>
              </Box>
            </FormControl>
            <AsyncSelect<GymInterface>
              formik={formik}
              name={'gym_id'}
              label={'Select Gym'}
              placeholder={'Select Gym'}
              fetcher={getGyms}
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
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'Renamedclass',
  operation: AccessOperationEnum.UPDATE,
})(RenamedclassEditPage);
