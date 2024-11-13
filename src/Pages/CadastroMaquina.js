import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';

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
  const [sucesso, setSucesso] = useState(false);

  async function carregarDados() {
    await fetch(process.env.EXPO_PUBLIC_URL + '/api/TipoMaquina/GetAllTipoMaquinas', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => setTiposMaquina(json))
      .catch(err => console.error('Erro ao carregar tipos de máquinas:', err));

    await fetch(process.env.EXPO_PUBLIC_URL + '/api/Setor/GetAllSetores', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => setSetores(json))
      .catch(err => console.error('Erro ao carregar setores:', err));

    await fetch(process.env.EXPO_PUBLIC_URL + '/api/Fabricante/GetAllFabricantes', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => setFabricantes(json))
      .catch(err => console.error('Erro ao carregar fabricantes:', err));
  }

  useEffect(() => {
    carregarDados();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
        
        carregarDados();
    }, [])
);

  const handleContinue = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  if (sucesso === true ) {
    handleContinue();
  }

  async function cadastrarMaquina() {
    if (!moment(dataAquisicao, 'DD/MM/YYYY', true).isValid()) {
      Alert.alert('Erro', 'A data de aquisição está inválida. Use o formato DD/MM/YYYY.');
      return;
    }
  
    if (!modelo || !nomeMaquina || !numeroSerie || !fabricanteId || !tipoMaquinaId || !setorId || !dataAquisicao || !fotoUrl || !peso || !voltagem || !detalhes) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
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
  
    console.log('Máquina a ser cadastrada:', maquina);
  
    try {
      const response = await fetch(process.env.EXPO_PUBLIC_URL + '/api/Maquina/CreateMaquina', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          nome: nomeMaquina,
          modelo: modelo,
          numeroSerie: numeroSerie,
          dataAquisicao: moment(dataAquisicao, 'DD/MM/YYYY').format('YYYY-MM-DD'),
          fotoUrl: fotoUrl,
          peso: peso,
          voltagem: voltagem,
          maquinaDetalhes: detalhes,
          tipoMaquinaId: tipoMaquinaId,
          setorId: setorId,
          fabricanteId: fabricanteId
        })
      });
  
      const json = await response.json();
  
      if (response.ok) {
        console.log('Máquina cadastrada com sucesso:', json);
        setSucesso(true); 
      } else {
        console.error('Erro ao cadastrar a máquina. Código de status:', response.status);
        Alert.alert('Erro', 'Não foi possível cadastrar a máquina. Tente novamente.');
        setSucesso(false); 
      }
    } catch (error) {
      console.error('Erro ao cadastrar a máquina:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao cadastrar a máquina. Tente novamente.');
      setSucesso(false); 
    }
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
            <Animatable.Text animation="fadeInUp" delay={25} style={styles.title}>Cadastrar Máquina</Animatable.Text>
          </View>
          <Animatable.View animation="fadeInUp" delay={50}>
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
          </Animatable.View>
        </View>
      )}

      {step === 2 && (
        <Animatable.View animation="fadeInRight" duration={700}>
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
        </Animatable.View>
      )}

      {step === 3 && (
        <Animatable.View animation="fadeInRight" duration={700} >
          <Text style={styles.label}>Tipo da Maquina</Text>
          <SelectDropdown
            data={tiposMaquina}
            onSelect={(selectedItem) => {
              setTipoMaquinaId(selectedItem.tipoMaquinaId);
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.inputSelect}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.tipoMaquinaNome) || 'Selecione o tipo de Máquina'}
                  </Text>
                  <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                </View>
              );
            }}
            renderItem={(item,  isSelected) => {
              return (
                <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                  <Text style={styles.dropdownItemTxtStyle}>{item.tipoMaquinaNome}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />

          <Text style={styles.label}>Setor da Maquina</Text>
          <SelectDropdown
            data={setores}
            onSelect={(selectedItem) => {
              setSetorId(selectedItem.setorId);
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.inputSelect}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.setorNome) || 'Selecione o setor da Máquina'}
                  </Text>
                  <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                </View>
              );
            }}
            renderItem={(item,  isSelected) => {
              return (
                <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                  <Text style={styles.dropdownItemTxtStyle}>{item.setorNome}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />

          <Text style={styles.label}>Fabricante da Maquina</Text>
          <SelectDropdown
            data={fabricantes}
            onSelect={(selectedItem) => {
              setFabricanteId(selectedItem.fabricanteId);
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.inputSelect}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.fabricanteNome) || 'Selecione o fabricante da Máquina'}
                  </Text>
                  <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                </View>
              );
            }}
            renderItem={(item,  isSelected) => {
              return (
                <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                  <Text style={styles.dropdownItemTxtStyle}>{item.fabricanteNome}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />

        </Animatable.View>
      )}

      {step === 4 && (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Obrigado por cadastrar uma Máquina!</Text>
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
        <Animatable.View animation="fadeInUp" delay={50}>
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <View style={styles.continueView}>
            <Text style={styles.buttonText}>Continuar</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color="white" />
          </View>
        </TouchableOpacity>
        </Animatable.View>
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
  inputSelect: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#F7F7F7',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#919191',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
    marginTop: -45
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
});