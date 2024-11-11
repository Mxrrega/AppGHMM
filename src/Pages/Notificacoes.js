import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

export default function Notificacoes({ handle }) {

  const [notificacoes, setNotificacoes] = useState([]);
  const [detalhes, setDetalhesNotificacao] = useState(null);

  const notificationsData = {
    unread: [
      {
        id: '1',
        sender: 'Adalberto Quinzé',
        title: 'Peça em Falta',
        message: 'A peça "Engrenagem Primária" não está disponível no estoque. Por favor, verifique a reposição.',
        icon: 'numeric-1-circle',
        iconColor: '#B22222',
      },
      {
        id: '2',
        sender: 'Filipo Creatino',
        title: 'Atenção - Manutenção Pendente',
        message: 'A máquina CNC precisa de uma verificação de rotina para evitar falhas no próximo ciclo de produção.',
        icon: 'numeric-1-circle',
        iconColor: '#B22222',
      },

    ],
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
useEffect(() => {
  getNotificacoes();
}, []);

useFocusEffect(
  React.useCallback(() => {
      getNotificacoes();
  }, [])
);


const [selectedNotification, setSelectedNotification] = useState(null);

  const ExibirDetalhes = (notification) => {
    setDetalhesNotificacao(notification);
  };

  // Função de renderização da notificação
  const renderNotification = ({ item }) => (
    <Animatable.View animation="fadeInUp" duration={750} style={styles.notificationContainer}>
      <TouchableOpacity
        onPress={() => ExibirDetalhes(item)}
        style={styles.notificationContent}
      >
        <Text style={styles.senderText}>de: {item.usuario}</Text>
        <Text style={styles.titleText}>{item.avisoTipo}</Text>
        <Text style={styles.messageText}>{item.avisoConteudo}</Text>
      </TouchableOpacity>
      <Icon name={item.icon} size={30} color={item.iconColor} style={styles.notificationIcon} />
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <TouchableOpacity onPress={() => handle(false)} style={styles.iconButton}>
            <Icon name="arrow-left" size={24} color="#FFFFFF" />
          </TouchableOpacity>
         
          <View style={styles.notificationCountContainer}>
             <Text style={styles.headerTitle}>Notificações</Text>
             <View style={styles.notificationCountBox}>
            <Text style={styles.notificationCountText}>2</Text>
            </View>
          </View>
          <TouchableOpacity  style={styles.iconButton}>
            <Icon name="plus" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

      <Text style={styles.sectionTitle}>NÃO LIDA:</Text>
      <FlatList
        data={notificacoes}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
      />

{detalhes && (
        <View style={styles.container}>
          <Text style={styles.detailSenderText}>{detalhes.usuario}</Text>
          <Text style={styles.detailTitleText}>{detalhes.avisoTipo}</Text>
          <Text style={styles.detailMessageText}>{detalhes.avisoConteudo}</Text>

          <View style={styles.detailButtons}>
            <TouchableOpacity style={styles.detailButton}>
              <Icon name="thumb-up" size={24} color="#FFD700" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailButton}>
              <Icon name="thumb-down" size={24} color="#FFD700" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <Text style={styles.sectionTitle}>VISTAS:</Text>
      <FlatList
        data={notificationsData.read}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
      />

    </View>
  );
};

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
    marginTop: 40
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
    textAlign: 'center'
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
});


