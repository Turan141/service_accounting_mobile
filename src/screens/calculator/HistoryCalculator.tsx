import React, { FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, fonts, layout } from '../../theme';
import { storageService } from '../../services';
import { CALCULATOR_RESULTS_KEY } from './index';
import { TouchableRipple } from 'react-native-paper';
import { format } from 'date-fns';
import { useIsFocused } from '@react-navigation/native';
import Modal from '../../ui-kit/Modal';
import { SimpleList } from '../../ui-kit/Lists';

const HistoryCalculator: FC = () => {
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    storageService.getItem(CALCULATOR_RESULTS_KEY).then(value => setResults(value || []));
  }, [isFocused]);

  return (
    <View style={layout.screenContainer}>
      <ScrollView>
        {results.map(item => {
          return (
            <TouchableRipple
              onPress={() => {
                setCurrentItem(item);
                setOpen(true);
              }}
              key={item.date.toString()}
            >
              <View style={[layout.rowSpaceBetween, s.item]}>
                <Text style={fonts.bodySemibold}>{format(item.date, 'dd.MM.y HH:mm')}</Text>
                <Text style={fonts.bodyBold}>{item.result}</Text>
              </View>
            </TouchableRipple>
          );
        })}
      </ScrollView>

      <Modal showConfirm={false} onBackdropPress={() => setOpen(false)} transparent animationType="fade" visible={open}>
        {currentItem && (
          <SimpleList style={{ width: '90%', alignSelf: 'center' }}>
            <SimpleList.Item title="Левый бак:" value={currentItem.tankLeft} />
            <SimpleList.Item title="Центральный бак:" value={currentItem.tankCtrl} />
            <SimpleList.Item title="Правый бак:" value={currentItem.tankRight} />
            <SimpleList.Item title="Общая заправка:" value={currentItem.totalFuel} />
            <SimpleList.Item hideBorder title="Плотность:" value={currentItem.density} />
          </SimpleList>
        )}
      </Modal>
    </View>
  );
};

const s = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginVertical: 14,
  },
  item: {
    borderBottomColor: colors.gray.primary,
    borderBottomWidth: 1,
    paddingVertical: 12,
  },
});

export default HistoryCalculator;
