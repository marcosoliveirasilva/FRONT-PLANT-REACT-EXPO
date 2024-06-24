import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Image, ActivityIndicator } from 'react-native';
import { api, apiWeather } from '../../../Services/api';

import { styles } from './Styles';

export const useWeather = (latitude, longitude) => {
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await apiWeather.get('weather', {
          params: { lat: latitude, lon: longitude, appid: 'd9ea01b75ea86d8f7fbd1a79ba00780d' },
          headers: { Authorization: api.defaults.headers['Authorization'] }
        });

        const data = response.data;
        setWeatherData({
          icon: data.weather[0].icon,
          currentTemperature: convertKelvinToC(data.main.temp),
          temperatureMin: convertKelvinToC(data.main.temp_min),
          temperatureMax: convertKelvinToC(data.main.temp_max),
          locationName: `${data.sys.country}, ${data.name}`,
          wind: data.wind.speed,
          humidity: data.main.humidity,
        });
      } catch (error) {
        console.log('Error: ', error);
      }
    };

    fetchWeather();
  }, [latitude, longitude]);

  return { weatherData };
};

export const convertKelvinToC = (kelvin: string) => {
  return parseInt(kelvin) - 273;
};

export const logCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

const WeatherWidget = ({ latitude, longitude }) => {
  const { weatherData } = useWeather(latitude, longitude);
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const [currentTime, setCurrentTime] = useState(logCurrentTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(logCurrentTime());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

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

  const {
    icon,
    currentTemperature,
    locationName,
    temperatureMin,
    temperatureMax,
    wind,
    humidity,
  } = weatherData;

  return (
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
          style={[styles.contentWeatherWidget, { height: heightInterpolate, opacity: fieldOpacity }]}
        >
          <Text style={styles.infoText}>Informações adicionais:</Text>
          <View style={styles.additionalInfo}>
            <WeatherCard title="Vento" value={`${wind} km/h`} />
            <WeatherCard title="Umidade" value={`${humidity}%`} />
            <WeatherCard title="Temp. Min" value={`${temperatureMin}°C`} />
            <WeatherCard title="Temp. Max" value={`${temperatureMax}°C`} />
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const WeatherCard = ({ title, value }) => (
  <View style={styles.card}>
    <Text style={styles.text}>{title}</Text>
    <Text style={[styles.text, { color: 'black' }]}>{value}</Text>
  </View>
);

export default WeatherWidget;
