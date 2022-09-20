import React, { FC } from 'react';
import { colors } from '../../theme';
import { fontFamilyRegular } from '../../theme/fonts';
import { createStackNavigator } from '@react-navigation/stack';

import { BackButton } from '../../ui-kit/Buttons';

import { PhotofixationStackScreens } from '../enums';
import { PhotofixationScreen } from '../../screens/photofixation';
import { PhotofixationStackParamList } from '../params';
import BurgerButton from '../../ui-kit/Buttons/BurgerButton';
import { useLoginStore } from '../../store/hooks';

const Stack = createStackNavigator<PhotofixationStackParamList>();

const PhotofixationStack: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={PhotofixationStackScreens.Photofixation}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontSize: 16,
          fontFamily: fontFamilyRegular,
        },
        headerRight: () => <BurgerButton />,
        headerLeft: ({ onPress }) => <BackButton onPress={onPress} />,
        cardStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
      <Stack.Screen
        name={PhotofixationStackScreens.Photofixation}
        component={PhotofixationScreen}
        options={{
          title: 'Фотофиксация',
          headerLeft: null,
        }}
      />
    </Stack.Navigator>
  );
};

export const PHOTOFIXATION_STACK = 'PhotofixationStack';

export default PhotofixationStack;
