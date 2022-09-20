import React from 'react';
import Tab from '../../../ui-kit/Tab';
import colors from '../../../theme/colors';
import { View } from 'react-native';
import AnyServiceReportRu from './AnyServiceReportRu';
import AnyServiceReportEn from './AnyServiceReportEn';

const AnyServiceReport: React.FC = () => {
  return (
    <View>
      <Tab sceneContainerStyle={{ backgroundColor: colors.transparent }}>
        <Tab.Item name="Ru" component={AnyServiceReportRu} />
        <Tab.Item name="En" component={AnyServiceReportEn} />
      </Tab>
    </View>
  );
};

export default AnyServiceReport;
