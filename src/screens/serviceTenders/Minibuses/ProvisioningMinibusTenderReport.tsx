import React, { useMemo } from 'react';
import Tab from '../../../ui-kit/Tab';
import colors from '../../../theme/colors';
import { View } from 'react-native';
import ProvisioningMinibusTenderReportRu from './ProvisioningMinibusTenderReportRu';
import ProvisioningMinibusTenderReportEn from './ProvisioningMinibusTenderReportEn';

const ProvisioningMinibusTenderReport: React.FC = () => {
  return (
    <View>
      <Tab sceneContainerStyle={{ backgroundColor: colors.transparent }}>
        <Tab.Item name="Ru" component={ProvisioningMinibusTenderReportRu} />
        <Tab.Item name="En" component={ProvisioningMinibusTenderReportEn} />
      </Tab>
    </View>
  );
};

export default ProvisioningMinibusTenderReport;
