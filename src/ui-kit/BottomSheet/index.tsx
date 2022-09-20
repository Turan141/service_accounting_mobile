import React, { FC, MutableRefObject, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import RNBottomSheet, { BottomSheetScrollView, BottomSheetProps as RNBottomSheetProps } from '@gorhom/bottom-sheet';
import BottomSheetHandler from './components/BottomSheetHandler';
import BottomSheetHeader from './components/BottomSheetHeader';
import BottomSheetBackdrop from './components/BottomSheetBackdrop';
import { colors } from '../../theme';

export interface BottomSheetRefProps {
  open: () => void;
  close: () => void;
}

export interface BottomSheetProps extends Omit<RNBottomSheetProps, 'snapPoints'> {
  innerRef: MutableRefObject<BottomSheetRefProps | undefined>;
  title: string;
  bodyStyle?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  onClose?: () => void;
  onOpen?: () => void;
}

export interface BottomSheetRef {
  open: () => void;
  close: () => void;
}

const BottomSheet: FC<BottomSheetProps> = ({
  children,
  innerRef,
  title,
  bodyStyle,
  headerStyle,
  onClose = () => {},
  onOpen = () => {},
  ...otherProps
}) => {
  const bottomSheetRef = useRef<RNBottomSheet>(null);
  const snapPoints = useMemo(() => ['0%', '50%', '90%'], []);

  const handleOpen = useCallback(() => {
    bottomSheetRef?.current?.expand();
    onOpen();
  }, []);

  const handleClose = useCallback(() => {
    bottomSheetRef?.current?.close();
    onClose();
  }, []);

  const renderHandler = useCallback(() => <BottomSheetHandler />, []);

  useImperativeHandle(innerRef, () => ({
    close: handleClose,
    open: handleOpen,
  }));

  return (
    <RNBottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      style={styles.bottomSheet}
      handleComponent={renderHandler}
      backdropComponent={({ animatedIndex, animatedPosition, style }) => (
        <BottomSheetBackdrop animatedPosition={animatedPosition} animatedIndex={animatedIndex} style={style} />
      )}
      {...otherProps}
    >
      <BottomSheetHeader title={title} onClosePress={handleClose} style={headerStyle} />

      <BottomSheetScrollView contentContainerStyle={[styles.body, bodyStyle]}>{children}</BottomSheetScrollView>
    </RNBottomSheet>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    backgroundColor: colors.white,
  },
  bottomSheet: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
