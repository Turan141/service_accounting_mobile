import { observer } from 'mobx-react-lite';
import React, { FC, useMemo } from 'react';
import { View } from 'react-native';
import { useTendersStore } from '../../../store/hooks';
import { colors, fonts } from '../../../theme';
import { SimpleList } from '../../../ui-kit/Lists';
import Paper from '../../../ui-kit/Paper';
import { DocumentItemNamesEnum } from '../../../store/data/documents';
import { format } from 'date-fns';
import TenderReportForm from '../TenderReportForm';
import TenderReportTextFields from '../TenderReportTextFields';
import { TaskStatusesEnum } from '../../../services/data';

const HeatingTenderReportRu: FC = () => {
  const { currentTender, finishTender } = useTendersStore();
  const { properties, items, status } = currentTender;

  const forcedDownTimeTime = useMemo(() => {
    const data = items?.find(item => item.type === DocumentItemNamesEnum.ForcedDownTime);
    if (data && data.status === TaskStatusesEnum.Completed && data.properties?.completed && data.properties?.started) {
      return format(new Date(+data.properties?.completed - +data.properties?.started), 'mm:ss');
    }
    return null;
  }, []);

  const heatingItems = useMemo(() => {
    const data = items?.filter(item => item.type === DocumentItemNamesEnum.HeatingPoint);
    if (data[0]?.properties?.started != null && data[0]?.properties?.completed != null) {
      let firstDate = +data[0].properties.started;
      let lastDate = +data[0].properties.completed;
      const parsedData = data.map((item, index) => {
        if (item.properties.started) {
          if (firstDate > +item.properties.started) {
            firstDate = +item.properties.started;
          }
          if (lastDate < +item.properties.completed) {
            lastDate = +item.properties.completed;
          }
          return (
            <Paper key={item.masterCode} title={item.title} titleStyle={fonts.smallSemibold}>
              <SimpleList>
                <SimpleList.Item
                  title="Время начала:"
                  value={format(new Date(+item.properties?.started), 'dd.MM.y в HH:mm')}
                  hideBorder
                />
                <SimpleList.Item
                  title="Время окончания:"
                  value={format(new Date(+item.properties?.completed), 'dd.MM.y в HH:mm')}
                />
              </SimpleList>
            </Paper>
          );
        }
      });

      const resultTime = (
        <Paper key={'result'}>
          <SimpleList>
            <SimpleList.Item
              title="Итог:"
              value={format(new Date(firstDate), 'HH:mm dd.MM.y') + ' - ' + format(new Date(lastDate), 'HH:mm dd.MM.y')}
              hideBorder
            />
            <SimpleList.Item
              title="Продолжительность (мин.):"
              value={Math.ceil((lastDate - firstDate) / 60000).toString()}
              hideBorder
            />
          </SimpleList>
        </Paper>
      );
      return [...parsedData, resultTime];
    } else {
      return null;
    }
  }, [currentTender]);

  return (
    <View>
      <TenderReportTextFields tender={currentTender} language={'ru'} />

      <Paper title="Итог:" titleStyle={fonts.bodySemibold}>
        <SimpleList>
          {forcedDownTimeTime && (
            <SimpleList.Item
              titleStyle={{ color: colors.red.primary }}
              valueStyle={{ color: colors.red.primary }}
              title="Время простоя:"
              value={forcedDownTimeTime}
              hideBorder
            />
          )}
        </SimpleList>
      </Paper>

      {heatingItems}

      <TenderReportForm language="ru" />
    </View>
  );
};

export default observer(HeatingTenderReportRu);
