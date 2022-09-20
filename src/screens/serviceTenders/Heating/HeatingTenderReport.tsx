import React, { useMemo } from 'react';
import Tab from '../../../ui-kit/Tab';
import colors from '../../../theme/colors';
import { View } from 'react-native';

import HeatingTenderReportRu from './HeatingTenderReportRu';
import HeatingTenderReportEn from './HeatingTenderReportEn';

const HeatingTenderReport: React.FC = () => {
  return (
    <View>
      <Tab sceneContainerStyle={{ backgroundColor: colors.transparent }}>
        <Tab.Item name="Ru" component={HeatingTenderReportRu} />
        <Tab.Item name="En" component={HeatingTenderReportEn} />
      </Tab>
    </View>
  );
};

export default HeatingTenderReport;
