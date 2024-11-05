import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SectionList, FlatList, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Maquinas from '../Components/Maquinas';
import { useFocusEffect } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Menu from './Menu';

export default function Home() {
    const [maquinas, setMaquinas] = useState([]);
    const [error, setError] = useState(false);
    const [greeting, setGreeting] = useState('');
    const [menu, setMenu] = useState(false);

    async function getMaquinas() {
        await fetch(process.env.EXPO_PUBLIC_URL + '/api/Maquina/GetAllMaquinas', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        })
        .then(res => res.json())
        .then(json => setMaquinas(json))
        .catch(err => setError(true));
    }

    async function deleteMaquina(maquinaId) {
        try {
            await fetch(process.env.EXPO_PUBLIC_URL + `/api/Maquina/DeleteMaquina/${maquinaId}`, {
                method: 'DELETE',
            });
            setMaquinas(maquinas.filter(maquina => maquina.maquinaId !== maquinaId));
        } catch (err) {
            console.error('Erro ao deletar máquina:', err);
        }
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

    useEffect(() => {
        getMaquinas();
        updateGreeting();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            getMaquinas();
        }, [])
    );

    const groupBySetor = (maquinas) => {
        const setores = {};
        maquinas.forEach((maquina) => {
            const setor = maquina.setorId || 'Sem Setor';
            if (!setores[setor]) {
                setores[setor] = [];
            }
            setores[setor].push(maquina);
        });
        return Object.keys(setores).map((setor) => ({ setor, data: setores[setor] }));
    };

    if (menu === true) {
        return <Animatable.View animation="slideInRight" duration={500} style={styles.menuContainer}>
        <Menu handle={setMenu} />
    </Animatable.View>
    }
    function ExibirMenu() {
        setMenu(true);
    }

    return (
        <View style={styles.container}>
            <Animatable.View animation="slideInDown" duration={800} style={styles.subHeader}>
                <Text style={styles.greetingText}>{greeting}</Text>
                <View style={styles.headerIcons}>
                    <Animatable.View animation="pulse" iterationCount="infinite" iterationDelay={3000}>
                        <MaterialCommunityIcons name="qrcode-scan" size={24} color="white" style={styles.iconSpacing} />
                    </Animatable.View>
                    <TouchableOpacity onPress={ExibirMenu}>
                        <Animatable.View animation="bounceIn" duration={1500}>
                            <MaterialCommunityIcons name="menu" size={24} color="white" style={styles.iconSpacing} />
                        </Animatable.View>
                    </TouchableOpacity>
                </View>
            </Animatable.View>

            {error ? (
                <Text style={styles.errorText}>Erro ao carregar as máquinas!</Text>
            ) : (
                <SectionList
                    sections={groupBySetor(maquinas)}
                    keyExtractor={(item) => item.maquinaId.toString()}
                    renderSectionHeader={({ section: { setor } }) => (
                        <Animatable.Text animation="fadeIn" delay={200} style={styles.setorHeader}>
                            {setor}
                        </Animatable.Text>
                    )}
                    renderItem={({ item }) => (
                        <Animatable.View animation="fadeInUp" delay={200} style={styles.box}>
                            <Maquinas
                                maquinaFoto={item.fotoUrl}
                                maquinaModelo={item.modelo}
                                maquinaNumeroSerie={item.numeroSerie}
                                onDelete={() => deleteMaquina(item.maquinaId)}
                            />
                        </Animatable.View>
                    )}
                />
            )}
        </View>
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
