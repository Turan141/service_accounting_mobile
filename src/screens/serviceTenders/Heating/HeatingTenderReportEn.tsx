import { observer } from 'mobx-react-lite';
import React, { FC, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTendersStore } from '../../../store/hooks';
import { colors, fonts } from '../../../theme';
import { SimpleList } from '../../../ui-kit/Lists';
import Paper from '../../../ui-kit/Paper';
import { DocumentItemNamesEnum } from '../../../store/data/documents';
import { format } from 'date-fns';
import TenderReportTextFields from '../TenderReportTextFields';
import TenderReportForm from '../TenderReportForm';
import { TaskStatusesEnum } from '../../../services/data';

const HeatingTenderReportEn: FC = () => {
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
      const parsedData = data.map(item => {
        if (item.properties.started) {
          if (firstDate > +item.properties.started) {
            firstDate = +item.properties.started;
          }
          if (lastDate < +item.properties.completed) {
            lastDate = +item.properties.completed;
          }
          return (
            <Paper key={item.masterCode} title={item.reference.properties.nameEn} titleStyle={fonts.smallSemibold}>
              <SimpleList>
                <SimpleList.Item
                  title="Start time:"
                  value={format(new Date(+item.properties?.started), 'dd.MM.y в HH:mm')}
                  hideBorder
                />
                <SimpleList.Item
                  title="End time:"
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
              title="Total:"
              value={format(new Date(firstDate), 'HH:mm dd.MM.y') + ' - ' + format(new Date(lastDate), 'HH:mm dd.MM.y')}
              hideBorder
            />
            <SimpleList.Item
              title="Duration (minutes):"
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
      <TenderReportTextFields tender={currentTender} language={'en'} />

      <Paper title="Outcome:" titleStyle={fonts.bodySemibold}>
        <SimpleList>
          {forcedDownTimeTime && (
            <SimpleList.Item
              titleStyle={{ color: colors.red.primary }}
              valueStyle={{ color: colors.red.primary }}
              title="Downtime:"
              value={forcedDownTimeTime}
            />
          )}
        </SimpleList>
      </Paper>

      {heatingItems}

      <TenderReportForm language="en" />
    </View>
  );
};

export default observer(HeatingTenderReportEn);
