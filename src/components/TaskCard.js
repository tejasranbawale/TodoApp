import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// export default function TaskCard({ item, onDelete }) {
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

export default function TaskCard({ item, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.time}>
          {item.Day} • {item.date} • {item.time}
        </Text>
        {item.note ? <Text style={styles.note}>{item.note}</Text> : null}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit(item)}>
          <Text>✏️</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onDelete(item)}>
          <Text>🗑</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: '600' },
  time: { marginTop: 4, color: '#555' },
  note: { marginTop: 4, fontSize: 12, color: '#777' },
  delete: { fontSize: 20, paddingLeft: 10 },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: 10,
    gap: 10,
  },
});
