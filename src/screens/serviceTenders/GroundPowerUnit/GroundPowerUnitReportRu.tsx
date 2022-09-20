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

const GroundPowerUnitReportRu: FC = () => {
  const { currentTender } = useTendersStore();
  const { items, properties } = currentTender;

  const tenderItemName = DocumentItemNamesEnum.GroundPowerUnit;
  const tenderItem = items.find(item => item.type === tenderItemName);

  const customFields = useMemo(() => {
    return (
      <>
        <SimpleList.Item title="Тип ИЭП:" value={tenderItem.reference.properties.nameRu} />
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

export default observer(GroundPowerUnitReportRu);
