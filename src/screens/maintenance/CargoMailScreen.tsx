import React, { FC, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fonts, layout } from '../../theme';

import { ContainerWithButton } from '../../ui-kit/Containers';
import { FormGroup } from '../../ui-kit/Forms';
import TextInput from '../../ui-kit/TextInput';

import { useFormik } from 'formik';
import Switch from '../../ui-kit/Switch';

interface CargoMailFormValues {
  cargo: {
    weight: string;
    places: string;
  };
  mail: {
    weight: string;
    places: string;
  };
  commandPost: {
    places: string;
    additionalInfo: string;
  };
}

const CargoMailScreen: FC = () => {
  const [commandPostSwitch, setCommandPostSwitch] = useState(false);

  const { values, handleChange } = useFormik<CargoMailFormValues>({
    initialValues: {
      cargo: {
        weight: '',
        places: '',
      },
      mail: {
        weight: '',
        places: '',
      },
      commandPost: {
        places: '',
        additionalInfo: '',
      },
    },
    onSubmit: () => {},
  });

  return (
    <ContainerWithButton label="Прилет">
      <Text style={styles.subtitle}>Груз</Text>

      <FormGroup>
        <TextInput
          label="Масса"
          value={values.cargo.weight.toString()}
          onChangeText={handleChange('cargo.weight')}
          keyboardType="numeric"
        />
      </FormGroup>

      <FormGroup>
        <TextInput
          label="Мест"
          value={values.cargo.places.toString()}
          onChangeText={handleChange('cargo.places')}
          keyboardType="numeric"
        />
      </FormGroup>

      <Text style={styles.subtitle}>Почта</Text>
      <FormGroup>
        <TextInput
          label="Масса"
          value={values.mail.weight.toString()}
          onChangeText={handleChange('mail.weight')}
          keyboardType="numeric"
        />
      </FormGroup>

      <FormGroup>
        <TextInput
          label="Мест"
          value={values.mail.places.toString()}
          onChangeText={handleChange('mail.places')}
          keyboardType="numeric"
        />
      </FormGroup>

      <View style={{ ...layout.rowSpaceBetween, marginBottom: 20 }}>
        <Text style={{ ...styles.subtitle, marginBottom: 0 }}>Командирская почта</Text>

        <Switch value={commandPostSwitch} onChange={() => setCommandPostSwitch(!commandPostSwitch)} />
      </View>

      <FormGroup>
        <TextInput
          label="Мест"
          value={values.commandPost.places.toString()}
          onChangeText={handleChange('commandPost.places')}
          keyboardType="numeric"
        />
      </FormGroup>

      <FormGroup>
        <TextInput
          label="Дополнительная информация"
          value={values.commandPost.additionalInfo}
          onChangeText={handleChange('commandPost.additionalInfo')}
        />
      </FormGroup>
    </ContainerWithButton>
  );
};

export default CargoMailScreen;

const styles = StyleSheet.create({
  subtitle: {
    ...fonts.paragraphSemibold,
    marginBottom: 20,
  },
});
