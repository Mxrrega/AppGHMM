import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../Context/AuthContext';
import * as Animatable from 'react-native-animatable';
import SelectDropdown from 'react-native-select-dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Login() {

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [Versenha, setVersenha] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const [nome, setNome] = useState('');
  const [cpfCadastro, setCpfCadastro] = useState('');
  const [emailCadastro, setEmailCadastro] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [escolaridade, setEscolaridade] = useState('');
  const [urlFoto, setUrlFoto] = useState('');
  const [senhaCadastro, setSenhaCadastro] = useState('');
  const [cargoId, setCargoId] = useState('');
  const [setorId, setSetorId] = useState('');

  const [cargos, setCargos] = useState('');
  const [setores, setSetores] = useState('');

  const { Login, error } = useContext(AuthContext);

  async function carregarDados() {
    console.log('chegou')
    await fetch(process.env.EXPO_PUBLIC_URL + '/api/Cargo/GetAllCargos', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => setCargos(json))
      .catch(err => console.error('Erro ao carregar cargos:', err));

      await fetch(process.env.EXPO_PUBLIC_URL + '/api/Setor/GetAllSetores', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(json => setSetores(json))
        .catch(err => console.error('Erro ao carregar setores:', err));
  }
  useEffect(() => {
    carregarDados();
  }, []);

  async function Cadastrar() {

    if (!moment(dataNascimento, 'DD/MM/YYYY', true).isValid()) {
      Alert.alert('Erro', 'A data de nascimento está inválida. Use o formato DD/MM/YYYY.');
      return;
    }

    const dados = {
      nome, cpf, email, telefone, dataNascimento, escolaridade, urlFoto, senha
    };

    console.log('Dados enviados:', dados);

    await fetch(process.env.EXPO_PUBLIC_URL + '/api/Usuario/CreateUsuario', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(
        {
          usuarioNome: nome,
          usuarioCpf: cpf,
          usuarioEmail: email,
          usuarioTelefone : telefone,
          usuarioDataNascimento: moment(dataNascimento, 'DD/MM/YYYY').format('YYYY-MM-DD'),
          usuarioEscolaridade: escolaridade,
          urlFofotoUrlto: urlFoto,
          usuarioSenha: senha,
          cargoId: cargoId,
          setorId: setorId,
        }
      )
    })
      .then(res => res.json())
      .then(json => console.log(json))
      .then(json => (json ? console.log('Erro') : setSucesso(true)))
      .catch(err => console.error('Erro ao cadastrar o usuário. Código de status:', err));
      
  }


  function RealizaLogin() {

    const dados = {
      email,
      cpf,
      senha
    }

    console.log(dados)

    Login(email, cpf, senha);
  }

  const handleContinue = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };



  if (sucesso === true) {
    handleContinue();
  }

  const VerSenha = () => {
    setVersenha(!Versenha);
  };


  return (
    <ScrollView style={styles.container}>
      {step === 1 && (
        <View>
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
          <TouchableOpacity onPress={handleContinue}>
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
        </View>
      )}
      {step > 2 && step < 5 && (
            <View style={styles.header}>
              <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.title}>Crie uma nova conta</Text>
            </View>
          )}
      {step === 2 && (
            <View>
              <View style={styles.header}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                  <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>Crie uma nova conta</Text>
              </View>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                value={nome}
                onChangeText={setNome}
                placeholder="Digite seu nome"
                style={styles.input}
              />

              <Text style={styles.label}>CPF</Text>
              <TextInput
                value={cpfCadastro}
                onChangeText={setCpfCadastro}
                placeholder="Digite seu CPF"
                keyboardType="numeric"
                style={styles.input}
              />

              <Text style={styles.label}>Email</Text>
              <TextInput
                value={emailCadastro}
                onChangeText={setEmailCadastro}
                placeholder="Digite seu email"
                keyboardType="email-address"
                style={styles.input}
              />
            </View>
          )}
      {step === 3 && (
            <View>
              <Text style={styles.label}>Telefone</Text>
              <TextInput
                value={telefone}
                onChangeText={setTelefone}
                placeholder="Digite seu telefone"
                keyboardType="phone-pad"
                style={styles.input}
              />

              <Text style={styles.label}>Data de Nascimento</Text>
              <TextInput
                value={dataNascimento}
                onChangeText={setDataNascimento}
                placeholder="Digite sua data de nascimento"
                style={styles.input}
              />

              <Text style={styles.label}>Escolaridade</Text>
              <TextInput
                value={escolaridade}
                onChangeText={setEscolaridade}
                placeholder="Digite sua escolaridade"
                style={styles.input}
              />
            </View>
          )}

          {step === 4 && (
            <View>
              <Text style={styles.label}>URL da Foto</Text>
              <TextInput
                value={urlFoto}
                onChangeText={setUrlFoto}
                placeholder="Digite a URL da foto"
                style={styles.input}
              />

              <Text style={styles.label}>Senha</Text>

              <View style={styles.campoSenha}>
                <TextInput
                  value={senhaCadastro}
                  onChangeText={setSenhaCadastro}
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

              <Text style={styles.label}>Cargo</Text>
              <SelectDropdown
                data={cargos}
                onSelect={(selectedItem) => {
                  setCargoId(selectedItem.cargoId);
                }}
                renderButton={(selectedItem, isOpened) => {
                  return (
                    <View style={styles.inputSelect}>
                      <Text style={styles.dropdownButtonTxtStyle}>
                        {(selectedItem && selectedItem.cargoNome) || 'Selecione o cargo'}
                      </Text>
                      <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                    </View>
                  );
                }}
                renderItem={(item, isSelected) => {
                  return (
                    <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                      <Text style={styles.dropdownItemTxtStyle}>{item.cargoNome}</Text>
                    </View>
                  );
                }}
                showsVerticalScrollIndicator={false}
                dropdownStyle={styles.dropdownMenuStyle}
              />

              <Text style={styles.label}>Setor</Text>
              <SelectDropdown
                data={setores}
                onSelect={(selectedItem) => {
                  setSetorId(selectedItem.setorId);
                }}
                renderButton={(selectedItem, isOpened) => {
                  return (
                    <View style={styles.inputSelect}>
                      <Text style={styles.dropdownButtonTxtStyle}>
                        {(selectedItem && selectedItem.setorNome) || 'Selecione o setor'}
                      </Text>
                      <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                    </View>
                  );
                }}
                renderItem={(item, isSelected) => {
                  return (
                    <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                      <Text style={styles.dropdownItemTxtStyle}>{item.setorNome}</Text>
                    </View>
                  );
                }}
                showsVerticalScrollIndicator={false}
                dropdownStyle={styles.dropdownMenuStyle}
              />

            </View>
          )}
          {step > 1 && step < 4 && (
            <TouchableOpacity
              style={styles.buttonContinue}
              onPress={handleContinue}
            >
              <View style={styles.continueView}>
                <Text style={styles.buttonText}>
                  Continuar
                </Text>
                <MaterialCommunityIcons name="chevron-right" size={24} color="white" />
              </View>
            </TouchableOpacity>
          )}

          {step === 4 && (
            <TouchableOpacity
              style={styles.buttonCadastro}
              onPress={Cadastrar}
            >
              <Text style={styles.buttonText}>
                Cadastrar
              </Text>
            </TouchableOpacity>
          )}
          {step === 5 && (
            <View style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.title}>Obrigado por criar sua conta!</Text>
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
  continueView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonContinue: {
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
  loginContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#2E2E2E',
    zIndex: 10,
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
});


