import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

const HistoryScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>History Screen</Text>
      <Text style={styles.subText}>Past ECGs, trend analysis and logs</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subText: {
    fontSize: 14,
    color: '#666',
  },
});

export default HistoryScreen;
