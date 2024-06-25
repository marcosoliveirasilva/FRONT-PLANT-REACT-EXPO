import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { styles } from './Styles';

const StoreButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.btnStyle}>
    <Text style={styles.btn}>PRODUTOS RECOMENDADOS</Text>
  </TouchableOpacity>
);

export default StoreButton;
