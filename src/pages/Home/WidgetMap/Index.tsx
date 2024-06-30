import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { styles } from './Styles';
import { useNavigation } from '@react-navigation/native';

const WidgetMap = ({ latitude, longitude }) => {
  const [locationCoords, setLocationCoords] = useState({'latitude': parseFloat(latitude),'longitude': parseFloat(longitude)});
  const [errorMsg, setErrorMsg] = useState(null);
  const navigation = useNavigation();

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
      </TouchableOpacity>
      )}
    </View>
  );
}

export default WidgetMap;
