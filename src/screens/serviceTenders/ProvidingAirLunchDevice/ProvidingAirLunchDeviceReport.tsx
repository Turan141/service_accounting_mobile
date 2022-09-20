import React from 'react';
import Tab from '../../../ui-kit/Tab';
import colors from '../../../theme/colors';
import { View } from 'react-native';
import ProvidingAirLunchDeviceReportRu from './ProvidingAirLunchDeviceReportRu';
import ProvidingAirLunchDeviceReportEn from './ProvidingAirLunchDeviceReportEn';

const ProvidingAirLunchDeviceReport: React.FC = () => {
  return (
    <View>
      <Tab sceneContainerStyle={{ backgroundColor: colors.transparent }}>
        <Tab.Item name="Ru" component={ProvidingAirLunchDeviceReportRu} />
        <Tab.Item name="En" component={ProvidingAirLunchDeviceReportEn} />
      </Tab>
    </View>
  );
};

export default ProvidingAirLunchDeviceReport;
