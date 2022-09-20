import React, { FC, useRef, useState, ReactNode } from 'react';
import {
  View,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  StyleProp,
  TextStyle,
  Platform,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { colors, fonts, layout } from '../../theme';

import { Counter, Helper, Label } from './components';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import TextInputMask from 'react-native-text-input-mask';

import { FormikErrors } from 'formik';

export type MaterialTextInputStatusType = 'success' | 'error' | 'default';

interface TextInputProps extends RNTextInputProps {
  loading?: boolean;
  label: string;
  accessibilityLabel?: string;
  fontSize?: number;
  height?: number;
  paddingTop?: number;
  style?: StyleProp<TextStyle>;
  status?: MaterialTextInputStatusType;
  statusText?: string | FormikErrors<any> | string[] | FormikErrors<any>[];
  characterLimit?: number;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  password?: boolean;
  mask?: string;
  borderless?: boolean;
  editable?: boolean;

  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onChangeText?: (value: string) => void;
  onContentSizeChange?: (event: any) => void;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onPress?: (event: any) => void;
}

const LINE_HEIGHT = 1.5;

const TextInput: FC<TextInputProps> = ({
  loading,
  label,
  accessible = true,
  accessibilityLabel,
  fontSize = 16,
  paddingTop = 2,
  style,
  value,
  defaultValue,
  status,
  statusText,
  characterLimit = 0,
  leftIcon,
  rightIcon,
  password = false,
  mask = null,
  borderless = false,
  editable = true,

  onBlur = () => {},
  onChangeText = () => {},
  onContentSizeChange = () => {},
  onFocus = () => {},
  onPress = () => {},
  ...otherProps
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);
  const [height, setHeight] = useState(fontSize * LINE_HEIGHT);
  const [inputValue, setInputValue] = useState(value !== null ? value : defaultValue);
  const inputRef = useRef(null);

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocused(true);
    onFocus(e);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocused(false);
    onBlur(e);
  };

  const setValue = (value: string) => {
    setInputValue(value);
    onChangeText(value);
  };

  const handleContentSizeChange = (event: any) => {
    const { height } = event.nativeEvent.contentSize;

    setHeight(Math.max(fontSize * LINE_HEIGHT, Math.ceil(height)));

    onContentSizeChange(event);
  };

  const hasValueWithContent = (value: string) => value && value.length > 0;

  const renderRightIcon = () => {
    if (loading) {
      return <ActivityIndicator size="small" color={colors.gray.primary} />;
    }

    if (rightIcon) {
      return rightIcon;
    }

    if (status === 'success') {
      return <MaterialIcon name="check" size={24} color={colors.green.primary} />;
    }

    if (password) {
      return (
        <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
          <MaterialIcon name={showPassword ? 'eye-off' : 'eye'} color={colors.gray.primary} size={24} />
        </TouchableOpacity>
      );
    }

    return null;
  };

  return (
    <>
      <View
        style={{
          ...styles.container,
          borderColor: status === 'error' ? colors.red.primary : colors.gray.primary,
          borderWidth: borderless ? 0 : 0.5,
        }}
      >
        {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}

        <TouchableWithoutFeedback onPress={onPress}>
          <View style={{ marginTop: label ? fontSize : 0, flex: 1, marginLeft: leftIcon ? 20 : 0 }}>
            <View accessible={accessible} accessibilityLabel={accessibilityLabel || label}>
              <Label error={status === 'error'} hasValue={hasValueWithContent(value)} focused={focused}>
                {label}
              </Label>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {!mask ? (
                  <RNTextInput
                    editable={editable}
                    {...otherProps}
                    ref={inputRef}
                    value={value ? value : inputValue}
                    secureTextEntry={password && !showPassword}
                    underlineColorAndroid={colors.transparent}
                    onBlur={handleBlur}
                    onChangeText={setValue}
                    onContentSizeChange={handleContentSizeChange}
                    onFocus={handleFocus}
                    style={{
                      ...styles.input,
                      ...(style as object),
                      ...Platform.select({
                        ios: { height },
                        android: {
                          height,
                          textAlignVertical: 'bottom',
                        },
                      }),
                    }}
                    maxLength={characterLimit > 0 ? characterLimit : null}
                  />
                ) : (
                  <TextInputMask
                    editable={editable}
                    onChangeText={(formatted, extracted) => {
                      // formatted: +1 (123) 456-78-90
                      // extracted: 1234567890
                      setValue(extracted);
                    }}
                    value={value ? value : inputValue}
                    secureTextEntry={password && !showPassword}
                    underlineColorAndroid={colors.transparent}
                    onBlur={handleBlur}
                    ref={inputRef}
                    mask={mask}
                    style={{
                      ...styles.input,
                      ...(style as object),
                      ...Platform.select({
                        ios: { height },
                        android: {
                          height,
                          textAlignVertical: 'bottom',
                        },
                      }),
                    }}
                    maxLength={characterLimit > 0 ? characterLimit : null}
                  />
                )}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.iconContainer}>{renderRightIcon()}</View>
      </View>

      <View style={{ ...layout.rowSpaceBetween, marginTop: 7 }}>
        <Helper status={status} statusText={statusText} />

        <Counter count={value?.length} limit={characterLimit} />
      </View>
    </>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  container: {
    ...layout.rowSpaceBetween,
    borderWidth: 0.5,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexShrink: 1,
  },
  input: {
    ...fonts.paragraphMedium,
    paddingTop: 0,
    paddingRight: 0,
    paddingLeft: 0,
    paddingBottom: 0,
    marginTop: 5,
    flexGrow: 1,
    flexBasis: 1,
    color: colors.black,
    marginBottom: 5,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
