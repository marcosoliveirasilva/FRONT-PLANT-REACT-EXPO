import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import PagerView from 'react-native-pager-view';

import { styles } from './Styles';

const FeedWidget = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const pagerRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      let nextIndex = currentIndex === carouselItems.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(nextIndex);
      pagerRef.current.setPage(nextIndex);
    }, 10000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const carouselItems = [
    { title: 'Rotação de Culturas:',          info: 'Alterne os tipos de plantas cultivadas em uma área para evitar o acúmulo de patógenos específicos no solo.' },
    { title: 'Espaçamento Adequado:',         info: 'Plante com espaço suficiente entre as plantas para garantir boa circulação de ar, reduzindo a umidade que favorece doenças.' },
    { title: 'Regas Controladas:',            info: 'Evite molhar as folhas ao regar. Prefira irrigação direta no solo para minimizar o risco de doenças fúngicas.' },
    { title: 'Inspeção Regular:',             info: 'Examine suas plantas regularmente para detectar sinais iniciais de doenças e pragas, permitindo um controle rápido.' },
    { title: 'Uso de Sementes Saudáveis:',    info: 'Utilize sementes certificadas e de boa qualidade para evitar a introdução de doenças no cultivo.' },
    { title: 'Remoção de Plantas Doentes:',   info: 'Retire e descarte plantas infectadas para evitar a propagação de doenças para outras plantas.' },
    { title: 'Adubação Balanceada:',          info: 'Forneça os nutrientes necessários para as plantas, evitando tanto a deficiência quanto o excesso de fertilizantes.' },
    { title: 'Controle de Pragas:',           info: 'Utilize métodos naturais ou produtos específicos para controlar pragas que podem transmitir doenças.' },
    { title: 'Higienização de Ferramentas:',  info: 'Limpe e desinfete ferramentas de jardinagem para evitar a transferência de patógenos entre plantas.' },
    { title: 'Cobertura do Solo:',            info: 'Utilize cobertura morta (mulch) para manter a umidade do solo, controlar ervas daninhas e prevenir respingos de solo que podem conter patógenos.' },
  ];

  const _renderItem = (item, index) => {
    return (
      <View style={styles.carouselItem} key={index}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemInfo}>{item.info}</Text>
      </View>
    );
  };

  return (
    <View style={styles.feedWidget}>
      <ImageBackground
        blurRadius={3}
        source={require('../../../assets/background_feed.jpeg')}
        style={styles.backgroundFeed}
      >
        <PagerView
          ref={pagerRef}
          style={styles.pagerView}
          initialPage={0}
          onPageSelected={(event) => setCurrentIndex(event.nativeEvent.position)}
        >
          {carouselItems.map((item, index) => _renderItem(item, index))}
        </PagerView>
      </ImageBackground>
    </View>
  );
};

export default FeedWidget;
