import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

export default function Maquinas({item, onDelete, setor }) {
    return (
        setor == item.setorId &&
        <View style={styles.maquinaContainer}>
            <Image style={styles.image} source={{ uri: item.fotoUrl }} />
            <Text style={styles.machineInfo}>Modelo: {item.modelo}</Text>
            <Text style={styles.machineInfo}>Número de Série: {item.numeroSerie}</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    maquinaContainer: {
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 15,
        backgroundColor: '#2C2C2C',
        borderRadius: 10,
        padding: 10,
        width: 250,
    },
    image: {
        width: '100%',
        height: 150,
        marginBottom: 8,
        borderRadius: 8,
        alignSelf: 'center',
    },
    deleteButton: {
        backgroundColor: '#FF6347',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginTop: 10,
    },
    deleteButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    machineInfo: {
        fontSize: 14,
        color: '#FFFFFF',
        marginVertical: 2,
        textAlign: 'center',
    },
});
