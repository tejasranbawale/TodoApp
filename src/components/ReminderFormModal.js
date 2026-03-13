import React, { useState, useEffect } from 'react';
import { Modal, View, TextInput, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import uuid from 'react-native-uuid';

const ReminderFormModal = ({ visible, onClose, onSave, reminder }) => {
  const isEdit = !!reminder;

  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (reminder) {
      setTitle(reminder.title);
      setNote(reminder.note);
      setDate(new Date(reminder.datetime));
    }
  }, [reminder]);

  const handleSave = () => {
    console.log('saving');
    const data = {
      id: isEdit ? reminder.id : uuid.v4(),
      title,
      note,
      datetime: date.toISOString(),
    };
    onSave(data);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ padding: 20 }}>
        <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
        <TextInput placeholder="Note" value={note} onChangeText={setNote} />

        <DateTimePicker
          value={date}
          mode="datetime"
          onChange={(e, d) => setDate(d)}
        />

        <Button
          title={isEdit ? 'Update Reminder' : 'Add Reminder'}
          onPress={handleSave}
        />
        <Button title="Cancel" onPress={onClose} />
      </View>
    </Modal>
  );
};

export default ReminderFormModal;
