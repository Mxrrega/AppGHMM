import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Configuracoes({handle}) {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
      <TouchableOpacity onPress={() => handle(false)} style={styles.backButton}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.title}>Configurações</Text>
      </View>

      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>Conta</Text>
        <MaterialCommunityIcons name="chevron-right" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>Notificações</Text>
        <MaterialCommunityIcons name="chevron-right" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>Armazenamento</Text>
        <MaterialCommunityIcons name="chevron-right" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>Sobre</Text>
        <MaterialCommunityIcons name="chevron-right" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 20,
  },
  header: {
    marginTop: 30
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  menuText: {
    fontSize: 18,
    color: 'white',
  },
});
