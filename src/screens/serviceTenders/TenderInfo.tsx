import { useTendersStore } from '../../store/hooks';
import React, { useMemo } from 'react';
import { observer } from 'mobx-react';
import { View } from 'react-native';
import { Button } from '../../ui-kit/Buttons';
import useTenderPropertiesList from '../../hooks/useTenderPropertiesList';

interface TenderInfoProps {
  onPress?: any;
}

const TenderInfo: React.FC<TenderInfoProps> = ({ onPress }) => {
  const { currentTender } = useTendersStore();

  const { TenderPropertiesList } = useTenderPropertiesList(currentTender);

  return (
    <View style={{ padding: 20 }}>
      <TenderPropertiesList />
      <Button style={{ marginTop: 24 }} onPress={onPress}>
        Далее
      </Button>
    </View>
  );
};

export default observer(TenderInfo);
