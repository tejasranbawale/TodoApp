import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function AddTaskButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.text}>＋</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#000000ff',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { color: '#fff', fontSize: 30 },
});
