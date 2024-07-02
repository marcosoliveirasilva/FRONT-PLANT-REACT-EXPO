import React from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from './Styles';

const DistanceButton = ({ distance, onIncrease, onDecrease }): React.JSX.Element => {
  return (
    <View style={styles.containerButton}>
      <Text style={styles.descriptionButton}>Busca</Text>
      <View style={styles.button}>
        <Button color='rgb(107, 142, 35)' title="-" onPress={onDecrease} />
        <Text style={styles.countText}>{distance} km</Text>
        <Button color='rgb(107, 142, 35)' title="+" onPress={onIncrease} />
      </View>
    </View>
  );
};

export default DistanceButton;
