import { FormikErrors } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
import { colors, fonts } from '../../../../theme';

export enum HelperStatusesEnum {
  Error = 'error',
  Default = 'default',
  Success = 'success',
}

export interface HelperProps {
  status?: string;
  statusText?: string | FormikErrors<any> | string[] | FormikErrors<any>[];
  disabled?: boolean;
  style?: StyleProp<TextStyle>;
  baseColor?: string;
  errorColor?: string;
}

const Helper: FC<HelperProps> = ({
  status,
  statusText,
  disabled,
  style,
  baseColor = colors.gray.primary,
  errorColor = colors.red.primary,
}) => {
  const [errored, setErrored] = useState(status === HelperStatusesEnum.Error);

  useEffect(() => {
    if (status === HelperStatusesEnum.Error) {
      setErrored(true);
    } else {
      setErrored(false);
    }
  }, [status]);

  let textStyle = {
    color: !disabled && errored ? errorColor : baseColor,
  };

  if (!statusText) return null;

  return (
    <View style={styles.container}>
      <Text style={[styles.text, style, textStyle]}>{statusText}</Text>
    </View>
  );
};

export default Helper;

const styles = StyleSheet.create({
  container: {
    flexBasis: 8,
    flexGrow: 8,
  },
  text: {
    ...fonts.extraSmallMedium,
    lineHeight: 12,
    textAlign: 'left',
  },
});
