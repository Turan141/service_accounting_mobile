import { observer } from 'mobx-react-lite';
import React, { FC, useMemo } from 'react';
import { View } from 'react-native';
import { useDictionariesStore, useTendersStore } from '../../../store/hooks';
import { SimpleList } from '../../../ui-kit/Lists';
import { DocumentItemNamesEnum } from '../../../store/data/documents';
import TenderReportForm from '../TenderReportForm';
import MonoServiceExecutionTime from '../MonoServiceExecutionTime';
import { logToConsole } from '../../../utils/formatting';
import TenderReportTextFields from '../TenderReportTextFields';

const WaterSystemMaintenanceReportRu: FC = () => {
  const { currentTender } = useTendersStore();
  const { properties, items } = currentTender;

  const tenderItem = items.find(item => item.type === DocumentItemNamesEnum.WaterSystemMaintenance);
  const tenderItemName = DocumentItemNamesEnum.WaterSystemMaintenance;

  const customFields = useMemo(() => {
    return (
      <>
        <SimpleList.Item title="Тип:" value={tenderItem.reference.properties.nameRu} />
        {tenderItem.masterCode === 'WSMOther' && (
          <SimpleList.Item title="Информация:" value={tenderItem.additionalInfo} />
        )}
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

export default observer(WaterSystemMaintenanceReportRu);
