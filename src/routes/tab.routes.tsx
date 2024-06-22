import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

import Feed from '../screens/Feed';
import Store from '../pages/Store/Index';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
            name="store"
            component={Store}
            options={{
                tabBarIcon: ({ color, size }) => <Feather name='plus' color={color} size={size} />,
                tabBarLabel: 'Novo',
            }}
        />

        <Tab.Screen
            name="feed"
            component={Feed}
            options={{
                tabBarIcon: ({ color, size }) => <Feather name='home' color={color} size={size} />,
                tabBarLabel: 'Inicio',
            }}
        />
    </Tab.Navigator>
  );
}
