import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  disease: {
    borderRadius: 15,
    borderColor: 'rgba(107, 142, 35, 0.4)',
    backgroundColor: 'rgba(107, 142, 35, 0.1)',
    borderWidth: 2,
    width: 370,
    height: 385,
    marginTop: 15,
    padding: 5,
  },
  diseaseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  diseaseText: {
    fontSize: 15,
    textAlign: 'justify',
  },
  fonte: {
    flexDirection: 'row',
    marginTop: 5,
    width: 360,
  },
  itemFonte: {
    fontSize: 15,
    fontWeight: '500',
    overflow: 'hidden',
  },
});
