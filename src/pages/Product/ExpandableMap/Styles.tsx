import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  contentWeatherWidget: {
    overflow: 'hidden',
    width: 370,
    marginTop: 10,
  },
  mapWidget: {
    borderColor: 'rgba(107, 142, 35, 0.4)',
    borderWidth: 2,
    borderStyle: 'solid',
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
