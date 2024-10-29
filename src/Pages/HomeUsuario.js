import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SectionList, FlatList, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Maquinas from '../Components/Maquinas';
import { useFocusEffect } from '@react-navigation/native';
import Menu from './Menu';

export default function Home() {
    const [maquinas, setMaquinas] = useState([]);
    const [error, setError] = useState(false);
    const [greeting, setGreeting] = useState('');
    const [menu, setMenu] = useState(false);

    async function getMaquinas() {
        try {
            const response = await fetch('http://10.139.75.33/api/Maquina/GetAllMaquinas', {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                },
            });
            const data = await response.json();
            setMaquinas(data);
        } catch (err) {
            setError(true);
        }
    }

    async function deleteMaquina(maquinaId) {
        try {
            await fetch(`http://10.139.75.33/api/Maquina/DeleteMaquina/${maquinaId}`, {
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
        return <Menu handle={setMenu} />;
    }
    function ExibirMenu() {
        setMenu(true);
    }

    return (
        <View style={styles.container}>
            <View style={styles.subHeader}>
                <Text style={styles.greetingText}>{greeting}</Text>
                <View style={styles.headerIcons}>
                    <MaterialCommunityIcons name="qrcode-scan" size={24} color="white" style={styles.iconSpacing} />
                    <TouchableOpacity onPress={ExibirMenu}>
                        <MaterialCommunityIcons name="menu" size={24} color="white" style={styles.iconSpacing} />
                    </TouchableOpacity>
                </View>
            </View>

            {error ? (
                <Text style={styles.errorText}>Erro ao carregar as máquinas!</Text>
            ) : (
                <SectionList
                    sections={groupBySetor(maquinas)}
                    keyExtractor={(item) => item.maquinaId.toString()}
                    renderSectionHeader={({ section: { setor } }) => (
                        <Text style={styles.setorHeader}>{setor}</Text>
                    )}
                    renderItem={({ section }) => (
                        <FlatList
                            data={section.data}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <Maquinas
                                    maquinaFoto={item.fotoUrl}
                                    maquinaModelo={item.modelo}
                                    maquinaNumeroSerie={item.numeroSerie}
                                    onDelete={() => deleteMaquina(item.maquinaId)}
                                />
                            )}
                            keyExtractor={(item) => item.maquinaId.toString()}
                        />
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
});
