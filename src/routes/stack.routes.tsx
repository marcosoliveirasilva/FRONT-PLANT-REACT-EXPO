import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from '../pages/Profile/Index';
import HistoricScreen from '../pages/Historic/Index';
import Diagnostic from '../pages/Diagnostic/Index';
import Store from '../pages/Store/Index';
import Product from '../pages/Product/Index';

const Stack = createNativeStackNavigator();

function ProfileNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
}

function HistoricPage() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name= 'HistoricPage' component={HistoricScreen} />
      <Stack.Screen name='Diagnostic' component={Diagnostic} />
      <Stack.Screen name= 'Store' component={Store} />
      <Stack.Screen name= 'Product' component={Product} />
    </Stack.Navigator>
  );
}

function HistoricNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Historic"
        component={HistoricPage}
      />
    </Stack.Navigator>
  );
}

export { ProfileNavigator, HistoricNavigator };
