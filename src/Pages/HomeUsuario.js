import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlatList } from 'react-native';
import Maquinas from '../Components/Maquinas';

export default function Home() {

  const maquinas = [
    {
      maquinaId: '1',
      maquinaFoto: 'https://s7d2.scene7.com/is/image/Caterpillar/CM20220621-a2314-eb542',
    },
    {
      maquinaId: '2',
      maquinaFoto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdNO8FP5l45UWQ8RAfp65MmCOt6HfU50rV-Q&s',
    },
    {
      maquinaId: '3',
      maquinaFoto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1I0dhUXxhDud20er4pGX2dUHccNC1ojxdrw&s',
    },
    {
      maquinaId: '4',
      maquinaFoto: 'https://nac.cni.com.br/blog/wp-content/uploads/2021/11/linhas-de-credito-maquinas-industriais-1.jpg',
    },
    {
      maquinaId: '5',
      maquinaFoto: 'https://nac.cni.com.br/blog/wp-content/uploads/2021/11/linhas-de-credito-maquinas-industriais-1.jpg',
    },
    {
      maquinaId: '6',
      maquinaFoto: 'https://nac.cni.com.br/blog/wp-content/uploads/2021/11/linhas-de-credito-maquinas-industriais-1.jpg',
    },
    {
      maquinaId: '7',
      maquinaFoto: 'https://nac.cni.com.br/blog/wp-content/uploads/2021/11/linhas-de-credito-maquinas-industriais-1.jpg',
    },
    {
      maquinaId: '8',
      maquinaFoto: 'https://nac.cni.com.br/blog/wp-content/uploads/2021/11/linhas-de-credito-maquinas-industriais-1.jpg',
    },
    {
      maquinaId: '9',
      maquinaFoto: 'https://nac.cni.com.br/blog/wp-content/uploads/2021/11/linhas-de-credito-maquinas-industriais-1.jpg',
    },
    {
      maquinaId: '10',
      maquinaFoto: 'https://nac.cni.com.br/blog/wp-content/uploads/2021/11/linhas-de-credito-maquinas-industriais-1.jpg',
    },
    {
      maquinaId: '11',
      maquinaFoto: 'https://nac.cni.com.br/blog/wp-content/uploads/2021/11/linhas-de-credito-maquinas-industriais-1.jpg',
    },
    {
      maquinaId: '12',
      maquinaFoto: 'https://nac.cni.com.br/blog/wp-content/uploads/2021/11/linhas-de-credito-maquinas-industriais-1.jpg',
    },

  ];

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
    
    
    <FlatList
      data={maquinas}
      numColumns={2}
      renderItem={({ item }) => (
        <View style={styles.boxExibir}>
          <Maquinas maquinaFoto={item.maquinaFoto} />
        </View>
      )}
      keyExtractor={(item) => item.maquinaId}
    />
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
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: "50%",
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
  maquinaContainer: {
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#C0C0C0',
    borderRadius: 10,
    marginBottom: 10,
  },
  infoButton: {
    backgroundColor: '#4682B4',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  infoButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});