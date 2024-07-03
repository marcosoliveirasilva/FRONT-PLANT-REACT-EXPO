import React, { useState, useEffect } from 'react';
import { Dimensions, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { mapStyle } from '../../../Services/map';
import { styles } from './Styles';

const WidgetMap = ({ latitude, longitude }) => {
  const [locationCoords, setLocationCoords] = useState({
    'latitude': parseFloat(latitude),
    'longitude': parseFloat(longitude)
  });
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
  }, [latitude, longitude]);

  return (
    <View style={styles.mapWidget}>
      {errorMsg ? (
            <Text >{errorMsg}</Text>
          ) : (
        <MapView
          style={styles.map}
          customMapStyle={mapStyle}
          initialRegion={{
            latitude: locationCoords.latitude,
            longitude: locationCoords.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
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
  );
}

export default WidgetMap;
