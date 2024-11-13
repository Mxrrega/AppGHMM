import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function MaquinaDetalhes({ handle, maquinaDetalhes }) {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
            <TouchableOpacity onPress={() => handle(false)} style={styles.iconButton}>
              <Icon name="arrow-left" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.title}>{maquinaDetalhes.nome || 'Detalhes da Máquina'}</Text>
            </View>
            
            <Image style={styles.image} source={{ uri: maquinaDetalhes.fotoUrl }} />
            <View style={styles.detailRow}>
                <Text style={styles.label}>Modelo:</Text>
                <Text style={styles.value}>{maquinaDetalhes.modelo}</Text>
            </View>
            <View style={styles.detailRow}>
                <Text style={styles.label}>Número de Série:</Text>
                <Text style={styles.value}>{maquinaDetalhes.numeroSerie}</Text>
            </View>
            <View style={styles.detailRow}>
                <Text style={styles.label}>Data de Aquisição:</Text>
                <Text style={styles.value}>{new Date(maquinaDetalhes.dataAquisicao).toLocaleDateString()}</Text>
            </View>
            <View style={styles.detailRow}>
                <Text style={styles.label}>Peso:</Text>
                <Text style={styles.value}>{maquinaDetalhes.peso} kg</Text>
            </View>
            <View style={styles.detailRow}>
                <Text style={styles.label}>Voltagem:</Text>
                <Text style={styles.value}>{maquinaDetalhes.voltagem}V</Text>
            </View>
            <View style={styles.detailRow}>
                <Text style={styles.label}>Detalhes:</Text>
                <Text style={styles.value}>{maquinaDetalhes.maquinaDetalhes}</Text>
            </View>
            <View style={styles.detailRow}>
                <Text style={styles.label}>Setor:</Text>
                <Text style={styles.value}>{maquinaDetalhes.setor.setorNome}</Text>
            </View>
            <View style={styles.detailRow}>
                <Text style={styles.label}>Tipo de Máquina:</Text>
                <Text style={styles.value}>{maquinaDetalhes.tipoMaquina.tipoMaquinaNome}</Text>
            </View>
            <View style={styles.detailRow}>
                <Text style={styles.label}>Fabricante:</Text>
                <Text style={styles.value}>{maquinaDetalhes.fabricante.fabricanteNome}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#1E1E1E',
    },
    header: {
        marginTop: 40,
        justifyContent: 'row'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 20,
        textAlign: 'center',
        marginTop: 0
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 8,
        marginBottom: 16,
        marginTop: 10
      },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    label: {
        fontSize: 16,
        color: '#AAAAAA',
        fontWeight: '600',
    },
    value: {
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'right',
        flexShrink: 1,
    },
});
