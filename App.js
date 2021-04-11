import React from 'react';
import { SafeAreaView, StyleSheet, } from 'react-native';
import Accel from './app/screens/Accel'

export default function App() {
  return (
    <SafeAreaView>
      <Accel />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
