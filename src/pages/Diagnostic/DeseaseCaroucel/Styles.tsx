import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  pagerWidget: {
    marginTop: 15,
    borderRadius: 15,
    width: 370,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  pagerView: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  carouselItem: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  backgroundFeed: {
    height: '100%',
    width: '100%',
    borderRadius: 15,
    borderColor: 'rgba(107, 142, 35, 0.4)',
    borderWidth: 2,
  },
});
