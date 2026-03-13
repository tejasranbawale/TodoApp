import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ConfirmDeleteModal({
    visible,
    onCancel,
    onConfirm,
}) {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.text}>
                        Are you sure you want to delete this Task?
                    </Text>

                    <View style={styles.actions}>
                        <TouchableOpacity onPress={onCancel}>
                            <Text style={styles.cancel}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={onConfirm}>
                            <Text style={styles.delete}>Delete</Text>
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
    text: { fontSize: 16, marginBottom: 16 },
    actions: { flexDirection: 'row', justifyContent: 'space-between' },
    cancel: { color: '#555' },
    delete: { color: '#DC2626', fontWeight: '700' },
});
