import React from 'react';
import { SvgProps } from 'react-native-svg';

import * as icons from './icons';
import Icons from './types';

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export interface CustomIconProps extends SvgProps {
  name: keyof Icons;
  highlightedColor?: string;
}

export default ({ name, ...otherProps }: CustomIconProps) => {
  const CustomIcon = icons[name];

  if (!icons[name]) return <MaterialIcon name="help" />;

  return <CustomIcon {...otherProps} />;
};
