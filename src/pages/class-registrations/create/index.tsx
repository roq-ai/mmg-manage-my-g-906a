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
import { createClassRegistration } from 'apiSdk/class-registrations';
import { Error } from 'components/error';
import { classRegistrationValidationSchema } from 'validationSchema/class-registrations';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { RenamedclassInterface } from 'interfaces/renamedclass';
import { getUsers } from 'apiSdk/users';
import { getRenamedclasses } from 'apiSdk/renamedclasses';
import { ClassRegistrationInterface } from 'interfaces/class-registration';

function ClassRegistrationCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ClassRegistrationInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createClassRegistration(values);
      resetForm();
      router.push('/class-registrations');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ClassRegistrationInterface>({
    initialValues: {
      user_id: (router.query.user_id as string) ?? null,
      class_id: (router.query.class_id as string) ?? null,
    },
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
            Create Class Registration
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
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
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'class_registration',
  operation: AccessOperationEnum.CREATE,
})(ClassRegistrationCreatePage);
