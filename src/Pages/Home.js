import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Pessoa from '../Components/Pessoa';
import { format, isValid } from 'date-fns';
import Observacoes from '../Components/Observacoes';

export default function Home({ pessoaNome, pessoaFoto, observacaoDescricao, observacaoLocal, observacaoData }) {

  const [pessoas, setPessoas] = useState([]);
  const [error, setErroAPI] = useState(false);
  const [descricao, setDescricao] = useState(false);

  const [pessoaId, setPessoaId] = useState();
  const [pessoaNomeGet, setPessoaNome] = useState();
  const [pessoaRoupa, setPessoaRoupa] = useState();
  const [pessoaCor, setPessoaCor] = useState();
  const [pessoaSexo, setPessoaSexo] = useState();
  const [pessoaObservacao, setPessoaObservacao] = useState();
  const [pessoaLocalDesaparecimento, setPessoaLocalDesaparecimento] = useState();
  const [pessoaFotoGet, setPessoaFoto] = useState();
  const [pessoaDtDesaparecimento, setPessoaDtDesaparecimento] = useState();
  const [pessoaDtEncontro, setPessoaDtEncontro] = useState();
  const [pessoaStatus, setPessoaStatus] = useState();
  const [usuarioId, setUsuarioId] = useState();

  const [observacao, setObservacao] = useState([]);
  


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

  async function getPessoaDesc(id) {
    await fetch('http://10.139.75.20:5251/api/Pessoa/GetPessoaId/' + id, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => { setPessoaId(json); return json; })
      .then(json => {
        setPessoaId(json.pessoaId);
        setPessoaNome(json.pessoaNome);
        setPessoaRoupa(json.pessoaRoupa);
        setPessoaCor(json.pessoaCor);
        setPessoaSexo(json.pessoaSexo);
        setPessoaLocalDesaparecimento(json.pessoaLocalDesaparecimento);
        setPessoaFoto(json.pessoaFoto);
        setPessoaDtDesaparecimento(json.pessoaDtDesaparecimento);
        setPessoaDtEncontro(json.pessoaDtEncontro);
        setPessoaStatus(json.pessoaStatus);
        setUsuarioId(json.usuarioId);
      })
        await fetch('http://10.139.75.20:5251/api/Observacoes/GetObservacoesId/' + id , {
          method: 'GET',
          headers: {
            'content-type': 'application/json'
          }
        })
        .then(res => res.json())
        .then(json => {setObservacao(json); return json; })
        .then(json => console.log(json))
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

  const pessoasFiltradas = pessoas.filter(pessoa => pessoa.pessoaStatus === 1);
  const StatusPessoa = pessoaStatus === 1 ? 'Não Encontrado' : pessoaStatus;

  return (
    <View style={styles.container}>
      {descricao == false ? (
        <>
          <Text style={styles.header}>Pessoas Desaparecidas</Text>
          <FlatList
            style={styles.flat}
            data={pessoasFiltradas}
            renderItem={({ item }) =>
              <View style={styles.boxExibir}>
                <Pessoa
                  pessoaNome={item.pessoaNome}
                  pessoaFoto={item.pessoaFoto}
                />
                <TouchableOpacity onPress={() => { setDescricao(true); getPessoaDesc(item.pessoaId)}}>
                  <Text style={styles.btnDescricao}>Detalhes</Text>
                </TouchableOpacity>
              </View>
            }
            keyExtractor={(item) => item.pessoaId}
          />
        </>
      ) : (
        <View style={styles.detalhes}>
          <Text style={styles.btnLoginText}>Detalhes</Text>
          <View>
            <Image source={{ uri: pessoaFotoGet }} style={styles.image} />
            <Text style={styles.btnLoginText}>Nome: {pessoaNomeGet}</Text>
            <Text style={styles.btnLoginText}>Roupa: {pessoaRoupa}</Text>
            <Text style={styles.btnLoginText}>Cor: {pessoaCor}</Text>
            <Text style={styles.btnLoginText}>Sexo: {pessoaSexo}</Text>
            <Text style={styles.btnLoginText}>Local Desaparecimento: {pessoaLocalDesaparecimento}</Text>

            {isValid(new Date(pessoaDtDesaparecimento)) ? (
              <Text style={styles.btnLoginText}>Data de Desaparecimento: {format(new Date(pessoaDtDesaparecimento), 'dd/MM/yyyy HH:mm')}</Text>
            ) : (
              <Text style={styles.btnLoginText}>Data de Desaparecimento inválida</Text>
            )}
            <Text style={styles.btnLoginText}>Status: {StatusPessoa}</Text>
            <Text style={styles.btnLoginText}>Usuario: {usuarioId}</Text>


            <FlatList
              style={styles.flat}
              data={observacao}
              keyExtractor={(observacao) => item.observacaoId.toString()}
              renderItem={({ item }) => (
                <View style={styles.observacaoContainer}>
                  <Observacoes 
                    observacaoDescricao={item.observacaoDescricao}
                    observacaoLocal={item.observacaoLocal}
                    observacaoData={item.observacaoData}
                  />
                </View>
              )}
            />
          </View>

          <TouchableOpacity onPress={() => { setDescricao(false); }} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
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
  header: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 5,
    textAlign: 'center'
  },
  btnDescricao: {
    color: '#333333',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
  },
  btnLoginText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  detalhes: {
    backgroundColor: '#1E1E1E',
    padding: 16,
    borderRadius: 8,
    marginTop: 60,
  },
  btnLoginText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#fff',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f55',
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});