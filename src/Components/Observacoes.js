import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { format } from 'date-fns';

export default function Observacoes({ observacaoDescricao, observacaoLocal, observacaoData }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{observacaoDescricao}</Text>
      <Text style={styles.text}>{observacaoLocal}</Text>
      <Text style={styles.text}>{format(observacaoData, 'dd/MM/yyyy HH:mm')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
});