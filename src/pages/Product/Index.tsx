import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ActivityIndicator, Animated, ScrollView, View } from 'react-native';
import { useRoute } from '@react-navigation/native';

import * as Animatable from 'react-native-animatable';

import ProductTitle from './ItemTitle/Index';
import ImageCarousel from './ImageCarousel/Index';
import ItemDescription from './ItemDescription/Index';
import SupplierDetails from './SupplierDetails/Index';
import ExpandableMap from './ExpandableMap/Index';

import { api } from '../../Services/api';

import { styles } from './Styles';

const Product = () => {
  const route = useRoute();
  const { idProduto, idFornecedor } = route.params;
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [supplier, setSupplier] = useState({});
  const [images, setImages] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef();

  useEffect(() => {
    fetchProductData(idProduto);
    fetchSupplierData(idFornecedor);
    fetchProductImage(idProduto);
  }, [idProduto, idFornecedor]);

  const fetchProductData = useCallback(async (idProduto: number) => {
    try {
      const response = await api.get(`produtos/${idProduto}`, {
        headers: { Authorization: api.defaults.headers['Authorization'] }
      });
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSupplierData = useCallback(async (idFornecedor: number) => {
    try {
      const response = await api.get(`fornecedores/${idFornecedor}`, {
        headers: { Authorization: api.defaults.headers['Authorization'] }
      });
      setSupplier(response.data);
    } catch (error) {
      console.error('Error fetching supplier:', error);
    }
  }, []);

  const fetchProductImage = useCallback(async (idProduto: number) => {
    try {
      const response = await api.get(`imgProdutos`, {
        params: { page: 1, limit: 100, produtoID: idProduto },
        headers: { Authorization: api.defaults.headers['Authorization'] }
      });

      const imageObjects = response.data.map(item => ({ image: item.url }));
      setImages(imageObjects);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  }, [idFornecedor]);

  const toggleExpand = () => {
    const newValue = !expanded;

    Animated.timing(animation, {
      toValue: newValue ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setExpanded(newValue);
      if (newValue && scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    });
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
      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollViewContent}>
        <ProductTitle title={product.nomeProduto} />
        <ImageCarousel images={images} />
        <ItemDescription description={product.descricao} />
        <SupplierDetails supplier={supplier} urlProduto={product.urlProduto} onToggleExpand={toggleExpand} />
        <ExpandableMap expanded={expanded} animation={animation} latitude={supplier.latitude} longitude={supplier.longitude} />
      </ScrollView>
    </Animatable.View>
  );
};

export default Product;
