import { StyleSheet, View, Text, StyleProp, ViewStyle, TouchableOpacity } from 'react-native';
import { colors, fonts } from '../../theme';
import React, { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { TouchableRipple } from 'react-native-paper';
import BackgroundTimer from 'react-native-background-timer';

interface TimerProps {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  disabled: boolean;
  time?: number;
  completed?: boolean;
}

const TimerWork: React.FC<TimerProps> = ({ style, completed = false, time = 0, disabled, onPress }) => {
  const [ms, setMs] = useState(time);
  const [stopped, setStopped] = useState(time === 0 || completed);
  const [fixed, setFixed] = useState(completed);

  useEffect(() => {
    if (!stopped) {
      const timer = BackgroundTimer.setInterval(() => {
        setMs(ms + 1000);
      }, 1000);
      return () => BackgroundTimer.clearInterval(timer);
    }
  }, [ms, stopped]);

  const handleTouch = useCallback(() => {
    if (stopped && !fixed) {
      setStopped(false);
      onPress();
    }
    if (!stopped && !fixed) {
      setStopped(true);
      setFixed(true);
      onPress();
    }
  }, [stopped, fixed]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.circle}>
        <TouchableOpacity disabled={disabled} onPress={handleTouch} style={styles.circle}>
          {stopped && !fixed ? (
            <Text style={[fonts.smallSemibold, styles.text]}>Начало работы</Text>
          ) : (
            <>
              <Text style={[fonts.bodySemibold, styles.time]}>{format(ms, 'mm:ss')}</Text>
              {!fixed && <Text style={[styles.text, fonts.smallRegular]}>Стоп</Text>}
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: colors.gray.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.gray.primary,
    textAlign: 'center',
    fontSize: 16,
  },
  time: {
    color: colors.black,
    fontSize: 26,
  },
});

export default TimerWork;
