import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';

const RegisterScreen = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={require("../../assets/backgroundLogin.png")}
        style={styles.imagemFundo}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}> 
        <Image 
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }} 
          style={styles.avatar}
        />
        <TextInput style={styles.input} placeholder="Nome Completo" placeholderTextColor="#333" />
        <TextInput style={styles.input} placeholder="CPF" placeholderTextColor="#333" />
        <TextInput style={styles.input} placeholder="E-mail" placeholderTextColor="#333" />
        <TextInput style={styles.input} placeholder="Telefone" placeholderTextColor="#333" />
        <TextInput style={styles.input} placeholder="Data de nascimento" placeholderTextColor="#333" />
        <TextInput style={styles.input} placeholder="Nível de escolaridade" placeholderTextColor="#333" />
        <TextInput style={styles.input} placeholder="Cargo" placeholderTextColor="#333" />
        <TextInput style={styles.input} placeholder="Setor" placeholderTextColor="#333" />
        <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#333" secureTextEntry />
        <TextInput style={styles.input} placeholder="Confirmar senha" placeholderTextColor="#333" secureTextEntry />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', 
  },
  imagemFundo: {
    ...StyleSheet.absoluteFillObject, 
    width: '100%',
    height: '100%',
    resizeMode: 'cover', 
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#007BFF', 
  },
  input: {
    width: '85%',
    height: 50,
    backgroundColor: '#E8E8E8', 
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    color: '#000', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2, 
    elevation: 3, 
  },
  button: {
    width: '85%',
    height: 50,
    backgroundColor: '#007BFF', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
