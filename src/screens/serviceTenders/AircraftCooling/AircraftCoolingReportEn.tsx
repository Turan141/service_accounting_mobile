import { observer } from 'mobx-react-lite';
import React, { FC, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTendersStore } from '../../../store/hooks';
import { SimpleList } from '../../../ui-kit/Lists';
import Paper from '../../../ui-kit/Paper';
import { DocumentItemNamesEnum } from '../../../store/data/documents';
import TenderReportForm from '../TenderReportForm';
import MonoServiceExecutionTime from '../MonoServiceExecutionTime';
import TenderReportTextFields from '../TenderReportTextFields';

const AircraftCoolingReportEn: FC = () => {
  const { currentTender } = useTendersStore();

  return (
    <View>
      <TenderReportTextFields tender={currentTender} language={'en'} />

      <MonoServiceExecutionTime itemType={DocumentItemNamesEnum.AircraftCooling} language={'en'} />

      <TenderReportForm language="en" />
    </View>
  );
};

export default observer(AircraftCoolingReportEn);
