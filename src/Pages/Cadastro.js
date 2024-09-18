import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';

const RegisterScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
                <Image source={require("../../assets/Logo GHMM.png")} style={styles.logo} />
            </View>
      <ScrollView style={styles.box}> 
      <Image 
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }} 
        style={styles.avatar}
      />

      <Text style={styles.userName}>Nome completo</Text>
      <Text style={styles.userCPF}>Cpf</Text>

      <TextInput style={styles.input} placeholder="E-mail" placeholderTextColor="#777" />
      <TextInput style={styles.input} placeholder="Telefone" placeholderTextColor="#777" />
      <TextInput style={styles.input} placeholder="Data de nascimento" placeholderTextColor="#000" />
      <TextInput style={styles.input} placeholder="Nível de escolaridade" placeholderTextColor="#000" />
      <TextInput style={styles.input} placeholder="Cargo" placeholderTextColor="#000" />
      <TextInput style={styles.input} placeholder="Setor" placeholderTextColor="#000" />
      <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#000" secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirmar senha" placeholderTextColor="#000" secureTextEntry />

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
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 15,
},
logo: {
    width: "30%",
    resizeMode: "contain",
    alignSelf: "center",
},
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 30,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userCPF: {
    fontSize: 14,
    color: '#777',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
