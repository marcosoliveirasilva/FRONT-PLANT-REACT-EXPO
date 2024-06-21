import React, { createContext, useState, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Animated, Image } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

import Map from './MapWidget'
import FeedWidget from './FeedWidget'
//import ScannWidget from './ScannWidget'
import { rgbaColor } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

export const ThemeContext = createContext(["light", () => {}]);

export default function Weather() {
  const themeHook = useState("dark");
  const [icon, setIcon] = useState('10d');
  const [currentTemperature, setCurrentTemperature] = useState('31');
  const [locationCoords, setLocationCoords] = useState(null);
  const [locationName, setLocationName] = useState('BR, Vitória da Conquista');
  const [temperatureMin, setTemperatureMin] = useState('21');
  const [temperatureMax, setTemperatureMax] = useState('32');
  const [wind, setWind] = useState('7');
  const [humidity, setHumidity] = useState('68');
  const [currentTime, setCurrentTime] = useState();
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    const newValue = !expanded;

    Animated.timing(animation, {
      toValue: newValue ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setExpanded(newValue);
    });
  };

  const fieldOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  async function getLocation() {
    let { status } = await Location.requestBackgroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    } else {
      let location = await Location.getCurrentPositionAsync({});
      console.log(location.coords);
      setLocationCoords(location.coords);
    }
  }

  const logCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const time = `${hours}:${minutes}`;
    setCurrentTime(time);
    return time;
  };

  async function setCurrentWeather() {
    await axios.get('http://api.openweathermap.org/data/2.5/weather?lat=-14.83509&lon=-40.893666&appid=d9ea01b75ea86d8f7fbd1a79ba00780d')
      .then(response => {
        const data = response.data;
        setIcon(data.weather[0].icon)
        setCurrentTemperature(convertKelvinToC(data.main.temp));
        setTemperatureMin(convertKelvinToC(data.main.temp_min));
        setTemperatureMax(convertKelvinToC(data.main.temp_max));
        setLocationName(`${data.sys.country}, ${data.name}`);
        setWind(data.wind.speed);
        setHumidity(data.main.humidity);
      })
      .catch(error => {
        console.log(error);
      });

    logCurrentTime();
  }

  function convertKelvinToC(kelvin) {
    return parseInt(kelvin - 273);
  }

  useEffect(() => {
    setCurrentWeather();
  }, []);

  return (
    <View style={ styles.container }>
    <ThemeContext.Provider value={themeHook}>
      <ScrollView>
      <View style={styles.feed}>
        <TouchableOpacity style={styles.weatherWidget} onPress={toggleExpand}>
          <View>
            <Text style={styles.localizationText}>{locationName}</Text>
            <Text style={styles.timeText}>{currentTime}</Text>
          </View>

          <View style={styles.temperatureContainer}>
            <Image
              source={{ uri: `https://openweathermap.org/img/wn/${icon}@2x.png` }}
              style={styles.weatherIcon}
            />
            <Text style={styles.temperatureText}>{currentTemperature}</Text>
            <Text style={[styles.temperatureText, { fontSize: 14 }]}>°C</Text>
          </View>
        </TouchableOpacity>

        {expanded && (
          <Animated.View
            style={[styles.contentWeatherWidget, { height: heightInterpolate, opacity: fieldOpacity, }]}
          >
            <Text style={styles.infoText}>Informações adcionais:</Text>
            <View style={styles.addtionalInfo}>
              <View style={styles.card}>
                <Text style={styles.text}>Vento</Text>
                <Text style={[styles.text, { color: 'black' }]}>{wind}km/h</Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.text}>Umidade</Text>
                <Text style={[styles.text, { color: 'black' }]}>{humidity}%</Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.text}>Temp. Min</Text>
                <Text style={[styles.text, { color: 'black' }]}>{temperatureMin}°C</Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.text}>Temp. Max</Text>
                <Text style={[styles.text, { color: 'black' }]}>{temperatureMax}°C</Text>
              </View>
            </View>
          </Animated.View>
        )}

        <Map />
        <FeedWidget />



      </View>
      </ScrollView>
    </ThemeContext.Provider>
    </View>
  );
}
//<ScannWidget />
const styles = StyleSheet.create({
  weatherWidget: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderColor: 'rgba(107, 142, 35, 0.4)',
    borderWidth: 2,
    borderStyle: 'solid',
    marginTop: 10,
    padding: 5,
    borderRadius: 15,
    width: 370,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 100
  },

  contentWeatherWidget: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderColor: 'rgba(107, 142, 35, 0.3)',
    borderWidth: 2,
    borderStyle: 'solid',
    overflow: 'hidden',
    width: 370,
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  infoText: {
    margin: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  addtionalInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    alignItems: 'center',
    margin: 10,
    minWidth: 150,
  },
  text: {
    marginLeft: 15,
    fontSize: 18,
  },



  localizationText: {
    marginLeft: 10,
  },
  timeText: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  weatherIcon: {
    width: 75,
    height: 75,
    marginRight: 10,
  },
  temperatureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 10,
  },
  temperatureText: {
    fontSize: 50,
  },
  feed: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
});
