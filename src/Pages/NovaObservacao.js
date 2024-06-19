import React, { useState, useEffect,  useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../Context/AuthContext';

export default function NovaObservacao({ handle, pessoaNome }) {

  const [observacaoId, SetObservacaoId] = useState(0);
  const [observacaoDescricao, setObservacaoDescricao] = useState();
  const [observacaoLocal, setObservacaoLocal] = useState();
  const [observacaoData, setObservacaoData] = useState();
  const [pessoaId, setPessoaId] = useState();

  const { usuarioId } = useContext(AuthContext);

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");


  async function CadastrarNovaObservacao() {
    if (!observacaoDescricao || !observacaoLocal || !observacaoData || !pessoaId || !usuarioId) {
      Alert.alert('Erro', 'Por Favor, preencha todos os campos.');
      return;
    }

    await fetch('http://10.139.75.20:5251/api/Observacoes/CreateObservacoes', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(
        {
          observacaoId: observacaoId,
          observacaoDescricao: observacaoDescricao,
          observacaoLocal: observacaoLocal,
          observacaoData: observacaoData,
          pessoaId: pessoaId,
          usuarioId: usuarioId
        }
      )

    })
      .then(res => res.json())
      .then(json => console.log(json))
      .then(json => (json.observacaoId ? setSucesso(true) : setErro(true)) )
      .catch(err => setErro(true))
      setSucesso(true)
  };

  return (
    <View style={styles.container}>
      { sucesso ? 
        <View style={styles.successContainer}>
          <Text style={styles.textCadastroObs}>Observação Cadastrada. Obrigado por colaborar com nossas buscas.</Text> 
          <TouchableOpacity style={styles.btnVoltar} onPress={() => { setSucesso(false); setObservacaoDescricao(''), setObservacaoLocal(''), setObservacaoData(''), setPessoaId('') }}>
            <Text style={styles.btnText}>Voltar</Text>
          </TouchableOpacity>
        </View>
        :
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ marginTop: 50, marginBottom: 20, flexDirection: 'row'}}>
          <TouchableOpacity style={styles.backButton} onPress={() => handle(false)}>
              <MaterialCommunityIcons name="arrow-left" color={'white'} size={30} />
            </TouchableOpacity>
            <Text style={styles.title}>Nova Observação</Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <TextInput
              style={styles.campos}
              placeholder='Descrição da Observação'
              value={observacaoDescricao}
              onChangeText={setObservacaoDescricao}
              placeholderTextColor="white"
            />
            <TextInput
              style={styles.campos}
              placeholder='Local da Observação'
              value={observacaoLocal}
              onChangeText={setObservacaoLocal}
              placeholderTextColor="white"
            />
            <TextInput
              style={styles.campos}
              placeholder='Data da Observação (AAAA-MM-DD)'
              value={observacaoData}
              onChangeText={setObservacaoData}
              placeholderTextColor="white"
            />
            <Text style={styles.campos}>Descrição para: {pessoaNome.pessoaNome}</Text>
            <TouchableOpacity style={styles.submitButton} onPress={CadastrarNovaObservacao}>
              <Text style={styles.submitButtonText}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  successContainer: {
    backgroundColor: 'white',
    padding: 16,
  },
  textCadastroObs: {
    fontSize: 18,
    marginBottom: 10,
  },
  btnVoltar: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  backButton: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  campos: {
    backgroundColor: '#1E1E1E',
    color: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});