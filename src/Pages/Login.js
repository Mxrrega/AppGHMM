import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 

export default function TelaLogin() {

  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = () => {
    Alert.alert('Login', `CPF: ${cpf}\nSenha: ${password}`);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

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
          <TextInput
            style={styles.input}
            placeholder="CPF"
            keyboardType="numeric"
            value={cpf}
            onChangeText={setCpf}
          />
            <TextInput
            style={styles.input}
              placeholder="Senha"
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.botao}>
              <Icon
                name={isPasswordVisible ? 'eye-off' : 'eye'}
                size={24}
              />
            </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('Recuperação de Senha')}>
            <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
          </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
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
  botao: {
    marginBottom: 50,
    marginTop: -50,
    marginLeft: 290
  },
  forgotPasswordText: {
    color: 'white',
    textAlign: 'right',
    marginTop: 10,
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

