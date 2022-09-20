import { observer } from 'mobx-react-lite';
import React, { FC, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTendersStore } from '../../../store/hooks';
import { SimpleList } from '../../../ui-kit/Lists';
import Paper from '../../../ui-kit/Paper';
import { DocumentItemNamesEnum } from '../../../store/data/documents';
import { format } from 'date-fns';
import TenderReportForm from '../TenderReportForm';
import { logToConsole } from '../../../utils/formatting';
import MonoServiceExecutionTime from '../MonoServiceExecutionTime';
import TenderReportTextFields from '../TenderReportTextFields';

const WaterSystemMaintenanceReportEn: FC = () => {
  const { currentTender } = useTendersStore();
  const { properties, items } = currentTender;

  const tenderItem = items.find(item => item.type === DocumentItemNamesEnum.WaterSystemMaintenance);

  const waterSystemFields = useMemo(() => {
    return (
      <>
        <SimpleList.Item title="Type:" value={tenderItem.reference.properties.nameEn} />
        {tenderItem.masterCode === 'WSMOther' && <SimpleList.Item title="Info:" value={tenderItem.additionalInfo} />}
      </>
    );
  }, []);

  return (
    <View>
      <TenderReportTextFields tender={currentTender} language={'en'} tenderSpecificFields={waterSystemFields} />

      <MonoServiceExecutionTime itemType={DocumentItemNamesEnum.WaterSystemMaintenance} language={'en'} />

      <TenderReportForm language="en" />
    </View>
  );
};

export default observer(WaterSystemMaintenanceReportEn);
