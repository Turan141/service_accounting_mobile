import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { View } from 'react-native';
import { useTendersStore } from '../../../store/hooks';
import { DocumentItemNamesEnum } from '../../../store/data/documents';
import TenderReportForm from '../TenderReportForm';
import MonoServiceExecutionTime from '../MonoServiceExecutionTime';
import { logToConsole } from '../../../utils/formatting';
import TenderReportTextFields from '../TenderReportTextFields';

const SanitaryInspectionReportRu: FC = () => {
  const { currentTender } = useTendersStore();
  const { properties, items } = currentTender;

  return (
    <View>
      <TenderReportTextFields tender={currentTender} language={'ru'} />

      <MonoServiceExecutionTime itemType={DocumentItemNamesEnum.SanitaryInspection} language={'ru'} />

      <TenderReportForm language="ru" />
    </View>
  );
};

export default observer(SanitaryInspectionReportRu);
