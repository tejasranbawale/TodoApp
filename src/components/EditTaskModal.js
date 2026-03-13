import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from 'react-native';

const ALARM_OPTIONS = [
  { value: 'AT_TIME', label: 'At time of task' },
  { value: '10_MIN_BEFORE', label: '10 min before' },
  { value: '20_MIN_BEFORE', label: '20 min before' },
  { value: '1_DAY_BEFORE', label: '1 day before' },
];

export default function EditTaskModal({
  visible,
  Task,
  onClose,
  onSave,
}) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [note, setNote] = useState('');
  const [completed, setCompleted] = useState(false);
  const [alarmTime, setAlarmTime] = useState('10_MIN_BEFORE');
  const [showAlarmDropdown, setShowAlarmDropdown] = useState(false);

  useEffect(() => {
    if (Task) {
      setTitle(Task.title);
      setDate(Task.date);
      setTime(Task.time);
      setNote(Task.note || '');
      setCompleted(Task.completed === true);
      setAlarmTime(Task.alarmTime || '10_MIN_BEFORE');
    }
  }, [Task]);

  if (!Task) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.header}>Edit Task</Text>

          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Title"
          />
          <TextInput
            style={styles.input}
            value={note}
            onChangeText={setNote}
            placeholder="Description"
          />
          <TextInput
            style={styles.input}
            value={date}
            onChangeText={setDate}
            placeholder="Due date (YYYY-MM-DD)"
          />
          <TextInput
            style={styles.input}
            value={time}
            onChangeText={setTime}
            placeholder="Task time (HH:MM)"
          />

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

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Mark as completed</Text>
            <Switch value={completed} onValueChange={setCompleted} />
          </View>

          <View style={styles.actions}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                onSave({
                  ...Task,
                  title,
                  date,
                  time,
                  note,
                  completed,
                  alarmTime,
                })
              }>
              <Text style={styles.save}>Save</Text>
            </TouchableOpacity>
          </View>
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
    padding: 20,
  },
  modal: { backgroundColor: '#fff', borderRadius: 14, padding: 20 },
  header: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
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
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    marginTop: 2,
  },
  switchLabel: { color: '#222', fontWeight: '600' },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  cancel: { color: '#555' },
  save: { color: '#4F46E5', fontWeight: '700' },
});
