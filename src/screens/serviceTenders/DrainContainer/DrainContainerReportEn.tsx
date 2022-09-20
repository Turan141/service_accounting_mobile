import { observer } from 'mobx-react-lite';
import React, { FC, useMemo } from 'react';
import { View } from 'react-native';
import { useTendersStore } from '../../../store/hooks';
import { SimpleList } from '../../../ui-kit/Lists';
import { DocumentItemNamesEnum } from '../../../store/data/documents';
import TenderReportForm from '../TenderReportForm';
import MonoServiceExecutionTime from '../MonoServiceExecutionTime';
import TenderReportTextFields from '../TenderReportTextFields';

const DrainContainerReportEn: FC = () => {
  const { currentTender } = useTendersStore();
  const { properties, items } = currentTender;

  const tenderItemName = DocumentItemNamesEnum.DrainContainer;
  const tenderItem = items.find(item => item.type === tenderItemName);

  const customFields = useMemo(() => {
    return (
      <>
        <SimpleList.Item title="Fuel type:" value={tenderItem.reference.properties.nameEn} />
        <SimpleList.Item title="Liters:" value={tenderItem.properties?.litersCount} />
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

export default observer(DrainContainerReportEn);
