import React, { useState, useCallback } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import * as Animatable from 'react-native-animatable';

import { api } from '../../Services/api';
import { ProductItem } from './HistoricItem/Index';

import { styles } from './Styles';

const Historic = () => {
  const [loading, setLoading] = useState(true);
  const [historical, setHistorical] = useState([]);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      searchHistoricoScannsData();
    }, [])
  );

  interface Historic {
    doencaID: number;
    plantaID: number;
    diagnosticoID: number;
  }

  const openDiagnostic = (historic: Historic) => {
    navigation.navigate('Diagnostic', {
      doencaID: historic.doencaID,
      plantaID: historic.plantaID,
      diagnosticoId: historic.diagnosticoID
    });
  };

  const searchHistoricoScannsData = async () => {
    try {
      const responseHistorical = await api.get('historicoScanns/Me', {
        params: { page: 1, limit: 100 },
        headers: { Authorization: api.defaults.headers['Authorization'] }
      });

      setHistorical(responseHistorical.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
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
      <View style={styles.productList}>
        <ScrollView>
          {historical.map((historic, index) => (
            <ProductItem key={index} historic={historic} onPress={() => openDiagnostic(historic)} />
          ))}
        </ScrollView>
      </View>
    </Animatable.View>
  );
};

export default Historic;
