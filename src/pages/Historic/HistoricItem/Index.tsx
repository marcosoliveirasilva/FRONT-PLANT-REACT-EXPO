import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { styles } from './Styles';

export const ProductItem = ({ historic, onPress }) => (

  <View style={styles.product}>
    <TouchableOpacity style={styles.productButton} onPress={onPress}>
      <MaterialCommunityIcons name="flower-tulip" style={styles.icon} size={32} />
      <View style={styles.containerProduct}>
        <Text style={styles.productType}>
          {historic.nomePlanta}
        </Text>
        <Text style={styles.productName} numberOfLines={1} ellipsizeMode="tail">
          {historic.nomeDoenca}
        </Text>
        <Text style={styles.productSupplier} numberOfLines={1} ellipsizeMode="tail">
          {historic.nomeCientificoDoenca}
        </Text>
      </View>
      <TouchableOpacity style={styles.btn}>
        <Ionicons name="arrow-forward-outline" style={styles.btnStyle} size={32} />
      </TouchableOpacity>
    </TouchableOpacity>
  </View>
);
