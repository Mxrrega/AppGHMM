import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Pessoa from '../Components/Pessoa';

export default function Home({pessoaNome, pessoaFoto }) {

  const [pessoas, setPessoas] = useState([]);
  const [error, setErroAPI] = useState( false );


  async function getPessoas()
  {
    await fetch('http://10.139.75.20:5251/api/Pessoa/GetAll',{
            method:'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(json => setPessoas( json ))
        .catch(err => setErroAPI( true ) )
  }

  
  useEffect( () => {
    getPessoas();
  }, [] )

  useFocusEffect(
    React.useCallback(() => {
      getPessoas();
    }, [] )
  )


  return (
    <View style={styles.container}>
        {pessoas ?
        <>
        <Text>HOME</Text>
      <FlatList
      style={styles.flat}
      data={pessoas}
      renderItem={({ item }) =>
      <Pessoa 
      pessoaNome={item.pessoaNome}
      pessoaFoto={item.pessoaFoto}
      />
  }
      keyExtractor={(item) => item.pessoaId}

    />
    </>
    : <Text>nÃO FUNCIONOU</Text>
}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  flat: {
    flex: 1,
    marginTop: 30,
  },
  itemContainer: {
    backgroundColor: '#1E1E1E', 
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  userName: {
    color: '#FFFFFF', 
    fontSize: 18,
    marginBottom: 8,
  },
  btnEdit: {
    backgroundColor: '#6200EE', 
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
  },
  btnDelete: {
    backgroundColor: '#B00020', 
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
  },
  btnLoginText: {
    color: '#FFFFFF', 
    fontSize: 16,
    textAlign: 'center',
  },
  editar: {
    backgroundColor: '#1E1E1E', 
    padding: 16,
    borderRadius: 8,
    marginTop: 60
  },
  input: {
    backgroundColor: '#333333', 
    color: '#FFFFFF', 
    padding: 10,
    borderRadius: 8,
    marginVertical: 8,
  },
  btnCreate: {
    backgroundColor: '#03DAC9', 
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
  },
});