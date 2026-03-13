import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { saveReminder } from '../storage/reminderStorage';
import { scheduleNotification } from '../utils/notificationService';

const ALARM_OPTIONS = [
  { value: 'AT_TIME', label: 'At time of task' },
  { value: '10_MIN_BEFORE', label: '10 min before' },
  { value: '20_MIN_BEFORE', label: '20 min before' },
  { value: '1_DAY_BEFORE', label: '1 day before' },
];

export default function AddReminderModal({ visible, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [status, setStatus] = useState();
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [alarmTime, setAlarmTime] = useState('10_MIN_BEFORE');
  const [showAlarmDropdown, setShowAlarmDropdown] = useState(false);

  async function handleSave() {
    if (!title.trim()) {
      Alert.alert('Title required', 'Please enter a title before saving.');
      return;
    }

    const reminder = {
      id: `rem_${Date.now()}`,
      title,
      date: date.toISOString().split('T')[0],
      time: time.toTimeString().slice(0, 5),
      note,
      status,
      completed: false,
      alarmTime,
      createdAt: new Date().toISOString(),
    };

    await saveReminder(reminder);
    console.log('reminder : ', reminder);
    scheduleNotification(reminder);
    onSave();
    onClose();
  }

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.header}>Add Task</Text>

          <TextInput
            placeholder="Give Task Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />

          <TouchableOpacity
            onPress={() => setShowDate(true)}
            style={styles.picker}
          >
            <Text>Select Date: {date.toDateString()}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowTime(true)}
            style={styles.picker}
          >
            <Text>Select Time: {time.toTimeString().slice(0, 5)}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowAlarmDropdown(prev => !prev)}
            style={styles.picker}
          >
            <Text>
              Alarm time:{' '}
              {
                (ALARM_OPTIONS.find(o => o.value === alarmTime) ||
                  ALARM_OPTIONS[1]).label
              }
            </Text>
          </TouchableOpacity>

          {showAlarmDropdown && (
            <View style={styles.dropdown}>
              {ALARM_OPTIONS.map(option => (
                <TouchableOpacity
                  key={option.value}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setAlarmTime(option.value);
                    setShowAlarmDropdown(false);
                  }}
                >
                  <Text>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <TextInput
            placeholder="Note (optional)"
            value={note}
            onChangeText={setNote}
            style={[styles.input, { height: 60 }]}
            multiline
          />

          <View style={styles.actions}>
            <TouchableOpacity onPress={onClose}>
              <Text>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.save} onPress={handleSave}>
              <Text style={{ color: '#fff' }}>Save</Text>
            </TouchableOpacity>
          </View>

          {showDate && (
            <DateTimePicker
              value={date}
              mode="date"
              display="spinner"
              onChange={(e, d) => {
                setShowDate(false);
                if (d) setDate(d);
              }}
            />
          )}

          {showTime && (
            <DateTimePicker
              value={time}
              mode="time"
              display="spinner"
              onChange={(e, t) => {
                setShowTime(false);
                if (t) setTime(t);
              }}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
  },
  header: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  picker: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F2F2F2',
    marginBottom: 10,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  save: {
    backgroundColor: '#000000ff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
});
