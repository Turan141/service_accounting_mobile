import { observer } from 'mobx-react-lite';
import React, { FC, useMemo } from 'react';
import { View } from 'react-native';
import { useTendersStore } from '../../../store/hooks';
import { DocumentItemNamesEnum } from '../../../store/data/documents';
import TenderReportForm from '../TenderReportForm';
import MonoServiceExecutionTime from '../MonoServiceExecutionTime';
import TenderReportTextFields from '../TenderReportTextFields';
import { SimpleList } from '../../../ui-kit/Lists';

const GroundPowerUnitReportEn: FC = () => {
  const { currentTender } = useTendersStore();
  const { items, properties } = currentTender;

  const tenderItemName = DocumentItemNamesEnum.GroundPowerUnit;
  const tenderItem = items.find(item => item.type === tenderItemName);

  const customFields = useMemo(() => {
    return (
      <>
        <SimpleList.Item title="Power source type:" value={tenderItem.reference.properties.nameEn} />
      </>
    );
  }, []);

  return (
    <View>
      <TenderReportTextFields tenderSpecificFields={customFields} tender={currentTender} language={'en'} />

      <MonoServiceExecutionTime itemType={tenderItemName} language={'en'} />

      <TenderReportForm language="en" />
    </View>
  );
};

export default observer(GroundPowerUnitReportEn);
