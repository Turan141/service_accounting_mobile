import React, { FC } from 'react';
import Svg, { Path, Ellipse, Circle } from 'react-native-svg';
import { AirplaneIconProps } from './types';

const Fuselage: FC<AirplaneIconProps> = ({ highlightedColor = '#EE5B74', color = '#D7E0E9', ...otherProps }) => {
  return (
    <Svg width={188} height={81} fill="none" {...otherProps}>
      <Circle cx={62} cy={56} r={7} fill={color} />
      <Circle cx={126} cy={56} r={7} fill={color} />
      <Path
        d="M59 36l25.5 2-3 5.5-22-6L59 36zM129.5 36L104 38l3 5.5 22-6 .5-1.5zM93 0l-3 32h8L95 0h-2zM187.5 40.5L104 47v8l83-13 .5-1.5zM0 40.5L83.5 47v8L.5 42 0 40.5z"
        fill={color}
      />
      <Ellipse cx={94} cy={47.5} rx={14} ry={18.5} fill={highlightedColor} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M66.946 74.898a1 1 0 010-1.414l8.192-8.192-6.07.001a1 1 0 110-2.002h8.484a.999.999 0 011 1.001v8.484a1.001 1.001 0 01-2.002 0l.002-6.07-8.192 8.192a1 1 0 01-1.414 0zM121.898 19.954a.998.998 0 010 1.414l-8.192 8.192 6.071-.002a.999.999 0 011.001 1.001 1.006 1.006 0 01-.293.708.996.996 0 01-.708.294h-8.484a1.005 1.005 0 01-.926-.618 1.008 1.008 0 01-.076-.384v-8.484a.995.995 0 01.618-.925 1.006 1.006 0 011.092.217 1.007 1.007 0 01.293.708l-.002 6.07 8.192-8.191a1 1 0 011.414 0z"
        fill={color}
      />
    </Svg>
  );
};

export default Fuselage;
