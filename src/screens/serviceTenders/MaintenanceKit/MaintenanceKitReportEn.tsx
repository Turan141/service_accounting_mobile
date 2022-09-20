import { observer } from 'mobx-react-lite';
import React, { FC, useMemo } from 'react';
import { View } from 'react-native';
import { useTendersStore } from '../../../store/hooks';
import { SimpleList } from '../../../ui-kit/Lists';
import { DocumentItemNamesEnum } from '../../../store/data/documents';
import TenderReportForm from '../TenderReportForm';
import MonoServiceExecutionTime from '../MonoServiceExecutionTime';
import TenderReportTextFields from '../TenderReportTextFields';
import { routeCategory } from '../Minibuses/utils';

const MaintenanceKitReportEn: FC = () => {
  const { currentTender } = useTendersStore();
  const { properties, items } = currentTender;

  const tenderItemName = DocumentItemNamesEnum.MaintenanceKit;
  const tenderItem = items.find(item => item.type === tenderItemName);

  const customFields = useMemo(() => {
    return (
      <>
        <SimpleList.Item title="Type:" value={tenderItem?.reference?.properties.nameEn} />
        <SimpleList.Item title="Seats:" value={tenderItem.properties?.numberseats} />
        <SimpleList.Item title="Weight:" value={tenderItem.properties?.weight} />
        <SimpleList.Item
          title={`Route from (${routeCategory(tenderItem.properties.maintanceKitFromReference, 'en')}):`}
          value={tenderItem.properties.maintanceKitFromName}
        />
        <SimpleList.Item
          title={`Route to (${routeCategory(tenderItem.properties.maintanceKitToReference, 'en')}):`}
          value={tenderItem.properties.maintanceKitToName}
        />
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

export default observer(MaintenanceKitReportEn);
