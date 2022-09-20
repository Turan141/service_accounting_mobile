import React from 'react';
import Tab from '../../../ui-kit/Tab';
import colors from '../../../theme/colors';
import { View } from 'react-native';
import SanitaryInspectionReportRu from './SanitaryInspectionReportRu';
import SanitaryInspectionReportEn from './SanitaryInspectionReportEn';

const SanitaryInspectionReport: React.FC = () => {
  return (
    <View>
      <Tab sceneContainerStyle={{ backgroundColor: colors.transparent }}>
        <Tab.Item name="Ru" component={SanitaryInspectionReportRu} />
        <Tab.Item name="En" component={SanitaryInspectionReportEn} />
      </Tab>
    </View>
  );
};

export default SanitaryInspectionReport;
