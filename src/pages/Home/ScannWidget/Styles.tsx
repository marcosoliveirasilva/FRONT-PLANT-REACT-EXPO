import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export const styles = StyleSheet.create({
  scannWidget: {
    marginTop: 20,
    borderRadius: 15,
    width: screenWidth - 40,
    height: 170,
    alignItems: 'center',
  },
  backgroundScann: {
    height: '100%',
    width: '100%',
    opacity: 0.9,
    overflow: 'hidden',
    borderRadius: 15,
    borderColor: 'rgba(107, 142, 35, 0.4)',
    borderWidth: 3,
  },
  pagerView: {
    flex: 1,
    width: '100%',
    height: 100,
  },
  carouselItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  btnStyle: {
    backgroundColor: 'rgba(107, 142, 35, 0.9)',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 2,
  },
  imageIcon: {
    height: 25,
    width: 25,
  },
});
