import React, { useState, useEffect } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { styles } from './Styles';
import { useNavigation } from '@react-navigation/native';

import CustomMarker from '../../../components/CustomMarker/Index';
import { mapStyle } from '../../../Services/map';

const WidgetMap = ({ latitude, longitude, markersDeseases, markersStores }) => {
  const [locationCoords, setLocationCoords] = useState({'latitude': parseFloat(latitude),'longitude': parseFloat(longitude)});
  const [errorMsg, setErrorMsg] = useState(null);
  const navigation = useNavigation();
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

  const openMap = () => {
    navigation.navigate('Map', {
      latitude: latitude,
      longitude: longitude
    });
  };

  return (
    <View style={styles.mapWidget}>
      {errorMsg ? (
            <Text >{errorMsg}</Text>
          ) : (
      <TouchableOpacity style={styles.mapWidgetButton} onPress={() => openMap()}>
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
          {markersDeseases.map((marker, index) => (
            <CustomMarker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title}
              image={marker.image}
              size={markerSize}
            />
          ))}
          {markersStores.map((marker, index) => (
            <CustomMarker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title}
              image={marker.image}
              size={markerSize}
            />
          ))}
        </MapView>
      </TouchableOpacity>
      )}
    </View>
  );
}

export default WidgetMap;
