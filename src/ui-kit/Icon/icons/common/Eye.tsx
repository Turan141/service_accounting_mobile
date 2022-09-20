import React, { FC } from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const Eye: FC<SvgProps> = ({ color = '#9CB1C7', ...otherProps }) => {
  return (
    <Svg width={18} height={14} fill="none" {...otherProps}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.285.513a7.443 7.443 0 015.43 0c2.47.967 4.506 2.8 5.734 5.162l.43.826c.162.313.162.685 0 .998l-.43.826a10.979 10.979 0 01-5.734 5.162 7.443 7.443 0 01-5.43 0A10.979 10.979 0 01.55 8.325l-.43-.826a1.082 1.082 0 010-.998l.43-.826A10.978 10.978 0 016.285.513zM9 10.219A3.21 3.21 0 0012.2 7 3.21 3.21 0 009 3.78 3.21 3.21 0 005.8 7 3.21 3.21 0 009 10.22z"
        fill={color}
      />
    </Svg>
  );
};

export default Eye;
