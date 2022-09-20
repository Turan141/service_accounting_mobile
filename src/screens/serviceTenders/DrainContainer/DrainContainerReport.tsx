import React from 'react';
import Tab from '../../../ui-kit/Tab';
import colors from '../../../theme/colors';
import { View } from 'react-native';
import DrainContainerReportRu from './DrainContainerReportRu';
import DrainContainerReportEn from './DrainContainerReportEn';

const DrainContainerReport: React.FC = () => {
  return (
    <View>
      <Tab sceneContainerStyle={{ backgroundColor: colors.transparent }}>
        <Tab.Item name="Ru" component={DrainContainerReportRu} />
        <Tab.Item name="En" component={DrainContainerReportEn} />
      </Tab>
    </View>
  );
};

export default DrainContainerReport;
