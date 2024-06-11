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
        backgroundColor: '#C0C0C0',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        borderWidth: 1,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',

    },
    image: {
        width: '90%',
        height: 200,
        marginBottom: 8,
        borderRadius: 8,
        alignSelf: 'center'
    },
});