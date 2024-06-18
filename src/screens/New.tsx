import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, useColorScheme, ImageBackground, Dimensions, Image, TouchableOpacity 
} from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const { height, width } = Dimensions.get('window');

const configureUrl = (url: string | undefined) => {
  if (url && url[url.length - 1] === '/') {
    return url.substring(0, url.length - 1);
  }
  return url;
};

export default function New() {
  const [result, setResult] = useState('');
  const [label, setLabel] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
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

  const manageCamera = async (type: string) => {
    if (type === 'Camera') {
      openCamera();
    } else {
      openLibrary();
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

  const clearOutput = () => {
    setResult('');
    setImage('');
  };

  const getResult = async (path: string, response: ImagePicker.ImagePickerResult) => {
    setImage(response.assets[0].uri);
    setLabel('Predicting...');
    setResult('');

    console.log(image);

    const res = await getPredication(response);

    if (res?.class) {
      setLabel(res.class);
      setResult(res.confidence);
    } else {
      setLabel('Failed to predict');
    }
  };

  return (
    <View style={[backgroundStyle, styles.outer]}>
      <ImageBackground
        blurRadius={10}
        source={require('../images/background.jpeg')}
        style={{ height: height, width: width }}
      />

      <Text style={styles.title}>{'Potato Disease \nPrediction App'}</Text>

      <TouchableOpacity onPress={clearOutput} style={styles.clearStyle}>
        <Image source={require('../images/clean.png')} style={styles.clearImage} />
      </TouchableOpacity>

      {image?.length ? (
        <Image source={{ uri: image }} style={styles.imageStyle} />
      ) : null}

      {result && label ? (
        <View style={styles.mainOuter}>
          <Text style={[styles.space, styles.labelText]}>
            {'Label: \n'}
            <Text style={styles.resultText}>{label}</Text>
          </Text>
          <Text style={[styles.space, styles.labelText]}>
            {'Confidence: \n'}
            <Text style={styles.resultText}>
              {parseFloat(result).toFixed(2) + '%'}
            </Text>
          </Text>
        </View>
      ) : image ? (
        <Text style={styles.emptyText}>{label}</Text>
      ) : (
        <Text style={styles.emptyText}>
          Use below buttons to select a picture of a potato plant leaf.
        </Text>
      )}

      <View style={styles.btn}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => manageCamera('Camera')}
          style={styles.btnStyle}
        >
          <Image
            source={require('../images/camera.png')}
            style={styles.imageIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => manageCamera('Photo')}
          style={styles.btnStyle}
        >
          <Image
            source={require('../images/gallery.png')}
            style={styles.imageIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    width: 300,
    height: 300,
    top: 175,

    marginBottom: 50,
    borderRadius: 20,
    position: 'absolute',
    borderWidth: 0.3,
    borderColor: '#FFF',
  },

  btnStyle: {
    backgroundColor: '#FFF',
    opacity: 0.8,
    marginHorizontal: 30,
    padding: 20,
    borderRadius: 20,
  },

  title: {
    alignSelf: 'center',
    position: 'absolute',
    top: 10,
    fontSize: 30,
    color: '#FFF',
  },
  clearImage: {
    height: 40,
    width: 40,
    tintColor: '#FFF'
  },

  mainOuter: {
    top: 500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    alignSelf: 'center',
  },

  outer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    position: 'absolute',
    bottom: 40,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  clearStyle: {
    position: 'absolute',
    top: 100,
    right: 30,
    tintColor: '#FFF',
    zIndex: 10,
  },
  space: { marginVertical: 10, marginHorizontal: 10 },
  labelText: {
    color: '#FFF',
    fontSize: 20,
    maxWidth: width - 150,
  },
  resultText: {
    fontSize: 32,
  },
  imageIcon: {
    height: 40,
    width: 40,
  },
  emptyText: {
    position: 'absolute',
    alignSelf: 'center',
    color: '#FFF',
    fontSize: 20,
    maxWidth: '70%',
  },
});
