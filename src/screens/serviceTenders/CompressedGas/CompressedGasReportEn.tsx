import { observer } from 'mobx-react-lite';
import React, { FC, useMemo } from 'react';
import { View } from 'react-native';
import { useTendersStore } from '../../../store/hooks';
import { SimpleList } from '../../../ui-kit/Lists';
import { DocumentItemNamesEnum } from '../../../store/data/documents';
import TenderReportForm from '../TenderReportForm';
import MonoServiceExecutionTime from '../MonoServiceExecutionTime';
import TenderReportTextFields from '../TenderReportTextFields';

const CompressedGasReportEn: FC = () => {
  const { currentTender } = useTendersStore();
  const { properties, items } = currentTender;

  const tenderItemName = DocumentItemNamesEnum.CompressedGas;
  const tenderItem = items.find(item => item.type === tenderItemName);

  const customFields = useMemo(() => {
    return (
      <>
        <SimpleList.Item title="Type of gas:" value={tenderItem.reference.properties.nameEn} />
      </>
    );
  }, []);

  return (
    <View>
      <TenderReportTextFields tender={currentTender} language={'en'} tenderSpecificFields={customFields} />

      <MonoServiceExecutionTime itemType={tenderItemName} language={'en'} />

      <TenderReportForm language="en" />
    </View>
  );
};

export default observer(CompressedGasReportEn);
