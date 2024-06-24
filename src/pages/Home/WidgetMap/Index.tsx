import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { styles } from './Styles';

const WidgetMap = ({ latitude, longitude }) => {
  const [locationCoords, setLocationCoords] = useState({'latitude': parseFloat(latitude),'longitude': parseFloat(longitude)});
  const [errorMsg, setErrorMsg] = useState(null);

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
  );
}

export default WidgetMap;
