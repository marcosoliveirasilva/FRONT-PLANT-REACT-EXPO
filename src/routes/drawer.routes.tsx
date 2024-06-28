import { useCallback, useContext } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator
} from '@react-navigation/drawer';

import TabRoutes from './tab.routes';
import StackRoutes from './stack.routes';
import { AuthContext } from '../contexts/auth';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  const { signOut } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleLogout = useCallback(() => {
    Alert.alert(
      "Confirmar Deslogar",
      "Você tem certeza que deseja sair?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Sim",
          onPress: () => {
            signOut();
            navigation.navigate('profile');
          }
        }
      ],
      { cancelable: false }
    );
  }, [signOut, navigation]);

  const CustomDrawerContent = (props) => {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Logout"
          icon={({ color, size }) => <Feather name='log-out' color={color} size={size} />}
          onPress={handleLogout}
        />
      </DrawerContentScrollView>
    );
  };

  return (
    <Drawer.Navigator
      screenOptions={{ title: '' }}
      initialRouteName="home"
      drawerContent={CustomDrawerContent}
    >
      <Drawer.Screen
        name="home"
        component={TabRoutes}
        options={{
          drawerIcon: ({ color, size }) => <Feather name='home' color={color} size={size} />,
          drawerLabel: 'Inicio',
        }}
      />
      <Drawer.Screen
        name="profile"
        component={StackRoutes}
        options={{
          drawerIcon: ({ color, size }) => <Feather name='user' color={color} size={size} />,
          drawerLabel: 'Meu Perfil',
        }}
      />
    </Drawer.Navigator>
  );
}
