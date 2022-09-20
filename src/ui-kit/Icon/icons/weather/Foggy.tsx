import React, { FC } from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const Foggy: FC<SvgProps> = ({ color = '#D7E0E9', ...otherProps }) => {
  return (
    <Svg width={48} height={43} fill="none" {...otherProps}>
      <Path
        d="M9 35.499a1.5 1.5 0 011.5-1.5h27a1.5 1.5 0 110 3h-27a1.5 1.5 0 01-1.5-1.5zm0 6a1.5 1.5 0 011.5-1.5h27a1.5 1.5 0 110 3h-27a1.5 1.5 0 01-1.5-1.5zm31.215-28.42a15.003 15.003 0 00-28.497-3.011 10.5 10.5 0 10-1.218 20.93H39a9 9 0 001.215-17.918zM25.5 4a12 12 0 0111.928 10.665 1.5 1.5 0 001.5 1.335H39a6 6 0 110 12H10.5a7.499 7.499 0 111.815-14.778 1.5 1.5 0 001.788-.987A12.006 12.006 0 0125.5 3.999z"
        fill={color}
      />
    </Svg>
  );
};

export default Foggy;
