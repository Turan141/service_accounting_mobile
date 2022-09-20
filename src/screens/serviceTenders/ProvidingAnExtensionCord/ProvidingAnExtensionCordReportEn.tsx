import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { View } from 'react-native';
import { useTendersStore } from '../../../store/hooks';
import { DocumentItemNamesEnum } from '../../../store/data/documents';
import TenderReportForm from '../TenderReportForm';
import MonoServiceExecutionTime from '../MonoServiceExecutionTime';
import TenderReportTextFields from '../TenderReportTextFields';

const ProvidingAnExtensionCordReportEn: FC = () => {
  const { currentTender } = useTendersStore();

  return (
    <View>
      <TenderReportTextFields tender={currentTender} language={'en'} />

      <MonoServiceExecutionTime itemType={DocumentItemNamesEnum.ProvidingAnExtensionCord} language={'en'} />

      <TenderReportForm language="en" />
    </View>
  );
};

export default observer(ProvidingAnExtensionCordReportEn);
