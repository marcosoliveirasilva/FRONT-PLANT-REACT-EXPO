import React, { useCallback, useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, ImageBackground } from 'react-native';
import PagerView from 'react-native-pager-view';

import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

import { useFonts, Jost_400Regular} from '@expo-google-fonts/jost'
import * as SplashScreen from 'expo-splash-screen'

import { useNavigation } from '@react-navigation/native';

// Mantenha a tela inicial visível enquanto buscamos recursos
SplashScreen.preventAutoHideAsync();

const { width: screenWidth } = Dimensions.get('window');

export default function ScannWidget() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const pagerRef = useRef(null);

  const [ fontsLoaded ] = useFonts({ Jost_400Regular })

  const [result, setResult] = useState('');
  const [label, setLabel] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const navigation = useNavigation();

  const manageCamera = async (type: string) => {
    if (type === 'Camera') {
      openCamera();
    } else {
      openLibrary();
    }
  };

  const onLayoutRootView = useCallback(async () => {
    if(!fontsLoaded){
        await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const getResult = async (path: string, response: ImagePicker.ImagePickerResult) => {
    setImage(response.assets[0].uri);
    setLabel('Predicting...');
    setResult('');

    const res = await getPredication(response);

    if (res?.class) {
      setLabel(res.class);
      setResult(res.confidence);

      navigation.navigate('Diagnostic')
    } else {
      setLabel('Failed to predict');
    }
  };

  const getPredication = async (response: ImagePicker.ImagePickerResult) => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri:  response.assets[0].uri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      });

      const respons = await axios.post('http://10.0.2.2:8000/' + 'predict', formData,
        {headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      return respons.data;
    } catch (error) {
      console.log('Error:', error);
      setLabel('Failed to predict.');
      throw error;
    }
  };

  const openCamera = async () => {
    const response = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!response.canceled) {
      getResult(response.assets[0].uri, response);
    }
  };

  const openLibrary = async () => {
    let response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!response.canceled && response.assets) {
      getResult(response.assets[0].uri, response);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      let nextIndex = currentIndex === carouselItems.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(nextIndex);
      pagerRef.current.setPage(nextIndex);
    }, 5000); // Troca a cada 3 segundos

    return () => clearInterval(timer);
  }, [currentIndex]);

  const carouselItems = [
    { title: 'Tire, ou selecione em sua galeria, uma foto da folha doente.' },
    { title: 'Obtenha o diagnóstico.' },
    { title: 'Encontre soluções para a doença detectada.' },
  ];

  const _renderItem = (item, index) => {
    return (
      <View style={styles.carouselItem} key={index}>
        <Text style={styles.itemText}>{item.title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.scannWidget} /*onLayout={onLayoutRootView}*/>
      <ImageBackground
        blurRadius={3}
        source={require('../../images/background_scann.jpeg')}
        style={styles.backgroundScann}
      >
        <PagerView
          ref={pagerRef}
          style={styles.pagerView}
          initialPage={0}
          onPageSelected={(event) => setCurrentIndex(event.nativeEvent.position)}
        >
          {carouselItems.map((item, index) => _renderItem(item, index))}
        </PagerView>

        <View style={styles.btn}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => manageCamera('Camera')}
            style={styles.btnStyle}
          >
            <Image
              source={require('../../images/camera.png')}
              style={styles.imageIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => manageCamera('Photo')}
            style={styles.btnStyle}
          >
            <Image
              source={require('../../images/gallery.png')}
              style={styles.imageIcon}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  scannWidget: {
    marginTop: 20,
    borderRadius: 15,
    width: 370,
    height: 170,
    alignItems: 'center',
  },

  backgroundScann: {
    height: '100%',
    width: '100%',
    opacity: .9,
    overflow: 'hidden',
    borderRadius: 15,
    borderColor: 'rgba(107, 142, 35, 0.4)',
    borderWidth: 3,
    borderStyle: 'solid',
  },

  pagerView: {
    flex: 1,
    width: 370,
    height: 85,
  },

  carouselItem: {
    padding: 5,
    height: 85,
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemText: {
    padding: 5,
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
    //fontFamily: 'Jost_400Regular',
    textAlign: 'center',
  },

  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },

  btnStyle: {
    backgroundColor: 'rgba(107, 142, 35, 0.9)',
    marginHorizontal: 30,
    padding: 20,
    borderRadius: 20,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 2,
    borderStyle: 'solid',
  },

  imageIcon: {
    height: 25,
    width: 25,
  },
});
