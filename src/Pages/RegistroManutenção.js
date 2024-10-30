import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

export default function RegistroManutencao({ handle }) {

    const [step, setStep] = useState(1);

    const [tipoManutencao, setTipoManutencao] = useState('');
    const [tecnicoManutencao, setTecnicoManutencao] = useState('');
    const [dataManutencao, setDataManutencao] = useState('');
    const [descricaoManutencao, setDescricaoManutencao] = useState('');
    const [custoManutencao, setCustoManutencao] = useState('');
    

    const [tiposManutencao, setTiposManutencao] = useState([]);
    const [tecnicosManutencao, setTecnicosManutencao] = useState([]);
    const [sucesso, setSucesso] = useState(false);

    async function carregarDados() {

        await fetch(process.env.EXPO_PUBLIC_URL + '/api/', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(json => setTiposManutencao(json))
            .catch(err => console.error('Erro ao carregar tipos de manutenções:', err));

        await fetch(process.env.EXPO_PUBLIC_URL + '/api/', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(json => setTecnicosManutencao(json))
            .catch(err => console.error('Erro ao carregar tecnicos:', err));
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
        if (step < 3) setStep(step + 1);
    };

    if (sucesso === true) {
        handleContinue();
    }

    async function cadastrarManutencao() {
        setSucesso(true);
        if (!moment(dataManutencao, 'DD/MM/YYYY', true).isValid()) {
            Alert.alert('Erro', 'A data de aquisição está inválida. Use o formato DD/MM/YYYY.');
            return;
        }

        const manutencoes = {
            tipoManutencao,
            tecnicoManutencao,
            dataManutencao: moment(dataManutencao, 'DD/MM/YYYY').format('YYYY-MM-DD'),
            descricaoManutencao,
            custoManutencao,
        };

        console.log('Manutenção a ser cadastrada:', manutencoes);



        /*await fetch(process.env.EXPO_PUBLIC_URL + '/api/', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(
            {
            
            }
          )
        })
          .then(res => res.json())
          .then(json => console.log(json))
          .catch(err => console.error('Erro ao cadastrar a manutenção. Código de status:', err));
          setSucesso(true)*/

    }

    return (
        <ScrollView style={styles.container}>
            {step === 1 && (
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => handle(false)} style={styles.backButton}>
                        <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Registro de Manutenção</Text>
                </View>
            )}

{step === 1 && (
            <View>
                <Text style={styles.label}>Tipo da Manutenção</Text>
                <SelectDropdown
                    data={tiposManutencao}
                    onSelect={(selectedItem) => {
                        setTipoManutencao(selectedItem.setorId);
                    }}
                    renderButton={(selectedItem, isOpened) => {
                        return (
                            <View style={styles.inputSelect}>
                                <Text style={styles.dropdownButtonTxtStyle}>
                                    {(selectedItem && selectedItem.setorNome) || 'Selecione o tipo da Manutenção'}
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

<Text style={styles.label}>Técnico da Manutenção</Text>
                <SelectDropdown
                    data={tecnicosManutencao}
                    onSelect={(selectedItem) => {
                        setTecnicoManutencao(selectedItem.setorId);
                    }}
                    renderButton={(selectedItem, isOpened) => {
                        return (
                            <View style={styles.inputSelect}>
                                <Text style={styles.dropdownButtonTxtStyle}>
                                    {(selectedItem && selectedItem.setorNome) || 'Selecione o técnico da Manutenção'}
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

                <Text style={styles.label}>Data da Manutenção</Text>
                <TextInput
                    value={dataManutencao}
                    onChangeText={setDataManutencao}
                    placeholder="Digite a data da Manutenção"
                    style={styles.input}
                />

                <Text style={styles.label}>Descrição da Manutenção</Text>
                <TextInput
                    value={descricaoManutencao}
                    onChangeText={setDescricaoManutencao}
                    placeholder="Digite a descrição da Manutenção"
                    style={styles.input}
                />

                <Text style={styles.label}>Custo da Manutenção</Text>
                <TextInput
                    value={custoManutencao}
                    onChangeText={setCustoManutencao}
                    placeholder="Digite o custo da Manutenção"
                    style={styles.input}
                />

                
            </View>
        )}
        {step === 1 && (
            <TouchableOpacity style={styles.button} onPress={cadastrarManutencao}>
                <View style={styles.continueView}>
                    <Text style={styles.buttonText}>Cadastrar Manutenção</Text>
                </View>
            </TouchableOpacity>
        )}



    {step > 1 && (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Obrigado por cadastrar uma Manutenção!</Text>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => handle(false)}
            >
                <Text style={styles.buttonText}>
                    Continuar
                </Text>
            </TouchableOpacity>
        </View>

    )
}
    </ScrollView >
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
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 40,
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