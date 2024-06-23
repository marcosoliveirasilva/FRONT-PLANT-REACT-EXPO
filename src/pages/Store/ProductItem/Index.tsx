import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { styles } from './Styles';

export const ProductItem = ({ product, onPress }) => (
  <View style={styles.product}>
    <TouchableOpacity style={styles.productButton} onPress={onPress}>
      <Ionicons name="color-fill" style={styles.icon} size={32} />
      <View style={styles.containerProduct}>
        <Text style={styles.productType}>{product.tipoProduto}</Text>
        <Text style={styles.productName} numberOfLines={1} ellipsizeMode="tail">
          {product.nomeProduto}
        </Text>
        <Text style={styles.productSupplier}>{product.supplier}</Text>
      </View>
      <TouchableOpacity style={styles.btn}>
        <Ionicons name="arrow-forward-outline" style={styles.btnStyle} size={32} />
      </TouchableOpacity>
    </TouchableOpacity>
  </View>
);
