import React, { useState, useEffect } from 'react';
import { Animated, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { styles } from './Styles';

const ExpandableMap = ({ expanded, animation, latitude, longitude }) => {
  const [locationCoords, setLocationCoords] = useState({ latitude: 0, longitude: 0 });
  const [errorMsg, setErrorMsg] = useState(null);

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
              initialRegion={{
                latitude: locationCoords.latitude,
                longitude: locationCoords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
            >
              <Marker
                coordinate={{
                  latitude: locationCoords.latitude,
                  longitude: locationCoords.longitude,
                }}
              />
            </MapView>
          )}
        </View>
      </Animated.View>
    )
  );
};

export default ExpandableMap;
