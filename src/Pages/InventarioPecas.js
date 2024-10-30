import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function InventarioPecas() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Inventário de Peças</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="plus" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.category}>
        <Text>Parafusos e Porcas</Text>
        <Text style={styles.categoryText}>Cabeça Sextavada</Text>
        <Text style={styles.itemText}>Phillips</Text>
        <Text style={styles.itemText}>Allen</Text>
        <Text style={styles.itemText}>M4</Text>
        <Text style={styles.itemText}>M6</Text>
        <Text style={styles.itemText}>M8</Text>
      </View>

      <Image
        source={{ uri: '' }} 
        style={styles.image}
      />

      <View style={styles.category}>
        <Text style={styles.categoryText}>Simples</Text>
        <Text style={styles.itemText}>Pressão</Text>
        <Text style={styles.itemText}>M3</Text>
        <Text style={styles.itemText}>M4</Text>
        <Text style={styles.itemText}>M5</Text>
        <Text style={styles.itemText}>M6</Text>
        <Text style={styles.itemText}>M8</Text>
        <Text style={styles.itemText}>M10</Text>
      </View>

      <Image
        source={{ uri: '' }} 
        style={styles.image}
      />

      <View style={styles.category}>
        <Text style={styles.itemText}>6205</Text>
        <Text style={styles.itemText}>6302</Text>
        <Text style={styles.itemText}>6304</Text>
      </View>

      <Image
        source={{ uri: '' }} 
        style={styles.image}
      />

      <View style={styles.category}>
        <Text style={styles.itemText}>A (13x8)</Text>
        <Text style={styles.itemText}>B (17x11)</Text>
        <Text style={styles.itemText}>C (22x14)</Text>
      </View>

      <Image
        source={{ uri: '' }} 
        style={styles.image}
      />

      <View style={styles.category}>
        <Text style={styles.itemText}>Filtro de Óleo</Text>
        <Text style={styles.itemText}>Filtro de Ar</Text>
        <Text style={styles.itemText}>Filtro Combustível</Text>
      </View>

      <Image
        source={{ uri: '' }} 
        style={styles.image}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1B1B',
    paddingHorizontal: 16
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20
  },
  iconButton: {
    padding: 8
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold'
  },
  category: {
    marginBottom: 10
  },
  categoryText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 4,
    fontStyle: 'italic'
  },
  itemText: {
    fontSize: 14,
    color: '#CCCCCC',
    marginBottom: 2
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginVertical: 15
  }
});

