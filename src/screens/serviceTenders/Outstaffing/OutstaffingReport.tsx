import React from 'react';
import Tab from '../../../ui-kit/Tab';
import colors from '../../../theme/colors';
import { View } from 'react-native';
import { useTendersStore } from '../../../store/hooks';
import OutstaffingReportEn from './OutstaffingReportEn';
import OutstaffingReportRu from './OutstaffingReportRu';

const OutstaffingReport: React.FC = () => {
  const { currentTender } = useTendersStore();
  const { properties, items, status } = currentTender;

  return (
    <View>
      <Tab sceneContainerStyle={{ backgroundColor: colors.transparent }}>
        <Tab.Item name="Ru" component={OutstaffingReportRu} />
        <Tab.Item name="En" component={OutstaffingReportEn} />
      </Tab>
    </View>
  );
};

export default OutstaffingReport;
