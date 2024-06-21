import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, ScrollView, View, Text, StyleSheet, ImageBackground } from 'react-native';
import PagerView from 'react-native-pager-view';

import { useNavigation } from '@react-navigation/native';

export default function Diagnostic() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const pagerRef = useRef(null);

  const navigation = useNavigation();

  useEffect(() => {
    const timer = setInterval(() => {
      let nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(nextIndex);
      pagerRef.current.setPage(nextIndex);
    }, 3000); // Troca a cada 3 segundos

    return () => clearInterval(timer);
  }, [currentIndex]);

  const openStore = () => {
    navigation.navigate('Store')
  };

  const images= [
    { image: require('../../images/plant_desease/cereja_oidio/01.jpeg') },
    { image: require('../../images/plant_desease/cereja_oidio/02.jpeg') },
    { image: require('../../images/plant_desease/cereja_oidio/03.jpeg') },
  ]

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
      <View style={styles.title}>
        <Text style={styles.itemTitle}>Cereja Oídio</Text>
        <View style={styles.subtitle}>
          <Text style={styles.itemInfo}>Nome Científico: </Text>
          <Text style={styles.itemInfo}>Sphaerotheca fuliginea</Text>
        </View>
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

      <View style={styles.desease}>
        <Text style={styles.deseaseTitle}>Sobre a Doença</Text>
        <ScrollView>
          <Text style={styles.deseaseText}>No final do Verão, o fungo aparece nas folhas. Surge inicialmente uma rede fina e branca e à medida que a doença progride formam-se numerosos conidios originando uma massa branca. Posteriormente, apresentam cloroses e necrosam, enrolam-se sobre a página superior e caiem ao solo. Ocasionalmente, os sintomas podem desenvolver-se nos frutos e nas folhas durante a Primavera.
  \n O controle do oídio pode ser conseguido com recurso aos fungicidas e pelo uso de cultivares resistentes. Conhecimento da pressão da doença e da susceptibilidade das cultivares é essencial para delinear uma estratégia eficaz no uso de fungicidas. Nos locais onde a doença ocorre todos os anos em cultivares susceptíveis, será preferível aplicar fungicidas preventivos no final da floração e nos jovens frutos. Nas restantes situações, pode-se aplicar fungicidas curativos logo após a ocorrência dos primeiros sintomas. Existem também algumas práticas agronómicas podem ajudar reduzir o potencial do inoculo, tal como podar os lançamentos afectados, remover a fruta nova infectada e evitar fertilizações excessivas particularmente de azoto.</Text>
        </ScrollView>
        <View style={styles.fonte}>
          <Text style={styles.itemFonte}>Fonte: </Text>
          <Text ellipsizeMode='tail' style={[styles.itemFonte, {width: 310}]}>https://infoagro.cothn.pt/portal/index.php?id=2033</Text>
        </View>
      </View>

      <TouchableOpacity
        //activeOpacity={0.9}
        onPress={() => openStore()}
        style={styles.btnStyle}
      >
        <Text style={styles.btn}>PRODUTOS RECOMENDADOS</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: 'rgba(107, 142, 35, 0.8)',
    marginTop: 15,
    //padding: 20,
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

  desease: {
    borderRadius: 15,
    borderColor: 'rgba(107, 142, 35, 0.4)',
    borderWidth: 2,
    borderStyle: 'solid',
    width: 370,
    height: 385,
    marginTop: 15,
    textAlign: 'left',
    alignItems: 'flex-start',
    padding: 5,
  },

  deseaseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  deseaseText: {
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
    marginLeft: 15,
    textAlign: 'left',
    alignItems: 'flex-start'
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
});
