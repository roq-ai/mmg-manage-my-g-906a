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
import { createEquipment } from 'apiSdk/equipment';
import { Error } from 'components/error';
import { equipmentValidationSchema } from 'validationSchema/equipment';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { GymInterface } from 'interfaces/gym';
import { getGyms } from 'apiSdk/gyms';
import { EquipmentInterface } from 'interfaces/equipment';

function EquipmentCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: EquipmentInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createEquipment(values);
      resetForm();
      router.push('/equipment');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<EquipmentInterface>({
    initialValues: {
      name: '',
      last_maintenance: new Date(new Date().toDateString()),
      gym_id: (router.query.gym_id as string) ?? null,
    },
    validationSchema: equipmentValidationSchema,
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
            Create Equipment
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
          <FormControl id="last_maintenance" mb="4">
            <FormLabel>Last Maintenance</FormLabel>
            <Box display="flex" maxWidth="100px" alignItems="center">
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values?.last_maintenance ? new Date(formik.values?.last_maintenance) : null}
                onChange={(value: Date) => formik.setFieldValue('last_maintenance', value)}
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
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'equipment',
  operation: AccessOperationEnum.CREATE,
})(EquipmentCreatePage);
