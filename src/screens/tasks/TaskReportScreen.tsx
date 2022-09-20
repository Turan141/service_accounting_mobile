import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { TaskReportScreenProps } from '../../navigation/props';
import { colors } from '../../theme';

import Tab from '../../ui-kit/Tab';
import { ReportRuTab } from './components';

const TaskReportScreen: FC<TaskReportScreenProps> = () => {
  return (
    <Tab sceneContainerStyle={{ backgroundColor: colors.transparent }}>
      <Tab.Item
        name="Ru"
        component={ReportRuTab}
        options={{
          tabBarLabel: 'Ru',
        }}
      />

      <Tab.Item
        name="En"
        component={ReportRuTab}
        options={{
          tabBarLabel: 'En',
        }}
      />
    </Tab>
  );
};

export default TaskReportScreen;

const styles = StyleSheet.create({});
