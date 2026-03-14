import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <View
        style={{
          backgroundColor: '#6200EE', // Primary brand color / Nav bar color
          paddingTop: 16,
          paddingBottom: 20,
          paddingHorizontal: 20,
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <Text
          style={{
            fontFamily: Fonts.bold,
            fontSize: 28,
            fontWeight: 'bold',
            color: '#ffffff',
          }}
        >
          Tasks
        </Text>
      </View>
      <FlatList
        data={reminders}
        keyExtractor={item => item.id}
        contentContainerStyle={reminders.length === 0 ? { flex: 1, justifyContent: 'center' } : { padding: 10, paddingBottom: 80 }}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <Text style={{ fontSize: 18, color: '#666', marginBottom: 20, textAlign: 'center' }}>
              No tasks for today!
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#6200EE',
                paddingVertical: 12,
                paddingHorizontal: 24,
                borderRadius: 24,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 3,
              }}
              onPress={() => setShowReminderModal(true)}
            >
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
                Add your first task
              </Text>
            </TouchableOpacity>
          </View>
        }
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
    </SafeAreaView>
  );
}
