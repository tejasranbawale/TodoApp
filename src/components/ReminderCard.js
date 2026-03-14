import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// export default function ReminderCard({ item, onDelete }) {
//   return (
//     <View style={styles.card}>
//       <View style={{ flex: 1 }}>
//         <Text style={styles.title}>{item.title}</Text>
//         <Text style={styles.time}>
//           {item.Day} • {item.date} • {item.time}
//         </Text>
//         {item.note ? <Text style={styles.note}>{item.note}</Text> : null}
//       </View>

//       {/* <TouchableOpacity onPress={() => onDelete(item.id)}>
//         <Text style={styles.delete}>🗑️</Text>
//       </TouchableOpacity> */}

//       <View style={styles.actions}>
//         <TouchableOpacity onPress={() => openEditModal(item)}>
//           <Text>✏️ Edit</Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => confirmDelete(item)}>
//           <Text>🗑 Delete</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

export default function ReminderCard({ item, onEdit, onDelete }) {
  console.log('item : ', item);
  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.title}</Text>
          {item.completed ? <Text style={styles.tick}>✔</Text> : null}
        </View>
        <Text style={styles.time}>
          {item.Day} • {item.date} • {item.time}
        </Text>
        {item.note ? <Text style={styles.note}>{item.note}</Text> : null}
      </View>

      <View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => onEdit(item)}>
            {/* <Icon name="edit" size={20} color="#333" /> */}
            <Text style={{ fontSize: 20 }}>✏️</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onDelete(item)}>
            {/* <Icon name="delete-outline" size={22} color="#d11a2a" /> */}
            <Text style={{ fontSize: 20 }}>🗑</Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={{ fontSize: 8.5, color: '#555', marginTop: 10 }}>Alarm Time: {item.alarmTime}</Text>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: { fontSize: 18, fontWeight: '700', color: '#333' },
  tick: { marginLeft: 8, fontSize: 16, color: '#4caf50' },
  time: { fontSize: 13, color: '#666', fontWeight: '500' },
  note: { marginTop: 6, fontSize: 14, color: '#888', fontStyle: 'italic' },
  delete: { fontSize: 20, paddingLeft: 10 },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: 10,
    gap: 16,
  },
});
