import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SectionList, FlatList, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Maquinas from '../Components/Maquinas';
import { useFocusEffect } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Menu from './Menu';
import QRCode from './Qrcode';
import DetalhesMaquina from '../Components/DetalhesMaquina';

export default function Home() {
    const [maquinas, setMaquinas] = useState([]);
    const [setores, setSetores] = useState([]);
    const [error, setError] = useState(false);
    const [greeting, setGreeting] = useState('');
    const [maquinaDetalhes, setMaquinaDetalhes] = useState('');
    const [maquinaDetalhesExibir, setMaquinaDetalhesExibir] = useState(false);
    const [menu, setMenu] = useState(false);
    const [qrcode, setQrCode] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    

    async function getMaquinas() {
        await fetch(process.env.EXPO_PUBLIC_URL + '/api/Maquina/GetAllMaquinas', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(json => setMaquinas(json))
            .catch(err => console.log(err));
    }

    async function getSetores() {
        await fetch(process.env.EXPO_PUBLIC_URL + '/api/Setor/GetAllSetores', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(json => setSetores(json))
            .catch(err => setError(true));
    }

    async function detalhesMaquina(item) {
        console.log(item)
            await fetch(process.env.EXPO_PUBLIC_URL + `/api/Maquina/GetMaquinaByIdCompleto/${item}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                  }
            })
            .then(res => res.json())
            .then(json => setMaquinaDetalhes(json))
            .then(json => setMaquinaDetalhesExibir(true))
            .catch(err => console.log('Erro ao pegar detalhes da máquina', err));
            }
            

    

    const updateGreeting = () => {
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            setGreeting('Bom dia!');
        } else if (currentHour >= 12 && currentHour < 18) {
            setGreeting('Boa tarde!');
        } else {
            setGreeting('Boa noite!');
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await Promise.all([getMaquinas(), getSetores()]);
        setRefreshing(false);
    };

    useEffect(() => {
        getMaquinas();
        updateGreeting();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            getSetores();
            getMaquinas();
        }, [])
    );

    if (maquinaDetalhesExibir === true) {
        return (
            <Animatable.View animation="slideInRight" duration={500} style={styles.menuContainer}>
                <DetalhesMaquina maquinaDetalhes={maquinaDetalhes} handle={setMaquinaDetalhesExibir} />
            </Animatable.View>
        );
    }

    if (menu === true) {
        return <Animatable.View animation="slideInRight" duration={500} style={styles.menuContainer}>
            <Menu handle={setMenu} />
        </Animatable.View>
    }
    function ExibirMenu() {
        setMenu(true);
    }

    if (qrcode === true) {
        return <Animatable.View animation="slideInRight" duration={500} style={styles.menuContainer}>
            <QRCode handle={setQrCode} />
        </Animatable.View>
    }
    function ExibirQRcode() {
        setQrCode(true);
    }

    return (
        <ScrollView style={styles.container}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
            <Animatable.View animation="slideInDown" duration={800} style={styles.subHeader}>
                <Text style={styles.greetingText}>{greeting}</Text>
                <View style={styles.headerIcons}>
                    <TouchableOpacity onPress={ExibirQRcode}>
                        <Animatable.View animation="bounceIn" duration={2000}>
                            <MaterialCommunityIcons name="qrcode-scan" size={24} color="white" style={styles.iconSpacing} />
                        </Animatable.View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ExibirMenu}>
                        <Animatable.View animation="bounceIn" duration={2000}>
                            <MaterialCommunityIcons name="menu" size={24} color="white" style={styles.iconSpacing} />
                        </Animatable.View>
                    </TouchableOpacity>
                </View>
            </Animatable.View>

            {error ? (
                <Text style={styles.errorText}>Erro ao carregar as máquinas!</Text>
            ) : (
                maquinas && setores &&
                setores.map((setor) => {
                    let empty = maquinas.filter(maquina => maquina.setorId == setor.setorId);
                    if (empty.length > 0) {
                        return (

                            <View key={setor.setorId}>
                                <Animatable.Text animation="fadeIn" delay={400} style={styles.setorHeader}>
                                    {setor.setorNome}
                                </Animatable.Text>
                                <FlatList
                                    data={maquinas}
                                    horizontal={true}
                                    keyExtractor={(item) => item.maquinaId}
                                    renderItem={({ item }) =>
                                        <Animatable.View animation="fadeInRight" delay={400} style={styles.box}>
                                            <Maquinas
                                                setor={setor.setorId}
                                                item={item}
                                                onDetail={() => detalhesMaquina(item.maquinaId)}
                                            />
                                        </Animatable.View>
                                    }
                                />
                            </View>

                        )
                    }
                })
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E1E1E',
    },
    subHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
        marginTop: 30,
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    iconSpacing: {
        marginLeft: 15,
    },
    greetingText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        padding: 20,
    },
    errorText: {
        textAlign: 'center',
        color: 'red',
        marginTop: 20,
    },
    setorHeader: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFF',
        backgroundColor: '#333',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    box: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menuContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: '#2E2E2E',
        zIndex: 10,
    },
});
