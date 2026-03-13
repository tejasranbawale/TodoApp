import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import ReminderCard from '../components/ReminderCard';
import EditReminderModal from '../components/EditReminderModal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import AddReminderButton from '../components/AddReminderButton';
import AddReminderModal from '../components/AddReminderModal';
import {
  getReminders,
  updateReminder,
  removeReminder,
} from '../storage/reminderStorage';

import { Fonts } from '../theme/fonts';

export default function HomeScreen() {
  const [reminders, setReminders] = useState([]);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const [showReminderModal, setShowReminderModal] = useState(false);

  const loadReminders = async () => {
    const data = await getReminders();
    setReminders(data);
  };

  useEffect(() => {
    loadReminders();
  }, []);

  const handleSaveEdit = async updated => {
    await updateReminder(updated);
    setEditing(null);
    loadReminders();
  };

  const handleDelete = async () => {
    await removeReminder(deleting.id);
    setDeleting(null);
    loadReminders();
  };

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          fontFamily: Fonts.bold,
          fontSize: 28,
          fontWeight: 'bold',
          margin: 20,
          color: '#333',
        }}
      >
        Tasks
      </Text>
      <FlatList
        data={reminders}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ReminderCard
            item={item}
            onEdit={setEditing}
            onDelete={setDeleting}
          />
        )}
      />

      <AddReminderButton onPress={() => setShowReminderModal(true)} />

      <AddReminderModal
        visible={showReminderModal}
        onClose={() => setShowReminderModal(false)}
        onSave={loadReminders}
      />

      <EditReminderModal
        visible={!!editing}
        reminder={editing}
        onClose={() => setEditing(null)}
        onSave={handleSaveEdit}
      />

      <ConfirmDeleteModal
        visible={!!deleting}
        onCancel={() => setDeleting(null)}
        onConfirm={handleDelete}
      />
    </View>
  );
}
