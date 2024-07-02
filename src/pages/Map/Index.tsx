import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import {  View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { fetchDeseasesData, fetchStoresData, fetchDiagnosticsData } from '../../Services/api';
import LoadingScreen from '../../components/LoadingScreen/Index';
import MapDeseases from './Map/Index';
import DiagnosticPicker from './DropdownButton/Index';
import DistanceButton from './Distancebutton/Index';
import { styles } from './Styles';

const Map = () => {
  const route = useRoute();
  const { latitude, longitude } = route.params;
  const [diagnostics, setDiagnostics] = useState([{}]);
  const [markersStores, setMarkersStores] = useState([]);
  const [markersDeseases, setMarkersDeseases] = useState([]);
  const [locationCoords, setLocationCoords] = useState({
    'latitude': parseFloat(latitude),
    'longitude': parseFloat(longitude)
  });
  const [locationCoordsDelta, setLocationCoordsDelta] = useState({
    'latitude': 0.02,
    'longitude': 0.02
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingPage, setLoadingPage] = useState(true);
  const [selectedValue, setSelectedValue] = useState("option1");
  const [distance, setDistance] = useState(10);
  const [diagnosticId, setDiagnostic] = useState('0');

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      setLoadingPage(true);
      searchDiagnosticData();
      searchStoresData();
      searchDeseasesData(diagnosticId, distance);
    }, [])
  );

  const searchDeseasesData = async (diagnosticID: string, distance: number) => {
    try {
      const response = await fetchDeseasesData(diagnosticID, distance);
      setMarkersDeseases(response);
    } catch (error) {
      console.error('Error fetching deseases:', error);
    } finally {
      setLoading(false);
      setLoadingPage(false);
    }
  };

  const searchStoresData = async () => {
    try {
      const response = await fetchStoresData();
      setMarkersStores(response);
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  };

  const searchDiagnosticData = async () => {
    try {
      const response = await fetchDiagnosticsData();
      setDiagnostics(response);
    } catch (error) {
      console.error('Error fetching diagnostics:', error);
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

  const searchDiagnostic = (id: string) => {
    setSelectedValue(id);
    setLoading(true);
    setDiagnostic(id);
    searchDeseasesData(id, distance);
  };

  const searchDistance = (value: number) => {
    const result = value + distance;
    if (result > 0) {
      setLoading(true);
      setDistance(result);
      searchDeseasesData(diagnosticId, result);
    }
  };

  if (loadingPage) {
    return <LoadingScreen />;
  }

  return (
    <Animatable.View animation={"fadeInRight"} style={styles.container}>
      <View style={styles.containerConfig}>
        <DiagnosticPicker
          diagnostics={diagnostics}
          selectedValue={selectedValue}
          onValueChange={searchDiagnostic}
        />
        <DistanceButton
          distance={distance}
          onIncrease={() => searchDistance(1)}
          onDecrease={() => searchDistance(-1)}
        />
      </View>

      <MapDeseases
        heightMap={655}
        loading={loading}
        locationCoords={locationCoords}
        locationCoordsDelta={locationCoordsDelta}
        markersDeseases={markersDeseases}
        markersStores={markersStores}
      />
    </Animatable.View>
  );
}

export default Map;
