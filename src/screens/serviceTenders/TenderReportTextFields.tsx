import React, { ReactNode } from 'react';
import { SimpleList } from '../../ui-kit/Lists';
import { DocumentItemNamesEnum } from '../../store/data/documents';
import Paper from '../../ui-kit/Paper';
import { DocumentView } from '../../typings/swagger/api';
import { ReferenceCodesOfServicesEnum } from '../../services/documents/DocumentsService';

interface TenderReportTextFieldsProps {
  tender: DocumentView;
  tenderSpecificFields?: ReactNode;
  language: 'ru' | 'en';
}

const sign = {
  ru: {
    service: 'Услуга',
    customer: 'Заказчик',
    company: 'Авиакомпания',
    aircraftType: 'Тип ВС',
    boardNumber: 'Бортовой номер',
    parkingPlace: 'МС',
    garageNumberOfSpecialEquipment: 'Гаражный номер спецтехники',
  },
  en: {
    service: 'Service',
    customer: 'Customer',
    company: 'Airline',
    aircraftType: 'Aircraft type',
    boardNumber: 'Board number',
    parkingPlace: 'Parking place',
    garageNumberOfSpecialEquipment: 'Garage number of special equipment',
  },
};

const TenderReportTextFields: React.FC<TenderReportTextFieldsProps> = ({
  tender: { properties, items },
  tenderSpecificFields,
  language,
}) => {
  let languageField;
  switch (language) {
    case 'en':
      languageField = 'nameEn';
      break;
    case 'ru':
      languageField = 'nameRu';
      break;
  }

  const garageNumberOfSpecialEquipment = items?.find(
    item => item.type === DocumentItemNamesEnum.GarageNumberOfSpecialEquipment
  );

  return (
    <Paper>
      <SimpleList>
        <SimpleList.Item title={sign[language].service} value={properties.serviceReference.properties[languageField]} />

        {tenderSpecificFields}

        <SimpleList.Item
          title={sign[language].customer}
          value={properties.customerReference.properties[languageField]}
        />
        <SimpleList.Item title={sign[language].company} value={properties.companyReference.properties[languageField]} />
        <SimpleList.Item title={sign[language].aircraftType} value={properties.aircraftTypeReference.properties.utg} />
        <SimpleList.Item title={sign[language].boardNumber} value={properties.aircraftReference.properties.regNumber} />
        {properties.service !== ReferenceCodesOfServicesEnum.ProvisioningMinibus && (
          <>
            <SimpleList.Item title={sign[language].parkingPlace} value={properties.parkingName} />
            {garageNumberOfSpecialEquipment && (
              <SimpleList.Item
                title={sign[language].garageNumberOfSpecialEquipment}
                value={garageNumberOfSpecialEquipment?.additionalInfo}
                hideBorder
              />
            )}
          </>
        )}
      </SimpleList>
    </Paper>
  );
};

export default TenderReportTextFields;
