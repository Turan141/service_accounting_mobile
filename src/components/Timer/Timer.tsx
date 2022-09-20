import { StyleSheet, View, Text } from 'react-native';
import { colors, fonts } from '../../theme';
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import BackgroundTimer from 'react-native-background-timer';

interface TimerProps {
  time: number;
  stopped?: boolean;
}

const Timer: React.FC<TimerProps> = ({ time, stopped = false }) => {
  const [status, setStatus] = useState({
    stopped: stopped,
    direction: time > 600000 ? 'forward' : 'backwards',
    type: time > 600000 ? 'Платный простой:' : 'Бесплатный простой:',
  });

  const [ms, setMs] = useState(Math.abs(600000 - time || 600000));

  useEffect(() => {
    if (!stopped) {
      if (ms - 1000 === 0 && status.direction === 'backwards') {
        setStatus(prev => ({ ...prev, direction: 'forward', type: 'Платный простой:' }));
      }
      if (status.direction === 'backwards') {
        const timer = BackgroundTimer.setInterval(() => {
          setMs(ms - 1000);
        }, 1000);
        return () => BackgroundTimer.clearInterval(timer);
      }
      if (status.direction === 'forward') {
        const timer = BackgroundTimer.setInterval(() => {
          setMs(ms + 1000);
        }, 1000);
        return () => BackgroundTimer.clearInterval(timer);
      }
    }
  }, [ms, stopped]);

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Text style={[styles.text, fonts.smallRegular]}>{status.type}</Text>
        <Text style={[fonts.bodySemibold, styles.time]}> {format(ms, 'mm:ss')}</Text>
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
  },
  time: {
    color: colors.black,
    fontSize: 26,
  },
});

export default Timer;
