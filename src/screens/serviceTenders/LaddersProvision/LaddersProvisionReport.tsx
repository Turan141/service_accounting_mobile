import React from 'react';
import Tab from '../../../ui-kit/Tab';
import colors from '../../../theme/colors';
import { View } from 'react-native';
import { useTendersStore } from '../../../store/hooks';
import LaddersProvisionReportRu from './LaddersProvisionReportRu';
import LaddersProvisionReportEn from './LaddersProvisionReportEn';

const LaddersProvisionReport: React.FC = () => {
  const { currentTender } = useTendersStore();
  const { properties, items, status } = currentTender;

  return (
    <View>
      <Tab sceneContainerStyle={{ backgroundColor: colors.transparent }}>
        <Tab.Item name="Ru" component={LaddersProvisionReportRu} />
        <Tab.Item name="En" component={LaddersProvisionReportEn} />
      </Tab>
    </View>
  );
};

export default LaddersProvisionReport;
