import { useNavigation } from '@react-navigation/core';
import React, { FC } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import ImagesPreview from '../../../../components/ImagesPreview';
import { TasksStackScreens } from '../../../../navigation/enums';
import { TaskReportScreenNavigationProp, TaskReportScreenProps } from '../../../../navigation/props';
import { colors, fonts } from '../../../../theme';
import { Button } from '../../../../ui-kit/Buttons';
import { ScrollViewContainer } from '../../../../ui-kit/Containers';
import Divider from '../../../../ui-kit/Divider';
import { FormGroup } from '../../../../ui-kit/Forms';
import { SimpleList } from '../../../../ui-kit/Lists';
import Paper from '../../../../ui-kit/Paper';

const itemsList = [
  { title: 'Рейс', value: 'ЮТ376' },
  { title: 'Маршрут', value: 'СЫВ-ВНК' },
  { title: 'STA / ETA', value: '00:00 / 23:41' },
  { title: 'Дата', value: '28.07.2021' },
  { title: 'Тип ВС', value: 'B734' },
  { title: 'Борт', value: 'VQ-BIG' },
  { title: 'МС', value: '5' },
  { title: 'Прилет', value: 'Расписание 00:05. Прибыл 23:53' },
  { title: 'Стоянка', value: '29 (ТЭ)' },
  { title: 'Перрон', value: 'ВНК – Перрон 1' },
  { title: 'Терминал', value: 'A' },
  { title: 'Выход', value: '-' },
  { title: 'Пасс факт', value: '91/5/0' },
  { title: 'Пасс AODB', value: '91/5/0' },
  { title: 'Груз/багаж факт', value: '0/0/1198/0' },
  { title: 'Груз/багаж AODB', value: '0/0/1198' },
];

