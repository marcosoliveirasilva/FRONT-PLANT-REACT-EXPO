import React, { useState, useEffect, useRef } from 'react';
import { TextInput, TouchableOpacity, ScrollView, View, Text, StyleSheet, ImageBackground } from 'react-native';
import PagerView from 'react-native-pager-view';
import Ionicons from '@expo/vector-icons/Ionicons';

import { useNavigation } from '@react-navigation/native';

export default function Store() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const pagerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const navigation = useNavigation();

  const openProduct = () => {
    navigation.navigate('Product')
  };

  const searchData = (text) => {
    setSearchQuery(text);

    // Aqui você colocaria a lógica para pesquisar os dados com base na query
    // Por exemplo, você poderia chamar uma API para obter os resultados
    // Neste exemplo, estou apenas simulando alguns resultados de pesquisa
    const results = ['Apple', 'Banana', 'Orange', 'Pineapple', 'Grapes'];

    // Filtrando os resultados com base na query de pesquisa
    const filteredResults = results.filter(item =>
      item.toLowerCase().includes(text.toLowerCase())
    );

    setSearchResults(filteredResults);
  };

  // Array de produtos simulados
  const products = [
    { type: 'Fungicida', name: 'Azoxistrobina 18,2% + difenoconazol 11,4% SC- AZOZOL', supplier: 'katyayani' },
    { type: 'Fungicida', name: 'Ridomil Gold Bravo 1 Litro', supplier: 'Comprar Defensivos' },
    { type: 'Fungicida', name: 'Ridomil Gold Bravo 1 Litro', supplier: 'Comprar Defensivos' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          placeholder="Pesquisar..."
          value={searchQuery}
          onChangeText={searchData}
          style={styles.searchImput}
        />
      </View>

      <View style={styles.productList}>
        <ScrollView>
          {products.map((product, index) => (
            
            <View
              style={styles.product}
              key={index}
            >
            <TouchableOpacity style={styles.productButton} onPress={() => openProduct()}>
              <Ionicons name="color-fill" style={styles.icon} size={32} />

              <View style={styles.containerProduct}>
                <Text style={styles.productType}>{product.type}</Text>
                <Text
                  style={styles.productName}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {product.name}
                </Text>
                <Text style={styles.productSupplier}>{product.supplier}</Text>
              </View>

              <TouchableOpacity style={styles.btn}>
                <Ionicons name="arrow-forward-outline" style={styles.btnStyle} size={32} />
              </TouchableOpacity>
            </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerProduct: {
    width: 260,
  },
  productType: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  productName: {
    width: 260,
    fontSize: 18,
    fontWeight: '500',
  },
  productSupplier: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  productList: {
    width: 370,
    height: 700,
    marginTop: 20,
    textAlign: 'left',
    alignItems: 'flex-start',
  },
  productButton: {
    width: 370,
    height: 80,
    flexDirection: 'row',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  product: {
    borderRadius: 15,
    borderColor: 'rgba(107, 142, 35, 0.4)',
    borderWidth: 2,
    borderStyle: 'solid',
    width: 370,
    height: 80,
    marginBottom: 10,
    flexDirection: 'row',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    alignItems: 'flex-end',
    textAlign: 'right',
  },
  btnStyle: {
    color: 'rgba(107, 142, 35, 0.8)',
    padding: 10
  },
  icon: {
    color: 'rgba(107, 142, 35, 0.8)',
    padding: 10
  },
  search: {
    width: 365,
    textAlign: 'left',
    alignItems: 'flex-start'
  },
  searchImput: {
    height: 45,
    width: '100%',
    borderWidth: 2,
    padding: 10,
    borderRadius: 15,
    borderColor: 'rgba(107, 142, 35, .6)',
    borderStyle: 'solid',
    fontSize: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
});
