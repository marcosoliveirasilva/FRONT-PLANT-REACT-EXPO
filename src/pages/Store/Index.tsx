import React, { useState, useEffect, useRef } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import * as Animatable from 'react-native-animatable';

import { api } from '../../Services/api';

import { SearchBar } from './SearchBar/Index';
import { ProductItem } from './ProductItem/Index';

import { styles } from './Styles';

const Store = () => {
  const route = useRoute();
  const { diagnosticoId } = route.params;
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const pagerRef = useRef(null);

  useEffect(() => {
    //searchProductsData('');
    searchProductsDiagnosticsData(diagnosticoId);
  }, [])

  interface Product {
    id: number;
    idFornecedor: number;
  }

  const openProduct = (product: Product) => {
    navigation.navigate('Product', {
      idProduto: product.id,
      idFornecedor: product.fornecedorID,
    });
  };

  const searchProductsData = async (text: React.SetStateAction<string>) => {
    setSearchQuery(text);

    try {
      const response = await api.get('produtos', {
        params: { page: 1, limit: 100, name: searchQuery },
        headers: { Authorization: api.defaults.headers['Authorization'] }
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchProductIdData = async (productId: number) => {
    try {
      const response = await api.get(`produtos/${productId}`, {
        params: { page: 1, limit: 100, name: searchQuery },
        headers: { Authorization: api.defaults.headers['Authorization'] }
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const searchProductsDiagnosticsData = async (diagnosticID: number) => {
    if (diagnosticID !== 0) {
      try {
        const responseProducts = await api.get('produtosDiagnosticos', {
          params: { page: 1, limit: 100, diagnosticID: diagnosticID },
          headers: { Authorization: api.defaults.headers['Authorization'] }
        });

        let response = responseProducts.data;

        const newArray = await Promise.all(
          response.map(item => searchProductIdData(item.produtoID))
        );

        setProducts(newArray);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    } else { searchProductsData('') }
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff'
        }}
      >
        <ActivityIndicator size={"large"} color={"#131313"}/>
      </View>
    );
  }

  return (
    <Animatable.View animation={"fadeInRight"} style={styles.container}>
      <SearchBar searchQuery={searchQuery} onSearch={searchProductsData} />
      <View style={styles.productList}>
        <ScrollView>
          {products.map((product, index) => (
            <ProductItem key={index} product={product} onPress={() => openProduct(product)} />
          ))}
        </ScrollView>
      </View>
    </Animatable.View>
  );
};

export default Store;
