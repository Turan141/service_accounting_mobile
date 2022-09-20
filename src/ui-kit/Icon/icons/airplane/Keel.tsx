import React, { FC } from 'react';
import Svg, { Path, Ellipse, Circle } from 'react-native-svg';
import { AirplaneIconProps } from './types';

const Keel: FC<AirplaneIconProps> = ({ highlightedColor = '#EE5B74', color = '#D7E0E9', ...otherProps }) => {
  return (
    <Svg width={188} height={66} fill="none" {...otherProps}>
      <Circle cx={62} cy={56} r={7} fill={color} />
      <Circle cx={126} cy={56} r={7} fill={color} />
      <Path d="M93 0l-3 32h8L95 0h-2z" fill={highlightedColor} />
      <Path
        d="M59 36l25.5 2-3 5.5-22-6L59 36zM129.5 36L104 38l3 5.5 22-6 .5-1.5zM187.5 40.5L104 47v8l83-13 .5-1.5zM0 40.5L83.5 47v8L.5 42 0 40.5z"
        fill={color}
      />
      <Ellipse cx={94} cy={47.5} rx={14} ry={18.5} fill={color} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M70 16a1 1 0 011-1h11.585l-4.294-4.292a1 1 0 111.416-1.416l6 6a.998.998 0 010 1.415l-6 6a1 1 0 11-1.416-1.416l4.294-4.292H71a1 1 0 01-1-1zM118 16a.998.998 0 01-1 1h-11.585l4.294 4.292a.996.996 0 01.217 1.09.995.995 0 01-.542.543 1 1 0 01-1.091-.217l-5.999-6a1.007 1.007 0 01-.218-1.091c.051-.121.125-.232.218-.324l5.999-6a.997.997 0 011.091-.217.997.997 0 01.618.925 1.007 1.007 0 01-.293.708l-4.294 4.292H117a.999.999 0 011 1z"
        fill={color}
      />
    </Svg>
  );
};

export default Keel;
