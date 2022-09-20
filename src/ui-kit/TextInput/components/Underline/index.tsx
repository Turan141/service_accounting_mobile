import React, { useRef, useEffect, FC } from 'react';
import { View, Animated, ViewProps } from 'react-native';
import { colors } from '../../../../theme';

const DURATION_DEFAULT = 0;
const OPACITY_ACTIVE = 1;
const OPACITY_DEFAULT = 0;
const SCALE_ACTIVE = 1;
const SCALE_DEFAULT = 0.01;

export interface UnderlineProps extends ViewProps {
  underlineActiveColor?: string;
  underlineColor?: string;
  underlineDuration?: number;
  underlineHeight?: number;
  activeColor?: string;
  error?: boolean;
  errorColor?: string;
  focused?: boolean;
}

const Underline: FC<UnderlineProps> = ({
  underlineActiveColor = colors.blue.primary,
  underlineColor = colors.gray.primary,
  underlineDuration = 50,
  underlineHeight = 1,
  activeColor,
  error,
  errorColor = colors.red.primary,
  focused,
  ...otherProps
}) => {
  const animatedOpacity = useRef(new Animated.Value(error ? OPACITY_ACTIVE : OPACITY_DEFAULT));
  const animatedScaleX = useRef(new Animated.Value(error ? SCALE_ACTIVE : SCALE_DEFAULT));

  useEffect(() => {
    if (focused || error) animateActive();
    else animateDefault();
  });

  const getColor = () => {
    if (error) return errorColor;

    return underlineActiveColor || activeColor;
  };

  const animateActive = () => {
    Animated.parallel([
      Animated.timing(animatedOpacity.current, {
        duration: DURATION_DEFAULT,
        toValue: OPACITY_ACTIVE,
        useNativeDriver: true,
      }),

      Animated.timing(animatedScaleX.current, {
        duration: underlineDuration,
        toValue: SCALE_ACTIVE,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateDefault = () => {
    Animated.sequence([
      Animated.timing(animatedScaleX.current, {
        duration: underlineDuration,
        toValue: SCALE_DEFAULT,
        useNativeDriver: true,
      }),

      Animated.timing(animatedOpacity.current, {
        duration: DURATION_DEFAULT,
        toValue: OPACITY_DEFAULT,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View
      style={{
        borderColor: underlineColor,
        borderTopWidth: underlineHeight,
      }}
      {...otherProps}
    >
      <Animated.View
        style={{
          borderColor: getColor(),
          borderTopWidth: underlineHeight,
          marginTop: -underlineHeight,
          opacity: animatedOpacity.current,
          transform: [{ scaleX: animatedScaleX.current }],
        }}
      />
    </View>
  );
};

export default Underline;
