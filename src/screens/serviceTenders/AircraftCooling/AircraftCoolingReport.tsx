import React from 'react';
import Tab from '../../../ui-kit/Tab';
import colors from '../../../theme/colors';
import { View } from 'react-native';
import AircraftCoolingReportEn from './AircraftCoolingReportEn';
import AircraftCoolingReportRu from './AircraftCoolingReportRu';

const AircraftCoolingReport: React.FC = () => {
  return (
    <View>
      <Tab sceneContainerStyle={{ backgroundColor: colors.transparent }}>
        <Tab.Item name="Ru" component={AircraftCoolingReportRu} />
        <Tab.Item name="En" component={AircraftCoolingReportEn} />
      </Tab>
    </View>
  );
};

export default AircraftCoolingReport;
