import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { CameraView, useCameraPermissions, CameraType  } from 'expo-camera';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function QRCodeScanner({ handle }) {

  const [permission, requestPermission] = useCameraPermissions();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [maquina, setMaquina] = useState(null);
  const [facing, setFacing] = useState('back');

  
  

  useEffect(() => {
    requestPermission();
  }, []);
  

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    setLoading(true);

    await fetch(`${process.env.EXPO_PUBLIC_URL}/api/Maquina/GetMaquinaByNumeroSerie/${data}`, {
      method: 'GET',
      headers: {
        'content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => setMaquina(json))
      .catch(err => console.error('Erro ao carregar máquina:', err))
      .finally(() => setLoading(false));

  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handle(false)} style={styles.iconButton}>
          <Icon name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Escanear QR Code</Text>
      </View>
      {!maquina ? (
        <View style={styles.cameraBox}>
          <View style={styles.cameraBorder}>
          <CameraView
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
            onBarcodeScanned={(item) => handleBarCodeScanned( item )}
            style={styles.camera}
            facing={facing}
          />
          </View>
          {scanned && loading ? (
            <ActivityIndicator size="large" color="#888" style={styles.loadingIndicator} />
          ) : (
            <Text style={styles.instructionText}>Escaneie o QR Code</Text>
          )}
        </View>
      ) : (
        <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>Detalhes da Máquina</Text>
        <Image style={styles.image} source={{ uri: maquina.fotoUrl }} />
        <View style={styles.infoBox}>
          <Text style={styles.label}>Nome:</Text>
          <Text style={styles.value}>{maquina.nome}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Tipo de Máquina:</Text>
          <Text style={styles.value}>{maquina.tipoMaquina.tipoMaquinaNome}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Setor:</Text>
          <Text style={styles.value}>{maquina.setor.setorNome}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Modelo:</Text>
          <Text style={styles.value}>{maquina.modelo}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Número de Série:</Text>
          <Text style={styles.value}>{maquina.numeroSerie}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Fabricante:</Text>
          <Text style={styles.value}>{maquina.fabricante.fabricanteNome}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Data de Aquisição:</Text>
          <Text style={styles.value}>{new Date(maquina.dataAquisicao).toLocaleDateString()}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Peso:</Text>
          <Text style={styles.value}>{maquina.peso} kg</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Voltagem:</Text>
          <Text style={styles.value}>{maquina.voltagem}V</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Detalhes:</Text>
          <Text style={styles.value}>{maquina.maquinaDetalhes}</Text>
        </View>
        <TouchableOpacity style={styles.button}
        onPress={() => {
          setMaquina(null);
          setScanned(false);
        }}>
        <Text style={styles.scanAgain} >Escanear novamente</Text>
        </TouchableOpacity>
        
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
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  iconButton: {
    position: 'absolute',
    left: 0,
    padding: 8,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cameraBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraBorder: {
    width: 350,
    height: 350,
    borderWidth: 2,
    borderColor: '#1e90ff',
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  iconButton: {
    position: 'absolute',
    left: 0,
    padding: 8,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cameraBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    width: 350,
    height: 350,
    borderWidth: 2,
    borderColor: '#1e90ff',
    borderRadius: 12,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  instructionText: {
    color: '#888',
    fontSize: 16,
    marginTop: 20,
    fontWeight: 'bold',
  },
  detailsContainer: {
    padding: 20,
  },
  detailsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 16,
  },
  infoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  label: {
    fontSize: 16,
    color: '#888',
  },
  value: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  scanAgain: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#696767',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    height: 70
  },
});
