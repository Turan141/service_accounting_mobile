import React, { FC, useCallback, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, layout } from '../../theme';

import { ContainerWithButton } from '../../ui-kit/Containers';
import { FormGroup, ImagePicker } from '../../ui-kit/Forms';
import { IconButton } from 'react-native-paper';
import { SimpleList } from '../../ui-kit/Lists';
import Divider from '../../ui-kit/Divider';
import TextInput from '../../ui-kit/TextInput';
import RadionButton from '../../ui-kit/RadioButton/RadionButton';
import Paper from '../../ui-kit/Paper';
import ImagesPreview from '../../components/ImagesPreview';

import { useFormik } from 'formik';
import { ImageAsset, WeightUnit, WeightUnitsEnum } from '../../services/data';
import { useNavigation } from '@react-navigation/native';
import { MaintenanceScreenNavigationProp } from '../../navigation/props';

interface RefuelingFormValues {
  photos: ImageAsset[];
  unit: WeightUnit;
  remainingFuel: {
    left: number;
    center: number;
    right: number;
  };
  fuelDensity: number;
  totalFueling: number;
  refuelingReqNumber: number;
  calculationsResult: number;
}

const RefuelingScreen: FC = () => {
  const navigation = useNavigation<MaintenanceScreenNavigationProp>();
  const [isCalculated, setIsCalculated] = useState(false);
  const [showRefuelingReqNumber, setShowRefuelingReqNumber] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      cardStyle: {
        backgroundColor: null,
      },
    });
  }, []);

  const handleShowRefuelingReqNumber = useCallback(() => {
    setIsCalculated(false);
    setShowRefuelingReqNumber(true);
  }, []);

  const handleCalculate = useCallback((values: RefuelingFormValues) => {
    console.log({
      values,
    });

    setIsCalculated(true);
  }, []);

  const { values, handleChange, setFieldValue, handleSubmit } = useFormik<RefuelingFormValues>({
    initialValues: {
      photos: [],
      unit: WeightUnitsEnum.KG,
      remainingFuel: {
        left: 0,
        center: 0,
        right: 0,
      },
      fuelDensity: 0.798,
      totalFueling: 13500,
      refuelingReqNumber: 9847,
      calculationsResult: 19800,
    },
    onSubmit: handleCalculate,
  });

  return (
    <ContainerWithButton
      buttonLabel="????????????????????"
      onButtonPress={handleSubmit}
      scrollViewProps={{
        contentContainerStyle: {
          padding: 0,
        },
      }}
    >
      <Paper>
        <ImagePicker label="???????? ???????????????? ???? ??????????" onSelect={photos => setFieldValue('photos', photos)} />

        <Divider />

        <Text style={styles.title}>?????????????? ??????????????????</Text>
        <RadionButton.Group value={values.unit} onChange={(value: string) => setFieldValue('unit', value)}>
          <View style={layout.rowAlignItemsCenter}>
            <RadionButton value={WeightUnitsEnum.KG} label="????" />
            <RadionButton value={WeightUnitsEnum.LB} label="lb" />
          </View>
        </RadionButton.Group>

        <Divider />

        <FormGroup>
          <Text style={styles.title}>?????????????? ?????????????? ???? ??????????</Text>

          <View style={layout.rowSpaceBetween}>
            <View style={{ flexBasis: '32%' }}>
              <TextInput
                label="??????????"
                value={values.remainingFuel.left?.toString()}
                onChangeText={handleChange('remainingFuel.left')}
                keyboardType="numeric"
              />
            </View>

            <View style={{ flexBasis: '32%' }}>
              <TextInput
                label="??????????????????????"
                value={values.remainingFuel.center?.toString()}
                onChangeText={handleChange('remainingFuel.center')}
                keyboardType="numeric"
              />
            </View>

            <View style={{ flexBasis: '32%' }}>
              <TextInput
                label="????????????"
                value={values.remainingFuel.right?.toString()}
                onChangeText={handleChange('remainingFuel.right')}
                keyboardType="numeric"
              />
            </View>
          </View>
        </FormGroup>

        <FormGroup>
          <Text style={styles.title}>?????????????????? ??????????????</Text>

          <TextInput
            label="??????????????????"
            value={values.fuelDensity?.toString()}
            onChangeText={handleChange('fuelDensity')}
            keyboardType="numeric"
          />
        </FormGroup>

        <FormGroup>
          <TextInput
            label="?????????? ????????????????"
            value={values.totalFueling?.toString()}
            onChangeText={handleChange('totalFueling')}
            keyboardType="numeric"
          />
        </FormGroup>

        {isCalculated && (
          <View>
            <SimpleList>
              <SimpleList.Item
                title="?????????? ????????????????"
                value={values.calculationsResult?.toString()}
                hideBorder
                titleStyle={fonts.subtitleBold}
                valueStyle={fonts.subtitleBold}
              />
            </SimpleList>

            <FormGroup>
              <TextInput
                label="?????????? ???????????????????? ???? ????????????????"
                value={values.refuelingReqNumber?.toString()}
                onChangeText={handleChange('refuelingReqNumber')}
                keyboardType="numeric"
              />
            </FormGroup>

            {!showRefuelingReqNumber && (
              <View style={layout.alignCenter}>
                <IconButton
                  icon="plus"
                  size={45}
                  onPress={handleShowRefuelingReqNumber}
                  style={{
                    backgroundColor: colors.gray.secondary,
                    padding: 0,
                    margin: 0,
                    width: 45,
                    height: 45,
                  }}
                  color={colors.white}
                />
              </View>
            )}
          </View>
        )}
      </Paper>

      {showRefuelingReqNumber && (
        <Paper title={`?????????? ???????????????????? ???? ???????????????? ${values.refuelingReqNumber}`} titleStyle={fonts.paragraphSemibold}>
          {values.photos.length > 0 && <ImagesPreview title="???????? ???????????????? ???? ??????????" items={values.photos} />}

          <Divider style={{ marginBottom: 0 }} />

          <SimpleList>
            <SimpleList.Item title="?????????????? ??????????????????" value={values.unit} />
            <SimpleList.Item
              title="?????????????? ?????????????? ???? ??????????"
              value={`??????????: ${values.remainingFuel.left}\n??????????????????????: ${values.remainingFuel.center}\n????????????: ${values.remainingFuel.right}`}
              valueStyle={{
                textAlign: 'right',
              }}
            />
            <SimpleList.Item
              title="?????????????????? ??????????????"
              value={`??????????????????: ${values.fuelDensity}\n?????????? ????????????????: ${values.totalFueling}`}
              valueStyle={{
                textAlign: 'right',
              }}
            />
            <SimpleList.Item title="?????????? ????????????????" value={values.calculationsResult.toString()} hideBorder />
          </SimpleList>
        </Paper>
      )}
    </ContainerWithButton>
  );
};

export default RefuelingScreen;

const styles = StyleSheet.create({
  title: {
    ...fonts.paragraphRegular,
    marginVertical: 10,
  },
});
