import { observer } from 'mobx-react-lite';
import React, { FC, useMemo } from 'react';
import { View } from 'react-native';
import { useTendersStore } from '../../../store/hooks';
import { SimpleList } from '../../../ui-kit/Lists';
import { DocumentItemNamesEnum } from '../../../store/data/documents';
import TenderReportForm from '../TenderReportForm';
import MonoServiceExecutionTime from '../MonoServiceExecutionTime';
import TenderReportTextFields from '../TenderReportTextFields';
import { routeCategory } from './utils';

export interface TenderReportLangViewProps {
  forcedDownTimeTime?: string;
}

const ProvisioningMinibusTenderReportRu: FC<TenderReportLangViewProps> = () => {
  const { currentTender } = useTendersStore();
  const { properties, items } = currentTender;

  const tenderItem = items.find(item => item.type === DocumentItemNamesEnum.ProvisioningMinibuses);
  const tenderItemName = DocumentItemNamesEnum.ProvisioningMinibuses;

  const minibusFields = useMemo(() => {
    return (
      <>
        <SimpleList.Item title="Тип:" value={tenderItem.properties.passengersCategoryName} />
        <SimpleList.Item
          title={`Маршрут с (${routeCategory(tenderItem.properties.parkingFromReference, 'ru')}):`}
          value={tenderItem.properties.parkingFromName}
        />
        <SimpleList.Item
          title={`Маршрут на (${routeCategory(tenderItem.properties.parkingToReference, 'ru')}):`}
          value={tenderItem.properties.parkingToName}
        />
        <SimpleList.Item title="Кол-во пассажиров:" value={tenderItem.properties.passengersCount} />
        <SimpleList.Item title="Номер машины:" value={tenderItem.properties.transportNumber} />
      </>
    );
  }, []);

  return (
    <View>
      <TenderReportTextFields tender={currentTender} language={'ru'} tenderSpecificFields={minibusFields} />

      <MonoServiceExecutionTime itemType={DocumentItemNamesEnum.ProvisioningMinibuses} language={'ru'} />

      <TenderReportForm language="ru" />
    </View>
  );
};

export default observer(ProvisioningMinibusTenderReportRu);
