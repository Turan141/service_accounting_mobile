import React, { FC, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { ContainerWithButton } from '../../ui-kit/Containers';
import { FormGroup } from '../../ui-kit/Forms';
import TextInput from '../../ui-kit/TextInput';

import { useFormik } from 'formik';
import { PooEnterTransportNumberScreenProps } from '../../navigation/props';
import { PooStackScreens, TasksStackScreens } from '../../navigation/enums';
import { Select } from '../../ui-kit/Selects';
import { SelectItem } from '../../ui-kit/Selects/Select';
import { WorkTypesEnum } from '../../store/UserStore';
import { useUserStore } from '../../store/hooks';
import { observer } from 'mobx-react';
import { TASKS_STACK } from '../../navigation/stacks';

interface TransportNumberFormValues {
  transportNumber: number;
  workType: WorkTypesEnum;
}

const workTypes: SelectItem[] = [
  { title: 'Обработка + отчёт', value: WorkTypesEnum.Both },
  { title: 'Обработка', value: WorkTypesEnum.Treatment },
  { title: 'Отчёт', value: WorkTypesEnum.Report },
];

const PooEnterTransportNumberScreen: FC<PooEnterTransportNumberScreenProps> = ({ navigation }) => {
  const { workType, setWorkType } = useUserStore();
  const { values, handleChange, handleSubmit, setFieldValue } = useFormik<TransportNumberFormValues>({
    initialValues: {
      transportNumber: 427,
      workType: workType,
    },
    onSubmit: () => navigation.navigate(TasksStackScreens.Tasks),
  });

  useEffect(() => {
    setWorkType(values.workType);
  }, [values]);

  return (
    <ContainerWithButton onButtonPress={handleSubmit}>
      <FormGroup>
        <TextInput
          label="№ транспортного средства"
          value={values.transportNumber?.toString()}
          onChangeText={handleChange('transportNumber')}
          keyboardType="numeric"
        />
      </FormGroup>

      <FormGroup>
        <Select
          label="Вид работ"
          items={workTypes}
          onSelect={(value: WorkTypesEnum) => setFieldValue('workType', value)}
          value={values.workType}
        />
      </FormGroup>
    </ContainerWithButton>
  );
};

export default observer(PooEnterTransportNumberScreen);

const styles = StyleSheet.create({});
