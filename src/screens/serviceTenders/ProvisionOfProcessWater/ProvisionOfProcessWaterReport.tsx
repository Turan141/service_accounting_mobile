import React from 'react';
import Tab from '../../../ui-kit/Tab';
import colors from '../../../theme/colors';
import { View } from 'react-native';
import ProvisionOfProcessWaterReportEn from './ProvisionOfProcessWaterReportEn';
import ProvisionOfProcessWaterReportRu from './ProvisionOfProcessWaterReportRu';

const ProvisionOfProcessWaterReport: React.FC = () => {
  return (
    <View>
      <Tab sceneContainerStyle={{ backgroundColor: colors.transparent }}>
        <Tab.Item name="Ru" component={ProvisionOfProcessWaterReportRu} />
        <Tab.Item name="En" component={ProvisionOfProcessWaterReportEn} />
      </Tab>
    </View>
  );
};

export default ProvisionOfProcessWaterReport;
