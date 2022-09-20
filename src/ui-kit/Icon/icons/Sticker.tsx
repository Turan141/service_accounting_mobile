import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';

const Sticker = (props: SvgProps) => {
  return (
    <Svg width={50} height={50} viewBox="0 0 50 50" fill="none" {...props}>
      <G clipPath="url(#prefix__clip0)">
        <Path
          d="M38.742 43.6L25.973 11.314a1.042 1.042 0 00-.846-.65L5.34 8.335a1.027 1.027 0 00-1.164.913L.009 42.575a1.041 1.041 0 00.923 1.17l36.451 4.166h.12c.538.003.99-.407 1.04-.943l.271-2.89a1.038 1.038 0 00-.072-.478z"
          fill="#FFA000"
        />
        <Path
          d="M45.834 9.248a1.041 1.041 0 00-1.155-.914l-.009.001-8.957 1.054L9.26 12.501a1.042 1.042 0 00-.919 1.14l3.125 33.327c.05.536.502.946 1.041.943h.119l36.452-4.166a1.042 1.042 0 00.914-1.166L45.835 9.248z"
          fill="#FFE082"
        />
        <Path
          d="M30.211 16.666a1.041 1.041 0 01-.737-1.778l5.207-5.208a1.042 1.042 0 111.473 1.473l-5.207 5.207c-.195.196-.46.306-.736.306z"
          fill="#455A64"
        />
        <Path d="M38.543 12.504a5.207 5.207 0 100-10.415 5.207 5.207 0 000 10.415z" fill="#F44336" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h50v50H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default Sticker;
