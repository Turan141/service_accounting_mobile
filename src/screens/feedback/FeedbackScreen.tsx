import React, { FC, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, layout } from '../../theme';

import { ContainerWithButton, ScrollViewContainer } from '../../ui-kit/Containers';
import { ImagePicker, FormGroup } from '../../ui-kit/Forms';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import TextInput from '../../ui-kit/TextInput';

import * as Yup from 'yup';
import { useFormik, getIn } from 'formik';
import { IconButton } from 'react-native-paper';

interface FeedbackFormValues {
  items: Array<{
    topic: string;
    feedbackText: string;
  }>;
}

const FeedbackFormValidationSchema = Yup.object().shape({
  items: Yup.array().of(
    Yup.object().shape({
      topic: Yup.string().required(),
      feedbackText: Yup.string().required(),
    })
  ),
});

const handleFormSubmit = (values: FeedbackFormValues) => {
  console.log(values);
};

const FeedbackScreen: FC = () => {
  const { values, touched, errors, handleChange, handleSubmit, setFieldValue } = useFormik<FeedbackFormValues>({
    initialValues: {
      items: [
        {
          topic: '',
          feedbackText: '',
        },
      ],
    },
    onSubmit: handleFormSubmit,
    validationSchema: FeedbackFormValidationSchema,
    enableReinitialize: true,
  });

  const handleAddFormItem = useCallback(() => {
    setFieldValue('items', [
      ...values.items,
      {
        topic: '',
        feedbackText: '',
      },
    ]);
  }, [values.items]);

  return (
    <ContainerWithButton>
      {values.items.map((formItem, idx) => (
        <View
          style={{ borderBottomWidth: 0.5, borderBottomColor: colors.gray.primary, marginBottom: 25 }}
          key={`feedback-item-${idx}`}
        >
          <FormGroup>
            <TextInput
              label="Тема"
              value={formItem.topic}
              onChangeText={handleChange(`items[${idx}].topic`)}
              rightIcon={<MaterialIcon name="chevron-right" size={24} color={colors.gray.primary} />}
              status={
                getIn(errors, `items[${idx}].topic`) && getIn(touched, `items[${idx}].topic`) ? 'error' : 'default'
              }
            />
          </FormGroup>

          <FormGroup>
            <TextInput
              label="Обратная связь"
              value={formItem.feedbackText}
              onChangeText={handleChange(`items[${idx}].feedbackText`)}
              status={
                getIn(errors, `items[${idx}].feedbackText`) && getIn(touched, `items[${idx}].feedbackText`)
                  ? 'error'
                  : 'default'
              }
            />
          </FormGroup>

          <FormGroup>
            <ImagePicker />
          </FormGroup>
        </View>
      ))}

      <View style={layout.alignCenter}>
        <IconButton
          icon="plus"
          size={45}
          onPress={handleAddFormItem}
          style={{
            backgroundColor: colors.gray.secondary,
            padding: 0,
            margin: 0,
            width: 45,
            height: 45,
          }}
          color={colors.white}
        />
      </View>
    </ContainerWithButton>
  );
};

export default FeedbackScreen;

const styles = StyleSheet.create({});
