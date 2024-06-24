import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  feedWidget: {
    marginTop: 25,
    borderRadius: 15,
    width: 370,
    height: 200,
    alignItems: 'center',
    justifyContent:'center',
    overflow: 'hidden',
  },
  backgroundFeed: {
    height: '100%',
    width: '100%',
    opacity: .9,
    overflow: 'hidden',
    borderRadius: 15,
    borderColor: 'rgba(107, 142, 35, 0.4)',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  pagerView: {
    flex: 1,
  },
  carouselItem: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    backgroundColor: 'rgba(76, 175, 80, 0.05)',
  },
  itemTitle: {
    fontSize: 24,
    fontWeight: 'bold',

    height: 50,
  },
  itemInfo: {
    fontSize: 20,
    textAlign: 'justify',
    fontWeight: '500',
    height: 100,
  },
});
