import React, { useState, useEffect, useCallback } from 'react';
import { View, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { api } from '../../Services/api';
import LoadingScreen from './LoadingScreen/Index';
import DiseaseInfo from './DiseaseInfo/Index';
import DeseaseCaroucel from './DeseaseCaroucel/Index';
import StoreButton from './StoreButton/Index';

import * as Animatable from 'react-native-animatable';

import { styles } from './Styles';

export default function Diagnostic() {
  const route = useRoute();
  const { doencaID, plantaID, diagnosticoId } = route.params;
  const [loading, setLoading] = useState(true);
  const [disease, setDisease] = useState({});
  const [images, setImages] = useState([]);
  const navigation = useNavigation();

  const fetchDiseaseData = useCallback(async (idDoenca) => {
    try {
      const response = await api.get(`doencas/${idDoenca}`, {
        headers: { Authorization: api.defaults.headers['Authorization'] },
      });
      setDisease(response.data);
    } catch (error) {
      console.error('Error fetching disease data:', error);
    }
  }, []);

  const fetchDiseaseImage = useCallback(async (idDiagnostico) => {
    try {
      const response = await api.get('imgDiagnosticos', {
        params: { page: 1, limit: 3, diagnosticoID: idDiagnostico },
        headers: { Authorization: api.defaults.headers['Authorization'] },
      });
      const imageObjects = response.data.map((item) => ({ image: item.url }));
      setImages(imageObjects);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDiseaseImage(diagnosticoId);
    fetchDiseaseData(doencaID);
  }, [doencaID, diagnosticoId, fetchDiseaseData, fetchDiseaseImage]);

  const openStore = () => {
    navigation.navigate('Store', { diagnosticoId: diagnosticoId });
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Animatable.View animation={"fadeInRight"} style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.itemTitle}>{disease.nome}</Text>
        <View style={styles.subtitle}>
          <Text style={styles.itemInfo}>Nome Científico: {disease.nomeCientifico}</Text>
        </View>
      </View>
      <DeseaseCaroucel
        images={images}
      />
      <DiseaseInfo disease={disease} />
      <StoreButton onPress={openStore} />
    </Animatable.View>
  );
}
