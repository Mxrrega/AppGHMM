import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext';
import Cadastro from './Cadastro';

export default function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [cadastro, setCadastro] = useState(false);

    const { Login, error } = useContext(AuthContext);

    function RealizaLogin() {
       Login( email, senha );
    }
    if (cadastro) {
        return <Cadastro handle={setCadastro} />;
      }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={require("../../assets/logo.png")} style={styles.logo} />
            <TextInput
                inputMode="email"
                placeholder="Email do Usuário"
                style={styles.input}
                value={email}
                onChangeText={(digitado) => setEmail(digitado)}
                placeholderTextColor="white"
            />
            <TextInput
                inputMode="text"
                placeholder="Senha do Usuário"
                secureTextEntry={true}
                style={styles.input}
                value={senha}
                onChangeText={(digitado) => setSenha(digitado)}
                placeholderTextColor="white"
            />
            <TouchableOpacity onPress={() => setCadastro(true)} style={styles.forgot} >
                <Text style={styles.forgotText}>Cadastre-se</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnLogin} onPress={RealizaLogin}>
                <Text style={styles.btnLoginText}>ENTRAR</Text>
            </TouchableOpacity>
            {error &&
                <View style={styles.error}>
                    <Text style={styles.errorText}>Revise os campos. Tente novamente!</Text>
                </View>
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
    forgot: {
        width: "90%",
        marginTop: 10,
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    forgotText: {
        color: "#0195fd",
        fontWeight: "bold"
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
    error: {
        width: "100%",
        height: 50,
        marginTop: 30
    },
    errorText: {
        color: "white",
        textAlign: "center"
    }
});