import React, { useState, useEffect, useRef } from 'react';
import { Animated, Linking, TouchableOpacity, ScrollView, View, Text, StyleSheet, ImageBackground } from 'react-native';
import PagerView from 'react-native-pager-view';

import Map from '../components/product/MapWidget'

export default function Product() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const pagerRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef();

  useEffect(() => {
    const timer = setInterval(() => {
      let nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(nextIndex);
      pagerRef.current.setPage(nextIndex);
    }, 3000); // Troca a cada 3 segundos

    return () => clearInterval(timer);
  }, [currentIndex]);

  const toggleExpand = () => {
    const newValue = !expanded;
  
    Animated.timing(animation, {
      toValue: newValue ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setExpanded(newValue);
      if (newValue && scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    });
  };

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  const fieldOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const images= [
    { image: require('../images/plant_desease/cereja_oidio/01.jpeg') },
    { image: require('../images/plant_desease/cereja_oidio/02.jpeg') },
    { image: require('../images/plant_desease/cereja_oidio/03.jpeg') },
  ]

  const openGoogle = () => {
    Linking.openURL('https://www.katyayaniorganics.com/product/azoxystrobin-18-2-difenoconazole-11-4-sc-azozole/');
  };

  const _renderItem = (item, index) => {
    return (      
      <View style={styles.carouselItem} key={index}>
        <ImageBackground
        source={item.image}
        style={styles.backgroundFeed}
        />
      </View>
    );
  };

  return (
    <View style={ styles.container }>
    <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.title}>
        <Text
          style={styles.itemTitle}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
            Azoxistrobina 18,2% + difenoconazol 11,4% SC- AZOZOL
        </Text>
      </View>

      <View style={styles.pagerWidget}> 
          <PagerView
            ref={pagerRef}
            style={styles.pagerView}
            initialPage={0}
            onPageSelected={(event) => setCurrentIndex(event.nativeEvent.position)}
          >
            {images.map((item, index) => _renderItem(item, index))}
          </PagerView>   
      </View>

      <View style={styles.description}>
        <Text style={styles.descriptionTitle}>Descrição</Text>
        <ScrollView>
          <Text style={styles.descriptionText}>Katyayani Azozole Azoxystrobin 18,2%+ difenoconazol 11,4% sc fungicida duplo sistêmico de amplo espectro com ação protetora e curativa. Ele oferece não apenas o controle de doenças, mas também melhora a saúde, a qualidade e o rendimento da colheita. É um fungicida sistêmico duplo que inibe a germinação de esporos no estágio inicial do desenvolvimento do fungo. Assim, protege a cultura contra a invasão de patógenos fúngicos. É absorvido pelas plantas e atua sobre o patógeno fúngico durante a penetração e formação de haustórios. Assim, interrompe o desenvolvimento de fungos ao interferir na biossíntese de esteróis na membrana celular. Demonstra rápida absorção com movimento translaminar e sistêmico do xilema Sinergia de duas químicas avançadas e ação multissítio. Modo de ação duplo, portanto eficaz e fornece controle de maior duração em doenças. dispersão uniforme no sistema vegetal.Mais fotossíntese e culturas saudáveis.Culturas aplicáveis: arroz, tomate, pimenta, trigo, milho, cucurbitáceas, abacates, mangas, maracujá e papoulas Uvas, batatas Amplo espectro de uso: Usado para frutas, vegetais, culturas agrícolas bem como jardins. Espectro: Arroz: Praga da bainha, Explosão; Tomate: Pinta-preta; Pimenta: Antracnose, Oídio; Milho: Míldio; Trigo: Oídio, Ferrugem Fungicida sistêmico absorvido por folhas, raízes, sementes. Controle duradouro: Através de ação Preventiva, Curativa e Sistêmica.</Text>
        </ScrollView>
      </View>

      <View style={styles.dataSupplier}>
        <View style={styles.data}>
          <Text style={styles.dataTitle}>Fornecedor: </Text>
          <Text style={styles.dataText}>Katyayani</Text>
        </View>

        <View style={styles.data}>
          <Text style={styles.dataTitle}>Telefone: </Text>
          <Text style={styles.dataText}>77 98899-9999</Text>
        </View>

        <View style={styles.data}>
          <Text style={styles.dataTitle}>Site: </Text>
          <Text
            style={styles.dataText}
            numberOfLines={1}
            ellipsizeMode="tail"
            onPress={openGoogle}
          >
            https://www.katyayaniorganics.com/product/azoxystrobin-18-2-difenoconazole-11-4-sc-azozole/
          </Text>
        </View>

        <View style={styles.data}>
          <Text style={styles.dataTitle}>Endereço: </Text>
          <Text
            style={styles.dataText}
            numberOfLines={3}
            ellipsizeMode="tail"
            onPress={toggleExpand}
          >
            Av. Juracy Magalhães, 172C - Jurema, Vitória da Conquista - BA, 45023-490
          </Text>
        </View>
        
      </View>

      {expanded && (
          <Animated.View
            style={[styles.contentWeatherWidget, { height: heightInterpolate, opacity: fieldOpacity, }]}
          >
            <Map />
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  contentWeatherWidget: {  
    overflow: 'hidden',
    width: 370,
    marginTop: 10,
  },

  dataSupplier: {
    borderRadius: 15,
    borderColor: 'rgba(107, 142, 35, 0.4)',
    borderWidth: 2,
    borderStyle: 'solid',
    width: 370,
    height: 185,
    marginTop: 15,
    textAlign: 'left',
    alignItems: 'flex-start',
    padding: 5,
  },

  data: {
    flexDirection: 'row',
    textAlign: 'left',
    marginBottom: 8
  },

  dataTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    width: 105
  },

  dataText: {
    fontSize: 18,
    width: 250
  },

  btnStyle: {
    backgroundColor: 'rgba(107, 142, 35, 0.8)',
    marginTop: 15,
    borderRadius: 20,
    borderColor: 'rgba(107, 142, 35, 1)',
    borderWidth: 2,
    borderStyle: 'solid',

    width: 370,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btn: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    alignItems: 'center',
  },

  description: {
    borderRadius: 15,
    borderColor: 'rgba(107, 142, 35, 0.4)',
    borderWidth: 2,
    borderStyle: 'solid',
    width: 370,
    height: 245,
    marginTop: 15,
    textAlign: 'left',
    alignItems: 'flex-start',
    padding: 5,
  },

  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  descriptionText: {
    fontSize: 15,
    textAlign: 'justify',    
  },

  fonte: {
    flexDirection: 'row',
    marginTop: 5,
    width: 360,
  },

  itemFonte: {
    fontSize: 15,
    textAlign: 'justify',
    fontWeight: '500',

    overflow: 'hidden',
    //whiteSpace: 'nowrap',
  }, 

  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },

  title: {
    width: 370,
    height: 70,
    marginLeft: 15,
    textAlign: 'left',
    alignItems: 'flex-start',
  },

  subtitle: {
    flexDirection: 'row',
  },

  itemTitle: {
    fontSize: 27,
    fontWeight: 'bold',
  },  

  itemInfo: {
    fontSize: 17,
    textAlign: 'justify',
    fontWeight: '500',
    fontStyle: 'italic',
  }, 
  
  pagerWidget: {
    marginTop: 15,
    borderRadius: 15,
    width: 370,
    height: 200,
    alignItems: 'center',
    justifyContent:'center',
    overflow: 'hidden',
  },

  backgroundFeed: { 
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    borderRadius: 15,
    borderColor: 'rgba(107, 142, 35, 0.4)',
    borderWidth: 2,
    borderStyle: 'solid',
  },

  pagerView: {
    flex: 1,
    height: '100%',
    width: '100%',
  },

  carouselItem: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  
  scrollViewContent: {
    flexGrow: 1,
  },
});
