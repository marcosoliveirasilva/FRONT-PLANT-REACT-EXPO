import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { View, Text } from 'react-native';
import { styles } from './Styles';

const DiagnosticPicker = ({ diagnostics, selectedValue, onValueChange }): React.JSX.Element => {
  return (
    <View style={styles.containerPicker}>
      <Text style={styles.descriptionButton}>Filtrar por doença:</Text>
      <Picker
        selectedValue={selectedValue}
        style={[{ height: 40 }, styles.picker]}
        itemStyle={{ height: 40 }}
        onValueChange={onValueChange}
      >
        {diagnostics.map((diagnostic: { label: string; value: string; }, index: React.Key) => (
          <Picker.Item
            key={index}
            label={diagnostic.label}
            value={diagnostic.value}
          />
        ))}
      </Picker>
    </View>
  );
};

export default DiagnosticPicker;
