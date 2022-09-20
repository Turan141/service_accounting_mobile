import React, { FC } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { MaintenanceItem } from './components';

const MaintenanceItems: FC<ViewProps> & {
  Item: typeof MaintenanceItem;
} = ({ children, ...otherProps }) => {
  return <View {...otherProps}>{children}</View>;
};

MaintenanceItems.Item = MaintenanceItem;

export default MaintenanceItems;

const styles = StyleSheet.create({});
