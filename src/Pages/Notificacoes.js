import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectDropdown from 'react-native-select-dropdown';

export default function Notificacoes({ handle }) {

  const [step, setStep] = useState(1);
  const [notificacoes, setNotificacoes] = useState([]);
  const [detalhes, setDetalhesNotificacao] = useState(null);

  const [avisoConteudo, setAvisoConteudo ] = useState([]);
  const [usuarioId, setUsuarioId ] = useState([]);
  const [avisoTipoId, setAvisoTipoId ] = useState([]);

  const [usuario, setUsuario ] = useState([]);
  const [avisoTipo, setAvisoTipo ] = useState([]);

  

  async function getNotificacoes() {

      await fetch(process.env.EXPO_PUBLIC_URL + '/api/Aviso/GetAllAvisos', {
        method: 'GET',
        headers: { 
          'content-type': 'application/json' 
        },
      })
      .then(res => res.json())
      .then(json => setNotificacoes(json))
      .catch(err => console.error('Erro ao buscar notificações:', err));

  };

  async function getDados() {
    
    await fetch(process.env.EXPO_PUBLIC_URL + '/api/Usuario/GetAllUsuarios', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => setUsuario(json))
      .catch(err => console.error('Erro ao carregar usuarios:', err));

      await fetch(process.env.EXPO_PUBLIC_URL + '/api/AvisoTipo/GetAllAvisoTipos', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(json => setAvisoTipo(json))
        .catch(err => console.error('Erro ao carregar tipo de aviso:', err));
  }

  useEffect(() => {
    getNotificacoes();
    getDados();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getNotificacoes();
      getDados();
    }, [])
  );

  async function ExibirDetalhes(notification) {

      await fetch(`${process.env.EXPO_PUBLIC_URL}/api/Aviso/UpdateAviso/${notification.avisoId}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          avisoConteudo: notification.avisoConteudo,
          avisoVisto: true, 
          usuarioId: notification.usuario.usuarioId,
          avisoTipoId: notification.avisoTipo.avisoTipoId
        })
      })
      .then( res => res.json() )
      .then( json => {
        getNotificacoes();
        setDetalhesNotificacao(notification);
        setStep(2);
      })
      .catch( (error) => console.log( error ) );
  }

  async function cadastroNotificacao() {
    
  }

  const notificacoesNaoLidas = notificacoes.filter(item => item.avisoVisto == false );
  const notificacoesLidas = notificacoes.filter(item => item.avisoVisto == true );

  const renderNotification = ({ item }) => (
    <Animatable.View animation="fadeInUp" duration={750} style={styles.notificationContainer}>
      <TouchableOpacity onPress={() => ExibirDetalhes(item)} style={styles.notificationContent}>
        <Text style={styles.senderText}>de: {item.usuario?.usuarioNome || 'Usuário desconhecido'}</Text>
        <Text style={styles.titleText}>{item.avisoTipo?.avisoTipoNome || 'Tipo não especificado'}</Text>
        <Text style={styles.messageText}>{item.avisoConteudo}</Text>
      </TouchableOpacity>
      <Icon name={item.avisoVisto ? 'check-circle' : 'alert-circle'} size={30} color={item.avisoVisto ? '#32CD32' : '#8D0000'} style={styles.notificationIcon} />
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      {step === 1 && (
        <View>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => handle(false)} style={styles.iconButton}>
              <Icon name="arrow-left" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>Notificações</Text>
              <View style={styles.notificationCountBox}>
                <Text style={styles.notificationCountText}>{notificacoesNaoLidas.length}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => setStep(3)} style={styles.iconButton} >
              <Icon name="plus" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>NÃO LIDA:</Text>
          <FlatList
            data={notificacoesNaoLidas}
            renderItem={renderNotification}
            keyExtractor={(item) => item.avisoId.toString()}
          />

          <Text style={styles.sectionTitle}>VISTAS:</Text>
          <FlatList
            data={notificacoesLidas}
            renderItem={renderNotification}
            keyExtractor={(item) => item.avisoId.toString()}
          />
        </View>
      )}

      {step === 2 && detalhes && (
        <View style={styles.containerNot}>
          <View style={styles.headerDetalhes}> 
          <TouchableOpacity onPress={() => setStep(1)} style={styles.iconButton}>
            <Icon name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Detalhes da Notificação</Text>
          </View>
          <View style={styles.notificationBox}>
            <Text style={styles.senderText}>{detalhes.usuario?.usuarioNome || 'Usuário desconhecido'}</Text>
            <Text style={styles.messageText}>{detalhes.avisoTipo?.avisoTipoNome || 'Tipo não especificado'}</Text>
            <Text style={styles.messageText}>{detalhes.avisoConteudo}</Text>
          </View>
        </View>
      )}

  {step === 3 && (
<View>
          <View style={styles.headerRegistro}>
            <TouchableOpacity onPress={() => setStep(1)} style={styles.backButtonRegistro}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
            <Animatable.Text animation="fadeInUp" delay={25} style={styles.title}>Registro de Peça</Animatable.Text>
          </View>
        <Animatable.View animation="fadeInUp" delay={50}>
          <Text style={styles.label}>Conteúdo do Aviso</Text>
          <TextInput
            value={avisoConteudo}
            onChangeText={setAvisoConteudo}
            placeholder="Digite o nome da Peça"
            style={styles.input}
          />

          <Text style={styles.label}>Usuario</Text>
          <SelectDropdown
            data={usuario}
            onSelect={(selectedItem) => {
              setUsuarioId(selectedItem.usuarioId);
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.inputSelect}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.usuarioNome) || 'Selecione o Usuário'}
                  </Text>
                  <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                </View>
              );
            }}
            renderItem={(item, isSelected) => {
              return (
                <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                  <Text style={styles.dropdownItemTxtStyle}>{item.tipoMaquinaNome}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />

<Text style={styles.label}>Tipo do Aviso</Text>
          <SelectDropdown
            data={avisoTipo}
            onSelect={(selectedItem) => {
              setAvisoTipo(selectedItem.avisoTipoId);
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.inputSelect}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.tipoMaquinaNome) || 'Selecione o fornecedor da Peça'}
                  </Text>
                  <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                </View>
              );
            }}
            renderItem={(item, isSelected) => {
              return (
                <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                  <Text style={styles.dropdownItemTxtStyle}>{item.tipoMaquinaNome}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={cadastroNotificacao}
          >
            <Text style={styles.buttonText}>
              Cadastrar
            </Text>
          </TouchableOpacity>
          </Animatable.View>
</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
    marginTop: 40,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  notificationCountBox: {
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: '#B22222',
    marginLeft: 8,
  },
  notificationCountText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionTitle: {
    color: '#A9A9A9',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  notificationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#A9A9A9',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
  },
  notificationContent: {
    flex: 1,
  },
  senderText: {
    color: '#FFD700',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  titleText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  notificationIcon: {
    marginLeft: 10,
  },
  containerNot: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    marginLeft: 10
  },
  notificationBox: {
    borderWidth: 1,
    borderColor: '#A9A9A9',
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#2C2C2E',
    alignItems: 'center',
  },
  headerDetalhes: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    marginTop: 40,
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
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#FFFF',
  },

  headerRegistro: {
    marginTop: 30,
    textAlign: 'center',
  },
  backButtonRegistro: {
    alignSelf: 'flex-start',
    marginBottom: 20,
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
