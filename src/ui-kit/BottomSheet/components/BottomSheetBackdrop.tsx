import React, { FC, useMemo } from 'react';

import { BottomSheetBackgroundProps } from '@gorhom/bottom-sheet';
import Animated, { interpolateColors } from 'react-native-reanimated';
import { colors } from '../../../theme';

const BottomSheetBackdrop: FC<BottomSheetBackgroundProps> = ({ animatedIndex, style }) => {
  // animated variables
  const animatedBackground = useMemo(
    () =>
      interpolateColors(animatedIndex, {
        inputRange: [0, 1],
        outputColorRange: [colors.transparent, colors.blue.primary],
      }),
    [animatedIndex]
  );

  const containerStyle = useMemo(() => {
    return {
      ...(style as object),
      backgroundColor: animatedBackground,
    };
  }, [style, animatedBackground]);

  return <Animated.View pointerEvents="none" style={containerStyle as object} />;
};

export default BottomSheetBackdrop;
