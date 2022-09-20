import React, { FC } from 'react';
import { StyleSheet } from 'react-native';

import { ContainerWithButton } from '../../ui-kit/Containers';
import { FormGroup } from '../../ui-kit/Forms';
import TextInput from '../../ui-kit/TextInput';

import { useFormik } from 'formik';
import { PooStackScreens } from '../../navigation/enums';
import { PooUpdateReasonScreenProps } from '../../navigation/props';
import { useTreatmentsStore } from '../../store/hooks';

interface PooUpdateReasonFormValues {
  updateReason: string;
}

const PooUpdateReasonNumberScreen: FC<PooUpdateReasonScreenProps> = ({ navigation, route }) => {
  const { id } = route.params;
  const { setDeicingTreatmentUpdateReason } = useTreatmentsStore();

  const handleSaveReason = ({ updateReason }: PooUpdateReasonFormValues) => {
    setDeicingTreatmentUpdateReason(updateReason);

    navigation.navigate(PooStackScreens.PooAgent, {
      id,
      updateAfterDone: true,
    });
  };

  const { values, handleChange, handleSubmit } = useFormik<PooUpdateReasonFormValues>({
    initialValues: {
      updateReason: '',
    },
    onSubmit: handleSaveReason,
  });

  return (
    <ContainerWithButton onButtonPress={handleSubmit} label="Подтвердить изменения">
      <FormGroup>
        <TextInput label="Причина изменений" value={values.updateReason} onChangeText={handleChange('updateReason')} />
      </FormGroup>
    </ContainerWithButton>
  );
};

export default PooUpdateReasonNumberScreen;

const styles = StyleSheet.create({});
