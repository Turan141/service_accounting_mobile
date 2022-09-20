import { observer } from 'mobx-react-lite';
import React, { FC, useMemo } from 'react';
import { View } from 'react-native';
import { useTendersStore } from '../../../store/hooks';
import { SimpleList } from '../../../ui-kit/Lists';
import Paper from '../../../ui-kit/Paper';
import { DocumentItemNamesEnum } from '../../../store/data/documents';
import TenderReportForm from '../TenderReportForm';
import MonoServiceExecutionTime from '../MonoServiceExecutionTime';
import { format } from 'date-fns';
import { logToConsole } from '../../../utils/formatting';

export interface TenderReportLangViewProps {
  forcedDownTimeTime?: string;
}

const ToiletTenderReportRu: FC<TenderReportLangViewProps> = () => {
  const { currentTender } = useTendersStore();
  const { properties, items } = currentTender;

  logToConsole(properties);

  return (
    <View>
      <Paper>
        <SimpleList>
          <SimpleList.Item title="Услуга" value={properties.serviceReference.properties.nameRu} />
          <SimpleList.Item title="Заказчик" value={properties.customerReference.properties.nameRu} />
          <SimpleList.Item title="Авиакомпания" value={properties.companyReference.properties.nameRu} />
          <SimpleList.Item title="Тип ВС" value={properties.aircraftTypeReference.properties.utg} />
          <SimpleList.Item title="Бортовой номер" value={properties.aircraftReference.properties.regNumber} />
          <SimpleList.Item title="МС" value={properties.parkingName} />
          <SimpleList.Item
            title="Гаражный номер спецтехники:"
            value={
              items?.find(item => item.type === DocumentItemNamesEnum.GarageNumberOfSpecialEquipment)?.additionalInfo
            }
            hideBorder
          />
        </SimpleList>
      </Paper>

      <MonoServiceExecutionTime itemType={DocumentItemNamesEnum.ToiletType} language={'ru'} />

      <TenderReportForm language="ru" />
    </View>
  );
};

export default observer(ToiletTenderReportRu);
