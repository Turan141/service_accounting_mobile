import React from 'react';
import { Control, Controller, useForm } from 'react-hook-form';
import Paper from '../../ui-kit/Paper';
import { FormGroup } from '../../ui-kit/Forms';
import TextInput from '../../ui-kit/TextInput';
import Divider from '../../ui-kit/Divider';
import { View } from 'react-native';
import DrawingPanel from '../../components/DrawingPanel';
import Switch from '../../ui-kit/Switch';
import { fonts } from '../../theme';
import { Button } from '../../ui-kit/Buttons';
import { useTendersStore } from '../../store/hooks';
import { DocumentItemNamesEnum } from '../../store/data/documents';
import { TaskStatusesEnum, TenderTypesEnum } from '../../services/data';

interface TenderReportFormProps {
  language: 'ru' | 'en';
  doBeforeCompletion?: () => void;
}

const sign = {
  ru: {
    remarks: 'Особые условия / Замечания',
    customerSection: 'Раздел заказчика:',
    customerRemarks: 'Замечания заказчика',
    position: 'Должность',
    fullName: 'ФИО',
    clientNoSign: 'Клиент не расписался',
    completeNoSign: 'Завершить заявку без подписи',
    complete: 'Завершить заявку',
  },
  en: {
    remarks: 'Special Conditions / Remarks',
    customerSection: 'Customer section:',
    customerRemarks: 'Customer remarks',
    position: 'Position',
    fullName: 'Full name',
    clientNoSign: 'The client has not signed',
    completeNoSign: 'Complete tender without sign',
    complete: 'Complete tender',
  },
};

interface TenderReportFormValues {
  isCustomerSignExists: boolean;
  isTenderSignCancelled: boolean;
  additionalInfo: string;
  customerComments: string;
  position: string;
  fullName: string;
  signature: string | null;
}

const TenderReportForm: React.FC<TenderReportFormProps> = ({ language, doBeforeCompletion }) => {
  const { currentTender, finishTender, loading } = useTendersStore();
  const customerSign = currentTender?.items.find(item => item.type === DocumentItemNamesEnum.CustomerSign);

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setError,
  } = useForm<TenderReportFormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      isCustomerSignExists: !!customerSign,
      isTenderSignCancelled: false,
      additionalInfo: customerSign?.additionalInfo,
      customerComments: customerSign?.properties?.customerComments,
      position: customerSign?.properties?.position || '',
      fullName: customerSign?.properties?.fullName || '',
      signature: null,
    },
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: false,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
    delayError: undefined,
  });

  const submitTender = values => {
    doBeforeCompletion && doBeforeCompletion();
    finishTender(values).catch(() => {
      setError('signature', { message: 'Finishing tender with signature failed' });
    });
  };

  return (
    <>
      <Paper style={{ marginBottom: 0, marginTop: 0, paddingTop: 0 }}>
        <FormGroup style={{ paddingTop: 0 }}>
          <Controller
            control={control}
            rules={{
              required: false,
            }}
            name="additionalInfo"
            render={({ field: { onChange, value } }) => (
              <TextInput label={sign[language].remarks} value={value} onChangeText={onChange} />
            )}
          />
        </FormGroup>
      </Paper>

      <Paper title={sign[language].customerSection} titleStyle={{ marginBottom: 0 }}>
        <Divider />
        <FormGroup>
          <Controller
            control={control}
            rules={{
              required: false,
            }}
            name="customerComments"
            render={({ field: { onChange, value } }) => (
              <TextInput label={sign[language].customerRemarks} value={value} onChangeText={onChange} />
            )}
          />
        </FormGroup>
        {!watch('isTenderSignCancelled') && (
          <>
            <FormGroup>
              <Controller
                control={control}
                rules={{
                  required: currentTender.properties.service !== TenderTypesEnum.AnyService,
                }}
                name="position"
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextInput
                    status={error ? 'error' : 'default'}
                    label={sign[language].position}
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
            </FormGroup>
            <FormGroup>
              <Controller
                control={control}
                rules={{
                  required: currentTender.properties.service !== TenderTypesEnum.AnyService,
                }}
                name="fullName"
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextInput
                    status={error ? 'error' : 'default'}
                    label={sign[language].fullName}
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
            </FormGroup>
          </>
        )}
      </Paper>

      {!watch('isTenderSignCancelled') && (
        <FormGroup style={{ alignItems: 'center' }}>
          <View
            style={{
              width: '100%',
              height: 230,
            }}
          >
            <Controller
              control={control}
              rules={{
                required: false,
              }}
              name="signature"
              render={({ field: { onChange } }) => <DrawingPanel onDrawEnd={(img: string) => onChange(img)} />}
            />
          </View>
        </FormGroup>
      )}

      <Paper>
        <Controller
          control={control}
          rules={{
            required: false,
          }}
          name="isTenderSignCancelled"
          render={({ field: { onChange, value } }) => (
            <Switch
              labelStyle={fonts.paragraphSemibold}
              label={sign[language].clientNoSign}
              value={value}
              onChange={onChange}
            />
          )}
        />
      </Paper>

      <View style={{ padding: 20 }}>
        <Button
          loading={loading}
          onPress={handleSubmit(submitTender)}
          variant={errors.signature ? 'danger' : 'success'}
        >
          {watch('isTenderSignCancelled') ? sign[language].completeNoSign : sign[language].complete}
        </Button>
      </View>
    </>
  );
};

export default TenderReportForm;
