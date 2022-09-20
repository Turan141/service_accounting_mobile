import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { View } from 'react-native';
import { useTendersStore } from '../../../store/hooks';
import { DocumentItemNamesEnum } from '../../../store/data/documents';
import TenderReportForm from '../TenderReportForm';
import TenderReportTextFields from '../TenderReportTextFields';
import { TaskStatusesEnum } from '../../../services/data';

const AnyServiceReportEn: FC = () => {
  const { currentTender, changeItemStatus } = useTendersStore();
  const tenderItem = currentTender.items.find(item => item.type === DocumentItemNamesEnum.AnyServiceFlight);

  return (
    <View>
      <TenderReportTextFields tender={currentTender} language={'en'} />

      <TenderReportForm
        doBeforeCompletion={() => changeItemStatus(TaskStatusesEnum.Completed, undefined, tenderItem?.id)}
        language="en"
      />
    </View>
  );
};

export default observer(AnyServiceReportEn);
