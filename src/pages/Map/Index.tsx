import { useFocusEffect, useRoute } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import React, { useState, useEffect, useCallback } from 'react';
import { Dimensions, View } from 'react-native';

import * as Animatable from 'react-native-animatable';

import LoadingScreen from '../../components/LoadingScreen/Index';
import CustomMarker from '../../components/CustomMarker/Index';
import { mapStyle } from '../../Services/map';
import { api } from '../../Services/api';
import { styles } from './Styles';

const Map = () => {
  const route = useRoute();
  const { latitude, longitude } = route.params;
  const [markersStores, setMarkersStores] = useState([]);
  const [markersDeseases, setMarkersDeseases] = useState([]);
  const [locationCoords, setLocationCoords] = useState({
    'latitude': parseFloat(latitude),
    'longitude': parseFloat(longitude)
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const { width, height } = Dimensions.get('window');
  const markerSize = Math.min(width, height) * 0.1;
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      searchStoresData();
      searchDeaseasesData();
    }, [])
  );

  const searchDeaseasesData = async () => {
    try {
      const responseDeseases = await api.get('historicoScanns/Markers', {
        params: { page: 1, limit: 100, diagnosticID: 0, distance: 400 },
        headers: { Authorization: api.defaults.headers['Authorization'] }
      });

      const response = responseDeseases.data.map((item: {
        latitude: string;
        longitude: string;
        nomePlanta: string;
        nomeDoenca: string;
      }) => ({
        latitude: parseFloat(item.latitude),
        longitude: parseFloat(item.longitude),
        title: (item.nomePlanta+ ' - ' +item.nomeDoenca),
        image: require('../../assets/location-marker-warning.png')
      }));

      setMarkersDeseases(response);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchStoresData = async () => {
    try {
      const responseStores = await api.get('fornecedores', {
        params: { page: 1, limit: 100 },
        headers: { Authorization: api.defaults.headers['Authorization'] }
      });

      const response = responseStores.data.map((item: {
        latitude: string;
        longitude: string;
        nomeEmpresa: string;
      }) => ({
        latitude: parseFloat(item.latitude),
        longitude: parseFloat(item.longitude),
        title: item.nomeEmpresa,
        image: require('../../assets/convenience-store-map-2.png')
      }));

      setMarkersStores(response);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    if (typeof latitude === 'undefined' || typeof longitude === 'undefined') {
      setErrorMsg('Invalid coordinates');
    } else {
      setLocationCoords({ latitude: parseFloat(latitude), longitude: parseFloat(longitude) });
      setErrorMsg(null);
    }
  }, [latitude, longitude]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Animatable.View animation={"fadeInRight"} style={styles.container}>
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
            title={'title'}
            description={'description'}
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
    </Animatable.View>
  );
}

export default Map;
