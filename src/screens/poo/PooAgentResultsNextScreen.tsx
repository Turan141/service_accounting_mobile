import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, layout } from '../../theme';

import { ContainerWithButton } from '../../ui-kit/Containers';
import { PooAgentResultsScreenProps } from '../../navigation/props';

import { observer } from 'mobx-react';
import Icon from '../../ui-kit/Icon';
import { SimpleList } from '../../ui-kit/Lists';
import { useTreatmentsStore } from '../../store/hooks';
import ImagesPreview from '../../components/ImagesPreview';
import { PooStackScreens } from '../../navigation/enums';

const PooAgentResultsNextScreen: FC<PooAgentResultsScreenProps> = ({ navigation, route }) => {
  const { deicingTreatment } = useTreatmentsStore();

  return (
    <ContainerWithButton buttonLabel="Далее" onButtonPress={() => navigation.navigate(PooStackScreens.PooCode)}>
      <View style={styles.itemContainer}>
        <View style={{ ...layout.alignCenter, flex: 3 }}>
          <Icon name="poo" style={{ marginBottom: 20 }} />
          <Text style={fonts.paragraphRegular}>{deicingTreatment?.treatmentCar}</Text>
        </View>

        <View style={{ flex: 2 }}>
          <SimpleList>
            <SimpleList.Item title="Water" value={deicingTreatment?.spentWater?.toString()} hideBorder />
            <SimpleList.Item title="Type I" value={deicingTreatment?.spentLiquidOne?.toString()} hideBorder />
            <SimpleList.Item title="Type IV" value={deicingTreatment?.spentLiquidFour?.toString()} hideBorder />
          </SimpleList>
        </View>
      </View>

      {deicingTreatment?.images.length ? (
        <ImagesPreview
          items={deicingTreatment?.images.map(img => ({ id: img.id, comment: img.comment, uri: img.url }))}
          title="Фото чеков"
          containerStyle={{ marginTop: 32 }}
          isBase64
          showCommentsLabel={false}
        />
      ) : null}
    </ContainerWithButton>
  );
};

export default observer(PooAgentResultsNextScreen);

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: colors.gray.primary,
    paddingVertical: 8,
  },
});
