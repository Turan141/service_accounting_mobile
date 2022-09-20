import React, { FC } from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const Lock: FC<SvgProps> = ({ color = '#131D2D', ...otherProps }) => {
  return (
    <Svg width={24} height={24} fill="none" {...otherProps}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5 8a4.5 4.5 0 019 0v2h.5a3 3 0 013 3v5a3 3 0 01-3 3H7a3 3 0 01-3-3v-5a3 3 0 013-3h.5V8zm8 0v2h-7V8a3.5 3.5 0 117 0zM7 11h10a2 2 0 012 2v5a2 2 0 01-2 2H7a2 2 0 01-2-2v-5a2 2 0 012-2zm5.5 3.5a.5.5 0 00-1 0v2a.5.5 0 001 0v-2z"
        fill={color}
      />
    </Svg>
  );
};

export default Lock;
