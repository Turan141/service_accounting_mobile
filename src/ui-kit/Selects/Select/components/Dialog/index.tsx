import React, { FC, ReactNode, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { BlurView } from '@react-native-community/blur';
import _ from 'lodash';
import { colors, fonts, layout } from '../../../../../theme';
import { DocumentItemView } from '../../../../../typings/swagger/api';
import TextInput from '../../../../TextInput';

export interface DialogProps {
  visible: boolean;
  items: DocumentItemView[];
  itemStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
  loading?: boolean;
  searchable?: boolean;
  onSelect: (value: DocumentItemView, idx: number) => void;
  onShowCallback?: () => void;
  onDismissCallback?: () => void;
  onSearch?: (searchText: string) => void;
  renderItem?: (item: DocumentItemView) => ReactNode;
  onRequestClose?: () => void;
  searchValue?: string;
  setSearchValue?: React.Dispatch<React.SetStateAction<string>>;
}

const Dialog: FC<DialogProps> = ({
  itemStyle,
  visible = false,
  items = [],
  titleStyle,
  subtitleStyle,
  onSelect = () => null,
  onShowCallback = () => null,
  onDismissCallback = () => null,
  renderItem,
  onRequestClose,
  setSearchValue,
  searchValue,
}) => {
  const handleItemPress = useCallback((item: DocumentItemView, idx: number): void => {
    onSelect(item, idx);
  }, []);

  const renderItems = useCallback((): ReactNode => {
    if (items.length > 0) {
      return items.map((item, idx) => (
        <TouchableRipple
          rippleColor={colors.blue.light}
          onPress={() => handleItemPress(item, idx)}
          key={`dialog-item-${item.masterCode}-${idx}`}
        >
          {!renderItem ? (
            <View style={[styles.item, itemStyle]}>
              <Text
                numberOfLines={1}
                style={{
                  ...fonts.paragraphRegular,
                  ...(titleStyle as object),
                }}
              >
                {item.name}
              </Text>

              {item.subtitle && (
                <Text numberOfLines={1} style={[styles.subtitle, subtitleStyle]}>
                  {item.subtitle}
                </Text>
              )}
            </View>
          ) : (
            <View style={[styles.item, itemStyle]}>{renderItem(item)}</View>
          )}
        </TouchableRipple>
      ));
    }
    return (
      <View style={[styles.item, itemStyle]}>
        <Text
          numberOfLines={1}
          style={{
            ...fonts.paragraphRegular,
            ...(titleStyle as object),
          }}
        >
          Ничего не найдено
        </Text>
      </View>
    );
  }, [items]);

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onShow={onShowCallback}
      onDismiss={onDismissCallback}
      onRequestClose={onRequestClose}
    >
      <View style={styles.wrapper}>
        <BlurView style={styles.blurView} blurType="dark" blurAmount={5} overlayColor={colors.blurColor} />

        <TouchableWithoutFeedback onPress={onRequestClose}>
          <View style={styles.body}>
            <View style={[styles.box, { marginBottom: 24, padding: 0, margin: 0 }]}>
              <TextInput
                onChangeText={setSearchValue}
                value={searchValue}
                borderless={true}
                style={{ marginVertical: 0 }}
                label={'Поиск...'}
              />
            </View>
            <View style={styles.box}>
              <ScrollView>{renderItems()}</ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

export default Dialog;

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    zIndex: 9999,
  },
  blurView: {
    flex: 1,
    zIndex: 99999,
  },
  body: {
    ...StyleSheet.absoluteFillObject,
    ...layout.alignCenter,
    zIndex: 99999,
  },
  box: {
    backgroundColor: 'white',
    borderRadius: 8,
    zIndex: 100000,
    width: '85%',
    maxHeight: '26%',
    paddingVertical: 8,
    position: 'relative',
    borderWidth: 1,
  },
  item: {
    padding: 16,
  },
  subtitle: {
    ...fonts.smallRegular,
    color: colors.gray.primary,
    marginTop: 5,
  },
  searchbarContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray.primary,
    paddingLeft: 16,
  },
});
