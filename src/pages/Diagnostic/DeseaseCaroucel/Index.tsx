import React, { useCallback, useRef, useState } from 'react';
import { View, ImageBackground } from 'react-native';
import PagerView from 'react-native-pager-view';

import { styles } from './Styles';
import { useFocusEffect } from '@react-navigation/native';

const DeseaseCaroucel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const pagerRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      const timer = setInterval(() => {
        let nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(nextIndex);

        if (pagerRef.current) {
          pagerRef.current.setPage(nextIndex);
        }
      }, 3000);

      return () => clearInterval(timer);
    }, [currentIndex, images.length])
  );


  return (
    <View style={styles.pagerWidget}>
      <PagerView
        ref={pagerRef}
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={(event) => setCurrentIndex(event.nativeEvent.position)}
      >
        {images.map((item, index) => (
          <View style={styles.carouselItem} key={index}>
            <ImageBackground source={{ uri: item.image }} style={styles.backgroundFeed} />
          </View>
        ))}
      </PagerView>
    </View>
  );
};

export default DeseaseCaroucel;
