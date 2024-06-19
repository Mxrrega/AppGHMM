import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import { AuthContext } from '../Context/AuthContext';


export default function CadastrarDesaparecido() {


    const [pessoaNome, setPessoaNome] = useState();
    const [pessoaRoupa, setPessoaRoupa] = useState();
    const [pessoaCor, setPessoaCor] = useState();
    const [pessoaSexo, setPessoaSexo] = useState();
    const [pessoaObservacao, setPessoaObservacao] = useState();
    const [pessoaLocalDesaparecimento, setPessoaLocalDesaparecimento] = useState();
    const [pessoaFoto, setPessoaFoto] = useState();
    const [pessoaDtDesaparecimento, setPessoaDtDesaparecimento] = useState();
    const [pessoaDtEncontro, setPessoaDtEncontro] = useState();
    const [pessoaStatus, setPessoaStatus] = useState();

    const { usuarioId, usuarioNome } = useContext(AuthContext);

    const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

    async function CadastroDesaparecido() { 
        if (!pessoaNome || !pessoaRoupa || !pessoaCor || !pessoaSexo || !pessoaObservacao || !pessoaLocalDesaparecimento || !pessoaDtEncontro || !pessoaStatus ) {
            Alert.alert('Erro', 'Por Favor, preencha todos os campos.');
            return;
          }

          await fetch('http://10.139.75.20:5251/api/Pessoa/CreatePessoa', {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(
              {
                pessoaNome: pessoaNome,
                pessoaRoupa: pessoaRoupa,
                pessoaCor: pessoaCor,
                pessoaSexo : pessoaSexo ,
                pessoaObservacao: pessoaObservacao,
                pessoaLocalDesaparecimento: pessoaLocalDesaparecimento,
                pessoaFoto: pessoaFoto,
                pessoaDtEncontro: pessoaDtEncontro,
                pessoaStatus: pessoaStatus,
                usuarioId: usuarioId
              }
            )
      
          })
            .then(res => (res.ok == true) ? res.json() : false)
            .then(json => console.log(json))
            .then(json => (json.pessoaId ? setSucesso(true) : setErro(true)) )
            .catch(err => setErro(true))
            setSucesso(true)
    }
    

    return (
        <View style={styles.container}>
            {sucesso ?
                <View style={styles.successContainer}>
                    <Text style={styles.textCadastro}>Obrigado por se Cadastrar. Seu cadastro foi realizado com sucesso</Text>
                    <TouchableOpacity style={styles.btnVoltar} onPress={() => { setSucesso(false), setPessoaNome(''), setPessoaRoupa(''), setPessoaCor(''), setPessoaSexo(''), setPessoaObservacao(''), setPessoaLocalDesaparecimento(''), setPessoaFoto(''), setPessoaDtDesaparecimento(''), setPessoaDtEncontro(''), setPessoaStatus('') }}>
                        <Text style={styles.btnText}>Voltar</Text>
                    </TouchableOpacity>
                </View>
                :
                <View style={{ marginTop: 50, marginBottom: 20 }}>
                    <Text style={styles.title}>Nova Pessoa Desaparecida</Text>

                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                        <View style={{ marginTop: 20 }}>
                            <TextInput
                                style={styles.campos}
                                placeholder='Nome da Pessoa'
                                value={pessoaNome}
                                onChangeText={setPessoaNome}
                                placeholderTextColor="white"
                            />
                            <TextInput
                                style={styles.campos}
                                placeholder='Roupa da Pessoa'
                                value={pessoaRoupa}
                                onChangeText={setPessoaRoupa}
                                placeholderTextColor="white"
                            />
                            <TextInput
                                style={styles.campos}
                                placeholder='Cor da Pessoa'
                                value={pessoaCor}
                                onChangeText={setPessoaCor}
                                placeholderTextColor="white"
                            />
                            <TextInput
                                style={styles.campos}
                                placeholder='Sexo da Pessoa'
                                value={pessoaSexo}
                                onChangeText={setPessoaSexo}
                                placeholderTextColor="white"
                            />
                            <TextInput
                                style={styles.campos}
                                placeholder='Observação da Pessoa'
                                value={pessoaObservacao}
                                onChangeText={setPessoaObservacao}
                                placeholderTextColor="white"
                            />
                            <TextInput
                                style={styles.campos}
                                placeholder='Local de Desaparecimento da Pessoa'
                                value={pessoaLocalDesaparecimento}
                                onChangeText={setPessoaLocalDesaparecimento}
                                placeholderTextColor="white"
                            />
                            <TextInput
                                style={styles.campos}
                                placeholder='Foto da Pessoa'
                                value={pessoaFoto}
                                onChangeText={setPessoaFoto}
                                placeholderTextColor="white"
                            />
                            <TextInput
                                style={styles.campos}
                                placeholder='Data de Desaparecimento da Pessoa'
                                value={pessoaDtDesaparecimento}
                                onChangeText={setPessoaDtDesaparecimento}
                                placeholderTextColor="white"
                            />
                            <TextInput
                                style={styles.campos}
                                placeholder='Data de Encontro da Pessoa'
                                value={pessoaDtEncontro}
                                onChangeText={setPessoaDtEncontro}
                                placeholderTextColor="white"
                            />
                            <TextInput
                                style={styles.campos}
                                placeholder='Status (1 para desaparecido e 0 para encontrado)'
                                value={pessoaStatus}
                                onChangeText={setPessoaStatus}
                                placeholderTextColor="white"
                            />
                            <Text style={styles.campos}>Usuário: {usuarioNome}</Text>

                            <TouchableOpacity style={styles.submitButton} onPress={CadastroDesaparecido} >
                                <Text style={styles.submitButtonText}>Cadastrar</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            }
        </View>

    )
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
        backgroundColor: 'white',
        padding: 16,
    },
    textCadastro: {
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
    campos: {
        width: "100%",
        height: 50,
        borderRadius: 10,
        marginBottom: 15,
        padding: 15,
        backgroundColor: "#262626",
        color: "white"
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 40
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});