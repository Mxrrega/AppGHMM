import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons'; 

export default function Cadastro({handle}) {
  const [step, setStep] = useState(1);
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [escolaridade, setEscolaridade] = useState('');
  const [urlFoto, setUrlFoto] = useState('');
  const [senha, setSenha] = useState('');
  const [agradecimento, setAgradecimento] = useState(false);
  const [Versenha, setVersenha] = useState(false);

  const handleContinue = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  function ExibirAgradecimento() {
    const dados = {
      nome, cpf, email, telefone, dataNascimento, escolaridade, urlFoto, senha
    };
    console.log('Dados enviados:', dados);
    setNome("");
    setCpf("");
    setEmail("");
    setTelefone("");
    setDataNascimento("");
    setEscolaridade("");
    setUrlFoto("");
    setSenha("");
    setAgradecimento(true)

    handleContinue()
  }

  const VerSenha = () => {
    setVersenha(!Versenha);
  };

  return (
    <ScrollView style={styles.container}>
      {step > 1 && step < 4 && (
        <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.title}>Crie uma nova conta</Text>
      </View>
      )}

      {step === 1 && (
        <View>
          <View style={styles.header}>
        <TouchableOpacity onPress={() => handle(false)}  style={styles.backButton}>
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
            value={cpf} 
            onChangeText={setCpf} 
            placeholder="Digite seu CPF" 
            keyboardType="numeric" 
            style={styles.input} 
          />
          
          <Text style={styles.label}>Email</Text>
          <TextInput 
            value={email} 
            onChangeText={setEmail} 
            placeholder="Digite seu email" 
            keyboardType="email-address" 
            style={styles.input} 
          />
        </View>
      )}

      {step === 2 && (
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

      {step === 3 && (
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
      )}
      {step < 3 && (
      <TouchableOpacity 
        style={styles.button} 
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

{step === 3 && (
      <TouchableOpacity 
        style={styles.buttonCadastro} 
        onPress={ExibirAgradecimento}
      >
        <Text style={styles.buttonText}>
          Cadastrar                                                                
        </Text>
      </TouchableOpacity>
      )}
      {step === 4 && ( 
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


