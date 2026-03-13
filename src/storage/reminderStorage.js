
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const KEY = 'USER_REMINDERS';

// export async function saveReminder(reminder) {
//   const existing = await getReminders();
//   const updated = [...existing, reminder];
//   await AsyncStorage.setItem(KEY, JSON.stringify(updated));
// }

// export async function getReminders() {
//   const data = await AsyncStorage.getItem(KEY);
//   return data ? JSON.parse(data) : [];
// }

// export async function removeReminder(id) {
//   const reminders = await getReminders();
//   const filtered = reminders.filter(r => r.id !== id);
//   await AsyncStorage.setItem(KEY, JSON.stringify(filtered));
// }


import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'USER_REMINDERS';

export async function getReminders() {
  const data = await AsyncStorage.getItem(KEY);
  const parsed = data ? JSON.parse(data) : [];
  if (!Array.isArray(parsed)) return [];

  // Backward-compatible default for older reminders.
  return parsed.map(r => ({
    ...r,
    completed: r?.completed === true,
    alarmTime: r?.alarmTime || '30_MIN_BEFORE',
  }));
}

export async function saveReminder(reminder) {
  const existing = await getReminders();
  await AsyncStorage.setItem(KEY, JSON.stringify([...existing, reminder]));
}

export async function updateReminder(updatedReminder) {
  const reminders = await getReminders();
  const updated = reminders.map(r =>
    r.id === updatedReminder.id ? updatedReminder : r,
  );
  await AsyncStorage.setItem(KEY, JSON.stringify(updated));
}

export async function removeReminder(id) {
  const reminders = await getReminders();
  const filtered = reminders.filter(r => r.id !== id);
  await AsyncStorage.setItem(KEY, JSON.stringify(filtered));
}
