import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CadastroMaquina from './CadastroMaquina';
import Conta from './Conta';
import RegistroManutencao from './RegistroManutenção';

export default function Configuracoes({handle}) {

  const [conta, setConta] = useState(false);
  const [registroManutencao, setRegistroManutencao] = useState(false);
  const [cadastromaquina, setCadastroMaquina] = useState(false);

  if (conta === true) {
    return(
      <Conta handle={ setConta } />
    )
  }
  function ExibirConta() {
    setConta(true)
  }

  if ( registroManutencao === true) {
    return(
      <RegistroManutencao handle={ setRegistroManutencao } />
    )
  }
  function ExibirRegistroManutencao() {
    setRegistroManutencao(true)
  }

  if (cadastromaquina === true) {
    return(
      <CadastroMaquina handle={ setCadastroMaquina }/>
    )
  }
  function ExibirCadastroMaquina() {
    setCadastroMaquina(true)
  }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
      <TouchableOpacity onPress={() => handle(false)} style={styles.backButton}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.title}>Configurações</Text>
      </View>

      <TouchableOpacity onPress={ExibirConta}style={styles.menuItem}>
        <Text style={styles.menuText}>Conta</Text>
        <MaterialCommunityIcons name="chevron-right" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>Notificações</Text>
        <MaterialCommunityIcons name="chevron-right" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>Histórico</Text>
        <MaterialCommunityIcons name="chevron-right" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity onPress={ExibirRegistroManutencao} style={styles.menuItem}>
        <Text style={styles.menuText}>Registro de Manutenção</Text>
        <MaterialCommunityIcons name="chevron-right" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>Inventário de Peças</Text>
        <MaterialCommunityIcons name="chevron-right" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>Relatório do Funcionário</Text>
        <MaterialCommunityIcons name="chevron-right" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity onPress={ExibirCadastroMaquina} style={styles.menuItem}>
        <Text style={styles.menuText}>Cadastro de Máquinas</Text>
        <MaterialCommunityIcons name="chevron-right" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 20,
  },
  header: {
    marginTop: 30
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 20
  },
  menuText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '500',
  },
});
