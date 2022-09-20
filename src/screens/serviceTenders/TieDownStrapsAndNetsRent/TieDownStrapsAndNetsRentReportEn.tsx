import { observer } from 'mobx-react-lite';
import React, { FC, useMemo } from 'react';
import { View } from 'react-native';
import { useTendersStore } from '../../../store/hooks';
import { SimpleList } from '../../../ui-kit/Lists';
import { DocumentItemNamesEnum } from '../../../store/data/documents';
import TenderReportForm from '../TenderReportForm';
import MonoServiceExecutionTime from '../MonoServiceExecutionTime';
import TenderReportTextFields from '../TenderReportTextFields';
import { TenderReportLangViewProps } from '../Minibuses/ProvisioningMinibusTenderReportRu';

const TieDownStrapsAndNetsRentReportEn: FC<TenderReportLangViewProps> = () => {
  const { currentTender } = useTendersStore();
  const { properties, items } = currentTender;

  const tenderItem = items.find(item => item.type === DocumentItemNamesEnum.TieDownStrapsAndNetsRent);
  const tenderItemName = DocumentItemNamesEnum.TieDownStrapsAndNetsRent;

  const customFields = useMemo(() => {
    return (
      <>
        <SimpleList.Item title="Kits amount:" value={tenderItem.properties.kitsCount} />
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

export default observer(TieDownStrapsAndNetsRentReportEn);
