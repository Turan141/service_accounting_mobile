import React from 'react';
import Tab from '../../../ui-kit/Tab';
import colors from '../../../theme/colors';
import { View } from 'react-native';
import ProvidingAnExtensionCordReportEn from './GroundPowerUnitReportEn';
import ProvidingAnExtensionCordReportRu from './GroundPowerUnitReportRu';

const GroundPowerUnitReport: React.FC = () => {
  return (
    <View>
      <Tab sceneContainerStyle={{ backgroundColor: colors.transparent }}>
        <Tab.Item name="Ru" component={ProvidingAnExtensionCordReportRu} />
        <Tab.Item name="En" component={ProvidingAnExtensionCordReportEn} />
      </Tab>
    </View>
  );
};

export default GroundPowerUnitReport;
