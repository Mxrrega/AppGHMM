import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectDropdown from 'react-native-select-dropdown';
import * as Animatable from 'react-native-animatable';

export default function InventarioPecas({ handle }) {

  const [step, setStep] = useState(1);
  const [expandedCategorias, setExpandedCategorias] = useState({});

  const [nomePeca, setNomePeca] = useState('');

  const handleContinue = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const inventoryData = [
    {
      category: 'Parafusos e Porcas',
      items: [
        { name: 'Cabeça Sextavada', quantity: 50 },
        { name: 'Phillips', quantity: 30 },
        { name: 'Allen', quantity: 40 },
        { name: 'M4', quantity: 100 },
        { name: 'M6', quantity: 75 },
        { name: 'M8', quantity: 60 }
      ],
      image: require('../img/Parafusos e porcas.png'),
    },
    {
      category: 'Arruelas',
      items: [
        { name: 'Simples', quantity: 80 },
        { name: 'Pressão', quantity: 90 },
        { name: 'M3', quantity: 120 },
        { name: 'M4', quantity: 110 },
        { name: 'M5', quantity: 95 },
        { name: 'M6', quantity: 100 },
        { name: 'M8', quantity: 60 },
        { name: 'M10', quantity: 50 }
      ],
      image: require('../img/Arruelas.png'),
    },
    {
      category: 'Rolamentos',
      items: [
        { name: '6205', quantity: 25 },
        { name: '6302', quantity: 15 },
        { name: '6304', quantity: 30 }
      ],
      image: require('../img/Rolamentos.png'),
    },
    {
      category: 'Correias',
      items: [
        { name: 'A (13x8)', quantity: 20 },
        { name: 'B (17x11)', quantity: 10 },
        { name: 'C (22x14)', quantity: 5 }
      ],
      image: require('../img/Correias.png'),
    },
    {
      category: 'Filtros',
      items: [
        { name: 'Filtro de Óleo', quantity: 40 },
        { name: 'Filtro de Ar', quantity: 35 },
        { name: 'Filtro Combustível', quantity: 25 }
      ],
      image: require('../img/Filtros.png'),
    },
  ];

  const toggleCategory = (category) => {
    setExpandedCategorias((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  async function alterarQTD(categoriaPecaId) {
    try {
        await fetch( process.env.EXPO_PUBLIC_URL + `/api/${categoriaPecaId}`, {
            method: 'DELETE',
        });
        setMaquinas(categoria.filter(CategoriaPeca => CategoriaPeca.CategoriaPecaId !== CategoriaPeca));
    } catch (err) {
        console.error('Erro ao alterar Quantidade:', err);
    }
}

  return (
    <View style={styles.container}>
      {step === 1 && (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => handle(false)} style={styles.iconButton}>
            <Icon name="arrow-left" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Inventário de Peças</Text>
          <TouchableOpacity onPress={handleContinue} style={styles.iconButton}>
            <Icon name="plus" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      )}
      {step === 1 && (
        <Animatable.View animation="slideInRight" duration={400}>
          <FlatList
            data={inventoryData}
            keyExtractor={(item) => item.category}
            renderItem={({ item }) => (
              <View style={styles.categoryContainer}>
                <TouchableOpacity onPress={() => toggleCategory(item.category)} style={styles.categoria}>
                  <Image source={item.image} style={styles.largeImage} />
                  <Text style={styles.categoryTitle}>{item.category}</Text>
                  <Icon name={expandedCategorias[item.category] ? 'chevron-up' : 'chevron-down'} style={styles.icone} />
                </TouchableOpacity>
                {expandedCategorias[item.category] && (
                  <View style={styles.itemsContainer}>
                    {item.items.map((piece, index) => (
                      <Animatable.View animation="fadeInDownBig" duration={500} key={index}>
                        <TouchableOpacity style={styles.itemRow} onPress={alterarQTD}>
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
            <TouchableOpacity onPress={handleBack} style={styles.backButtonRegistro}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
            <Animatable.Text animation="fadeInUp" delay={25} style={styles.title}>Registro de Peça</Animatable.Text>
          </View>
        <Animatable.View animation="fadeInUp" delay={50}>
          <Text style={styles.label}>Nome da Peça</Text>
          <TextInput
            value={nomePeca}
            onChangeText={setNomePeca}
            placeholder="Digite o nome da Peça"
            style={styles.input}
          />

          <Text style={styles.label}>Quantidade de Peça</Text>
          <TextInput
            value={nomePeca}
            onChangeText={setNomePeca}
            placeholder="Digite a quantidade de Peça"
            keyboardType='decimal-pad'
            style={styles.input}
          />

          <Text style={styles.label}>Fornecedor</Text>
          <SelectDropdown
            data={nomePeca}
            onSelect={(selectedItem) => {
              setNomePeca(selectedItem.MaquinaIdtipo);
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

          <Text style={styles.label}>Categoria da Peça</Text>
          <SelectDropdown
            data={nomePeca}
            onSelect={(selectedItem) => {
              setNomePeca(selectedItem.tipoMaquinaId);
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.inputSelect}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.tipoMaquinaNome) || 'Selecione a categoria da Peça'}
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
            onPress={handleContinue}
          >
            <Text style={styles.buttonText}>
              Cadastrar
            </Text>
          </TouchableOpacity>
          </Animatable.View>

        </ScrollView>
      )}

      {step > 2 && (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Obrigado por cadastrar uma Peça!</Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handle(false)}
          >
            <Text style={styles.buttonText}>
              Continuar
            </Text>
          </TouchableOpacity>
        </View>

      )
      }
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

