import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import moment from 'moment';  // Importando o moment

export default function CadastroMaquina({ navigation }) {
  const [modelo, setModelo] = useState('');
  const [nome, setNome] = useState('');
  const [numeroSerie, setNumeroSerie] = useState('');
  const [fabricanteId, setFabricanteId] = useState('');
  const [tipoMaquinaId, setTipoMaquinaId] = useState('');
  const [setorId, setSetorId] = useState('');
  const [dataAquisicao, setDataAquisicao] = useState('');
  const [fotoUrl, setFotoUrl] = useState('');
  const [peso, setPeso] = useState('');
  const [voltagem, setVoltagem] = useState('');


  async function cadastrarMaquina() {

    if (!moment(dataAquisicao, 'DD/MM/YYYY', true).isValid()) {
      Alert.alert('Erro', 'A data de aquisição está inválida. Use o formato DD/MM/YYYY.');
      return;
    }

    const maquina = {
      modelo,
      nome,
      numeroSerie,
      fabricanteId,
      tipoMaquinaId,
      setorId,
      dataAquisicao: moment(dataAquisicao, 'DD/MM/YYYY').format('YYYY-MM-DD'), 
      fotoUrl,
      peso,
      voltagem
    };

    console.log('Máquina a ser cadastrada:', maquina); 

    try {
      const response = await fetch('http://10.139.75.18:5251/api/Maquina/CreateMaquina', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(maquina),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Máquina cadastrada com sucesso!');
        navigation.goBack();
      } else {
        Alert.alert('Erro', 'Erro ao cadastrar a máquina. Código de status: ' + response.status);
      }
    } catch (error) {
      console.error('Erro ao cadastrar a máquina:', error);
      Alert.alert('Erro', 'Erro ao cadastrar a máquina. Verifique a conexão.');
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro de Máquina</Text>

      <TextInput
        style={styles.input}
        placeholder="Modelo"
        value={modelo}
        onChangeText={setModelo}
      />

<TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Número de Série"
        value={numeroSerie}
        onChangeText={setNumeroSerie}
      />

      <TextInput
        style={styles.input}
        placeholder="ID do Fabricante"
        value={fabricanteId}
        onChangeText={setFabricanteId}
      />

      <TextInput
        style={styles.input}
        placeholder="Tipo da Máquina (ID)"
        value={tipoMaquinaId}
        onChangeText={setTipoMaquinaId}
      />

      <TextInput
        style={styles.input}
        placeholder="Setor (ID)"
        value={setorId}
        onChangeText={setSetorId}
      />

      <TextInput
        style={styles.input}
        placeholder="Data de Aquisição (DD/MM/AAAA)"
        value={dataAquisicao}
        onChangeText={setDataAquisicao}
      />

      <TextInput
        style={styles.input}
        placeholder="URL da Foto"
        value={fotoUrl}
        onChangeText={setFotoUrl}
      />

      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        value={peso}
        onChangeText={setPeso}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Voltagem (V)"
        value={voltagem}
        onChangeText={setVoltagem}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={cadastrarMaquina}>
        <Text style={styles.buttonText}>Cadastrar Máquina</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4682B4',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
