import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { fonts } from '../../../theme';

export interface TasksOldSearchQueriesProps {
  items: string[];
  onSelect: (value: string) => void;
}

const TasksOldSearchQueries: FC<TasksOldSearchQueriesProps> = ({ items, onSelect }) => {
  return (
    <View style={styles.container}>
      {items.map((item, idx) =>
        item ? (
          <TouchableRipple
            onPress={() => onSelect(item)}
            style={styles.resultItemBtn}
            key={`flight-search-item-${idx}`}
          >
            <Text style={fonts.paragraphSemibold}>{item}</Text>
          </TouchableRipple>
        ) : null
      )}
    </View>
  );
};

export default TasksOldSearchQueries;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  resultItemBtn: {
    paddingVertical: 15,
    paddingLeft: 64,
  },
});
