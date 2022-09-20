import React, { FC, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import { SketchCanvas } from '@itsmistad/react-native-sketch-canvas';
import { colors } from '../../theme';

export interface DrawingPanelProps {
  onDrawEnd: (base64Img: string) => void;
}

const DrawingPanel: FC<DrawingPanelProps> = ({ onDrawEnd }) => {
  const ref = useRef(null);

  const handleEnd = () => {
    ref.current.getBase64('png', false, false, false, false, (error: any, base64Img: string) => {
      onDrawEnd(!error ? base64Img : '');
    });
  };

  return (
    <View style={styles.container}>
      <SketchCanvas style={{ flex: 1 }} strokeColor={colors.black} strokeWidth={2} onStrokeEnd={handleEnd} ref={ref} />
    </View>
  );
};

export default DrawingPanel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
