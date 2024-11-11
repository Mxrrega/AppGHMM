import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function DetalheNotificacao({ route, navigation }) {
  const { notification } = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <Text style={styles.title}>Não Lidas</Text>

      <View style={styles.notificationBox}>
        <Text style={styles.senderText}>{notification.sender}</Text>
        <Text style={styles.messageText}>{notification.message}</Text>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button}>
            <Icon name="thumb-up" size={24} color="#FFD700" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Icon name="thumb-down" size={24} color="#FFD700" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  senderText: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
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
