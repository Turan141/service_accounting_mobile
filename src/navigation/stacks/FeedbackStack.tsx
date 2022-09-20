import React, { FC } from 'react';
import { colors } from '../../theme';
import { fontFamilyRegular } from '../../theme/fonts';
import { createStackNavigator } from '@react-navigation/stack';

import { BackButton } from '../../ui-kit/Buttons';

import { FeedbackStackScreens } from '../enums';
import { FeedbackScreen } from '../../screens/feedback';
import { FeedbackStackParamList } from '../params';
import BurgerButton from '../../ui-kit/Buttons/BurgerButton';

const Stack = createStackNavigator<FeedbackStackParamList>();

const FeedbackStack: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={FeedbackStackScreens.Feedback}
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
        name={FeedbackStackScreens.Feedback}
        component={FeedbackScreen}
        options={{
          title: 'Обратная связь',
          headerLeft: null,
        }}
      />
    </Stack.Navigator>
  );
};

export const FEEDBACK_STACK = 'FeedbackStack';

export default FeedbackStack;
