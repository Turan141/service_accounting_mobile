import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { colors, layout } from '../../../theme';

export interface AddMoreButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

const AddMoreButton: FC<AddMoreButtonProps> = ({ onPress, disabled = false }) => {
  return (
    <View style={styles.container}>
      <IconButton
        disabled={disabled}
        icon="plus"
        size={45}
        onPress={onPress}
        style={styles.button}
        color={colors.white}
      />
    </View>
  );
};

export default AddMoreButton;

const styles = StyleSheet.create({
  container: {
    ...layout.alignCenter,
    marginVertical: 10,
  },
  button: {
    backgroundColor: colors.gray.secondary,
    padding: 0,
    margin: 0,
    width: 45,
    height: 45,
  },
});
