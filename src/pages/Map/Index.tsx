import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import * as Animatable from 'react-native-animatable';

import { styles } from './Styles';
import { useRoute } from '@react-navigation/native';

const Map = () => {
  const route = useRoute();
  const { latitude, longitude } = route.params;
  const [locationCoords, setLocationCoords] = useState({
    'latitude': parseFloat(latitude),
    'longitude': parseFloat(longitude)
  });
  const [errorMsg, setErrorMsg] = useState(null);

  const markers = [
    { latitude: -14.839019, longitude: -40.889684, title: 'Marker 1', description: 'Description 1' },
    { latitude: -14.838148, longitude: -40.886251, title: 'Marker 2', description: 'Description 2' },
  ];

  useEffect(() => {
    if (typeof latitude === 'undefined' || typeof longitude === 'undefined') {
      setErrorMsg('Invalid coordinates');
    } else {
      setLocationCoords({ latitude: parseFloat(latitude), longitude: parseFloat(longitude) });
      setErrorMsg(null);
    }
  }, [latitude, longitude]);

  return (
    <Animatable.View animation={"fadeInRight"} style={styles.container}>
      <View style={styles.mapWidget}>
        {errorMsg ? (
              <Text >{errorMsg}</Text>
            ) : (
        <MapView
          style={styles.map}
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
          {markers.map((marker, index) => (
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: marker.latitude,
                      longitude: marker.longitude,
                    }}
                    title={marker.title}
                    description={marker.description}
                    image={require('../../assets/location-marker-warning.png')}
                  />
                ))}
        </MapView>
        )}
      </View>
    </Animatable.View>
  );
}

export default Map;
