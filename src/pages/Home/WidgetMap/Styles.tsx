import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mapWidget: {
    borderColor: 'rgba(107, 142, 35, 0.4)',
    borderWidth: 2,
    borderStyle: 'solid',
    marginTop: 25,
    borderRadius: 15,
    width: 370,
    height: 200,
    alignItems: 'center',
    justifyContent:'center',
    overflow: 'hidden'
  },
  map: {
    flex: 1,
    width: '100%',
    borderRadius: 30,
    overflow: 'hidden',
  }
});
