import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import { styles } from './Styles';

const ItemDescription = ({ description }) => {
  return (
    <View style={styles.description}>
      <Text style={styles.descriptionTitle}>Descrição</Text>
      <ScrollView>
        <Text style={styles.descriptionText}>{description}</Text>
      </ScrollView>
    </View>
  );
};

export default ItemDescription;
