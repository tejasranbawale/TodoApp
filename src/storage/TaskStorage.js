
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const KEY = 'USER_TaskS';

// export async function saveTask(Task) {
//   const existing = await getTasks();
//   const updated = [...existing, Task];
//   await AsyncStorage.setItem(KEY, JSON.stringify(updated));
// }

// export async function getTasks() {
//   const data = await AsyncStorage.getItem(KEY);
//   return data ? JSON.parse(data) : [];
// }

// export async function removeTask(id) {
//   const Tasks = await getTasks();
//   const filtered = Tasks.filter(r => r.id !== id);
//   await AsyncStorage.setItem(KEY, JSON.stringify(filtered));
// }


import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'USER_TaskS';

export async function getTasks() {
  const data = await AsyncStorage.getItem(KEY);
  const parsed = data ? JSON.parse(data) : [];
  if (!Array.isArray(parsed)) return [];

  // Backward-compatible default for older Tasks.
  return parsed.map(r => ({
    ...r,
    completed: r?.completed === true,
    alarmTime: r?.alarmTime || '30_MIN_BEFORE',
  }));
}

export async function saveTask(Task) {
  const existing = await getTasks();
  await AsyncStorage.setItem(KEY, JSON.stringify([...existing, Task]));
}

export async function updateTask(updatedTask) {
  const Tasks = await getTasks();
  const updated = Tasks.map(r =>
    r.id === updatedTask.id ? updatedTask : r,
  );
  await AsyncStorage.setItem(KEY, JSON.stringify(updated));
}

export async function removeTask(id) {
  const Tasks = await getTasks();
  const filtered = Tasks.filter(r => r.id !== id);
  await AsyncStorage.setItem(KEY, JSON.stringify(filtered));
}
