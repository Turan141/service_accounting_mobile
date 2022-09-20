import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const Camera = (props: SvgProps) => {
  return (
    <Svg width={50} height={50} viewBox="0 0 50 50" fill="none" {...props}>
      <Path d="M6.332 7.666s0-1.333 1.333-1.333h8S17 6.333 17 7.666v2.667H6.332V7.666z" fill="#C1BCDD" />
      <Path
        d="M1 14.333S1 9 6.333 9h37.334S49 9 49 14.333v24s0 5.334-5.333 5.334H6.333S1 43.667 1 38.333v-24z"
        fill="#8C86AF"
      />
      <Path
        d="M28.999 37c5.89 0 10.666-4.775 10.666-10.666S34.89 15.667 29 15.667s-10.667 4.776-10.667 10.667c0 5.89 4.776 10.666 10.667 10.666z"
        fill="#272636"
      />
      <Path
        d="M28.999 37c5.89 0 10.666-4.775 10.666-10.666S34.89 15.667 29 15.667s-10.667 4.776-10.667 10.667c0 5.89 4.776 10.666 10.667 10.666z"
        fill="#fff"
        fillOpacity={0.05}
      />
      <Path d="M28.999 33a6.667 6.667 0 100-13.333 6.667 6.667 0 000 13.333z" fill="#98BCF0" />
      <Path d="M44.332 15.667a2 2 0 100-4 2 2 0 000 4z" fill="#fff" />
      <Path d="M16.999 13.667a2 2 0 01-2 2H8.332a2 2 0 110-4h6.667a2 2 0 012 2z" fill="#F5F8FA" />
    </Svg>
  );
};

export default Camera;
