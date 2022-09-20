import { observer } from 'mobx-react-lite';
import React, { FC, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTendersStore } from '../../../store/hooks';
import { SimpleList } from '../../../ui-kit/Lists';
import Paper from '../../../ui-kit/Paper';
import { DocumentItemNamesEnum } from '../../../store/data/documents';
import TenderReportForm from '../TenderReportForm';
import MonoServiceExecutionTime from '../MonoServiceExecutionTime';
import TenderReportTextFields from '../TenderReportTextFields';
import { routeCategory } from '../Minibuses/utils';

const ProvisioningEscortVehicleReportEn: FC = () => {
  const { currentTender } = useTendersStore();
  const { items, properties } = currentTender;

  const tenderItemName = DocumentItemNamesEnum.ProvisioningEscortVehicle;
  const tenderItem = items.find(item => item.type === tenderItemName);

  const customFields = useMemo(() => {
    return (
      <>
        <SimpleList.Item
          title={`Route from (${routeCategory(tenderItem.properties.routeFromReference, 'en')}):`}
          value={tenderItem.properties.routeFromName}
        />
        <SimpleList.Item
          title={`Route to (${routeCategory(tenderItem.properties.routeToReference, 'en')}):`}
          value={tenderItem.properties.routeToName}
        />
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

export default observer(ProvisioningEscortVehicleReportEn);
