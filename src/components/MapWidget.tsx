import React, { createContext, useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {
  requestBackgroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject
} from 'expo-location';

export const ThemeContext = createContext(["light", () => {}]);

export default function Map() {
  const [locationCoords, setLocationCoords] = useState({'latitude':-14.83509,'longitude':-40.893666});  

  async function getLocation() {
    let { status } = await requestBackgroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    } else {
      let location = await getCurrentPositionAsync({});
      console.log(location.coords);
      //setLocationCoords(location.coords);
    }
  }

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={styles.mapWidget}>  
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
    </View>
  );
}

const styles = StyleSheet.create({
  mapWidget: {
    borderColor: 'rgba(107, 142, 35, 0.4)',
    borderWidth: 2,
    borderStyle: 'solid',
    marginTop: 25,
    borderRadius: 15,
    width: 370,
    height: 200,
    alignItems: 'center',
    justifyContent:'center',
    overflow: 'hidden' 
  },
  map: {
    flex: 1,
    width: '100%',
    borderRadius: 30,
    overflow: 'hidden',
  }
});
