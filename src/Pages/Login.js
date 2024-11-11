import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../Context/AuthContext';
import Cadastro from './Cadastro';
import * as Animatable from 'react-native-animatable';

export default function Login() {

  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [Versenha, setVersenha] = useState(false);
  const [cadastro, setCadastro] = useState(false);

  const { Login, error } = useContext(AuthContext);

  function RealizaLogin() {

    const dados = {
      email,
      cpf,
      senha
    }

    console.log( dados )

    Login(email, cpf, senha);
  }

  

  const VerSenha = () => {
    setVersenha(!Versenha);
  };

  if (cadastro === true) {
    return <Animatable.View animation="slideInRight" duration={500} >
        <Cadastro handle={setCadastro} />
    </Animatable.View>
}
function ExibirCadastro() {
    setCadastro(true);
}

  return (
    <ScrollView style={styles.container}>
      <Animatable.View animation="fadeIn" duration={800}>
        <View style={styles.header}>
          <Text style={styles.TituloPagInicial}>Seja Bem Vindo!</Text>
        </View>
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu Email"
          style={styles.input}
        />


        <Text style={styles.label}>CPF</Text>
        <TextInput
          value={cpf}
          onChangeText={setCpf}
          placeholder="Digite seu CPF"
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
      </Animatable.View>
      <TouchableOpacity onPress={ExibirCadastro}>
        <Text style={styles.cadastro}>Cadastre-se</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={RealizaLogin}
      >
        <Text style={styles.buttonText} >
          Login
        </Text>
      </TouchableOpacity>
      {error &&
        <View style={styles.header}>
          <Text style={styles.errorText}>Revise os campos. Tente novamente!</Text>
        </View>
      }
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
  cadastro: {
    fontSize: 16,
    marginBottom: 8,
    color: '#C9C9C9',
    fontWeight: '700'
  },
  errorText: {
    color: '#ffff'
  },
});


