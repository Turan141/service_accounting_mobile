import React, { FC, useState, useCallback, ReactNode, useEffect } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ViewProps,
  TextStyle,
} from 'react-native';
import { colors, fonts, layout } from '../../../theme';

import { Dialog } from './components';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DocumentItemView, DocumentTypeView, ReferenceView } from '../../../typings/swagger/api';

export type SelectItem = {
  title?: string;
  subtitle?: string;
  value?: string | number;
  enabled?: boolean;
} & DocumentTypeView;

export interface SelectProps extends ViewProps {
  label?: string;
  value: ReferenceView;
  items: ReferenceView[];
  valueStyle?: StyleProp<TextStyle>;
  itemTitleStyle?: StyleProp<TextStyle>;
  itemSubtitleStyle?: StyleProp<TextStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  onSelect: (value: ReferenceView, index: number) => void;
  renderItem?: (item: ReferenceView) => ReactNode;
  renderSelectedItem?: (item: ReferenceView) => ReactNode;
  searchValue?: string;
  setSearchValue?: React.Dispatch<React.SetStateAction<string>>;
  disabled?: boolean;
}

const Select: FC<SelectProps> = ({
  label,
  value,
  items = [],
  style,
  valueStyle,
  itemTitleStyle,
  itemSubtitleStyle,
  itemStyle,
  onSelect,
  renderItem,
  containerStyle,
  disabled,
  searchValue,
  setSearchValue,
  ...otherProps
}) => {
  const [isShowed, setIsShowed] = useState(false);

  const getValueText = () => {
    return items.find(i => i?.masterCode === value?.masterCode)?.name || 'Выберите...';
  };
  const handleSelect = (value: DocumentItemView, index: number) => {
    console.log(value);
    onSelect(value, index);
    setIsShowed(false);
  };

  return (
    <View style={containerStyle}>
      <TouchableWithoutFeedback onPress={() => setIsShowed(true)}>
        <View style={styles.container} {...otherProps}>
          <View>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={[styles.box, style]}>
              <Text numberOfLines={1} style={[fonts.paragraphMedium, valueStyle]}>
                {getValueText()}
              </Text>
            </View>
          </View>

          <MaterialIcon name="chevron-right" color={colors.gray.primary} size={24} />

          {!disabled ? (
            <Dialog
              visible={isShowed}
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onRequestClose={() => setIsShowed(false)}
              itemStyle={itemStyle}
              titleStyle={itemTitleStyle}
              subtitleStyle={itemSubtitleStyle}
              onSelect={(value, index) => {
                handleSelect(value, index);
              }}
              renderItem={renderItem}
            />
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  container: {
    ...layout.rowSpaceBetween,
    borderWidth: 0.5,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    flexShrink: 1,
    borderColor: colors.gray.primary,
  },
  label: {
    ...fonts.extraSmallSemibold,
    color: colors.gray.primary,
    marginBottom: 4,
  },
  box: {
    ...layout.rowSpaceBetween,
    width: '100%',
  },
});
