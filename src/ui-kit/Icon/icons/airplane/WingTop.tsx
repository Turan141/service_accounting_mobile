import React, { FC } from 'react';
import Svg, { Path, Ellipse, Circle } from 'react-native-svg';
import { AirplaneIconProps } from './types';

const WingTop: FC<AirplaneIconProps> = ({ highlightedColor = '#EE5B74', color = '#D7E0E9', ...otherProps }) => {
  return (
    <Svg width={188} height={66} fill="none" {...otherProps}>
      <Circle cx={62} cy={56} r={7} fill={color} />
      <Circle cx={126} cy={56} r={7} fill={color} />
      <Path d="M93 0l-3 32h8L95 0h-2zM59 36l25.5 2-3 5.5-22-6L59 36zM129.5 36L104 38l3 5.5 22-6 .5-1.5z" fill={color} />
      <Path d="M187.5 40.5L104 47v8l83-13 .5-1.5zM0 40.5L83.5 47v8L.5 42 0 40.5z" fill={highlightedColor} />
      <Ellipse cx={94} cy={47.5} rx={14} ry={18.5} fill={color} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 22a1 1 0 011 1v11.585l4.292-4.294a1 1 0 111.416 1.416l-6 6a.998.998 0 01-1.415 0l-6-6a1 1 0 111.416-1.416l4.292 4.294V23a1 1 0 011-1zM164 22a1.001 1.001 0 011 1v11.585l4.292-4.294a.996.996 0 011.091-.217 1.007 1.007 0 01.542.542 1.006 1.006 0 01-.217 1.09l-6 6A.991.991 0 01164 38a1.001 1.001 0 01-.707-.294l-6-6A1.01 1.01 0 01157 31a1.006 1.006 0 01.293-.708 1.003 1.003 0 011.416 0l4.292 4.294V23a1.001 1.001 0 01.999-1z"
        fill={color}
      />
    </Svg>
  );
};

export default WingTop;
