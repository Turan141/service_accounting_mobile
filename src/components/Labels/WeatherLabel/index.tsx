import React, { FC } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
import { fonts, layout } from '../../../theme';

export interface WeatherLabelProps {
  degree: number;
  weatherLabelStyle?: StyleProp<TextStyle>;
  temperatureLabelStyle?: StyleProp<TextStyle>;
  degreeLabelStyle?: StyleProp<TextStyle>;
  extended?: boolean;
  condition?: string;
}

const WeatherLabel: FC<WeatherLabelProps> = ({
  degree,
  weatherLabelStyle,
  temperatureLabelStyle,
  degreeLabelStyle,
  extended,
  condition,
}) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={[fonts.subtitleSemibold, weatherLabelStyle]}>Погода</Text>

        {!extended && (
          <View style={layout.rowAlignItemsCenter}>
            <Text style={[styles.temperatureLabel, temperatureLabelStyle]}>Температура</Text>
            <Text style={[fonts.bodySemibold, degreeLabelStyle]}>{degree} °C</Text>
          </View>
        )}
      </View>

      {extended && (
        <View style={layout.rowSpaceBetween}>
          <Text style={[fonts.bodySemibold, degreeLabelStyle]}>t {degree} °C</Text>
          {condition && <Text style={[styles.conditionLabel]}>{condition}</Text>}
        </View>
      )}
    </>
  );
};

export default WeatherLabel;

const styles = StyleSheet.create({
  container: {
    ...layout.rowSpaceBetween,
    paddingVertical: 10,
  },
  temperatureLabel: {
    ...fonts.paragraphRegular,
    marginRight: 20,
  },
  conditionLabel: {
    ...fonts.paragraphSemibold,
    textAlign: 'right',
  },
});
