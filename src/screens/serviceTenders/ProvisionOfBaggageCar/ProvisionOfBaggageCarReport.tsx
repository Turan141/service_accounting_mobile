import React from 'react';
import Tab from '../../../ui-kit/Tab';
import colors from '../../../theme/colors';
import { View } from 'react-native';
import { useTendersStore } from '../../../store/hooks';
import ProvisionOfBaggageCarReportRu from './ProvisionOfBaggageCarReportRu';
import ProvisionOfBaggageCarReportEn from './ProvisionOfBaggageCarReportEn';

const ProvisionOfBaggageCarReport: React.FC = () => {
  const { currentTender } = useTendersStore();
  const { properties, items, status } = currentTender;

  return (
    <View>
      <Tab sceneContainerStyle={{ backgroundColor: colors.transparent }}>
        <Tab.Item name="Ru" component={ProvisionOfBaggageCarReportRu} />
        <Tab.Item name="En" component={ProvisionOfBaggageCarReportEn} />
      </Tab>
    </View>
  );
};

export default ProvisionOfBaggageCarReport;
