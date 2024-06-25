import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import { styles } from './Styles';

const LoadingScreen = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#131313" />
  </View>
);

export default LoadingScreen;
