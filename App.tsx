import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/';

import AuthProvider from './src/contexts/auth';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor={ 'rgba(107, 142, 35, 0.8)' } barStyle= {"light-content" } />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
};
