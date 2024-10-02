import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

export default function Maquinas({ maquinaFoto, maquinaModelo, maquinaNumeroSerie}) {
    return (
        <View style={styles.maquinaContainer}>
            <Image style={styles.image} source={{ uri: maquinaFoto }} />
            <Text style={styles.machineInfo}>Modelo: {maquinaModelo}</Text>
            <Text style={styles.machineInfo}>Número de Série: {maquinaNumeroSerie}</Text>
            <TouchableOpacity style={styles.infoButton}>
                <Text style={styles.infoButtonText}>Info</Text>
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
    infoButton: {
        backgroundColor: '#4682B4',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginTop: 10,
    },
    infoButtonText: {
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
