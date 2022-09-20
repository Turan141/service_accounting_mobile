import React, { useMemo } from 'react';
import Tab from '../../../ui-kit/Tab';
import colors from '../../../theme/colors';
import { View } from 'react-native';

import { useTendersStore } from '../../../store/hooks';
import WaterSystemMaintenanceReportEn from './WaterSystemMaintenanceReportEn';
import WaterSystemMaintenanceReportRu from './WaterSystemMaintenanceReportRu';

const WaterSystemMaintenanceReport: React.FC = () => {
  const { currentTender, finishTender } = useTendersStore();
  const { properties, items, status } = currentTender;

  return (
    <View>
      <Tab sceneContainerStyle={{ backgroundColor: colors.transparent }}>
        <Tab.Item name="Ru" component={WaterSystemMaintenanceReportRu} />
        <Tab.Item name="En" component={WaterSystemMaintenanceReportEn} />
      </Tab>
    </View>
  );
};

export default WaterSystemMaintenanceReport;
