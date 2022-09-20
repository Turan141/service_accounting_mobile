import { Text, TextInput } from 'react-native';

export default () => {
  // @ts-ignore
  Text.defaultProps = Text.defaultProps || {};
  // @ts-ignore
  Text.defaultProps.allowFontScaling = false;

  // @ts-ignore
  TextInput.defaultProps = TextInput.defaultProps || {};
  // @ts-ignore
  TextInput.defaultProps.allowFontScaling = false;
};
