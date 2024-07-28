import React from 'react';
import { View, Text } from 'react-native';

import { styles } from './Styles';

const SupplierDetails = ({ supplier, urlProduto, onToggleExpand }) => {
  const openGoogle = () => {
    Linking.openURL(supplier.urlProduto);
  };

  const formatPhoneNumber = (phoneNumber: string) => {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');

    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }

    return phoneNumber;
  };

  return (
    <View style={styles.dataSupplier}>
      <View style={styles.data}>
        <Text style={styles.dataTitle}>Fornecedor: </Text>
        <Text style={styles.dataText}>{supplier.nomeFantasia}</Text>
      </View>

      <View style={styles.data}>
        <Text style={styles.dataTitle}>Telefone: </Text>
        <Text style={styles.dataText} >{formatPhoneNumber(supplier.telefoneCelular)}</Text>
      </View>

      <View style={styles.data}>
        <Text style={styles.dataTitle}>Site: </Text>
        <Text
          style={styles.dataLink}
          numberOfLines={1}
          ellipsizeMode="tail"
          onPress={openGoogle}
        >
          {urlProduto}
        </Text>
      </View>

      <View style={styles.data}>
        <Text style={styles.dataTitle}>Endereço: </Text>
        <Text
          style={styles.dataLink}
          numberOfLines={3}
          ellipsizeMode="tail"
          onPress={onToggleExpand}
        >
          {supplier.endereco}
        </Text>
      </View>
    </View>
  );
};

export default SupplierDetails;
