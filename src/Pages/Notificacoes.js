import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

export default function Notificacoes({ handle }) {

  const [step, setStep] = useState(1);
  const [notificacoes, setNotificacoes] = useState([]);
  const [detalhes, setDetalhesNotificacao] = useState(null);
  const [nomeusuario, setUsuario] = useState([]);

  const handleContinue = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const notificationsData = {
    read: [
      {
        id: '3',
        sender: 'Filipo Creatino',
        title: 'Atualização Concluída',
        message: 'A máquina de corte foi atualizada com o software mais recente. Verifique as novas funcionalidades.',
        icon: 'check-circle',
        iconColor: '#32CD32',
      },
      {
        id: '4',
        sender: 'Adalberto Quinzé',
        title: 'Chamada de Atenção',
        message: 'A pressão na máquina de injeção ultrapassou o limite seguro. Equipe técnica já foi notificada.',
        icon: 'check-circle',
        iconColor: '#32CD32',
      },
      {
        id: '5',
        sender: 'Adalberto Quinzé',
        title: 'Peça Substituída',
        message: 'A correia transportadora foi trocada e está pronta para uso.',
        icon: 'check-circle',
        iconColor: '#32CD32',
      },
    ],
  };

  async function getNotificacoes() {
    await fetch(process.env.EXPO_PUBLIC_URL + '/api/Aviso/GetAllAvisos', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    })
        .then(res => res.json())
        .then(json => setNotificacoes(json))
        .catch(err => console.log('deu ruim'));
  }

  async function getUsuario() {
    await fetch(`${process.env.EXPO_PUBLIC_URL}/api/Usuario/GetUsuarioById/${notificacoes.usuarioId}`, {
      method: 'GET',
      headers: {
          'content-type': 'application/json',
      },
  })
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.log('deu ruim'));
  }

  useEffect(() => {
    getNotificacoes();
    getUsuario()
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getNotificacoes();
      getUsuario()
    }, [])
  );

  const [selectedNotification, setSelectedNotification] = useState(null);

  const ExibirDetalhes = (notification) => {
    setDetalhesNotificacao(notification);
    handleContinue();
  };

  const unreadCount = notificacoes.length;

  const renderNotification = ({ item }) => (
    <Animatable.View animation="fadeInUp" duration={750} style={styles.notificationContainer}>
      <TouchableOpacity
        onPress={() => ExibirDetalhes(item)}
        style={styles.notificationContent}
      >
        <Text style={styles.senderText}>de: {item.usuarioId}</Text>
        <Text style={styles.titleText}>{item.avisoTipo}</Text>
        <Text style={styles.messageText}>{item.avisoConteudo}</Text>
      </TouchableOpacity>
      <Icon name={item.icon} size={30} color={item.iconColor} style={styles.notificationIcon} />
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
            
            <View style={styles.notificationCountContainer}>
              <Text style={styles.headerTitle}>Notificações</Text>
              <View style={styles.notificationCountBox}>
                <Text style={styles.notificationCountText}>{unreadCount}</Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="plus" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>NÃO LIDA:</Text>
          <FlatList
            data={notificacoes}
            renderItem={renderNotification}
            keyExtractor={(item) => item.id}
          />

          <Text style={styles.sectionTitle}>VISTAS:</Text>
          <FlatList
            data={notificationsData.read}
            renderItem={renderNotification}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}

      {step === 2 && (
        <View style={styles.containerNot}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Icon name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Não Lida</Text>
          <View style={styles.notificationBox}>
            <Text style={styles.senderText}>{detalhes.usuarioNome}</Text>
            <Text style={styles.messageText}>{detalhes.avisoTipo}</Text>
            <Text style={styles.messageText}>{detalhes.avisoConteudo}</Text>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.detailButton}>
                <Icon name="thumb-up" size={24} color="#FFD700" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.detailButton}>
                <Icon name="thumb-down" size={24} color="#FFD700" />
              </TouchableOpacity>
            </View>
          </View>
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
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  notificationCountContainer: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notificationCountBox: {
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: '#B22222',
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
    padding: 16,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    padding: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  notificationBox: {
    borderWidth: 1,
    borderColor: '#A9A9A9',
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#2C2C2E',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginTop: 16,
  },
  button: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#3C3C3E',
  },
});
