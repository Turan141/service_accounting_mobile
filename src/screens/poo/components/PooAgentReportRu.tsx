import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { TreatmentStagesEnum } from '../../../services/data';
import { useTreatmentsStore } from '../../../store/hooks';
import { fonts } from '../../../theme';
import { SimpleList } from '../../../ui-kit/Lists';
import Paper from '../../../ui-kit/Paper';
import { WEATHER_NAMES, TREATMENT_NAMES, TREATMENT_STAGE_NAMES } from '../../../utils';

const PooAgentReportRu: FC = () => {
  const { deicingTreatment, deicingTreatmentFormValues } = useTreatmentsStore();

  console.log({
    deicingTreatmentFormValues,
  });

  return (
    <View>
      <Paper title="Погода" titleStyle={fonts.bodySemibold}>
        <SimpleList>
          <SimpleList.Item title="Температура" value={`${deicingTreatment?.temperature} °C`} />
          <SimpleList.Item title="Осадки" value={WEATHER_NAMES[deicingTreatmentFormValues?.weatherType]} hideBorder />
        </SimpleList>
      </Paper>

      {deicingTreatmentFormValues?.treatmentType && (
        <Paper title={TREATMENT_NAMES[deicingTreatmentFormValues?.treatmentType]} titleStyle={fonts.bodySemibold}>
          <SimpleList>
            <SimpleList.Item title="Метод ПОО" value={TREATMENT_STAGE_NAMES[TreatmentStagesEnum.OneStage]} />
            <SimpleList.Item title="Тип жидкости" value={deicingTreatmentFormValues?.liquidType} />
            <SimpleList.Item
              title="Концентрация раствора (Type I : Вода)"
              value={deicingTreatmentFormValues?.stageConcentration}
            />
            <SimpleList.Item title="Наименование" value={deicingTreatmentFormValues?.firstTitle} hideBorder />
          </SimpleList>
        </Paper>
      )}

      {deicingTreatmentFormValues?.threatmentStage === TreatmentStagesEnum.TwoStages &&
      deicingTreatmentFormValues?.treatmentType ? (
        <Paper title={TREATMENT_NAMES[deicingTreatmentFormValues?.treatmentType]} titleStyle={fonts.bodySemibold}>
          <SimpleList>
            <SimpleList.Item title="Метод ПОО" value={TREATMENT_STAGE_NAMES[TreatmentStagesEnum.TwoStages]} />
            <SimpleList.Item title="Тип жидкости" value={deicingTreatmentFormValues?.liquidType} />
            <SimpleList.Item title="Концентрация" value={deicingTreatmentFormValues?.stageConcentration} />
            <SimpleList.Item title="Наименование" value={deicingTreatmentFormValues?.secondTitle} hideBorder />
          </SimpleList>
        </Paper>
      ) : null}
    </View>
  );
};

export default observer(PooAgentReportRu);

const styles = StyleSheet.create({});