const ReportRuTab: FC = () => {
  const navigation = useNavigation<TaskReportScreenNavigationProp>();

  return (
    <ScrollViewContainer noPadding>
      {/* Arrival and departure information */}
      <Paper>
        <SimpleList title="Прилет">
          {itemsList.map((item, idx) => (
            <SimpleList.Item key={`arrival-list-item-${idx}`} {...item} />
          ))}
        </SimpleList>

        <SimpleList title="Вылет" style={{ marginTop: 15 }}>
          {itemsList.map((item, idx) => (
            <SimpleList.Item key={`departure-list-item-${idx}`} {...item} />
          ))}
        </SimpleList>
      </Paper>

      {/* TKO information */}
      <Paper title="TKO" titleStyle={{ textAlign: 'center' }}>
        <SimpleList>
          <SimpleList.Item title="ЮТ376" value="ЮТ376" hideBorder />
        </SimpleList>

        <Text style={styles.tkoTitle}>Буксировка</Text>
        <SimpleList>
          <SimpleList.Item
            title={`Тягач № 2\nПлан: 23:41–23:45\nФакт: 23:41–23:45\nПример, когда есть дополнительная информация`}
            value={`Тягач № 2\nПлан: 23:41–23:45\nФакт: 23:41–23:45`}
            valueStyle={fonts.paragraphRegular}
            hideBorder
          />
        </SimpleList>

        <Divider />

        <Text style={styles.tkoTitle}>Установка ВС на МС</Text>
        <SimpleList>
          <SimpleList.Item title={`План: 23:41\nФакт: 23:41`} hideBorder />
        </SimpleList>

        <Divider />

        <Text style={styles.tkoTitle}>Колодки</Text>
        <SimpleList>
          <SimpleList.Item
            title={`План: 23:41\nФакт: 23:41`}
            value={`План: 23:41\nФакт: 23:41`}
            valueStyle={fonts.paragraphRegular}
            hideBorder
          />
        </SimpleList>

        <Divider />

        <Text style={styles.tkoTitle}>Работа САБ</Text>
        <SimpleList>
          <SimpleList.Item
            title={`План: 23:41-23:45\nФакт: 23:41-23:45`}
            value={`План: 23:41-23:45\nФакт: 23:41-23:45`}
            valueStyle={fonts.paragraphRegular}
            hideBorder
          />
        </SimpleList>

        <Divider />

        <Text style={styles.tkoTitle}>Работа ООПК, таможни</Text>
        <SimpleList>
          <SimpleList.Item title={`План: 23:41-23:45\nФакт: 23:41-23:45`} hideBorder />
        </SimpleList>

        <Divider />

        <Text style={styles.tkoTitle}>Трап</Text>
        <SimpleList>
          <SimpleList.Item
            title={`Трап 1\nПлан: 23:41–23:45\nФакт: 23:41–23:45\nПрицепной № 2`}
            value={`Трап 1\nПлан: 23:41–23:45\nФакт: 23:41–23:45\nСамоходный № 2`}
            valueStyle={fonts.paragraphRegular}
            hideBorder
          />

          <SimpleList.Item
            title={`Трап 2\nПлан: 23:41–23:45\nФакт: 23:41–23:45\nПрицепной № 2`}
            value={`Трап 2\nПлан: 23:41–23:45\nФакт: 23:41–23:45\nСамоходный № 2`}
            valueStyle={fonts.paragraphRegular}
            hideBorder
          />

          <SimpleList.Item
            title={`Телетрап 1\nПлан: 23:41–23:45\nФакт: 23:41–23:45`}
            value={`Телетрап 1\nПлан: 23:41–23:45\nФакт: 23:41–23:45`}
            valueStyle={fonts.paragraphRegular}
            hideBorder
          />
        </SimpleList>

        <Divider />

        <Text style={styles.tkoTitle}>Электропитание</Text>
        <SimpleList>
          <SimpleList.Item
            title={`Стационарный\nПередвижной № 425\n№ 2\nПлан: 23:41–23:45\nФакт: 23:41–23:45`}
            value={`Стационарный\nПередвижной № 425\n№ 2\nПлан: 23:41–23:45\nФакт: 23:41–23:45`}
            valueStyle={fonts.paragraphRegular}
            hideBorder
          />
        </SimpleList>

        <Divider />

        <Text style={styles.tkoTitle}>Пассажиры</Text>
        <SimpleList>
          <SimpleList.Item
            title={`Автобусы\nЭконом 2\nБизнес 1\nПлан: 23:41–23:45\nФакт: 23:41–23:45`}
            value={`Автобусы\nЭконом 2\nБизнес 1\nПлан: 23:41–23:45\nФакт: 23:41–23:45`}
            valueStyle={fonts.paragraphRegular}
            hideBorder
          />
        </SimpleList>

        <Divider />

        <Text style={styles.tkoTitle}>Багаж</Text>
        <SimpleList>
          <SimpleList.Item
            title={`Масса 571\nМест 2\nПлан: 23:41–23:45\nФакт: 23:41–23:45`}
            value={`Масса 571\nМест 2\nСнятие багажа\nБирка 7658943\nБирка 7658943\nБирка 7658943\nПлан: 23:41–23:45\nФакт: 23:41–23:45`}
            valueStyle={fonts.paragraphRegular}
            hideBorder
          />
        </SimpleList>

        <Text style={fonts.paragraphRegular}>Фото поврежденного багажа</Text>
        <Image
          source={require('../../../../assets/images/mock.jpg')}
          style={{
            width: 100,
            height: 100,
            marginRight: 10,
            marginVertical: 10,
          }}
          resizeMode="cover"
        />

        <Divider />

        <Text style={styles.tkoTitle}>Бортпитание</Text>
        <SimpleList>
          <SimpleList.Item
            title={`План: 23:41-23:45\nФакт: 23:41-23:45`}
            value={`План: 23:41-23:45\nФакт: 23:41-23:45`}
            valueStyle={fonts.paragraphRegular}
            hideBorder
          />
        </SimpleList>

        <Divider />

        <Text style={styles.tkoTitle}>Уборка ВС</Text>
        <SimpleList>
          <SimpleList.Item
            title={`План: 23:41-23:45\nФакт: 23:41-23:45`}
            valueStyle={fonts.paragraphRegular}
            hideBorder
          />
        </SimpleList>

        <Divider />

        <Text style={styles.tkoTitle}>Обслуживание санузлов</Text>
        <SimpleList>
          <SimpleList.Item
            title={`Заправка\nПлан: 23:41-23:45\nФакт: 23:41-23:45`}
            value={`Комплекс\nПлан: 23:41-23:45\nФакт: 23:41-23:45`}
            valueStyle={fonts.paragraphRegular}
            hideBorder
          />
        </SimpleList>

        <Divider />

        <Text style={styles.tkoTitle}>Прибытие экипажа</Text>
        <SimpleList>
          <SimpleList.Item title={`План: 23:41\nФакт: 23:41`} valueStyle={fonts.paragraphRegular} hideBorder />
        </SimpleList>

        <Divider />

        <Text style={styles.tkoTitle}>Предварительная готовность</Text>
        <SimpleList>
          <SimpleList.Item title={`План: 23:41\nФакт: 23:41`} valueStyle={fonts.paragraphRegular} hideBorder />
        </SimpleList>

        <Divider />

        <Text style={styles.tkoTitle}>Готовность ВС к посадке</Text>
        <SimpleList>
          <SimpleList.Item title={`План: 23:41\nФакт: 23:41`} valueStyle={fonts.paragraphRegular} hideBorder />
        </SimpleList>

        <Divider />

        <Text style={styles.tkoTitle}>Доставка документов</Text>
        <SimpleList>
          <SimpleList.Item title={`План: 23:41\nФакт: 23:41`} valueStyle={fonts.paragraphRegular} hideBorder />
        </SimpleList>
      </Paper>

      <View style={{ padding: 20 }}>
        <FormGroup>
          <Button onPress={() => navigation.navigate(TasksStackScreens.TaskReportSign, { id: 232 })}>
            Получить подпись заказчика и завершить
          </Button>
        </FormGroup>
        <Button variant="secondary" onPress={() => {}}>
          Сохранить
        </Button>
      </View>
    </ScrollViewContainer>
  );
};

export default ReportRuTab;

const styles = StyleSheet.create({
  tkoTitle: {
    ...fonts.paragraphSemibold,
    textAlign: 'center',
  },
});
