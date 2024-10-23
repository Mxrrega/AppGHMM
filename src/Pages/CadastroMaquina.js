import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import RNPickerSelect from 'react-native-picker-select';

export default function CadastroMaquina({ handle }) {

  const [step, setStep] = useState(1);
  const [nomeMaquina, setNomeMaquina] = useState('');
  const [modelo, setModelo] = useState('');
  const [numeroSerie, setNumeroSerie] = useState('');
  const [dataAquisicao, setDataAquisicao] = useState('');
  const [fotoUrl, setFotoUrl] = useState('');
  const [peso, setPeso] = useState('');
  const [voltagem, setVoltagem] = useState('');
  const [detalhes, setDetalhes] = useState('');
  const [tipoMaquinaId, setTipoMaquinaId] = useState('');
  const [setorId, setSetorId] = useState('');
  const [fabricanteId, setFabricanteId] = useState('');

  const [tiposMaquina, setTiposMaquina] = useState([]);
  const [setores, setSetores] = useState([]);
  const [fabricantes, setFabricantes] = useState([]);

  useEffect(() => {

    async function carregarDados() {
      try {

        const responseTipos = await fetch('http://10.139.75.33/api/TipoMaquina/GetAllTipoMaquinas');
        const tipos = await responseTipos.json();
        setTiposMaquina(tipos);

        const responseSetores = await fetch('http://10.139.75.33/api/Setor/GetAllSetores');
        const setores = await responseSetores.json();
        setSetores(setores);

        const responseFabricantes = await fetch('http://10.139.75.33/api/Fabricante/GetAllFabricantes');
        const fabricantes = await responseFabricantes.json();
        setFabricantes(fabricantes);
      } catch (error) {
        Alert.alert('Erro', 'Erro ao carregar os dados do banco.');
      }
    }

    carregarDados();
  }, []);

  const handleContinue = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  async function cadastrarMaquina() {
    if (!moment(dataAquisicao, 'DD/MM/YYYY', true).isValid()) {
      Alert.alert('Erro', 'A data de aquisição está inválida. Use o formato DD/MM/YYYY.');
      return;
    }

    const maquina = {
      modelo,
      nomeMaquina,
      numeroSerie,
      fabricanteId,
      tipoMaquinaId,
      setorId,
      dataAquisicao: moment(dataAquisicao, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      fotoUrl,
      peso,
      voltagem,
      detalhes
    };
    handleContinue()
    
    
  }

  return (
    <ScrollView style={styles.container}>
      {step > 1 && step < 4 && (
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Cadastrar Máquina</Text>
        </View>
      )}

      {step === 1 && (
        <View>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => handle(false)} style={styles.backButton}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.title}>Cadastrar Máquina</Text>
          </View>
          <Text style={styles.label}>Nome Máquina</Text>
          <TextInput
            value={nomeMaquina}
            onChangeText={setNomeMaquina}
            placeholder="Digite o nome da máquina"
            style={styles.input}
          />

          <Text style={styles.label}>Modelo da Máquina </Text>
          <TextInput
            value={modelo}
            onChangeText={setModelo}
            placeholder="Digite o modelo da máquina"
            style={styles.input}
          />

          <Text style={styles.label}>Número de Série da Máquina</Text>
          <TextInput
            value={numeroSerie}
            onChangeText={setNumeroSerie}
            placeholder="Digite o número de série"
            style={styles.input}
          />

          <Text style={styles.label}>Data de Aquisição da Máquina</Text>
          <TextInput
            value={dataAquisicao}
            onChangeText={setDataAquisicao}
            placeholder="Digite a data de aquisição"
            style={styles.input}
          />
        </View>
      )}

      {step === 2 && (
        <View>
          <Text style={styles.label}>Foto da Máquina Url</Text>
          <TextInput
            value={fotoUrl}
            onChangeText={setFotoUrl}
            placeholder="Digite a URL da foto"
            style={styles.input}
          />

          <Text style={styles.label}>Peso da Máquina</Text>
          <TextInput
            value={peso}
            onChangeText={setPeso}
            placeholder="Digite o peso"
            keyboardType='decimal-pad'
            style={styles.input}
          />

          <Text style={styles.label}>Voltagem da Máquina</Text>
          <TextInput
            value={voltagem}
            onChangeText={setVoltagem}
            placeholder="Digite a voltagem"
            keyboardType='decimal-pad'
            style={styles.input}
          />

          <Text style={styles.label}>Detalhes da Maquina</Text>
          <TextInput
            value={detalhes}
            onChangeText={setDetalhes}
            placeholder="Digite os detalhes"
            keyboardType='default'
            style={styles.input}
          />
        </View>
      )}

      {step === 3 && (
        <View>
          <Text style={styles.label}>Tipo da Máquina</Text>
          <RNPickerSelect
            onValueChange={(itemValue) => setTipoMaquinaId(itemValue)}
            items={tiposMaquina.map((tipo) => ({
              label: tipo.nome,
              value: tipo.id
            }))}
            placeholder={{
              label: 'Selecione o tipo da máquina',
              value: null
            }}
          />

<Text style={styles.label}>Setor</Text>
          <RNPickerSelect
            onValueChange={(itemValue) => setSetorId(itemValue)}
            items={setores.map((setor) => ({
              label: setor.nome,
              value: setor.id
            }))}
            placeholder={{
              label: 'Selecione o setor',
              value: null
            }}
          />

<Text style={styles.label}>Fabricante</Text>
          <RNPickerSelect
            onValueChange={(itemValue) => setFabricanteId(itemValue)}
            items={fabricantes.map((fabricante) => ({
              label: fabricante.nome,
              value: fabricante.id
            }))}
            placeholder={{
              label: 'Selecione o fabricante',
              value: null
            }}
          />
        </View>
      )}

{step === 4 && ( 
  <View style={styles.container}>
  <View style={styles.header}>
<Text style={styles.title}>Obrigado por cradastrar uma Máquina!</Text>
</View>
<TouchableOpacity 
  style={styles.buttonCadastro} 
  onPress={() => handle(false)}
>
  <Text style={styles.buttonText}>
    Continuar
  </Text>
</TouchableOpacity>
</View>
)}

      {step < 3 && (
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <View style={styles.continueView}>
            <Text style={styles.buttonText}>Continuar</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color="white" />
          </View>
        </TouchableOpacity>
      )}

      {step === 3 && (
        <TouchableOpacity style={styles.buttonCadastro} onPress={cadastrarMaquina}>
          <Text style={styles.buttonText}>Cadastrar Máquina</Text>
        </TouchableOpacity>
      )}
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
    marginTop: 10,
    marginBottom: 10,
    height: 70
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  continueView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonCadastro: {
    backgroundColor: '#696767',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    height: 70
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