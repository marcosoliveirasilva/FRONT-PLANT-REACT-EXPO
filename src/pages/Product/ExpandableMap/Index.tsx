import React, { useState, useEffect } from 'react';
import { Animated, View, Text, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { mapStyle } from '../../../Services/map';
import { styles } from './Styles';
import CustomMarker from '../../../components/CustomMarker/Index';

const ExpandableMap = ({ expanded, animation, latitude, longitude }) => {
  const [locationCoords, setLocationCoords] = useState({ latitude: 0, longitude: 0 });
  const [errorMsg, setErrorMsg] = useState(null);
  const { width, height } = Dimensions.get('window');
  const markerSize = Math.min(width, height) * 0.1;

  useEffect(() => {
    if (typeof latitude === 'undefined' || typeof longitude === 'undefined') {
      setErrorMsg('Invalid coordinates');
    } else {
      setLocationCoords({ latitude: parseFloat(latitude), longitude: parseFloat(longitude) });
      setErrorMsg(null);
    }
  }, [expanded, latitude, longitude]);

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  const fieldOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    expanded && (
      <Animated.View
        style={[
          styles.contentWeatherWidget,
          { height: heightInterpolate, opacity: fieldOpacity },
        ]}
      >
        <View style={styles.mapWidget}>
          {errorMsg ? (
            <Text style={styles.errorText}>{errorMsg}</Text>
          ) : (
            <MapView
              style={styles.map}
              customMapStyle={mapStyle}
              initialRegion={{
                latitude: locationCoords.latitude,
                longitude: locationCoords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >

              <CustomMarker
                  key={1}
                  coordinate={{
                    latitude: locationCoords.latitude,
                    longitude: locationCoords.longitude,
                  }}
                  image={require('../../../../src/assets/convenience-store-map-2.png')}
                  title={''}
                  size={markerSize}
              />
            </MapView>
          )}
        </View>
      </Animated.View>
    )
  );
};

export default ExpandableMap;
