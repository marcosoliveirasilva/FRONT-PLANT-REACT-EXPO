import React, { useContext } from 'react';

import { AuthContext } from '../contexts/auth';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import DrawerRoutes from './drawer.routes';
import { ActivityIndicator, View } from 'react-native';

export default function Routes() {
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
      }}
    >
      <ActivityIndicator size={"large"} color={"#131313"}/>
    </View>
  }

  return (
    signed ? <DrawerRoutes/> : <AuthRoutes/>
  )
};
