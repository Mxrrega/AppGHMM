import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

const LoginScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require("../../assets/Logo GHMM.png")} style={styles.logo} />
            </View>
            <View style={styles.box}>
                <Image
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}
                    style={styles.avatar}
                />

                <Text style={styles.NomeUsuario}>Jose Ferreira da Silva</Text>

                <TextInput
                    style={styles.input}
                    placeholder="CPF"
                    placeholderTextColor="#000"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor="#000"
                    secureTextEntry
                />

                <TouchableOpacity>
                    <Text style={styles.forgotPassword}>Esqueceu a senha</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#1E1E1E',
        paddingHorizontal: 15,
    },
    logo: {
        width: "30%",
        resizeMode: "contain",
        alignSelf: "center",
    },
    box: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.8
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 30,
        marginBottom: 10,
    },
    NomeUsuario: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 50,
        backgroundColor: '#E0E0E0',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 10,
    },
    forgotPassword: {
        color: '#000',
        fontSize: 14,
        alignSelf: 'flex-end',
        marginBottom: 20,
    },
    button: {
        width: '80%',
        height: 50,
        backgroundColor: '#007BFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default LoginScreen;