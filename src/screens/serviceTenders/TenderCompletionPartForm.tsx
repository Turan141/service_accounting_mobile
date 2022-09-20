import React from 'react';
import { View } from 'react-native';
import { Controller, UseFormReturn } from 'react-hook-form';
import Switch from '../../ui-kit/Switch';
import fonts from '../../theme/fonts';
import { FormGroup } from '../../ui-kit/Forms';
import TextInput from '../../ui-kit/TextInput';
import { Button } from '../../ui-kit/Buttons';
import { DocumentItemNamesEnum } from '../../store/data/documents';
import { TaskStatusesEnum } from '../../services/data';

interface TenderCompletionPartFormProps {
  formControls: UseFormReturn<any, any>;
  handleMoveNext: any;
  tenderItemName: DocumentItemNamesEnum;
  loading: boolean;
}

const TenderCompletionPartForm: React.FC<TenderCompletionPartFormProps> = ({
  formControls,
  tenderItemName,
  handleMoveNext,
  loading,
}) => {
  const {
    watch,
    control,
    clearErrors,
    formState: { errors },
    handleSubmit,
  } = formControls;

  return (
    <View>
      {watch('canCancelService') && (
        <>
          <View
            style={{
              paddingBottom: 24,
            }}
          >
            <Controller
              control={control}
              rules={{
                required: false,
              }}
              name="serviceCancellation"
              render={({ field: { onChange, value } }) => (
                <Switch
                  labelStyle={fonts.paragraphSemibold}
                  label="Отказ от услуги"
                  value={value}
                  onChange={event => {
                    clearErrors(tenderItemName);
                    onChange(event);
                  }}
                />
              )}
            />
          </View>
          {watch('serviceCancellation') && (
            <FormGroup>
              <Controller
                control={control}
                rules={{
                  required: watch('serviceCancellation'),
                }}
                name="serviceCancellationReason"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    label={'Причина отказа'}
                    value={value}
                    onChangeText={onChange}
                    status={errors.serviceCancellationReason ? 'error' : 'default'}
                  />
                )}
              />
            </FormGroup>
          )}
        </>
      )}
      <Button
        loading={loading}
        onPress={handleSubmit(handleMoveNext)}
        disabled={
          !(
            watch('forcedDownTime')?.properties?.completed ||
            watch('serviceCancellation') ||
            watch(tenderItemName)?.status === TaskStatusesEnum.Started ||
            watch(tenderItemName)?.status === TaskStatusesEnum.Completed
          )
        }
        variant={'primary'}
      >
        {watch('serviceCancellation') && watch('forcedDownTime') === undefined
          ? 'Завершить'
          : 'Завершить и перейти к результату'}
      </Button>
    </View>
  );
};

export default TenderCompletionPartForm;
