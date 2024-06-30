import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  feed: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
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
    height: 70
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
    borderRadius: 10,
    alignItems: 'center',
  },
  infoText: {
    margin: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  additionalInfo: {
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
  temperatureContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10,
  },
  weatherIcon: {
    width: 75,
    height: 75,
  },
  temperatureText: {
    fontSize: 50,
  },
  temperatureTextCelcius: {
    marginTop: 20,
    fontSize: 14
  },
});
