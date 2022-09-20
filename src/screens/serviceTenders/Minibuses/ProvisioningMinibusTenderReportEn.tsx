import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDictionariesStore, useTendersStore } from '../../../store/hooks';
import { SimpleList } from '../../../ui-kit/Lists';
import Paper from '../../../ui-kit/Paper';
import { DocumentItemNamesEnum } from '../../../store/data/documents';
import TenderReportForm from '../TenderReportForm';
import MonoServiceExecutionTime from '../MonoServiceExecutionTime';
import TenderReportTextFields from '../TenderReportTextFields';
import { logToConsole } from '../../../utils/formatting';
import { routeCategory } from './utils';

const ProvisioningMinibusTenderReportEn: FC = () => {
  const { currentTender } = useTendersStore();
  const { properties, items } = currentTender;
  const { getDictionaryItemsByType, passengersCategory } = useDictionariesStore();

  const tenderItem = items.find(item => item.type === DocumentItemNamesEnum.ProvisioningMinibuses);
  const tenderItemName = DocumentItemNamesEnum.ProvisioningMinibuses;

  useEffect(() => {
    getDictionaryItemsByType('PassengerCategories');
  }, []);

  logToConsole(tenderItem, passengersCategory);

  const minibusFields = useMemo(() => {
    const typeEnName = passengersCategory.find(item => item.masterCode === tenderItem.properties?.passengersCategory)
      ?.properties.nameEn;
    return (
      <>
        <SimpleList.Item title="Type:" value={typeEnName} />
        <SimpleList.Item
          title={`From (${routeCategory(tenderItem.properties.parkingToReference, 'en')}):`}
          value={tenderItem.properties.parkingFromName}
        />
        <SimpleList.Item
          title={`To (${routeCategory(tenderItem.properties.parkingToReference, 'en')}):`}
          value={tenderItem.properties.parkingToName}
        />
        <SimpleList.Item title="Amount of passengers:" value={tenderItem.properties.passengersCount} />
        <SimpleList.Item title="Car number:" value={tenderItem.properties.transportNumber} />
      </>
    );
  }, [passengersCategory]);

  return (
    <View>
      <TenderReportTextFields tender={currentTender} language={'en'} tenderSpecificFields={minibusFields} />

      <MonoServiceExecutionTime itemType={DocumentItemNamesEnum.ProvisioningMinibuses} language={'en'} />

      <TenderReportForm language="en" />
    </View>
  );
};

export default observer(ProvisioningMinibusTenderReportEn);

const styles = StyleSheet.create({});
