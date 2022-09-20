import React, { FC } from 'react';
import Svg, { Path, Circle, Ellipse } from 'react-native-svg';
import { AirplaneIconProps } from './types';

const StabilizerBottom: FC<AirplaneIconProps> = ({
  highlightedColor = '#EE5B74',
  color = '#D7E0E9',
  ...otherProps
}) => {
  return (
    <Svg width={188} height={75} fill="none" {...otherProps}>
      <Path d="M93 0l-3 32h8L95 0h-2z" fill={color} />
      <Circle cx={62} cy={56} r={7} fill={color} />
      <Circle cx={126} cy={56} r={7} fill={color} />
      <Path d="M59 36l25.5 2-3 5.5-22-6L59 36zM129.5 36L104 38l3 5.5 22-6 .5-1.5z" fill={highlightedColor} />
      <Path d="M187.5 40.5L104 47v8l83-13 .5-1.5zM0 40.5L83.5 47v8L.5 42 0 40.5z" fill={color} />
      <Ellipse cx={94} cy={47.5} rx={14} ry={18.5} fill={color} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M74 75a1 1 0 001-1V62.415l4.292 4.294a1 1 0 101.416-1.416l-6-6a.998.998 0 00-1.415 0l-6 6a1 1 0 101.416 1.416l4.292-4.294V74a1 1 0 001 1zM114 75a1.001 1.001 0 001-1V62.415l4.292 4.294a.996.996 0 001.091.217 1.007 1.007 0 00.542-.542 1.006 1.006 0 00-.217-1.09l-6-6A.991.991 0 00114 59a1.001 1.001 0 00-.707.294l-6 6A1.01 1.01 0 00107 66a1.006 1.006 0 00.293.708 1.003 1.003 0 001.416 0l4.292-4.294V74a1.001 1.001 0 00.999 1z"
        fill={color}
      />
    </Svg>
  );
};

export default StabilizerBottom;
