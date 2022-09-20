import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ContainerWithButton } from '../../ui-kit/Containers';
import Paper from '../../ui-kit/Paper';

import { useNavigation } from '@react-navigation/native';
import { MaintenanceScreenNavigationProp } from '../../navigation/props';
import { colors, fonts, layout } from '../../theme';
import { Button } from '../../ui-kit/Buttons';
import { TimeLabel } from '../../ui-kit/Labels';
import TextInput from '../../ui-kit/TextInput';

const ladders = [
  { name: 'Трап', time: '23:41–23:45' },
  { name: 'Трап', time: '23:41–23:45' },
  { name: 'Трап', time: '23:41–23:45' },
];

const LadderScreen: FC = () => {
  const navigation = useNavigation<MaintenanceScreenNavigationProp>();
  const [additionalInfo, setAdditionalInfo] = useState('');

  const ladderItems = ladders.map((item, idx) => (
    <View
      style={{
        ...layout.rowSpaceBetween,
        paddingVertical: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.gray.light,
      }}
    >
      <Text style={fonts.paragraphRegular}>
        {item.name} {idx + 1}
      </Text>

      <View>
        <TimeLabel time={item.time} containerStyle={{ marginBottom: 5 }} />
        <TimeLabel time="--:-- – --:--" />
      </View>

      <View style={{ flexBasis: '33%' }}>
        <Button onPress={() => {}} compact>
          Старт
        </Button>
      </View>
    </View>
  ));

  useEffect(() => {
    navigation.setOptions({
      cardStyle: {
        backgroundColor: null,
      },
    });
  }, []);

  return (
    <ContainerWithButton
      scrollViewProps={{
        contentContainerStyle: {
          padding: 0,
        },
      }}
    >
      <Paper title="Прилет" titleStyle={fonts.subtitleBold}>
        <Text style={styles.subtitle}>Трап</Text>

        {ladderItems}
      </Paper>

      <Paper>
        <Text style={styles.subtitle}>Телетрап</Text>

        {ladderItems}

        <TextInput label="Дополнительная информация" value={additionalInfo} onChangeText={setAdditionalInfo} />
      </Paper>
    </ContainerWithButton>
  );
};

export default LadderScreen;

const styles = StyleSheet.create({
  subtitle: {
    ...fonts.paragraphSemibold,
    marginBottom: 20,
  },
});
