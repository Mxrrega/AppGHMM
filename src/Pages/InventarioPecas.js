import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectDropdown from 'react-native-select-dropdown';
import * as Animatable from 'react-native-animatable';

export default function InventarioPecas({ handle }) {
  const [step, setStep] = useState(1);
  const [expandedCategorias, setExpandedCategorias] = useState({});
  const [categories, setCategories] = useState([]);
  const [nomePeca, setNomePeca] = useState('');
  const [quantidadePeca, setQuantidadePeca] = useState('');
  const [fornecedores, setFornecedores] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState(null);

  useEffect(() => {
    GetCategorias();
    GetFornecedores();
  }, []);

  async function GetCategorias()  {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_URL}/api/CategoriaPeca/GetAllCategoriaPecas`);
      const data = await response.json();
      setCategories(data);
      console.log('Categorias:', data);

    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  async function GetFornecedores(){
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_URL}/api/Fornecedor/GetAllFornecedores`);
      const data = await response.json();
      setFornecedores(data);
    } catch (error) {
      console.error('Erro ao buscar fornecedores:', error);
    }
  };

  const toggleCategory = (categoryId) => {
    setExpandedCategorias((prevState) => ({
      ...prevState,
      [categoryId]: !prevState[categoryId],
    }));
  };

  const handleRegister = async () => {
    if (!nomePeca || !quantidadePeca || !categoriaSelecionada || !fornecedorSelecionado) {
      alert('Preencha todos os campos!');
      return;
    }

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_URL}/api/pecas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nomePeca,
          quantidade: quantidadePeca,
          categoriaId: categoriaSelecionada,
          fornecedorId: fornecedorSelecionado,
        }),
      });

      if (response.ok) {
        alert('Peça cadastrada com sucesso!');
        GetCategorias(); 
        setStep(1); 
      } else {
        alert('Erro ao cadastrar peça');
      }
    } catch (error) {
      console.error('Erro ao cadastrar peça:', error);
    }
  };

  return (
    <View style={styles.container}>
      {step === 1 && (
        <Animatable.View animation="slideInRight" duration={400}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => handle(false)} style={styles.iconButton}>
              <Icon name="arrow-left" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Inventário de Peças</Text>
            <TouchableOpacity onPress={() => setStep(2)} style={styles.iconButton}>
              <Icon name="plus" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <FlatList
  data={categories}
  keyExtractor={(item) => item.Id}
  renderItem={({ item }) => (
    <View style={styles.categoryContainer}>
      <TouchableOpacity onPress={() => toggleCategory(item.Id)} style={styles.categoria}>
        <Image source={{ uri: item.imageUrl }} style={styles.largeImage} />
        <Text style={styles.categoryTitle}>{item.categoriaPecaNome}</Text>
        <Icon
          name={expandedCategorias[item.Id] ? 'chevron-up' : 'chevron-down'}
          style={styles.icone}
        />
      </TouchableOpacity>
      {expandedCategorias[item.Id] && (
        <View style={styles.itemsContainer}>
          {item.pecas?.map((piece) => (
            <Animatable.View animation="fadeInDownBig" duration={500} key={piece.id}>
              <TouchableOpacity style={styles.itemRow}>
                <Text style={styles.itemText}>• {piece.name}</Text>
                <Text style={styles.quantityText}>{piece.quantity}</Text>
              </TouchableOpacity>
            </Animatable.View>
          ))}
        </View>
      )}
    </View>
  )}
/>
        </Animatable.View>
      )}

      {step === 2 && (
        <ScrollView>
          <View style={styles.headerRegistro}>
            <TouchableOpacity onPress={() => setStep(1)} style={styles.backButtonRegistro}>
              <Icon name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
            <Animatable.Text animation="fadeInUp" delay={25} style={styles.title}>
              Registro de Peça
            </Animatable.Text>
          </View>
          <Animatable.View animation="fadeInUp" delay={50}>
            <Text style={styles.label}>Nome da Peça</Text>
            <TextInput
              value={nomePeca}
              onChangeText={setNomePeca}
              placeholder="Digite o nome da peça"
              style={styles.input}
            />
            <Text style={styles.label}>Quantidade de Peça</Text>
            <TextInput
              value={quantidadePeca}
              onChangeText={setQuantidadePeca}
              placeholder="Digite a quantidade"
              keyboardType="decimal-pad"
              style={styles.input}
            />
            <Text style={styles.label}>Fornecedor</Text>
            <SelectDropdown
              data={fornecedores}
              onSelect={(selectedItem) => setFornecedorSelecionado(selectedItem.id)}
              renderButtonText={(item) => item.name}
              defaultButtonText="Selecione o fornecedor"
              buttonStyle={styles.inputSelect}
            />
            <Text style={styles.label}>Categoria</Text>
            <SelectDropdown
              data={categories}
              onSelect={(selectedItem) => setCategoriaSelecionada(selectedItem.id)}
              renderButtonText={(item) => item.name}
              defaultButtonText="Selecione a categoria"
              buttonStyle={styles.inputSelect}
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
          </Animatable.View>
        </ScrollView>
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
    marginTop: 40,
    marginBottom: 20,
  },
  iconButton: {
    padding: 8,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  categoryContainer: {
    marginBottom: 24,
  },
  categoria: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icone: {
    fontSize: 25,
    color: '#FFFF',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#CCCCCC',
    marginLeft: 5
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  itemText: {
    fontSize: 16,
    color: '#A9A9A9',
    flex: 1,
    marginLeft: 8,
  },
  quantityText: {
    fontSize: 16,
    color: '#FFFF',
    fontWeight: '600',
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 8,
  },
  largeImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
    textAlign: 'center',
    marginTop: 40
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

