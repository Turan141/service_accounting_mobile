import React, { FC } from 'react';

import { RadioButton as RNPRadionButton } from 'react-native-paper';

export interface RadioButtonGroupProps {
  value: string;
  children: React.ReactNode;
  onChange: (value: string) => void;
}

const RadioButtonGroup: FC<RadioButtonGroupProps> = ({ value, children, onChange }) => {
  return (
    <RNPRadionButton.Group value={value} onValueChange={onChange}>
      {children}
    </RNPRadionButton.Group>
  );
};

export default RadioButtonGroup;
