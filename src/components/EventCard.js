import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EventCard({ item }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.date}>
        {item.date} | {item.day}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  name: { fontSize: 16, fontWeight: '600' },
  date: { marginTop: 6, color: '#555' },
});
