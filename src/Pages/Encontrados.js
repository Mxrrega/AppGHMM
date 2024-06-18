import { View, Text, StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Pessoa from '../Components/Pessoa';


export default function Encontrados({ pessoaNome, pessoaFoto }) {

    const [pessoas, setPessoas] = useState([]);

async function getPessoas() {
    await fetch('http://10.139.75.20:5251/api/Pessoa/GetAll', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => setPessoas(json))
      .catch(err => setErroAPI(true))
  }

  useEffect(() => {
    getPessoas();
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      getPessoas();
    }, [])
  )

const pessoasFiltradas = pessoas.filter(pessoa => pessoa.pessoaStatus === 0);

  return (
    <View style={styles.container}>
          <Text style={styles.header}>Pessoas Encontradas</Text>
          <FlatList
            style={styles.flat}
            data={pessoasFiltradas}
            renderItem={({ item }) =>
              <View style={styles.boxExibir}>
                <Pessoa
                  pessoaNome={item.pessoaNome}
                  pessoaFoto={item.pessoaFoto}
                />
              </View>
            }
            keyExtractor={(item) => item.pessoaId}
          />
          </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212',
      padding: 16,
    },
    header: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 5,
        textAlign: 'center'
      },
      flat: {
        flex: 1,
        marginTop: 30,
      },
      boxExibir: {
        backgroundColor: '#C0C0C0',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        marginVertical: 10,
        marginHorizontal: 10,
      },
    
});