import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CadastroMaquina from './CadastroMaquina';
import Conta from './Conta';
import RegistroManutencao from './RegistroManutenção';
import InventarioPecas from './InventarioPecas';
import Notificacoes from './Notificacoes';
import * as Animatable from 'react-native-animatable';

export default function Configuracoes({handle}) {

  const [conta, setConta] = useState(false);
  const [notificacoes, setNotificacoes] = useState(false);
  const [registroManutencao, setRegistroManutencao] = useState(false);
  const [inventariopecas, setInventarioPecas] = useState(false);
  const [cadastromaquina, setCadastroMaquina] = useState(false);

  if (conta === true) {
    return(
      <Conta handle={ setConta } />
    )
  }
  function ExibirConta() {
    setConta(true)
  }

  if (notificacoes === true) {
    return(
      <Notificacoes handle={ setNotificacoes } />
    )
  }
  function ExibirNotificacoes() {
    setNotificacoes(true)
  }

  if ( registroManutencao === true) {
    return(
      <RegistroManutencao handle={ setRegistroManutencao } />
    )
  }
  function ExibirRegistroManutencao() {
    setRegistroManutencao(true)
  }

  if ( inventariopecas === true) {
    return(
      <InventarioPecas handle={ setInventarioPecas } />
    )
  }
  function ExibirInventarioPecas() {
    setInventarioPecas(true)
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

      <TouchableOpacity onPress={ExibirConta}>
        <Animatable.View animation="slideInRight" duration={500} style={styles.menuItem}>
        <Text style={styles.menuText}>Conta</Text>
        <MaterialCommunityIcons name="chevron-right" size={24} color="white" />
        </Animatable.View>
      </TouchableOpacity>

      <TouchableOpacity onPress={ExibirNotificacoes} >
      <Animatable.View animation="slideInRight" duration={500} style={styles.menuItem}>
        <Text style={styles.menuText}>Notificações</Text>
        <MaterialCommunityIcons name="chevron-right" size={24} color="white" />
        </Animatable.View>
      </TouchableOpacity>

      <TouchableOpacity>
      <Animatable.View animation="slideInRight" duration={500} style={styles.menuItem}>
        <Text style={styles.menuText}>Histórico</Text>
        <MaterialCommunityIcons name="chevron-right" size={24} color="white" />
        </Animatable.View>
      </TouchableOpacity>

      <TouchableOpacity onPress={ExibirRegistroManutencao}>
      <Animatable.View animation="slideInRight" duration={500} style={styles.menuItem}>
        <Text style={styles.menuText}>Registro de Manutenção</Text>
        <MaterialCommunityIcons name="chevron-right" size={24} color="white" />
        </Animatable.View>
      </TouchableOpacity>

      <TouchableOpacity onPress={ExibirInventarioPecas}>
      <Animatable.View animation="slideInRight" duration={500} style={styles.menuItem}>
        <Text style={styles.menuText}>Inventário de Peças</Text>
        <MaterialCommunityIcons name="chevron-right" size={24} color="white" />
        </Animatable.View>
      </TouchableOpacity>

      <TouchableOpacity>
      <Animatable.View animation="slideInRight" duration={500} style={styles.menuItem}>
        <Text style={styles.menuText}>Relatório do Funcionário</Text>
        <MaterialCommunityIcons name="chevron-right" size={24} color="white" />
        </Animatable.View>
      </TouchableOpacity>

      <TouchableOpacity onPress={ExibirCadastroMaquina}>
      <Animatable.View animation="slideInRight" duration={500} style={styles.menuItem}>
        <Text style={styles.menuText}>Cadastro de Máquinas</Text>
        <MaterialCommunityIcons name="chevron-right" size={24} color="white" />
        </Animatable.View>
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
