import React, { useState } from 'react';
import { View, TextInput, Text, FlatList, StyleSheet, Image, TouchableOpacity, Modal, Button } from 'react-native';

export default function Buscar() {

  const [query, setQuery] = useState('');
  const [machines, setMachines] = useState([]);
  const [error, setError] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null); // Estado para armazenar a máquina selecionada

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

  // Função que abre o modal com os detalhes da máquina
  const handleShowDetails = async (maquinaId) => {
    try {
      const response = await fetch(process.env.EXPO_PUBLIC_URL + `/api/Maquina/GetMaquinaById/${maquinaId}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = await response.json();
      setSelectedMachine(data); 
    } catch (err) {
      console.error('Erro ao carregar detalhes da máquina:', err);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image style={styles.image} source={{ uri: item.fotoUrl }} />
      <Text style={styles.itemText}>{item.nome}</Text>
      <TouchableOpacity
        style={styles.detalhesButton}
        onPress={() => handleShowDetails(item.maquinaId)}
      >
        <Text style={styles.detalhesButtonText}>Detalhes</Text>
      </TouchableOpacity>
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
        keyExtractor={(item) => item.maquinaId.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma máquina encontrada</Text>}
      />

      {selectedMachine && (
        <Modal
          visible={selectedMachine !== null}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setSelectedMachine(null)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Detalhes da Máquina: </Text>
              <Text style={styles.modalTitle}>{selectedMachine.nome}</Text>
              <Image style={styles.modalImage} source={{ uri: selectedMachine.fotoUrl }} />
              <View style={styles.detailsContainer}>
                <Text style={styles.modalText}><Text style={styles.bold}>Nome:</Text> {selectedMachine.nome}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Tipo:</Text> {selectedMachine.tipoMaquinaId}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Setor:</Text> {selectedMachine.setorId}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Modelo:</Text> {selectedMachine.modelo}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Número de Série:</Text> {selectedMachine.numeroSerie}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Fabricante:</Text> {selectedMachine.fabricanteId}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Data de Aquisição:</Text> {new Date(selectedMachine.dataAquisicao).toLocaleString()}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Peso:</Text> {selectedMachine.peso} kg</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Voltagem:</Text> {selectedMachine.voltagem}V</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Detalhes:</Text> {selectedMachine.maquinaDetalhes}</Text>
              </View>

              <TouchableOpacity
                onPress={() => setSelectedMachine(null)}
                style={styles.detalhesButton} 
              >
                <Text style={styles.detalhesButtonText}>fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
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
  detalhesButton: {
    backgroundColor: '#696767',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginTop: 10,
  },
  detalhesButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
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
    width: 100,
    height: 100,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalImage: {
    width: 120,
    height: 120,
    marginBottom: 10,
    borderRadius: 8,
  },
  modalText: {
    fontSize: 14,
    marginVertical: 4,
    textAlign: 'left',
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
  },
  detailsContainer: {
    marginVertical: 12,
    width: '100%',
  }
});
