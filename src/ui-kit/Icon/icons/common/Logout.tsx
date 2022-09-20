import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const Logout = props => (
  <Svg width={25} height={25} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      d="M10.418 5.75a.5.5 0 0 0 0-1h-2a2.5 2.5 0 0 0-2.5 2.5v9a2.5 2.5 0 0 0 2.5 2.5h2a.5.5 0 0 0 0-1h-2a1.5 1.5 0 0 1-1.5-1.5v-9a1.5 1.5 0 0 1 1.5-1.5h2Z"
      fill="#8C86AF"
      stroke="#8C86AF"
    />
    <Path
      d="M10.418 11.75a.5.5 0 0 1 .5-.5h6.793l-2.147-2.146a.5.5 0 0 1 .707-.708l3 3a.499.499 0 0 1 .147.351v.006a.498.498 0 0 1-.146.35l-3 3a.5.5 0 0 1-.708-.707l2.147-2.146h-6.793a.5.5 0 0 1-.5-.5Z"
      fill="#8C86AF"
      stroke="#8C86AF"
    />
  </Svg>
);

export default Logout;
