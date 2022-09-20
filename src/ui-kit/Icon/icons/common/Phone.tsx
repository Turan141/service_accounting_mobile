import React, { FC } from 'react';
import Svg, { SvgProps, Path, Rect } from 'react-native-svg';

const Phone: FC<SvgProps> = ({ color = '#131D2D', ...otherProps }) => {
  return (
    <Svg width={24} height={24} fill="none" {...otherProps}>
      <Path
        d="M17.5 7h.5a.5.5 0 00-.5-.5V7zm-9-.5a.5.5 0 000 1v-1zm8.5-1a.5.5 0 001 0h-1zM8.5 4h7V3h-7v1zm7 16h-7v1h7v-1zM7 18.5v-13H6v13h1zM17 7v11.5h1V7h-1zm.5-.5h-9v1h9v-1zM8.5 20A1.5 1.5 0 017 18.5H6A2.5 2.5 0 008.5 21v-1zm7 1a2.5 2.5 0 002.5-2.5h-1a1.5 1.5 0 01-1.5 1.5v1zm0-17A1.5 1.5 0 0117 5.5h1A2.5 2.5 0 0015.5 3v1zm-7-1A2.5 2.5 0 006 5.5h1A1.5 1.5 0 018.5 4V3z"
        fill={color}
      />
      <Rect x={11} y={18} width={2} height={1} rx={0.5} fill={color} />
    </Svg>
  );
};

export default Phone;
