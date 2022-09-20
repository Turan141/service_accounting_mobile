import React from 'react';
import Tab from '../../../ui-kit/Tab';
import colors from '../../../theme/colors';
import { View } from 'react-native';
import MaintenanceKitReportRu from './MaintenanceKitReportRu';
import MaintenanceKitReportEn from './MaintenanceKitReportEn';

const MaintenanceKitReport: React.FC = () => {
  return (
    <View>
      <Tab sceneContainerStyle={{ backgroundColor: colors.transparent }}>
        <Tab.Item name="Ru" component={MaintenanceKitReportRu} />
        <Tab.Item name="En" component={MaintenanceKitReportEn} />
      </Tab>
    </View>
  );
};

export default MaintenanceKitReport;
