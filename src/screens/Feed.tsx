import React, { useState } from 'react'
import { Button, StyleSheet } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Weather from '../components/WeatherWidget'
import Diagnostic from './Diagnostic'
import Store from '../pages/Store/Index'
import Product from './Product'

const Stack = createNativeStackNavigator();

export default function Feed() {
  const [expanded, setExpanded] = useState(false);

  const handleChildData = (data) => {
    setExpanded(data)
  };

  return (
    <NavigationContainer independent={true}>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name= 'Home' component={Weather} />

      <Stack.Screen
        name='Diagnostic'
        component={Diagnostic}
        /*options={({ navigation }) => ({
          headerShown: true,
          headerLeft: () => (
            <Button
              onPress={() => navigation.goBack()}
              title="Back"
              color="#000"
            />
          ),
        })}*/
      />

      <Stack.Screen name= 'Store' component={Store} />

      <Stack.Screen name= 'Product' component={Product} />
    </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
});

