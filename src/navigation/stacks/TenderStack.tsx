import { createStackNavigator } from '@react-navigation/stack';
import { TenderStackParamList } from '../params';
import React, { FC } from 'react';
import { BaseScreenProps } from '../props';
import { TenderStackScreens } from '../enums';
import { colors, fonts } from '../../theme';
import { BackButton } from '../../ui-kit/Buttons';
import { observer } from 'mobx-react';
import HeatingTenderScreen from '../../screens/serviceTenders/Heating/HeatingTender';
import ToiletTenderScreen from '../../screens/serviceTenders/Toilet/ToiletTender';
import ProvisioningMinibusTenderScreen from '../../screens/serviceTenders/Minibuses/ProvisioningMinibusTender';
import AircraftCooling from '../../screens/serviceTenders/AircraftCooling/AircraftCooling';
import WaterSystemMaintenance from '../../screens/serviceTenders/WaterSystemMaintenance/WaterSystemMaintenance';
import AnyServiceScreen from '../../screens/serviceTenders/AnyService/AnyService';
import ProvidingAirLunchDeviceScreen from '../../screens/serviceTenders/ProvidingAirLunchDevice/ProvidingAirLunchDevice';
import DriverProvidingScreen from '../../screens/serviceTenders/DriverProviding/DriverProviding';
import ProvisionOfProcessWater from '../../screens/serviceTenders/ProvisionOfProcessWater/ProvisionOfProcessWater';
import ProvidingAnExtensionCordScreen from '../../screens/serviceTenders/ProvidingAnExtensionCord/ProvidingAnExtensionCord';
import SanitaryInspectionScreen from '../../screens/serviceTenders/SanitaryInspection/SanitaryInspection';
// import TieDownStrapsAndNetsRentScreen from '../../screens/serviceTenders/TieDownStrapsAndNetsRent/TieDownStrapsAndNetsRent';
import TieDownStrapsAndNetsRent from '../../screens/serviceTenders/TieDownStrapsAndNetsRent/TieDownStrapsAndNetsRent';
import OutstaffingScreen from '../../screens/serviceTenders/Outstaffing/Outstaffing';
import ProvisionOfBaggageCarScreen from '../../screens/serviceTenders/ProvisionOfBaggageCar/ProvisionOfBaggageCar';
import DrainContainerScreen from '../../screens/serviceTenders/DrainContainer/DrainContainer';
import ProvisioningEscortVehicleScreen from '../../screens/serviceTenders/ProvisioningEscortVehicle/ProvisioningEscortVehicle';
import GroundPowerUnitScreen from '../../screens/serviceTenders/GroundPowerUnit/GroundPowerUnit';
import LaddersProvisionScreen from '../../screens/serviceTenders/LaddersProvision/LaddersProvision';
import CompressedGasScreen from '../../screens/serviceTenders/CompressedGas/CompressedGas';
import MaintenanceKitScreen from '../../screens/serviceTenders/MaintenanceKit/MaintenanceKit';

const Stack = createStackNavigator<TenderStackParamList>();

const TenderStack: FC<BaseScreenProps> = () => {
  // const { isSearchEnabled } = useTasksStore();
  // const { user } = useUserStore();

  return (
    <Stack.Navigator
      // initialRouteName={TenderStackScreens.HeatingTender}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: colors.white,
        headerTitleStyle: fonts.bodyRegular,
        headerLeft: ({ onPress }) => <BackButton onPress={onPress} />,
        cardStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
      <Stack.Screen
        name={TenderStackScreens.HeatingTender}
        component={HeatingTenderScreen}
        options={({ route }) => ({
          title: `В работе заявка № ${route.params.data.number}`,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name={TenderStackScreens.ToiletTender}
        component={ToiletTenderScreen}
        options={({ route }) => ({
          title: `В работе заявка № ${route.params.data.number}`,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name={TenderStackScreens.ProvisioningMinibus}
        component={ProvisioningMinibusTenderScreen}
        options={({ route }) => ({
          title: `В работе заявка № ${route.params.data.number}`,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name={TenderStackScreens.AircraftCooling}
        component={AircraftCooling}
        options={({ route }) => ({
          title: `В работе заявка № ${route.params.data.number}`,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name={TenderStackScreens.WaterSystemMaintenance}
        component={WaterSystemMaintenance}
        options={({ route }) => ({
          title: `В работе заявка № ${route.params.data.number}`,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name={TenderStackScreens.AnyService}
        component={AnyServiceScreen}
        options={({ route }) => ({
          title: `В работе заявка № ${route.params.data.number}`,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name={TenderStackScreens.ProvidingAirLaunchDevice}
        component={ProvidingAirLunchDeviceScreen}
        options={({ route }) => ({
          title: `В работе заявка № ${route.params.data.number}`,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name={TenderStackScreens.SanitaryInspection}
        component={SanitaryInspectionScreen}
        options={({ route }) => ({
          title: `В работе заявка № ${route.params.data.number}`,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name={TenderStackScreens.DriverProviding}
        component={DriverProvidingScreen}
        options={({ route }) => ({
          title: `В работе заявка № ${route.params.data.number}`,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name={TenderStackScreens.ProvisionOfProcessWater}
        component={ProvisionOfProcessWater}
        options={({ route }) => ({
          title: `В работе заявка № ${route.params.data.number}`,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name={TenderStackScreens.ProvidingAnExtensionCord}
        component={ProvidingAnExtensionCordScreen}
        options={({ route }) => ({
          title: `В работе заявка № ${route.params.data.number}`,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name={TenderStackScreens.TieDownStrapsAndNetsRent}
        component={TieDownStrapsAndNetsRent}
        options={({ route }) => ({
          title: `В работе заявка № ${route.params.data.number}`,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name={TenderStackScreens.Outstaffing}
        component={OutstaffingScreen}
        options={({ route }) => ({
          title: `В работе заявка № ${route.params.data.number}`,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name={TenderStackScreens.ProvisionOfBaggageCar}
        component={ProvisionOfBaggageCarScreen}
        options={({ route }) => ({
          title: `В работе заявка № ${route.params.data.number}`,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name={TenderStackScreens.DrainContainer}
        component={DrainContainerScreen}
        options={({ route }) => ({
          title: `В работе заявка № ${route.params.data.number}`,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name={TenderStackScreens.ProvisioningEscortVehicle}
        component={ProvisioningEscortVehicleScreen}
        options={({ route }) => ({
          title: `В работе заявка № ${route.params.data.number}`,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name={TenderStackScreens.GroundPowerUnit}
        component={GroundPowerUnitScreen}
        options={({ route }) => ({
          title: `В работе заявка № ${route.params.data.number}`,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name={TenderStackScreens.LaddersProvision}
        component={LaddersProvisionScreen}
        options={({ route }) => ({
          title: `В работе заявка № ${route.params.data.number}`,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name={TenderStackScreens.CompressedGas}
        component={CompressedGasScreen}
        options={({ route }) => ({
          title: `В работе заявка № ${route.params.data.number}`,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name={TenderStackScreens.MaintenanceKit}
        component={MaintenanceKitScreen}
        options={({ route }) => ({
          title: `В работе заявка № ${route.params.data.number}`,
          headerTitleAlign: 'center',
        })}
      />
    </Stack.Navigator>
  );
};

export const TENDER_STACK = 'TenderStack';

export default observer(TenderStack);
