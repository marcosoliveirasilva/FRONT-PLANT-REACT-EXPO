import React, { useContext, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { styles } from './Styles';
import { AuthContext } from '../../contexts/auth';
import WeatherWidget from './WeatherWidget/Index';
import WidgetMap from './WidgetMap/Index';
import FeedWidget from './FeedWidget/Index';
import ScannWidget from './ScannWidget/Index';

import { fetchDeseasesData, fetchStoresData } from '../../Services/api';
import LoadingScreen from '../../components/LoadingScreen/Index';

import * as Animatable from 'react-native-animatable';

const Home = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [markersStores, setMarkersStores] = useState([]);
  const [markersDeseases, setMarkersDeseases] = useState([]);

  useEffect(() => {
    searchStoresData();
    searchDeseasesData('0', 20);
  }, []);

  const searchDeseasesData = async (diagnosticID: string, distance: number) => {
    try {
      const response = await fetchDeseasesData(diagnosticID, distance);
      setMarkersDeseases(response);
    } catch (error) {
      console.error('Error fetching deseases:', error);
    } finally {
      setLoading(false);
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

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Animatable.View animation={"fadeInRight"} style={styles.container}>
      <ScrollView>
        <WeatherWidget latitude={user.latitude} longitude={user.longitude} />
        <WidgetMap
          latitude={user.latitude}
          longitude={user.longitude}
          markersDeseases={markersDeseases}
          markersStores={markersStores}
        />
        <FeedWidget />
        <ScannWidget />
      </ScrollView>
    </Animatable.View>
  );
};

export default Home;
