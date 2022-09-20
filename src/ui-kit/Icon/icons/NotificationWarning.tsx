import * as React from 'react';
import Svg, { SvgProps, Circle, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const NotificationWarning = (props: SvgProps) => {
  return (
    <Svg width={150} height={149} fill="none" {...props}>
      <Circle opacity={0.07} cx={75} cy={74.5} r={51} fill="url(#prefix__paint0_linear)" />
      <Circle opacity={0.3} cx={74.999} cy={74.5} r={39.484} fill="url(#prefix__paint1_linear)" />
      <Circle cx={75} cy={74.5} fill="url(#prefix__paint2_linear)" r={28.79} />
      <Path
        d="M73.497 63h3.006c.696 0 1.246.594 1.193 1.29l-1.02 13.6A1.198 1.198 0 0175.48 79h-.963a1.198 1.198 0 01-1.194-1.11l-1.02-13.6A1.199 1.199 0 0173.496 63zM72.61 84.596v.008A2.393 2.393 0 0075 87c1.32 0 2.39-1.073 2.39-2.396v-.008A2.393 2.393 0 0075 82.2a2.393 2.393 0 00-2.39 2.396z"
        fill="#fff"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={28.038}
          y1={24.775}
          x2={70.15}
          y2={145.054}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#D74C4C" />
          <Stop offset={1} stopColor="#F25A3C" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint1_linear"
          x1={38.641}
          y1={36.003}
          x2={71.245}
          y2={129.123}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#D74C4C" />
          <Stop offset={1} stopColor="#F25A3C" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint2_linear"
          x1={48.489}
          y1={46.429}
          x2={72.263}
          y2={114.329}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#D74C4C" />
          <Stop offset={1} stopColor="#F25A3C" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default NotificationWarning;
