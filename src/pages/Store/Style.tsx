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
    width: 370,
    height: 700,
    marginTop: 20,
    textAlign: 'left',
    alignItems: 'flex-start',
  },
  productButton: {
    width: 370,
    height: 80,
    flexDirection: 'row',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  product: {
    borderRadius: 15,
    borderColor: 'rgba(107, 142, 35, 0.4)',
    borderWidth: 2,
    borderStyle: 'solid',
    width: 370,
    height: 80,
    marginBottom: 10,
    flexDirection: 'row',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    alignItems: 'flex-end',
    textAlign: 'right',
  },
  btnStyle: {
    color: 'rgba(107, 142, 35, 0.8)',
    padding: 10
  },
  icon: {
    color: 'rgba(107, 142, 35, 0.8)',
    padding: 10
  },
  search: {
    width: 365,
    textAlign: 'left',
    alignItems: 'flex-start'
  },
  searchImput: {
    height: 45,
    width: '100%',
    borderWidth: 2,
    padding: 10,
    borderRadius: 15,
    borderColor: 'rgba(107, 142, 35, .6)',
    borderStyle: 'solid',
    fontSize: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
});
