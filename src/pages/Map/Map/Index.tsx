import React from 'react';
import { Dimensions, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import LoadingScreen from '../../../components/LoadingScreen/Index';
import CustomMarker from '../../../components/CustomMarker/Index';
import { mapStyle } from '../../../Services/map';
import { styles } from './Styles';

const MapDeseases = ({
  heightMap, loading, locationCoords, locationCoordsDelta, markersDeseases, markersStores
}): React.JSX.Element => {
  const { width, height } = Dimensions.get('window');
  const markerSize = Math.min(width, height) * 0.1;

  return (
    <View style={[{ height: heightMap }, styles.mapWidget]}>
      {loading ? (
        <LoadingScreen />
      ) : (
        <MapView
          style={styles.map}
          customMapStyle={mapStyle}
          initialRegion={{
            latitude: locationCoords.latitude,
            longitude: locationCoords.longitude,
            latitudeDelta:locationCoordsDelta.latitude,
            longitudeDelta: locationCoordsDelta.longitude,
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
      )}
    </View>
  );
};

export default MapDeseases;
