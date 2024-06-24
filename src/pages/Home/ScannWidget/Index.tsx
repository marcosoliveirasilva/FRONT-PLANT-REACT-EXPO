import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import PagerView from 'react-native-pager-view';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../../Services/api';

import { styles } from './Styles';

const ScannWidget = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const pagerRef = useRef(null);
  const navigation = useNavigation();

  const manageCamera = async (type: string) => {
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    };
    const response = type === 'Camera'
      ? await ImagePicker.launchCameraAsync(options)
      : await ImagePicker.launchImageLibraryAsync(options);

    if (!response.canceled && response.assets) {
      getResult(response);
    }
  };

  const getResult = async (response: ImagePicker.ImagePickerResult) => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: response.assets[0].uri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      });

      const res = await api.post('predizerScanns', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data?.class) {
        console.log(res.data)
        navigation.navigate('Diagnostic');
      } else {
        console.log('Error: Failed to predict')
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = currentIndex === carouselItems.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(nextIndex);
      pagerRef.current.setPage(nextIndex);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const carouselItems = [
    { title: 'Tire, ou selecione em sua galeria, uma foto da folha doente.' },
    { title: 'Obtenha o diagnóstico.' },
    { title: 'Encontre soluções para a doença detectada.' },
  ];

  return (
    <View style={styles.scannWidget}>
      <ImageBackground
        blurRadius={3}
        source={require('../../../assets/background_scann.jpeg')}
        style={styles.backgroundScann}
      >
        <PagerView
          ref={pagerRef}
          style={styles.pagerView}
          initialPage={0}
          onPageSelected={(event) => setCurrentIndex(event.nativeEvent.position)}
        >
          {carouselItems.map((item, index) => (
            <View style={styles.carouselItem} key={index}>
              <Text style={styles.itemText}>{item.title}</Text>
            </View>
          ))}
        </PagerView>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => manageCamera('Camera')}
            style={styles.btnStyle}
          >
            <Image
              source={require('../../../assets/camera.png')}
              style={styles.imageIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => manageCamera('Photo')}
            style={styles.btnStyle}
          >
            <Image
              source={require('../../../assets/gallery.png')}
              style={styles.imageIcon}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ScannWidget;
