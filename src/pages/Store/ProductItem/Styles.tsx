import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  containerProduct: {
    width: 260,
  },
  productType: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  productName: {
    width: 260,
    fontSize: 18,
    fontWeight: '500',
  },
  productSupplier: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  productList: {
    width: '100%',
    height: 700,
    marginTop: 20,
    textAlign: 'left',
    alignItems: 'flex-start',
  },
  productButton: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  product: {
    borderRadius: 15,
    borderColor: 'rgba(107, 142, 35, 0.4)',
    backgroundColor: 'rgba(107, 142, 35, 0.1)',
    borderWidth: 2,
    borderStyle: 'solid',
    width: '100%',
    height: 80,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    alignItems: 'flex-end',
  },
  btnStyle: {
    color: 'rgba(107, 142, 35, 0.8)',
    padding: 10,
  },
  icon: {
    color: 'rgba(107, 142, 35, 0.8)',
    padding: 10,
  },
});
