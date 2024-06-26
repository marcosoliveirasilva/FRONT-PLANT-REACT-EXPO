import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import { styles } from './Styles';

const DiseaseInfo = ({ disease }) => (
  <View style={styles.disease}>
    <Text style={styles.diseaseTitle}>Sobre a Doença</Text>
    <ScrollView>
      <Text style={styles.diseaseText}>{disease.sobre}</Text>
    </ScrollView>
    <View style={styles.fonte}>
      <Text style={styles.itemFonte}>Fonte: </Text>
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={[styles.itemFonte, { color: '#0000FF' }, { width: 310 }]}
      >
        {disease.fonte}
      </Text>
    </View>
  </View>
);

export default DiseaseInfo;
