import React, { useContext } from 'react';
import { ScrollView, View } from 'react-native';
import { styles } from './Styles';
import { AuthContext } from '../../contexts/auth';
import WeatherWidget from './WeatherWidget/Index';
import WidgetMap from './WidgetMap/Index';
import FeedWidget from './FeedWidget/Index';
import ScannWidget from './ScannWidget/Index';

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <ScrollView>
        <WeatherWidget latitude={user.latitude} longitude={user.longitude} />
        <WidgetMap latitude={user.latitude} longitude={user.longitude} />
        <FeedWidget />
        <ScannWidget />
      </ScrollView>
    </View>
  );
};

export default Home;
