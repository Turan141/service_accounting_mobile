import React, { FC } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, layout } from '../../theme';
import { AddMoreButton, Button } from '../../ui-kit/Buttons';
import { ContainerWithButton } from '../../ui-kit/Containers';

const HeatingScreen: FC = () => {
  const [items, setItems] = useState([
    { label: 'Салон' },
    { label: 'Люк БГО 1' },
    { label: 'Люк БГО 2' },
    { label: 'Люк панели обслуживания водяной системы' },
    { label: 'Люк панели обслуживания туалетной системы' },
    { label: 'Иное' },
  ]);

  const handleAddOtherObj = useCallback(() => {
    setItems(prevItems => [...prevItems, { label: 'Иное' }]);
  }, []);

  return (
    <ContainerWithButton label="Прилет">
      {items.map((item, idx) => (
        <View
          style={{
            ...styles.itemContainer,
            borderBottomWidth: idx !== items.length - 1 ? 0.5 : 0,
          }}
          key={idx}
        >
          <Text style={styles.itemLabel}>{item.label}</Text>

          <View style={{ width: 110 }}>
            <Button compact onPress={() => {}}>
              Старт
            </Button>
          </View>
        </View>
      ))}

      <AddMoreButton onPress={handleAddOtherObj} />
    </ContainerWithButton>
  );
};

export default HeatingScreen;

const styles = StyleSheet.create({
  itemLabel: {
    ...fonts.paragraphRegular,
    flexShrink: 1,
  },
  itemContainer: {
    ...layout.rowSpaceBetween,
    paddingVertical: 15,
    borderBottomColor: colors.gray.primary,
  },
});
