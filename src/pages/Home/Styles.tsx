import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  weatherWidget: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderColor: 'rgba(107, 142, 35, 0.4)',
    borderWidth: 2,
    borderStyle: 'solid',
    marginTop: 10,
    padding: 5,
    borderRadius: 15,
    width: 370,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 100
  },
  contentWeatherWidget: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderColor: 'rgba(107, 142, 35, 0.3)',
    borderWidth: 2,
    borderStyle: 'solid',
    overflow: 'hidden',
    width: 370,
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  infoText: {
    margin: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  addtionalInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    alignItems: 'center',
    margin: 10,
    minWidth: 150,
  },
  text: {
    marginLeft: 15,
    fontSize: 18,
  },
  localizationText: {
    marginLeft: 10,
  },
  timeText: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  weatherIcon: {
    width: 75,
    height: 75,
    marginRight: 10,
  },
  temperatureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 10,
  },
  temperatureText: {
    fontSize: 50,
  },
  feed: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
});
