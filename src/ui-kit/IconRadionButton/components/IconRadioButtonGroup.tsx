import React, { FC, ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { layout } from '../../../theme';

import { RadioButton as RNPRadionButton } from 'react-native-paper';
import { IconRadioButtonProps } from '..';

export interface IconRadioButtonGroupProps {
  value: string;
  children: ReactElement<IconRadioButtonProps>[];
  inARowCount?: number;
  onChange: (value: string) => void;
}

const RadioButtonGroup: FC<IconRadioButtonGroupProps> = ({ value, children, inARowCount = 3, onChange }) => {
  return (
    <RNPRadionButton.Group value={value} onValueChange={onChange}>
      <View style={styles.container}>
        {children.map((el, idx) => (
          <View
            key={`icon-radion-button-${idx}`}
            style={{
              flexBasis: `${100 / inARowCount}%`,
            }}
          >
            {React.cloneElement(el, {
              active: value === el.props.value,
              onPress: () => onChange(el.props.value),
            })}
          </View>
        ))}
      </View>
    </RNPRadionButton.Group>
  );
};

export default RadioButtonGroup;

const styles = StyleSheet.create({
  container: {
    ...layout.rowAlignItemsCenter,
    flexWrap: 'wrap',
  },
});
