import { observer } from 'mobx-react-lite';
import React, { FC, useMemo } from 'react';
import { View } from 'react-native';
import { useDictionariesStore, useTendersStore } from '../../../store/hooks';
import { SimpleList } from '../../../ui-kit/Lists';
import { DocumentItemNamesEnum } from '../../../store/data/documents';
import TenderReportForm from '../TenderReportForm';
import MonoServiceExecutionTime from '../MonoServiceExecutionTime';
import TenderReportTextFields from '../TenderReportTextFields';
import { routeCategory } from '../Minibuses/utils';

const MaintenanceKitReportRu: FC = () => {
  const { currentTender } = useTendersStore();
  const { properties, items } = currentTender;

  const tenderItemName = DocumentItemNamesEnum.MaintenanceKit;
  const tenderItem = items.find(item => item.type === tenderItemName);

  const customFields = useMemo(() => {
    return (
      <>
        <SimpleList.Item title="Вид работы:" value={tenderItem?.reference?.name} />
        <SimpleList.Item title="Мест:" value={tenderItem.properties?.numberseats} />
        <SimpleList.Item title="Вес:" value={tenderItem.properties?.weight} />
        <SimpleList.Item
          title={`Маршрут с (${routeCategory(tenderItem.properties.maintanceKitFromReference, 'ru')}):`}
          value={tenderItem.properties.maintanceKitFromName}
        />
        <SimpleList.Item
          title={`Маршрут на (${routeCategory(tenderItem.properties.maintanceKitToReference, 'ru')}):`}
          value={tenderItem.properties.maintanceKitToName}
        />
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

export default observer(MaintenanceKitReportRu);
