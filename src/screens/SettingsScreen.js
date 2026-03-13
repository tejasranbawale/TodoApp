import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const [oneDayBefore, setOneDayBefore] = useState(true);

  useEffect(() => {
    (async () => {
      const s = await AsyncStorage.getItem('settings');
      if (s) setOneDayBefore(JSON.parse(s).oneDayBefore);
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('settings', JSON.stringify({ oneDayBefore }));
  }, [oneDayBefore]);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontWeight: '700', fontSize: 18, marginBottom: 18 }}>
        Reminders
      </Text>
      <View style={styles.row}>
        <Text>Notify 1 day before</Text>
        <Switch value={oneDayBefore} onValueChange={setOneDayBefore} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
});
