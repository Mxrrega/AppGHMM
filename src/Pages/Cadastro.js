import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import Login from './Login';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Cadastro({ handle }) {

  const [usuarioId, setUsuarioId] = useState(0);
  const [usuarioNome, setUsuarioNome] = useState();
  const [usuarioTelefone, setUsuarioTelefone] = useState();
  const [usuarioEmail, setUsuarioEmail] = useState();
  const [usuarioSenha, setUsuarioSenha] = useState();

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const [login, setLogin] = useState(false);

  if (login) {
    return <Login handle={setLogin} />;
  }

  async function Cadastrar() {
    if (!usuarioNome || !usuarioTelefone || !usuarioEmail || !usuarioSenha) {
      Alert.alert('Erro', 'Por Favor, preencha todos os campos.');
      return;
    }

    await fetch('http://10.139.75.20:5251/api/Usuario/CreateUsuario', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(
        {
          usuarioId: usuarioId,
          usuarioNome: usuarioNome,
          usuarioTelefone: usuarioTelefone,
          usuarioEmail: usuarioEmail,
          usuarioSenha: usuarioSenha
        }
      )

    })
      .then(res => (res.ok == true) ? res.json() : false)
      .then(json => (json.usuarioId ? setSucesso(true) : setErro(true)))
      .catch(err => setErro(true))
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>


      {sucesso ?
        <View style={styles.container}>
          <Text style={styles.textCadastro}>Obrigado por se Cadastrar. Seu cadastro foi realizado com sucesso</Text>
          <TouchableOpacity style={styles.btnLogin} onPress={() => { setSucesso(false), setUsuarioNome(''), setUsuarioTelefone(''), setUsuarioEmail(''), setUsuarioSenha(''), handle(false) }}>
            <Text style={styles.btnLoginText}>Voltar</Text>
          </TouchableOpacity>
        </View>

        :
        <>
          <View style={styles.successContainer}>
            <TouchableOpacity style={styles.backButton} onPress={() => handle(false)}>
              <MaterialCommunityIcons name="arrow-left" color={'white'} size={30} />
            </TouchableOpacity>
          </View>
          <Image source={require("../../assets/logo.png")} style={styles.logo} />
          <TextInput
            style={styles.input}
            placeholder='Nome do Usuário'
            value={usuarioNome}
            onChangeText={setUsuarioNome}
            placeholderTextColor="white"
          />
          <TextInput
            style={styles.input}
            placeholder='Telefone do Usuário'
            value={usuarioTelefone}
            onChangeText={setUsuarioTelefone}
            placeholderTextColor="white"
          />
          <TextInput
            style={styles.input}
            placeholder='Email do Usuário'
            value={usuarioEmail}
            onChangeText={setUsuarioEmail}
            placeholderTextColor="white"
          />
          <TextInput
            style={styles.input}
            placeholder='Senha do Usuário'
            secureTextEntry={true}
            value={usuarioSenha}
            onChangeText={setUsuarioSenha}
            placeholderTextColor="white"
          />

          <TouchableOpacity style={styles.btnLogin} onPress={Cadastrar}>
            <Text style={styles.btnLoginText}>Cadastrar</Text>
          </TouchableOpacity>
        </>
      }
      {erro && <Text>Revise Cuidadosamente os campos!</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#191919"
  },
  successContainer: {
    alignSelf: 'flex-start',
    padding: 16,
  },
  backButton: {

    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  textCadastro: {
    color: '#ffff',
    padding: 50,

  },
  btnLogin: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30,
    backgroundColor: "#0195fd"
  },
  btnLoginText: {
    color: "white",
    lineHeight: 45,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold"
  },
  logo: {
    width: "60%",
    resizeMode: "contain"
  },
  input: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#262626",
    color: "white"
  },
});