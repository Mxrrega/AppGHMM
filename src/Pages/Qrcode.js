import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function QRCodeScanner({ handle }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [machineDetails, setMachineDetails] = useState(null);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    setLoading(true);

    await fetch(`${process.env.EXPO_PUBLIC_URL}/api/Maquina/GetMaquinaById/${data}`, {
        method: 'GET',
        headers: {
          'content-Type': 'application/json',
        },
      })
      .then(res => res.json())
      .then(json => setMachineDetails(json))
      .catch(err => console.error('Erro ao carregar tipos de máquinas:', err));


  };

  if (hasPermission === null) {
    return <Text>Solicitando permissão para acessar a câmera...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Permissão de câmera negada</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handle(false)} style={styles.iconButton}>
          <Icon name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Escanear QR Code</Text>
      </View>
      {!machineDetails ? (
        <View>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.camera}
          />
          {scanned && loading ? (
            <ActivityIndicator size="large" color="#888" style={styles.loadingIndicator} />
          ) : (
            <Text style={styles.instructionText}>Carregando informações</Text>
          )}
        </View>
      ) : (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsText}>Detalhes da Máquina</Text>
          <Text style={styles.detailsText}>Nome: {machineDetails.nome}</Text>
          <Text style={styles.detailsText}>Tipo de Máquina ID: {machineDetails.tipoMaquinaId}</Text>
          <Text style={styles.detailsText}>Setor ID: {machineDetails.setorId}</Text>
          <Text style={styles.detailsText}>Modelo: {machineDetails.modelo}</Text>
          <Text style={styles.detailsText}>Número de Série: {machineDetails.numeroSerie}</Text>
          <Text style={styles.detailsText}>Fabricante ID: {machineDetails.fabricanteId}</Text>
          <Text style={styles.detailsText}>Data de Aquisição: {new Date(machineDetails.dataAquisicao).toLocaleDateString()}</Text>
          <Text style={styles.detailsText}>Peso: {machineDetails.peso} kg</Text>
          <Text style={styles.detailsText}>Voltagem: {machineDetails.voltagem}V</Text>
          <Text style={styles.detailsText}>Detalhes: {machineDetails.maquinaDetalhes}</Text>
          <Text style={styles.scanAgain} onPress={() => {
            setMachineDetails(null);
            setScanned(false);
          }}>Escanear novamente</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    alignContent: 'center'
  },
  iconButton: {
    padding: 8,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  camera: {
    width: '80%',
    height: '50%',
    marginVertical: 20,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  instructionText: {
    color: '#888',
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 20,
  },
  detailsContainer: {
    alignItems: 'center',
    padding: 20,
  },
  detailsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  scanAgain: {
    color: '#1e90ff',
    fontSize: 16,
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});
