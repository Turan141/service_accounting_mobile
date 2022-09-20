import React, { FC, ReactElement, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { ScrollViewContainer } from '../../ui-kit/Containers';
import { Button } from '../../ui-kit/Buttons';
import { SimpleList } from '../../ui-kit/Lists';
import SpinnerLoading from '../../ui-kit/SpinnerLoading';
import Tab from '../../ui-kit/Tab';

import { useFlightStore, useUserStore } from '../../store/hooks';
import { observer } from 'mobx-react';
import { TaskDetailsScreenProps } from '../../navigation/props';
import { DirectionsEnum, TaskStatusesEnum } from '../../services/data';
import { format } from 'date-fns';
import { fonts, layout } from '../../theme';

const FlightDetailsScreen: FC<TaskDetailsScreenProps> = ({ route }) => {
  const { loading, currentFlight, getLirsByFlightCode, lirs } = useFlightStore();

  useEffect(() => {
    getLirsByFlightCode(currentFlight.flightCode);
  }, []);

  const DataList = () => {
    return (
      <View style={{ padding: 20 }}>
        <SimpleList style={{ marginBottom: 12 }}>
          <SimpleList.Item title="Рейс" value={currentFlight?.flightNumber} />
          <SimpleList.Item title="Маршрут" value={currentFlight?.departureAirport} />
          <SimpleList.Item title="STA / ETA" value={currentFlight?.st} />
          {currentFlight?.flightDate && (
            <SimpleList.Item title="Дата" value={format(new Date(currentFlight.flightDate), 'd.MM.y HH:mm')} />
          )}
          <SimpleList.Item title="Тип ВС" value={currentFlight?.airplaneType} />
          <SimpleList.Item title="Борт" value={currentFlight?.airplane} />
          <SimpleList.Item title="MC" value={currentFlight?.ms} />
          {/*<SimpleList.Item title="Перрон" value={currentFlight?.platform} />*/}
          <SimpleList.Item title="Терминал" value={currentFlight?.terminal} />
          <SimpleList.Item title="Выход" value={currentFlight?.exitgate} />
          {/*<SimpleList.Item title="Пасс факт" value={currentFlight?.passiveFact} />*/}
          {/*<SimpleList.Item title="Пасс AODB" value={currentFlight?.passiveAODB} />*/}
          <SimpleList.Item title="Груз/багаж факт" value={currentFlight?.cargoFact} />
          <SimpleList.Item title="Груз/багаж AODB" value={currentFlight?.cargoAO} hideBorder />
        </SimpleList>
      </View>
    );
  };

  const ArrivalDataList = (): ReactElement => {
    if (currentFlight?.direction === DirectionsEnum.Departure) {
      return <View />;
    }

    return <DataList />;
  };

  const DepartureDataList = (): ReactElement => {
    if (currentFlight?.direction === DirectionsEnum.Arrival) {
      return <View />;
    }

    return <DataList />;
  };

  const Lir = (): ReactElement => {
    return (
      <ScrollViewContainer>
        <SimpleList>
          {lirs?.map(lir => {
            return (
              <SimpleList.Item
                title={lir.from}
                value={
                  <View style={{ alignItems: 'baseline', width: '70%' }}>
                    <Text style={fonts.bodyBold}>{lir.content} </Text>
                    <Text style={fonts.smallMedium}> {lir.flightDate}</Text>
                  </View>
                }
              />
            );
          })}
        </SimpleList>
      </ScrollViewContainer>
    );
  };

  const handleAddRequest = () => {
    // acceptFlight({
    //   flightId: id,
    //   userId: user?.id,
    // });
  };

  if (loading) {
    return <SpinnerLoading />;
  }

  return (
    <ScrollViewContainer noPadding>
      <Tab>
        <Tab.Item
          name="ArrivalList"
          component={ArrivalDataList}
          options={{
            tabBarLabel: 'Прилёт',
          }}
        />

        <Tab.Item
          name="DepartureList"
          component={DepartureDataList}
          options={{
            tabBarLabel: 'Вылет',
          }}
        />

        <Tab.Item
          name="LIR"
          component={Lir}
          options={{
            tabBarLabel: 'LIR',
          }}
        />
      </Tab>

      <View style={{ padding: 20 }}>
        <Button onPress={handleAddRequest}>Приступить к выполнению</Button>
      </View>
    </ScrollViewContainer>
  );
};

export default observer(FlightDetailsScreen);
