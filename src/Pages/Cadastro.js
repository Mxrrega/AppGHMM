import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function Cadastro() {

  const [ usuarioId, setUsuarioId ] = useState(0);
  const [ usuarioNome, setUsuarioNome ] = useState();
  const [ usuarioTelefone, setUsuarioTelefone] = useState();
  const [ usuarioEmail, setUsuarioEmail] = useState();
  const [ usuarioSenha, setUsuarioSenha] = useState();

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  async function Cadastrar() {
    if ( !usuarioNome || !usuarioTelefone || !usuarioEmail || !usuarioSenha ) {
      Alert.alert('Erro', 'Por Favor, preencha todos os campos.');
      return;
    }

    await fetch('http://10.139.75.20:5251/api/Usuario/CreateUsuario',{
        method:'POST',
        headers: {
            'content-type': 'application/json'
        },
        body:JSON.stringify(
            {
              usuarioId: usuarioId,
              usuarioNome: usuarioNome,
              usuarioTelefone: usuarioTelefone,
              usuarioEmail: usuarioEmail,
              usuarioSenha: usuarioSenha
            }
        )
        
    })
    .then(res=> (res.ok == true ) ? res.json() : false)
    .then(json => (json.usuarioId ? setSucesso(true) : setErro(true)) )
    .catch(err => setErro( true ) )
  };

  return (
    <View style={css.container}>
        { sucesso ? 
        <View style={css.containerCadastro}>
          <Text style={css.textCadastro}>Obrigado por se Cadastrar. Seu cadastro foi realizado com sucesso</Text> 
          <TouchableOpacity style={css.btnCreate} onPress={() => {setSucesso(false), setUsuarioNome(''), setUsuarioTelefone(''), setUsuarioEmail(''), setUsuarioSenha('') }}>
            <Text style={css.btnLoginText}>Voltar</Text>
          </TouchableOpacity>
        </View>
        
        :
      <View style={css.editar}>     
        <TextInput
          style={css.input}
          placeholder='Nome Usuário'
          value={usuarioNome}
          onChangeText={setUsuarioNome}
        />
        <TextInput
          style={css.input}
          placeholder='Telefone Usuário'
          value={usuarioTelefone}
          onChangeText={setUsuarioTelefone}
        />
        <TextInput
          style={css.input}
          placeholder='usuario email'
          value={usuarioEmail}
          onChangeText={setUsuarioEmail}
        />
        <TextInput
          style={css.input}
          placeholder='usuario senha'
          value={usuarioSenha}
          onChangeText={setUsuarioSenha}
        />
      
      <TouchableOpacity style={css.btnCreate} onPress={Cadastrar}>
        <Text style={css.btnLoginText}>Cadastrar</Text>
      </TouchableOpacity>
      </View>
}
      { erro && <Text>Revise Cuidadosamente os campos!</Text>}
    </View>
  );
}

const css = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212', 
    padding: 16,
  },
  containerCadastro: {
    marginTop: 50,
    backgroundColor: '#333333',
    borderRadius: 8,
    padding: 30,
    marginVertical: 8,
  },
  textCadastro: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 30,
  },
  btnLoginText: {
    color: '#FFFFFF', 
    fontSize: 16,
    textAlign: 'center',
  },
  editar: {
    backgroundColor: '#1E1E1E', 
    padding: 16,
    borderRadius: 8,
    marginTop: 60
  },
  input: {
    backgroundColor: '#333333', 
    color: '#FFFFFF', 
    padding: 10,
    borderRadius: 8,
    marginVertical: 8,
  },
  btnCreate: {
    backgroundColor: '#03DAC9', 
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
     marginTop: 30
  },
});