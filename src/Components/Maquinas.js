import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

export default function Maquinas({ maquinaFoto, maquinaModelo, maquinaNumeroSerie }) {
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
      },
    image: {
        width: '80%',
        height: 150,
        marginBottom: 8,
        borderRadius: 8,
        alignSelf: 'center'
    },
    infoButton: {
        backgroundColor: '#4682B4',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 5,
      },
      infoButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
      },
      machineInfo: {
        fontSize: 14,
        color: '#333',
        marginVertical: 5,
        textAlign: 'center',
      },
});