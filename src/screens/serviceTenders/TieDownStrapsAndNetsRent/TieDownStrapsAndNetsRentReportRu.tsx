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

const TieDownStrapsAndNetsRentReportRu: FC<TenderReportLangViewProps> = () => {
  const { currentTender } = useTendersStore();
  const { properties, items } = currentTender;

  const tenderItem = items.find(item => item.type === DocumentItemNamesEnum.TieDownStrapsAndNetsRent);
  const tenderItemName = DocumentItemNamesEnum.TieDownStrapsAndNetsRent;

  const customFields = useMemo(() => {
    return (
      <>
        <SimpleList.Item title="Кол-во комплектов:" value={tenderItem.properties.kitsCount} />
      </>
    );
  }, []);

  return (
    <View>
      <TenderReportTextFields tender={currentTender} language={'ru'} tenderSpecificFields={customFields} />

      <MonoServiceExecutionTime itemType={tenderItemName} language={'ru'} />

      <TenderReportForm language="ru" />
    </View>
  );
};

export default observer(TieDownStrapsAndNetsRentReportRu);
