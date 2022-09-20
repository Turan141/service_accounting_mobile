import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../../theme';

export default class ErrorBoundary extends Component<{}, { hasError: boolean }> {
  constructor(props: any) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.log({
      error,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Ошибка</Text>
          <Text style={styles.subtitle}>Произошла неизвестная ошибка</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
    backgroundColor: colors.background,
  },
  title: {
    ...fonts.titleMedium,
    marginBottom: 10,
    textAlign: 'center',
    color: colors.white,
  },
  subtitle: {
    ...fonts.paragraphRegular,
    textAlign: 'center',
    color: colors.gray.light,
  },
});
