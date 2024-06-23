import React from 'react';
import { View, Text } from 'react-native';

import { styles } from './Styles';

const ProductTitle = ({ title }) => {
  return (
    <View style={styles.title}>
      <Text style={styles.itemTitle} numberOfLines={2} ellipsizeMode="tail">
        {title}
      </Text>
    </View>
  );
};

export default ProductTitle;
