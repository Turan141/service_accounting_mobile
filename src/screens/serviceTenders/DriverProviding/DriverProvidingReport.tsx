import React from 'react';
import Tab from '../../../ui-kit/Tab';
import colors from '../../../theme/colors';
import { View } from 'react-native';
import DriverProvidingReportRu from './DriverProvidingReportRu';
import DriverProvidingReportEn from './DriverProvidingReportEn';

const DriverProvidingReport: React.FC = () => {
  return (
    <View>
      <Tab sceneContainerStyle={{ backgroundColor: colors.transparent }}>
        <Tab.Item name="Ru" component={DriverProvidingReportRu} />
        <Tab.Item name="En" component={DriverProvidingReportEn} />
      </Tab>
    </View>
  );
};

export default DriverProvidingReport;
