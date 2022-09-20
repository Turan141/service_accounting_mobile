import { DocumentView } from '../typings/swagger/api';
import { DocumentItemNamesEnum } from '../store/data/documents';
import React, { FC, useMemo } from 'react';
import { TenderTypesEnum } from '../services/data';
import { SimpleList } from '../ui-kit/Lists';
import { HeatingSpotsNameEnum } from '../screens/serviceTenders/Heating/HeatingTender';
import { routeCategory } from '../screens/serviceTenders/Minibuses/utils';
import { format } from 'date-fns';
import { ViewStyle } from 'react-native';

export default function (tender: DocumentView) {
  const { properties, items } = tender;
  const flightItem = items.find(item => item.type === DocumentItemNamesEnum.AnyServiceFlight);
  const tenderInfo = useMemo(() => {
    let item;

    switch (properties.service) {
      case TenderTypesEnum.Heating:
        return (
          <SimpleList.Item
            title="Точки обогрева:"
            value={items
              .filter(item => item.masterCode in HeatingSpotsNameEnum)
              .map(item => item.title)
              .join(', ')}
          />
        );
      case TenderTypesEnum.Toilet:
        item = items.find(item => item.type === DocumentItemNamesEnum.ToiletType);
        return (
          <>
            <SimpleList.Item title="Тип:" value={item.title} />
            {item.additionalInfo && <SimpleList.Item title="Информация:" value={item.additionalInfo} />}
          </>
        );
      case TenderTypesEnum.ProvisioningMinibus:
        item = items.find(item => item.type === DocumentItemNamesEnum.ProvisioningMinibuses);

        return (
          <>
            <SimpleList.Item title="Тип:" value={item.properties.passengersCategoryName} />
            <SimpleList.Item
              title={`Маршрут с (${routeCategory(item.properties.parkingFromReference, 'ru')}):`}
              value={item.properties.parkingFromName}
            />
            <SimpleList.Item
              title={`Маршрут на (${routeCategory(item.properties.parkingToReference, 'ru')}):`}
              value={item.properties.parkingToName}
            />
            <SimpleList.Item title="Кол-во пассажиров:" value={item.properties.passengersCount} />
            <SimpleList.Item title="Номер машины:" value={item.properties.transportNumber} />
          </>
        );
      case TenderTypesEnum.WaterSystemMaintenance:
        item = items.find(item => item.type === DocumentItemNamesEnum.WaterSystemMaintenance);
        return (
          <>
            <SimpleList.Item title="Тип:" value={item.title} />
            {item.additionalInfo && <SimpleList.Item title="Информация:" value={item.additionalInfo} />}
          </>
        );
      case TenderTypesEnum.TieDownStrapsAndNetsRent:
        item = items.find(item => item.type === DocumentItemNamesEnum.TieDownStrapsAndNetsRent);
        return (
          <>
            <SimpleList.Item title="Кол-во комплектов:" value={item.properties.kitsCount} />
          </>
        );
      case TenderTypesEnum.Outstaffing:
        item = items.find(item => item.type === DocumentItemNamesEnum.Outstaffing);
        return (
          <>
            <SimpleList.Item title="Кол-во персонала:" value={item.properties?.personnelCount} />
            <SimpleList.Item title="Детализация работ:" value={item.reference?.name} />
          </>
        );
      case TenderTypesEnum.ProvisionOfBaggageCar:
        item = items.find(item => item.type === DocumentItemNamesEnum.ProvisionOfBaggageCar);
        return (
          <>
            <SimpleList.Item title="Кол-во персонала:" value={item.properties?.machineryCount} />
            <SimpleList.Item title="Вид работ:" value={item.reference?.name} />
          </>
        );
      case TenderTypesEnum.DrainContainer:
        item = items.find(item => item.type === DocumentItemNamesEnum.DrainContainer);
        return (
          <>
            <SimpleList.Item title="Кол-во литров:" value={item.properties?.litersCount} />
            <SimpleList.Item title="Тип топлива:" value={item.reference?.name} />
          </>
        );
      case TenderTypesEnum.ProvisioningEscortVehicle:
        item = items.find(item => item.type === DocumentItemNamesEnum.ProvisioningEscortVehicle);
        return (
          <>
            <SimpleList.Item
              title={`Маршрут с (${routeCategory(item.properties.routeFromReference, 'ru')}):`}
              value={item.properties.routeFromName}
            />
            <SimpleList.Item
              title={`Маршрут на (${routeCategory(item.properties.routeToReference, 'ru')}):`}
              value={item.properties.routeToName}
            />
          </>
        );
      case TenderTypesEnum.GroundPowerUnit:
        item = items.find(item => item.type === DocumentItemNamesEnum.GroundPowerUnit);
        return (
          <>
            <SimpleList.Item title="Тип ИЭП:" value={item.reference.name} />
          </>
        );
      case TenderTypesEnum.LaddersProvision:
        item = items.find(item => item.type === DocumentItemNamesEnum.LaddersProvision);
        return (
          <>
            <SimpleList.Item title="Тип стремянки:" value={item.properties.laddersSerialReference.description} />
          </>
        );
      case TenderTypesEnum.CompressedGas:
        item = items.find(item => item.type === DocumentItemNamesEnum.CompressedGas);
        return (
          <>
            <SimpleList.Item title="Тип газа:" value={item.reference.name} />
          </>
        );
      case TenderTypesEnum.MaintenanceKit:
        item = items.find(item => item.type === DocumentItemNamesEnum.MaintenanceKit);
        return (
          <>
            <SimpleList.Item title="Вид работы:" value={item?.reference?.name} />
            <SimpleList.Item title="Мест:" value={item.properties?.numberseats} />
            <SimpleList.Item title="Вес:" value={item.properties?.weight} />
            <SimpleList.Item
              title={`Маршрут с (${routeCategory(item.properties.maintanceKitFromReference, 'ru')}):`}
              value={item.properties.maintanceKitFromName}
            />
            <SimpleList.Item
              title={`Маршрут на (${routeCategory(item.properties.maintanceKitToReference, 'ru')}):`}
              value={item.properties.maintanceKitToName}
            />
          </>
        );
    }
  }, []);

  const TenderPropertiesList: FC<{ style?: ViewStyle }> = ({ style }) => {
    return (
      <SimpleList style={style}>
        {tenderInfo}
        <SimpleList.Item title="Заказчик" value={properties.customerReference.description} />
        <SimpleList.Item title="Авиакомпания" value={properties.companyReference.description} />
        <SimpleList.Item title="Тип ВС" value={properties.aircraftTypeName} />
        <SimpleList.Item title="Бортовой номер" value={properties.aircraftName} />
        <SimpleList.Item title="МС" value={properties.parkingName} />
        <SimpleList.Item title="Начало работ:" value={format(new Date(+properties.startPlan), 'dd.MM.y в HH:mm')} />
        <SimpleList.Item title="Окончание работ:" value={format(new Date(+properties.endPlan), 'dd.MM.y в HH:mm')} />
        {flightItem && <SimpleList.Item title="Номер рейса" value={flightItem.additionalInfo} />}
        {properties.additionalInfo && <SimpleList.Item title="Доп. информация:" value={properties.additionalInfo} />}
      </SimpleList>
    );
  };

  return { TenderPropertiesList };
}
