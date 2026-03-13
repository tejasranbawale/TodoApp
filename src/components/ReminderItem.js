import React from 'react';
import { View, Text, Button, Alert } from 'react-native';

const ReminderItem = ({ item, onEdit, onDelete }) => {
  const confirmDelete = () => {
    Alert.alert(
      'Delete Reminder',
      'Are you sure you want to delete this reminder?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => onDelete(item) },
      ],
    );
  };

  return (
    <View style={{ padding: 12 }}>
      <Text>{item.title}</Text>
      <Text>{new Date(item.datetime).toLocaleString()}</Text>

      <Button title="Edit" onPress={() => onEdit(item)} />
      <Button title="Delete" color="red" onPress={confirmDelete} />
    </View>
  );
};

export default ReminderItem;
