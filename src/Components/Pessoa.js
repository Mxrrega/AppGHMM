import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

export default function Pessoa({ pessoaNome, pessoaFoto }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{pessoaNome}</Text>
            <Image style={styles.image} source={{ uri: pessoaFoto }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        marginVertical: 10, 
        marginHorizontal: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 8,
        borderRadius: 8,
    },
    category: {
        fontSize: 16,
        marginBottom: 4,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});