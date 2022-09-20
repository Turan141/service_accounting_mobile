import React, { useRef, useEffect, FC } from 'react';
import { Text, Animated, TextProps } from 'react-native';
import { colors, fonts } from '../../../../theme';

export interface LabelProps extends TextProps {
  children: string;
  labelActiveColor?: string;
  labelActiveScale?: number;
  labelActiveTop?: number;
  labelColor?: string;
  labelDuration?: number;
  activeColor?: string;
  error?: boolean;
  errorColor?: string;
  focused?: boolean;
  hasValue?: boolean;
  paddingTop?: number;
}

const Label: FC<LabelProps> = ({
  children,
  labelActiveColor,
  labelActiveScale = 0.8,
  labelActiveTop = -10,
  labelColor = colors.gray.primary,
  labelDuration = 100,
  activeColor,
  error,
  errorColor = colors.red.primary,
  focused,
  hasValue,
  paddingTop,
  style,
  ...otherProps
}) => {
  const isFocused = hasValue || focused;
  const animatedScale = useRef(new Animated.Value(isFocused ? labelActiveScale : 1));
  const animatedTranslate = useRef(new Animated.Value(isFocused ? labelActiveTop : 0));

  useEffect(() => {
    const isActive = hasValue || focused;

    animate(animatedScale.current, isActive ? labelActiveScale : 1);
    animate(animatedTranslate.current, isActive ? labelActiveTop : 0);
  });

  const animate = (value: Animated.Value, toValueConfig: number) => {
    Animated.timing(value, {
      duration: labelDuration,
      toValue: toValueConfig,
      useNativeDriver: true,
    }).start();
  };

  const getColor = () => {
    let color = labelColor;

    if (error) {
      color = errorColor;
    }

    return color;
  };

  return (
    <Animated.View
      style={{
        marginLeft: '-100%',
        position: 'absolute',
        top: paddingTop,
        transform: [{ translateY: animatedTranslate.current }, { scale: animatedScale.current }],
        width: '200%',
      }}
    >
      <Text
        style={{
          ...fonts.paragraphSemibold,
          ...(style as object),
          top: 0,
          left: '50%',
          paddingTop,
          paddingLeft: 1,
          color: getColor(),
        }}
        {...otherProps}
      >
        {children}
      </Text>
    </Animated.View>
  );
};

export default Label;
