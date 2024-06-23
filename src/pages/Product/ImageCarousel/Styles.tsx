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
  backgroundFeed: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    borderRadius: 15,
    borderColor: 'rgba(107, 142, 35, 0.4)',
    borderWidth: 2,
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
});
