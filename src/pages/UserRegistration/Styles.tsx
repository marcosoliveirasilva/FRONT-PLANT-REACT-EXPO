import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'rgba(107, 142, 35, 0.8)',
  },
  containerHeader:{
    marginTop: '4%',
    marginBottom: '2%',
    paddingStart: '5%',
  },
  message:{
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  containerForm:{
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  title:{
    fontSize: 20,
    marginTop: 28,
  },
  input:{
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  button:{
    backgroundColor: 'rgba(107, 142, 35, 0.99)',
    borderRadius: 4,
    paddingVertical: 8,
    width: '100%',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText:{
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  buttonRegister:{
    marginTop: 14,
    alignSelf: 'center'
  },
  registerText:{
    color: '#a1a1a1',
  },
})
