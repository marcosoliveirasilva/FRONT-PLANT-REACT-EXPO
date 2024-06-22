import React from 'react';
import { TextInput, View } from 'react-native';

import { styles } from './Styles';

export const SearchBar = ({ searchQuery, onSearch }) => {
  return (
    <View style={styles.search}>
      <TextInput
        placeholder="Pesquisar..."
        value={searchQuery}
        onChangeText={onSearch}
        style={styles.searchInput}
      />
    </View>
  );
};
