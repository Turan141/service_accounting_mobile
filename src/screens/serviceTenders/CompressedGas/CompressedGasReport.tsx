import React from 'react';
import Tab from '../../../ui-kit/Tab';
import colors from '../../../theme/colors';
import { View } from 'react-native';
import CompressedGasReportRu from './CompressedGasReportRu';
import CompressedGasReportEn from './CompressedGasReportEn';

const CompressedGasReport: React.FC = () => {
  return (
    <View>
      <Tab sceneContainerStyle={{ backgroundColor: colors.transparent }}>
        <Tab.Item name="Ru" component={CompressedGasReportRu} />
        <Tab.Item name="En" component={CompressedGasReportEn} />
      </Tab>
    </View>
  );
};

export default CompressedGasReport;
