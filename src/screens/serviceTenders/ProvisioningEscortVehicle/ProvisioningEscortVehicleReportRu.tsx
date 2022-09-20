import { observer } from 'mobx-react-lite';
import React, { FC, useMemo } from 'react';
import { View } from 'react-native';
import { useTendersStore } from '../../../store/hooks';
import { DocumentItemNamesEnum } from '../../../store/data/documents';
import TenderReportForm from '../TenderReportForm';
import MonoServiceExecutionTime from '../MonoServiceExecutionTime';
import { logToConsole } from '../../../utils/formatting';
import TenderReportTextFields from '../TenderReportTextFields';
import { SimpleList } from '../../../ui-kit/Lists';
import { routeCategory } from '../Minibuses/utils';

const ProvisioningEscortVehicleReportRu: FC = () => {
  const { currentTender } = useTendersStore();
  const { items, properties } = currentTender;

  const tenderItemName = DocumentItemNamesEnum.ProvisioningEscortVehicle;
  const tenderItem = items.find(item => item.type === tenderItemName);

  const customFields = useMemo(() => {
    return (
      <>
        <SimpleList.Item
          title={`Маршрут с (${routeCategory(tenderItem.properties.routeFromReference, 'ru')}):`}
          value={tenderItem.properties.routeFromName}
        />
        <SimpleList.Item
          title={`Маршрут на (${routeCategory(tenderItem.properties.routeToReference, 'ru')}):`}
          value={tenderItem.properties.routeToName}
        />
      </>
    );
  }, []);

  return (
    <View>
      <TenderReportTextFields tenderSpecificFields={customFields} tender={currentTender} language={'ru'} />

      <MonoServiceExecutionTime itemType={tenderItemName} language={'ru'} />

      <TenderReportForm language="ru" />
    </View>
  );
};

export default observer(ProvisioningEscortVehicleReportRu);
