import React, { useState, useRef } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import {
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
  Text
} from 'react-native';

import { styles } from './Style';



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
