import { NavigationContainer } from '@react-navigation/native';

import DrawerRoutes from './drawer.routes';

export default function App() {
  return (
    <NavigationContainer>
        <DrawerRoutes />
    </NavigationContainer>
  );
}