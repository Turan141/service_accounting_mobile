import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TreatmentStagesEnum } from '../../../services/data';
import { useTreatmentsStore } from '../../../store/hooks';
import { fonts } from '../../../theme';
import { SimpleList } from '../../../ui-kit/Lists';
import Paper from '../../../ui-kit/Paper';
import {
  WEATHER_NAMES,
  TREATMENT_NAMES,
  WEATHER_NAMES_EN,
  TREATMENT_NAMES_EN,
  TREATMENT_STAGE_NAMES_EN,
} from '../../../utils';

const PooAgentReportRu: FC = () => {
  const { deicingTreatment, deicingTreatmentFormValues } = useTreatmentsStore();

  return (
    <View>
      <Paper title="Weather" titleStyle={fonts.bodySemibold}>
        <SimpleList>
          <SimpleList.Item title="Temperature" value={`${deicingTreatment?.temperature} °C`} />
          <SimpleList.Item
            title="Precipitation"
            value={WEATHER_NAMES_EN[deicingTreatmentFormValues?.weatherType]}
            hideBorder
          />
        </SimpleList>
      </Paper>

      {deicingTreatmentFormValues?.treatmentType && (
        <Paper title={TREATMENT_NAMES_EN[deicingTreatmentFormValues?.treatmentType]} titleStyle={fonts.bodySemibold}>
          <SimpleList>
            <SimpleList.Item title="Метод ПОО" value={TREATMENT_STAGE_NAMES_EN[TreatmentStagesEnum.OneStage]} />
            <SimpleList.Item title="Liquid type" value={deicingTreatmentFormValues?.liquidType} />
            <SimpleList.Item
              title="Solution concentration (Type I : Water)"
              value={deicingTreatmentFormValues?.stageConcentration}
            />
            <SimpleList.Item title="Name" value={deicingTreatmentFormValues?.firstTitle} hideBorder />
          </SimpleList>
        </Paper>
      )}

      {deicingTreatmentFormValues?.threatmentStage === TreatmentStagesEnum.TwoStages &&
      deicingTreatmentFormValues?.treatmentType ? (
        <Paper title={TREATMENT_NAMES_EN[deicingTreatmentFormValues?.treatmentType]} titleStyle={fonts.bodySemibold}>
          <SimpleList>
            <SimpleList.Item title="Метод ПОО" value={TREATMENT_STAGE_NAMES_EN[TreatmentStagesEnum.TwoStages]} />
            <SimpleList.Item title="Liquid type" value={deicingTreatmentFormValues?.liquidType} />
            <SimpleList.Item title="Concentration" value={deicingTreatmentFormValues?.stageConcentration} />
            <SimpleList.Item title="Name" value={deicingTreatmentFormValues?.secondTitle} hideBorder />
          </SimpleList>
        </Paper>
      ) : null}
    </View>
  );
};

export default observer(PooAgentReportRu);

const styles = StyleSheet.create({});
