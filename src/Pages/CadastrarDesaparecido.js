import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image } from 'react-native';


export default function CadastrarDesaparecido() {


    const [pessoaId, setPessoaId] = useState(0);
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
  const [usuarioId, setUsuarioId] = useState();
  const [usuarioNome, setUsuarioNome] = useState();

    const [sucesso, setSucesso] = useState("");






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
                    <TextInput
                        style={styles.input}
                        placeholder='Nome da Pessoa'
                        value={pessoaNome}
                        onChangeText={setPessoaNome}
                        placeholderTextColor="white"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Roupa da Pessoa'
                        value={pessoaRoupa}
                        onChangeText={setPessoaRoupa}
                        placeholderTextColor="white"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Cor da Pessoa'
                        value={pessoaCor}
                        onChangeText={setPessoaCor}
                        placeholderTextColor="white"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Sexo da Pessoa'
                        value={pessoaSexo}
                        onChangeText={setPessoaSexo}
                        placeholderTextColor="white"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Observação da Pessoa'
                        value={pessoaObservacao}
                        onChangeText={setPessoaObservacao}
                        placeholderTextColor="white"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Local de Desaparecimento da Pessoa'
                        value={pessoaLocalDesaparecimento}
                        onChangeText={setPessoaLocalDesaparecimento}
                        placeholderTextColor="white"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Foto da Pessoa'
                        value={pessoaFoto}
                        onChangeText={setPessoaFoto}
                        placeholderTextColor="white"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Data de Desaparecimento da Pessoa'
                        value={pessoaDtDesaparecimento}
                        onChangeText={setPessoaDtDesaparecimento}
                        placeholderTextColor="white"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Data de Encontro da Pessoa'
                        value={pessoaDtEncontro}
                        onChangeText={setPessoaDtEncontro}
                        placeholderTextColor="white"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Status (1 para desaparecido e 0 para encontrado)'
                        value={pessoaStatus}
                        onChangeText={setPessoaStatus}
                        placeholderTextColor="white"
                    />
                     <TextInput
                        style={styles.input}
                        placeholder='Id do Usuário'
                        value={usuarioId}
                        onChangeText={setUsuarioId}
                        placeholderTextColor="white"
                    />

                    <TouchableOpacity style={styles.btnLogin} >
                        <Text style={styles.btnLoginText}>Cadastrar</Text>
                    </TouchableOpacity>
                </>
            }
            
        </ScrollView>
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