import { Controller, UseFormReturn } from 'react-hook-form';
import { AppState, View } from 'react-native';
import Switch from '../ui-kit/Switch';
import fonts from '../theme/fonts';
import Timer from '../components/Timer/Timer';
import { FormGroup } from '../ui-kit/Forms';
import TextInput from '../ui-kit/TextInput';
import { DocumentItemNamesEnum } from '../store/data/documents';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DocumentItemView } from '../typings/swagger/api';
import { useTendersStore } from '../store/hooks';
import { TaskStatusesEnum } from '../services/data';

export default function (formControls: UseFormReturn<any, object>) {
  // const appState = useRef(AppState.currentState);
  // const [appStateVisible, setAppStateVisible] = useState(appState.current);
  //
  // useEffect(() => {
  //   const subscription = AppState.addEventListener('change', nextAppState => {
  //     if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
  //       console.log('App has come to the foreground!');
  //     }
  //
  //     appState.current = nextAppState;
  //     setAppStateVisible(appState.current);
  //     console.log('AppState', appState.current);
  //   });
  //
  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);

  const { watch, control } = formControls;
  const { currentTender, addPositionsToTender, editItemOfDocument, launchForcedDowntime, stopForcedDowntime } =
    useTendersStore();

  const handleForcedDownTime = useCallback(
    (value: DocumentItemView, onChange: (value: DocumentItemView | boolean) => void, status: TaskStatusesEnum) => {
      // if (status === TaskStatusesEnum.Started) {
      //   return;
      // }
      if (value === undefined || !value?.properties?.started) {
        launchForcedDowntime().then(item => onChange(item));
        return;
      }
      if (value?.properties?.started && !value.properties?.completed) {
        stopForcedDowntime().then(item => onChange(item));
        return;
      }
    },
    []
  );

  const forcedDownTimeValue = useCallback((value: DocumentItemView) => {
    if (value?.properties?.started && !value.properties?.completed) {
      return true;
    }
    if (value?.properties?.started && value.properties?.completed) {
      return false;
    }
    return undefined;
  }, []);

  const timePassed = useMemo(() => {
    const properties = watch('forcedDownTime')?.properties;
    if (properties?.started && properties?.completed) {
      return +properties?.completed - +properties?.started;
    } else if (properties?.started && !properties?.completed) {
      return Date.now() - +properties?.started;
    }
    return 600000;
  }, []);

  const additionalInfoSubmitHandler = useCallback(
    (input: string, type: DocumentItemNamesEnum) => {
      if (currentTender.items?.find(item => item.type === type)) {
        editItemOfDocument({ itemType: type, additionalInfo: input });
      } else {
        addPositionsToTender([
          {
            type: type,
            additionalInfo: input,
          },
        ]);
      }
    },
    [currentTender.items]
  );

  const ForcedDownTimeControls = (
    <>
      <View
        style={{
          marginTop: 24,
          paddingBottom: 24,
        }}
      >
        <Controller
          control={control}
          rules={{
            required: false,
          }}
          name="forcedDownTime"
          render={({ field: { onChange, value } }) => (
            <Switch
              labelStyle={fonts.paragraphSemibold}
              label="Вынужденный простой"
              value={forcedDownTimeValue(value)}
              onChange={handleForcedDownTime.bind(null, value, onChange, currentTender.status)}
              disabled={
                (!value?.properties?.started && currentTender.status === TaskStatusesEnum.Started) ||
                value?.properties?.completed
              }
            />
          )}
        />
      </View>
      {watch('forcedDownTime')?.properties?.started && (
        <Timer time={timePassed} stopped={watch('forcedDownTime').properties?.completed || !watch('forcedDownTime')} />
      )}
      <FormGroup style={{ marginTop: 24 }}>
        <Controller
          control={control}
          rules={{
            required: false,
          }}
          name="forcedDownTimeAdditionalInfo"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Дополнительная информация"
              value={value}
              onChangeText={onChange}
              onBlur={() => additionalInfoSubmitHandler(value, DocumentItemNamesEnum.ForcedDownTime)}
            />
          )}
        />
      </FormGroup>
    </>
  );

  return { ForcedDownTimeControls };
}
