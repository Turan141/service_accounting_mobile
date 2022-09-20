import React, { FC, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, layout } from '../../theme';

import { Button } from '../../ui-kit/Buttons';
import { ScrollViewContainer } from '../../ui-kit/Containers';
import { WeatherLabel } from '../../components/Labels';
import { TaskStepper } from '../../components/Tasks';
import { PooAgentResultsScreenProps } from '../../navigation/props';
import Icon from '../../ui-kit/Icon';
import SpinnerLoading from '../../ui-kit/SpinnerLoading';

import { TaskStepSchema } from '../../services/data';
import { useAppStore, useTreatmentsStore } from '../../store/hooks';
import { TREATMENT_NAMES, WEATHER_NAMES } from '../../utils';
import { observer } from 'mobx-react';
import { PooStackScreens } from '../../navigation/enums';

const stepperSteps: TaskStepSchema[] = [
  { order: 1, label: 'Текущие условия', key: 'currentConditions', disabled: false },
];

const PooAgentResultsScreen: FC<PooAgentResultsScreenProps> = ({ navigation, route }) => {
  const { id } = route.params;
  const { showNotificationAlert } = useAppStore();
  const { controlLoading, loading, deicingTreatment, getDeicingTreamentById } = useTreatmentsStore();

  useEffect(() => {
    getDeicingTreamentById({
      treatmentId: id,
      cityId: 473021,
    });
  }, []);

  const handleMoveNext = async () => {
    showNotificationAlert({
      visible: true,
      type: 'success',
      loading: true,
      message: 'Данные были отправлены в работу. Идет возврат к задачам',
      onHide: () => {
        navigation.navigate(PooStackScreens.PooAgentResultsNext);
      },
    });
  };

  if (loading) return <SpinnerLoading />;

  return (
    <>
      <TaskStepper steps={stepperSteps} currentKey={stepperSteps[0].key} />

      <View style={[styles.container]}>
        <ScrollViewContainer contentContainerStyle={{ padding: 0 }}>
          <View style={{ paddingHorizontal: 20 }}>
            <WeatherLabel
              degree={deicingTreatment?.temperature}
              extended
              condition={WEATHER_NAMES[deicingTreatment?.weatherType]}
            />

            <View
              style={{
                paddingVertical: 30,
              }}
            >
              <View
                style={{
                  ...layout.rowAlignItemsCenter,
                  paddingVertical: 20,
                  borderTopWidth: 0.5,
                  borderBottomWidth: 0.5,
                  borderColor: colors.gray.primary,
                }}
              >
                <View style={layout.alignCenter}>
                  <Icon name="airplaneWingTopHighlighted" />
                  <Text style={{ ...fonts.paragraphRegular, marginTop: 15 }}>
                    {TREATMENT_NAMES[deicingTreatment?.treatmentType]}
                  </Text>
                </View>

                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={{ ...fonts.paragraphSemibold, marginBottom: 20 }}>1-ступенчатая</Text>

                  <View style={layout.rowSpaceBetween}>
                    <Text style={fonts.paragraphRegular}>{`Type ${deicingTreatment?.liquidType}: Вода`}</Text>
                    <Text style={fonts.paragraphSemibold}>{deicingTreatment?.stageConcentration}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollViewContainer>

        <View style={styles.buttonContainer}>
          <Button
            variant="secondary"
            onPress={() => navigation.navigate(PooStackScreens.PooUpdateReason, { id })}
            loading={controlLoading}
            style={{ marginBottom: 8 }}
          >
            Изменить
          </Button>

          <Button onPress={handleMoveNext} loading={controlLoading}>
            Далее
          </Button>
        </View>
      </View>
    </>
  );
};

export default observer(PooAgentResultsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },
  labelContainer: {
    ...layout.rowSpaceBetween,
    marginBottom: 15,
  },
  label: {
    ...fonts.paragraphRegular,
    flexShrink: 1,
  },
});
