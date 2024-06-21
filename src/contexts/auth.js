import React, { createContext, useState, useEffect } from 'react';

import api from '../Services/api';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

function AuthProvider({ children }){
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem('@findToken');

      if (storageUser) {
        const response = await api.get('pessoas/me', {
          headers: {
            'Authorization': storageUser
          }
        })
        .catch(() => {
          setUser(null);
        });

        api.defaults.headers['Authorization'] = storageUser;
        setUser(response.data);

        setLoading(false);
      }
      setLoading(false);
    }

    loadStorage();
  }, [])


  async function signUp(email, password, nome){
    setLoadingAuth(true);

    try{
      const response = await api.post('/users', {
       name: nome,
       password: password,
       email: email,
      })
      setLoadingAuth(false);

      navigation.goBack();


    }catch(err){
      console.log("ERRO AO CADASTRAR", err);
      setLoadingAuth(false);
    }
  }

  async function signIn(email, password){
    setLoadingAuth(true);

    try{
      const response = await api.post('usuarios/entrar', {
        email: email,
        senha: password
      });

      await AsyncStorage.setItem('@findToken', `Bearer ${response.data.accessToken}`);

      api.defaults.headers['Authorization'] = `Bearer ${response.data.accessToken}`;

      setUser(response.data);
      setLoadingAuth(false);
    }catch(error){
      console.log("ERRO AO LOGAR ", error);
      setLoadingAuth(false);
    }
  }

  async function signOut(){
    await AsyncStorage.clear()
    .then(() => {
      setUser(null);
    })
  }

  return(
    <AuthContext.Provider value={{ signed: !!user, user, signUp, signIn, signOut, loadingAuth, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;

