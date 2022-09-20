import React, { FC, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  LayoutAnimation,
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  UIManager,
  View,
} from 'react-native';
import { colors, fonts, layout } from '../../theme';

export interface SwitchProps {
  label?: string;
  value: boolean;
  color?: string;
  inactiveColor?: string;
  labelStyle?: StyleProp<TextStyle>;
  loading?: boolean;
  onChange: (value: any) => void;
  disabled?: boolean;
}

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Switch: FC<SwitchProps> = ({
  label,
  value,
  color = colors.green.primary,
  inactiveColor = colors.gray.secondary,
  labelStyle,
  loading,
  onChange,
  disabled,
}) => {
  const [state, setState] = useState(value || false);

  useEffect(() => {
    setState(value);
  }, [value]);

  const handlePress = (): void => {
    if (!disabled) {
      setState(prevValue => !prevValue);

      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring, () => {
        onChange(!state);
      });
    }
  };

  return (
    <View style={layout.rowSpaceBetween}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      <Pressable
        onPress={handlePress}
        style={{
          ...styles.container,
          backgroundColor: state ? color : inactiveColor,
          alignItems: state ? 'flex-end' : 'flex-start',
        }}
      >
        <View style={styles.stateTextContainer}>
          <Text
            style={{
              ...styles.stateText,
              left: state ? 12 : null,
              right: !state ? 12 : null,
            }}
          >
            {state ? 'ON' : 'OFF'}
          </Text>
        </View>

        <View style={styles.indicator}>
          {loading && <ActivityIndicator size="small" color={state ? color : inactiveColor} />}
        </View>
      </Pressable>
    </View>
  );
};

export default Switch;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 80,
    height: 36,
    borderRadius: 50,
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  label: {
    ...fonts.paragraphRegular,
    flexShrink: 1,
  },
  indicator: {
    ...layout.rowAlignCenter,
    width: 28,
    height: 28,
    backgroundColor: colors.white,
    borderRadius: 100,
    elevation: 3,
  },
  stateTextContainer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 50,
  },
  stateText: {
    ...fonts.paragraphBold,
    color: colors.white,
    position: 'absolute',
    top: 8,
  },
});
