import React, { useMemo } from 'react';
import Tab from '../../../ui-kit/Tab';
import colors from '../../../theme/colors';
import ToiletTenderReportRu from './ToiletTenderReportRu';
import { View } from 'react-native';
import ToiletTenderReportEn from './ToiletTenderReportEn';
import { DocumentItemNamesEnum } from '../../../store/data/documents';
import { format } from 'date-fns';

import { useTendersStore } from '../../../store/hooks';

const ToiletTenderReport: React.FC = () => {
  const { currentTender, finishTender } = useTendersStore();
  const { properties, items, status } = currentTender;

  return (
    <View>
      <Tab sceneContainerStyle={{ backgroundColor: colors.transparent }}>
        <Tab.Item name="Ru" component={ToiletTenderReportRu} />
        <Tab.Item name="En" component={ToiletTenderReportEn} />
      </Tab>
    </View>
  );
};

export default ToiletTenderReport;
