import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 

export default function Login() {

  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [Versenha, setVersenha] = useState(false);

  const VerSenha = () => {
    setVersenha(!Versenha);
  };
 
  return (
    <ScrollView style={styles.container}>
        <View>
          <View style={styles.header}>
      <Text style={styles.TituloPagInicial}>Seja Bem Vindo!</Text>
      </View>
          <Text style={styles.label}>CPF</Text>
          <TextInput 
            value={cpf} 
            onChangeText={setCpf} 
            placeholder="Digite seu CPF" 
            keyboardType="numeric" 
            style={styles.input} 
          />
          
          <Text style={styles.label}>Senha</Text>

          <View style={styles.campoSenha}>
          <TextInput 
            value={senha} 
            onChangeText={setSenha} 
            placeholder="Digite sua senha" 
            secureTextEntry={!Versenha}
            style={styles.senha}
          />
          <TouchableOpacity onPress={VerSenha}>
              <Icon
                name={Versenha ? 'eye-off' : 'eye'}
                size={24}
              />
            </TouchableOpacity>
          </View>
        </View>
      <TouchableOpacity 
        style={styles.button} 
      >
        <Text style={styles.buttonText}>
          Login                                                                
        </Text>
      </TouchableOpacity>
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
    marginTop: 30,
    textAlign: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
    textAlign: 'center',
    marginTop: 40
  },
  TituloPagInicial: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
    textAlign: 'center',
    marginTop: 85
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#FFFF',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 15,
    padding: 10,  
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#F7F7F7',
    height: 70
  },
  button: {
    backgroundColor: '#696767',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    height: 70
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  campoSenha: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 15,
    padding: 10,  
    marginBottom: 20,
    backgroundColor: '#F7F7F7',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  senha: {
    fontSize: 16,
  },
});


