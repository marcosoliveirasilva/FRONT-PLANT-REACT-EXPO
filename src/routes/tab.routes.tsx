import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';

import Home from '../pages/Home/Index';
import Map from '../pages/Map/Index';
import Diagnostic from '../pages/Diagnostic/Index';
import Store from '../pages/Store/Index';
import Product from '../pages/Product/Index';
import { useRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function StoreStack() {
  const route = useRoute();
  const { diagnosticoId } = route.params || { diagnosticoId: 0 };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Store" component={Store} initialParams={{ diagnosticoId }}  />
      <Stack.Screen name="Product" component={Product} />
    </Stack.Navigator>
  );
}

function Feed() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name= 'Home' component={Home} initialParams={{ logout: false }} />
      <Stack.Screen name='Map' component={Map} />
      <Stack.Screen name='Diagnostic' component={Diagnostic} />
      <Stack.Screen name= 'Store' component={Store} />
      <Stack.Screen name= 'Product' component={Product} />
    </Stack.Navigator>
  );
}

export default function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name='home' color={color} size={size} />,
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="StoreStack"
        component={StoreStack}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="storefront" size={size} color={color} />,
          tabBarLabel: () => null,
        }}
      />
    </Tab.Navigator>
  );
}
