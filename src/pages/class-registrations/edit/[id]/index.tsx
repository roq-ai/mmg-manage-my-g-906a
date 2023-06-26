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
import { getClassRegistrationById, updateClassRegistrationById } from 'apiSdk/class-registrations';
import { Error } from 'components/error';
import { classRegistrationValidationSchema } from 'validationSchema/class-registrations';
import { ClassRegistrationInterface } from 'interfaces/class-registration';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { RenamedclassInterface } from 'interfaces/renamedclass';
import { getUsers } from 'apiSdk/users';
import { getRenamedclasses } from 'apiSdk/renamedclasses';

function ClassRegistrationEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<ClassRegistrationInterface>(
    () => (id ? `/class-registrations/${id}` : null),
    () => getClassRegistrationById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ClassRegistrationInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateClassRegistrationById(id, values);
      mutate(updated);
      resetForm();
      router.push('/class-registrations');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<ClassRegistrationInterface>({
    initialValues: data,
    validationSchema: classRegistrationValidationSchema,
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
            Edit Class Registration
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
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'user_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
            <AsyncSelect<RenamedclassInterface>
              formik={formik}
              name={'class_id'}
              label={'Select Renamedclass'}
              placeholder={'Select Renamedclass'}
              fetcher={getRenamedclasses}
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
  entity: 'class_registration',
  operation: AccessOperationEnum.UPDATE,
})(ClassRegistrationEditPage);
