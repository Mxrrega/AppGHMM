import React, { useState } from 'react';
import { View, TextInput, Text, FlatList, StyleSheet, Image } from 'react-native';

export default function Buscar() {

  const [query, setQuery] = useState('');
  const [machines, setMachines] = useState([]);
  const [error, setError] = useState(false);

  const searchMachines = async (searchText) => {
    if (searchText.length === 0) {
      setMachines([]);
      return;
    }

    try {
      const response = await fetch(process.env.EXPO_PUBLIC_URL + '/api/Maquina/GetAllMaquinas', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = await response.json();
      
      const filteredMachines = data.filter(machine =>
        machine.nome.includes(searchText)
      );

      setMachines(filteredMachines);
      setError(false);
    } catch (err) {
      setError(true);
      console.error('Erro ao buscar máquinas:', err);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image style={styles.image} source={{ uri: item.fotoUrl }} />
      <Text style={styles.itemText}>{item.nome}</Text>
      
    </View>
  );

  return (
    <View style={styles.container}>
        <View style={styles.subHeader}>
        <Text style={styles.titulo}>Buscar</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquise a máquina"
        value={query}
        onChangeText={(text) => {
          setQuery(text);
          searchMachines(text);
        }}
      />
      </View>

      {error && <Text style={styles.errorText}>Erro ao buscar máquinas. Tente novamente.</Text>}

      <FlatList
        data={machines}
        keyExtractor={(item) => item.maquinaId}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma máquina encontrada</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E1E1E',
      },
      subHeader: {
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
        marginTop: 30,
      },
  searchInput: {
    height: 50,
    width: '95%',
    backgroundColor: '#2E2E2E',
    borderRadius: 12,
    paddingHorizontal: 16,
    color: '#fff',
    marginBottom: 16,
  },
  titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        padding: 20,
  },
  itemContainer: {
    backgroundColor: '#444',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    marginHorizontal: 16, 
    alignItems: 'center', 
  },
  image: {
    width: 200, 
    height: 200,
    marginBottom: 8,
    borderRadius: 8,
  },
  itemText: {
    color: '#fff',
    textAlign: 'center', 
    fontSize: 16,
    marginTop: 4,
  },
  emptyText: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 16,
  },
});