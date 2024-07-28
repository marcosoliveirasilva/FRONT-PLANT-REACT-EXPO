import React, { createContext, useState, useEffect } from 'react';

import { api } from '../Services/api';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const AuthContext = createContext({});

function AuthProvider({ children }): React.JSX.Element{
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


  async function signUp(email: string, password: string, nome: string){
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

  async function signIn(email: string, password: string){
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
      Alert.alert("Erro", "Usuário ou senha inválidos.");
      console.log("ERRO AO LOGAR ", error);
      setLoadingAuth(false);
    }
  }

  async function updateUser(newUser:{
    nomeCompleto: string;
    cpf: string;
    telefoneCelular: string;
    telefoneFixo: string;
    latitude: string;
    longitude: string;
  }) {
    try{
      const response = await api.put(`pessoas/${user.id}`, newUser, {
        headers: { Authorization: api.defaults.headers['Authorization'] }
      });

      setUser({
        id: user.id,
        nomeCompleto: newUser.nomeCompleto,
        cpf: newUser.cpf,
        telefoneCelular: newUser.telefoneCelular,
        telefoneFixo: newUser.telefoneFixo,
        latitude: newUser.latitude,
        longitude: newUser.longitude,
      });

      return response;
    }catch(error){
      console.log("ERRO AO LOGAR ", error);
      if (error.response) {
        console.log("Dados do erro: ", error.response.data.errors.body);
      }

      return error;
    }
  };

  async function signOut(){
    await AsyncStorage.clear()
    .then(() => {
      setUser(null);
    })
  }

  return(
    <AuthContext.Provider value={{ signed: !!user, user, signUp, signIn, signOut, updateUser, loadingAuth, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;

