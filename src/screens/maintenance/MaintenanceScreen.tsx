import React, { FC, Fragment } from 'react';
import { StyleSheet } from 'react-native';

import { MaintenanceScreenProps } from '../../navigation/props';
import { MaintanceTypesEnum } from '../../services/data';
import {
  CargoMailScreen,
  PowerSupplyScreen,
  TowingScreen,
  PassengersScreen,
  BathroomServiceScreen,
  LuggageScreen,
  LadderScreen,
  RefuelingScreen,
  VisualInspectionScreen,
  CoolingScreen,
  HeatingScreen,
  UVZScreen,
  OxygenScreen,
  NitrogenScreen,
  FuelDrainingScreen,
} from '.';

const MaintenanceScreen: FC<MaintenanceScreenProps> = ({ route }) => {
  const { type } = route.params;

  return (
    <Fragment>
      {type === MaintanceTypesEnum.CargoMail && <CargoMailScreen />}
      {type === MaintanceTypesEnum.Towing && <TowingScreen />}
      {type === MaintanceTypesEnum.PowerSupply && <PowerSupplyScreen />}
      {type === MaintanceTypesEnum.Passengers && <PassengersScreen />}
      {type === MaintanceTypesEnum.BathroomService && <BathroomServiceScreen />}
      {type === MaintanceTypesEnum.Luggage && <LuggageScreen />}
      {type === MaintanceTypesEnum.Ladder && <LadderScreen />}
      {type === MaintanceTypesEnum.Refueling && <RefuelingScreen />}
      {type === MaintanceTypesEnum.VisualInspection && <VisualInspectionScreen />}
      {type === MaintanceTypesEnum.Cooling && <CoolingScreen />}
      {type === MaintanceTypesEnum.Heating && <HeatingScreen />}
      {type === MaintanceTypesEnum.UVZ && <UVZScreen />}
      {type === MaintanceTypesEnum.Oxygen && <OxygenScreen />}
      {type === MaintanceTypesEnum.Nitrogen && <NitrogenScreen />}
      {type === MaintanceTypesEnum.FuelDraining && <FuelDrainingScreen />}
    </Fragment>
  );
};

export default MaintenanceScreen;

const styles = StyleSheet.create({});
