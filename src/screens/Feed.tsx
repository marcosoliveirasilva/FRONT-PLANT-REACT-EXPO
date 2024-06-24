import React, { useState } from 'react'
import { StyleSheet } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../pages/Home/Index';
import Diagnostic from './Diagnostic';
import Store from '../pages/Store/Index';
import Product from '../pages/Product/Index';

const Stack = createNativeStackNavigator();

export default function Feed() {
  const [expanded, setExpanded] = useState(false);

  const handleChildData = (data) => {
    setExpanded(data)
  };

  return (
    <NavigationContainer independent={true}>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name= 'Home' component={Home} />

      <Stack.Screen
        name='Diagnostic'
        component={Diagnostic}
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

