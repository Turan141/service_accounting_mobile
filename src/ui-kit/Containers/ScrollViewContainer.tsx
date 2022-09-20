import React, { FC } from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';

export interface ScrollViewContainerProps extends ScrollViewProps {
  noPadding?: boolean;
}

const ScrollViewContainer: FC<ScrollViewContainerProps> = ({
  noPadding,
  children,
  contentContainerStyle,
  ...otherProps
}) => {
  return (
    <ScrollView
      contentContainerStyle={{
        padding: !noPadding ? 20 : 0,
        minHeight: '100%',
        ...(contentContainerStyle as object),
      }}
      showsVerticalScrollIndicator={false}
      {...otherProps}
    >
      {children}
    </ScrollView>
  );
};

export default ScrollViewContainer;
