import React, { FC, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { InlineAlert } from '../../ui-kit/Alerts';
import { ContainerWithButton } from '../../ui-kit/Containers';
import { TouchableLabel } from '../../ui-kit/Labels';
import { SimpleList } from '../../ui-kit/Lists';
import Switch from '../../ui-kit/Switch';

import { useFormik } from 'formik';
import { useTreatmentsStore } from '../../store/hooks';
import * as Yup from 'yup';
import { observer } from 'mobx-react';
import { format } from 'date-fns';

interface FormValues {
  time: string;
  date: Date | any;
  pooSecureChecked: boolean;
  codeTransfered: boolean;
}

const FormValuesValidationSchema: Yup.SchemaOf<FormValues> = Yup.object().shape({
  time: Yup.string().required(),
  date: Yup.date().required(),
  pooSecureChecked: Yup.bool().oneOf([true]),
  codeTransfered: Yup.bool().oneOf([true]),
});

const PooCodeScreen: FC = () => {
  const { deicingTreatment, controlLoading, updateDeicingTreament } = useTreatmentsStore();

  const handleSave = ({ time, date, codeTransfered, pooSecureChecked }: FormValues) => {
    updateDeicingTreament({
      ...deicingTreatment,
      codePassed: codeTransfered,
      treatmentIsChecked: pooSecureChecked,
      checkedDate: `${format(date, 'y-MM-d')}T${time}`,
    });
  };

  const { values, errors, setFieldValue, handleSubmit } = useFormik<FormValues>({
    initialValues: {
      time: deicingTreatment?.checkedDate ? format(new Date(deicingTreatment?.checkedDate), 'HH:mm') : '00:02',
      date: deicingTreatment?.checkedDate ? new Date(deicingTreatment?.checkedDate) : new Date(),
      pooSecureChecked: deicingTreatment?.treatmentIsChecked,
      codeTransfered: deicingTreatment?.codePassed,
    },
    validationSchema: FormValuesValidationSchema,
    onSubmit: handleSave,
  });

  return (
    <ContainerWithButton onButtonPress={handleSubmit} buttonProps={{ loading: controlLoading }}>
      {!values.pooSecureChecked && !values.codeTransfered ? (
        <InlineAlert type="danger">Выполните проверку качества ПОЗ и передайте код ПОО</InlineAlert>
      ) : null}

      {errors.pooSecureChecked && !errors.codeTransfered ? (
        <InlineAlert type="danger">Выполните проверку качества ПОЗ</InlineAlert>
      ) : null}
      {errors.codeTransfered && !errors.pooSecureChecked ? (
        <InlineAlert type="danger">Передайте код ПОО</InlineAlert>
      ) : null}

      <SimpleList title="Работа по ПОЗ выполнены" style={{ marginTop: 20 }}>
        <SimpleList.Item title="Type IV" value={deicingTreatment?.spentLiquidFour?.toString()} />
        <SimpleList.Item title="Наименование" value={deicingTreatment?.secondTitle} />
        <SimpleList.Item
          title="Время"
          containerStyle={{ alignItems: 'center' }}
          value={<TouchableLabel>{values.time}</TouchableLabel>}
        />
        <SimpleList.Item
          title="Дата"
          containerStyle={{ alignItems: 'center' }}
          value={<TouchableLabel>{format(values.date, 'd.MM.y')}</TouchableLabel>}
        />
        <SimpleList.Item
          title="Проверка качества противообледенительной защиты выполнена"
          containerStyle={{ alignItems: 'center' }}
          value={
            <Switch
              value={values.pooSecureChecked}
              onChange={() => setFieldValue('pooSecureChecked', !values.pooSecureChecked)}
            />
          }
        />

        <SimpleList.Item
          title="Код передан"
          containerStyle={{ alignItems: 'center' }}
          value={
            <Switch
              value={values.codeTransfered}
              onChange={() => setFieldValue('codeTransfered', !values.codeTransfered)}
            />
          }
        />
      </SimpleList>
    </ContainerWithButton>
  );
};

export default observer(PooCodeScreen);

const styles = StyleSheet.create({});
