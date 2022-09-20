import React from 'react';
import Tab from '../../../ui-kit/Tab';
import colors from '../../../theme/colors';
import { View } from 'react-native';
import TieDownStrapsAndNetsRentReportRu from './TieDownStrapsAndNetsRentReportRu';
import TieDownStrapsAndNetsRentReportEn from './TieDownStrapsAndNetsRentReportEn';

const TieDownStrapsAndNetsRentReport: React.FC = () => {
  return (
    <View>
      <Tab sceneContainerStyle={{ backgroundColor: colors.transparent }}>
        <Tab.Item name="Ru" component={TieDownStrapsAndNetsRentReportRu} />
        <Tab.Item name="En" component={TieDownStrapsAndNetsRentReportEn} />
      </Tab>
    </View>
  );
};

export default TieDownStrapsAndNetsRentReport;
