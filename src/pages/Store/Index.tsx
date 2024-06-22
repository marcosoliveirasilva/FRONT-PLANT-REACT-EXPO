import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import api from '../../Services/api';

import { SearchBar } from './SearchBar/Index';
import { ProductItem } from './ProductItem/Index';

import { styles } from './Styles';

const Store = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const pagerRef = useRef(null);

  useEffect(() => {
    searchData('');
  }, [])

  const openProduct = () => {
    navigation.navigate('Product');
  };

  const searchData = async (text: React.SetStateAction<string>) => {
    setSearchQuery(text);

    try {
      const response = await api.get('produtos', {
        params: { page: 1, limit: 100, name: searchQuery },
        headers: { Authorization: api.defaults.headers['Authorization'] }
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar searchQuery={searchQuery} onSearch={searchData} />
      <View style={styles.productList}>
        <ScrollView>
          {products.map((product, index) => (
            <ProductItem key={index} product={product} onPress={openProduct} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Store;
