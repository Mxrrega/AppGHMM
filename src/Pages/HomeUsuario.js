import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Maquinas from '../Components/Maquinas';
import { useFocusEffect } from '@react-navigation/native';

export default function Home() {
  const [maquinas, setMaquinas] = useState([]);
  const [error, setError] = useState(false);

  async function getMaquinas() {
    try {
      const response = await fetch('http://10.139.75.18:5251/api/Maquina/GetAllMaquinas', {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      });
      const data = await response.json();
      setMaquinas(data); 
    } catch (err) {
      setError(true);
    }
  }

  useEffect(() => {
    getMaquinas();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getMaquinas();
    }, [])
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../../assets/Logo GHMM.png")} style={styles.logo} />
      </View>

      <View style={styles.subHeader}>
        <Text style={styles.greetingText}>Olá, José!</Text>
        <View style={styles.headerIcons}>
          <MaterialCommunityIcons name="cog" size={24} color="black" style={styles.iconSpacing} />
          <MaterialCommunityIcons name="menu" size={24} color="black" style={styles.iconSpacing} />
        </View>
      </View>

      {error ? (
        <Text style={styles.errorText}>Erro ao carregar as máquinas!</Text>
      ) : (
        <FlatList
          data={maquinas}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.boxExibir}>
              <Maquinas maquinaFoto={item.fotoUrl} 
              maquinaModelo={item.modelo}
              maquinaNumeroSerie={item.numeroSerie}
              />
            </View>
          )}
          keyExtractor={(item) => item.maquinaId.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 15,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: "30%",
    resizeMode: "contain",
    alignSelf: "center",
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  iconSpacing: {
    marginLeft: 15,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginLeft: 20,
    color: '#000000',
  },
  boxExibir: {
    flex: 1,
    margin: 10,
    backgroundColor: '#D3D3D3',
    borderRadius: 10,
    paddingVertical: 20,
  },

  errorText: {
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
  },
});
