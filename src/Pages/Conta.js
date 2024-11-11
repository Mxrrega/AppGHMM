import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';

export default function Conta({handle})  {

  const [userData] = useState({
    name: 'José Ferreira da Silva',
    birthDate: '21/09/1987',
    age: '37',
    email: 'josefsferreira@hotmail.com',
    cpf: '341.212.423-12',
    education: 'Ensino Superior Completo',
    phone: '(14) 98435-2343',
    specialization: 'Tecnico Industrial',
    sector: 'Motores',
    machine: 'Motor CC',
    photoUrl: 'https://preview.redd.it/dy2wkfrjaqgd1.png?auto=webp&s=89b4d9e88bfec108858ef3b6a30047b508e97bd3'  
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handle(false)}  style={styles.backButton}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
      </TouchableOpacity>
      <Animatable.Text animation="fadeInUp" delay={25} style={styles.title}>Conta</Animatable.Text>
      </View>

      <Animatable.View animation="fadeInUp" delay={50} style={styles.profileContainer}>
        <Image
          source={{ uri: userData.photoUrl }}
          style={styles.profileImage}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.birthDate}>{userData.birthDate} ({userData.age} anos)</Text>
        </View>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" delay={50} style={styles.box}>
      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Email</Text>
        <View style={styles.fieldValueContainer}>
          <Text style={styles.fieldValue}>{userData.email}</Text>
          <Icon name="lock" size={20} color="#B41D1D" />
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>CPF</Text>
        <View style={styles.fieldValueContainer}>
          <Text style={styles.fieldValue}>{userData.cpf}</Text>
          <Icon name="lock" size={20} color="#B41D1D" />
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Escolaridade</Text>
        <View style={styles.fieldValueContainer}>
          <Text style={styles.fieldValue}>{userData.education}</Text>
          <Icon name="lock" size={20} color="#B41D1D" />
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Telefone</Text>
        <View style={styles.fieldValueContainer}>
          <Text style={styles.fieldValue}>{userData.phone}</Text>
          <Icon name="lock" size={20} color="#B41D1D" />
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Especialização</Text>
        <View style={styles.fieldValueContainer}>
          <Text style={styles.fieldValue}>{userData.specialization}</Text>
          <Icon name="lock" size={20} color="#B41D1D" />
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Setor</Text>
        <View style={styles.fieldValueContainer}>
          <Text style={styles.fieldValue}>{userData.sector}</Text>
          <Icon name="lock" size={20} color="#B41D1D" />
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Máquina</Text>
        <View style={styles.fieldValueContainer}>
          <Text style={styles.fieldValue}>{userData.machine}</Text>
          <Icon name="lock" size={20} color="#B41D1D" />
        </View>
      </View>
      </Animatable.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 20,
  },
  header: {
    marginTop: 10,
    textAlign: 'center',
  },
  box: {
    marginBottom: 50
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    marginTop: 20
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 40
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10
  },
  infoContainer: {
    alignItems: 'center'
  },
  name: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  birthDate: {
    color: '#A9A9A9',
    fontSize: 14
  },
  field: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15
  },
  fieldLabel: {
    color: '#000000',
    fontWeight: 'bold'
  },
  fieldValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  fieldValue: {
    color: '#888888',
    fontSize: 14,
    fontStyle: 'italic'
  }
});


