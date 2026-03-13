import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function LatestReminderModal({ visible, reminder, onClose }) {
    if (!reminder) return null;

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.header}>Latest Reminder</Text>

                    <Text style={styles.title}>{reminder.title}</Text>
                    <Text style={styles.time}>
                        {reminder.Day} • {reminder.date} • {reminder.time}
                    </Text>

                    {reminder.note ? (
                        <Text style={styles.note}>{reminder.note}</Text>
                    ) : null}

                    <TouchableOpacity style={styles.button} onPress={onClose}>
                        <Text style={styles.btnText}>Got it</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
        justifyContent: 'center',
        padding: 20,
    },
    modal: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
    },
    header: { fontSize: 16, color: '#666' },
    title: { fontSize: 20, fontWeight: '700', marginTop: 8 },
    time: { marginTop: 6, color: '#444' },
    note: { marginTop: 8, color: '#555' },
    button: {
        marginTop: 16,
        backgroundColor: '#4F46E5',
        padding: 12,
        borderRadius: 10,
    },
    btnText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
});
