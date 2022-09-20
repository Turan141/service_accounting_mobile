import React, { FC, useState } from 'react';
import { StyleSheet } from 'react-native';

import { MaintenanceItems } from '../../../../components/Maintenance';
import { Button } from '../../../../ui-kit/Buttons';

import { DirectionsEnum, MaintanceTypesEnum, ServiceModel } from '../../../../services/data';
import { FormGroup } from '../../../../ui-kit/Forms';
import TextInput from '../../../../ui-kit/TextInput';
import { ScrollViewContainer } from '../../../../ui-kit/Containers';
import { useNavigation } from '@react-navigation/core';
import { TaskDetailsScreenNavigationProp } from '../../../../navigation/props';
import { getMaintanenceItemPropsByTask } from '../../../../utils/treatments';
import { useUserStore } from '../../../../store/hooks';
import Switch from '../../../../ui-kit/Switch';
import { POO_STACK } from '../../../../navigation/stacks';

interface TkoTabProps {
  items: ServiceModel[];
  flightDirection: DirectionsEnum;
  onNavigate: (type: MaintanceTypesEnum) => void;
}

const TkoTab: FC<TkoTabProps> = ({ items, onNavigate }) => {
  const navigation = useNavigation<TaskDetailsScreenNavigationProp>();
  const [additionalInfo, setAdditionalInfo] = useState('');
  const { user } = useUserStore();

  return (
    <ScrollViewContainer>
      <MaintenanceItems>
        {items.map((item, idx) => (
          <MaintenanceItems.Item
            key={item.id}
            title={item.title}
            hideBorder={idx === items.length - 1}
            arrivalTime={item.startTime}
            departureTime={item.endTime}
            {...getMaintanenceItemPropsByTask(item, user?.roles)}
          />
        ))}
      </MaintenanceItems>

      <FormGroup style={{ marginTop: 10 }}>
        <TextInput label="Дополнительная информация" value={additionalInfo} onChangeText={setAdditionalInfo} />
      </FormGroup>

      <Button onPress={() => {}}>Приступить к выполнению</Button>
    </ScrollViewContainer>
  );
};

export default TkoTab;

const styles = StyleSheet.create({});
