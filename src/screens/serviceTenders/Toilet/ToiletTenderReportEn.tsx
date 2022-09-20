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

interface HeatingTenderReportProps {}

export interface HeatingTenderReportFormValues {
  isCustomerSignExists: boolean;
  additionalInfo: string;
  customerComments: string;
  position: string | undefined;
  fullName: string | undefined;
  signature: string | null;
  isTenderSignCancelled: boolean;
}

const ToiletTenderReportEn: FC<HeatingTenderReportProps> = () => {
  const { currentTender } = useTendersStore();
  const { properties, items } = currentTender;

  return (
    <View>
      <Paper>
        <SimpleList>
          <SimpleList.Item title="Service" value={properties.serviceReference.properties.nameEn} />
          <SimpleList.Item title="Customer" value={properties.customerReference.properties.nameEn} />
          <SimpleList.Item title="Airline" value={properties.companyReference.description} />
          <SimpleList.Item title="Aircraft type" value={properties.aircraftTypeName} />
          <SimpleList.Item title="Board number" value={properties.aircraftName} />
          <SimpleList.Item title="Parking place" value={properties.parkingName} />
          <SimpleList.Item
            title="Garage number of special equipment:"
            value={
              items?.find(item => item.type === DocumentItemNamesEnum.GarageNumberOfSpecialEquipment)?.additionalInfo
            }
            hideBorder
          />
        </SimpleList>
      </Paper>

      <MonoServiceExecutionTime itemType={DocumentItemNamesEnum.ToiletType} language={'en'} />

      <TenderReportForm language="en" />
    </View>
  );
};

export default observer(ToiletTenderReportEn);

const styles = StyleSheet.create({});
