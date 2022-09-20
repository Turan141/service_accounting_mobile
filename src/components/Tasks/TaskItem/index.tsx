import React, { FC, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, layout } from '../../../theme';
import { format } from 'date-fns';

import { IconLabel } from '../../../ui-kit/Labels';
import Badge from '../../../ui-kit/Badge';

import { TaskStatusesEnum } from '../../../services/data';
import { TouchableWithoutFeedback } from '@gorhom/bottom-sheet';
import { getFlightStatus } from '../../../utils';
import { DocumentView, Flight } from '../../../typings/swagger/api';
import { DocumentItemNamesEnum } from '../../../store/data/documents';

export interface TaskItemProps {
  item: DocumentView & Flight;
  onPress: any;
}

const TaskItem: FC<TaskItemProps> = ({ item, onPress }) => {
  const parsedTime = new Date(item?.flightDate || +item?.properties.startPlan);
  const flightItem = item?.items?.find(item => item.type === DocumentItemNamesEnum.AnyServiceFlight);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[
          styles.container,
          { borderLeftColor: Array.isArray(item.items) ? colors.blue.primary : colors.violet.primary },
        ]}
      >
        <View style={{ ...layout.rowSpaceBetween, marginBottom: 20 }}>
          <Text style={styles.smallGray}>№ {item?.number || item.flightNumber}</Text>

          {flightItem ? <IconLabel icon="airplane-landing">{flightItem.additionalInfo}</IconLabel> : null}

          {item?.status && item.status.includes(TaskStatusesEnum.Started) ? (
            <Badge variant="success">{getFlightStatus(item.status)}</Badge>
          ) : null}

          {item?.status && item.status.includes(TaskStatusesEnum.Completed) ? (
            <Badge variant="success">{getFlightStatus(item.status)}</Badge>
          ) : null}
        </View>

        <Text style={styles.title}>{item?.properties?.serviceName || item?.flightNumber}</Text>

        <View style={{ ...layout.rowSpaceBetween, marginRight: 50 }}>
          <IconLabel icon="clock-time-four" textStyle={{ marginRight: 10 }}>
            {format(parsedTime, 'HH:mm')}
          </IconLabel>

          <IconLabel icon="airplane">{item?.properties?.aircraftName || item?.airplane}</IconLabel>

          {item?.properties?.parking ? (
            <IconLabel icon="map-marker-circle">
              {item.properties.parkingName +
                (item.properties.parkingReference.properties.category === '1' ? ' (Гейт)' : '')}
            </IconLabel>
          ) : null}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderLeftWidth: 5,
    padding: 15,
    elevation: 4,
    shadowOffset: { width: 15, height: 5 },
    backgroundColor: colors.white,
    marginBottom: 15,
    marginRight: 5,
  },
  smallGray: {
    ...fonts.smallSemibold,
    color: colors.gray.primary,
  },
  title: {
    ...fonts.paragraphSemibold,
    marginBottom: 5,
  },
  signDetailsContainer: {
    ...layout.rowAlignItemsCenter,
    marginTop: 15,
  },
});
