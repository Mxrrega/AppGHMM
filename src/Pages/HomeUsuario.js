import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, DrawerLayoutAndroid, TouchableOpacity, SectionList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Maquinas from '../Components/Maquinas';
import { useFocusEffect } from '@react-navigation/native';

export default function Home() {
  const [maquinas, setMaquinas] = useState([]);
  const [error, setError] = useState(false);
  const [greeting, setGreeting] = useState('');
  const drawer = useRef(null);

  async function getMaquinas() {
    try {
      const response = await fetch('http://10.139.75.75:5251/api/Maquina/GetAllMaquinas', {
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
    updateGreeting();
  }, []);

  const updateGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting('Bom dia!');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Boa tarde!');
    } else {
      setGreeting('Boa noite!');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getMaquinas();
    }, [])
  );

  const groupBySetor = (maquinas) => {
    const setores = {};
    maquinas.forEach((maquina) => {
      const setor = maquina.setorId || 'Sem Setor';
      if (!setores[setor]) {
        setores[setor] = [];
      }
      setores[setor].push(maquina);
    });
    return Object.keys(setores).map((setor) => ({ setor, data: setores[setor] }));
  };

  const navigationView = () => (
    <View style={styles.drawerContainer}>
      <Text style={styles.drawerTitle}>GHMM</Text>
      <TouchableOpacity style={styles.drawerItem}>
        <MaterialCommunityIcons name="account" size={24} color="black" />
        <Text style={styles.drawerText}>Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem}>
        <MaterialCommunityIcons name="wrench" size={24} color="black" />
        <Text style={styles.drawerText}>Relatar Manutenção</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem}>
        <MaterialCommunityIcons name="history" size={24} color="black" />
        <Text style={styles.drawerText}>Histórico de Manutenção</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem}>
        <MaterialCommunityIcons name="screwdriver" size={24} color="black" />
        <Text style={styles.drawerText}>Relatar Peças</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem}>
        <MaterialCommunityIcons name="bell" size={24} color="black" />
        <Text style={styles.drawerText}>Notificações</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={'right'}
      renderNavigationView={navigationView}>
      <View style={styles.container}>
      <View style={styles.subHeader}>
          <Text style={styles.greetingText}>{greeting}</Text>
          <View style={styles.headerIcons}>
            <MaterialCommunityIcons name="qrcode-scan" size={24} color="white" style={styles.iconSpacing} />
            <TouchableOpacity onPress={() => drawer.current.openDrawer()}>
              <MaterialCommunityIcons name="menu" size={24} color="white" style={styles.iconSpacing} />
            </TouchableOpacity>
          </View>
        </View>

        {error ? (
          <Text style={styles.errorText}>Erro ao carregar as máquinas!</Text>
        ) : (
          <SectionList
            sections={groupBySetor(maquinas)}
            keyExtractor={(item) => item.maquinaId.toString()}
            renderSectionHeader={({ section: { setor } }) => (
              <Text style={styles.setorHeader}>{setor}</Text>
            )}
            renderItem={({ section }) => (
              <FlatList
                data={section.data}  
                horizontal={true}  
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Maquinas
                    maquinaFoto={item.fotoUrl}
                    maquinaModelo={item.modelo}
                    maquinaNumeroSerie={item.numeroSerie}
                  />
                )}
                keyExtractor={(item) => item.maquinaId.toString()}
              />
            )}
          />
        )}
      </View>
    </DrawerLayoutAndroid>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 30
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    padding: 20,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
  },
  drawerContainer: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#FFF',
  },
  drawerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  drawerText: {
    fontSize: 18,
    marginLeft: 15,
  },
  setorHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
