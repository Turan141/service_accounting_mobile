import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const User: React.FC<SvgProps> = ({ color = '#131D2D', ...otherProps }) => {
  return (
    <Svg width={16} height={18} fill="none" {...otherProps}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.395 9.39a5 5 0 10-4.79 0A7.503 7.503 0 00.5 16.5v1a.5.5 0 001 0v-1a6.5 6.5 0 1113 0v1a.5.5 0 001 0v-1a7.503 7.503 0 00-5.105-7.11zM12 5a4 4 0 11-8 0 4 4 0 018 0z"
        fill={color}
      />
    </Svg>
  );
};

export default User;
