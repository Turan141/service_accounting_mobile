import React from 'react';
import Tab from '../../../ui-kit/Tab';
import colors from '../../../theme/colors';
import { View } from 'react-native';
import ProvidingAnExtensionCordReportEn from './ProvidingAnExtensionCordReportEn';
import ProvidingAnExtensionCordReportRu from './ProvidingAnExtensionCordReportRu';

const ProvidingAnExtensionCordReport: React.FC = () => {
  return (
    <View>
      <Tab sceneContainerStyle={{ backgroundColor: colors.transparent }}>
        <Tab.Item name="Ru" component={ProvidingAnExtensionCordReportRu} />
        <Tab.Item name="En" component={ProvidingAnExtensionCordReportEn} />
      </Tab>
    </View>
  );
};

export default ProvidingAnExtensionCordReport;
