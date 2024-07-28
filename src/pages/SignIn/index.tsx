import React, { useState, useContext, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Alert, TextInput } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

import { validateEmail } from '../../Services/fieldValidator';
import { AuthContext } from '../../contexts/auth';
import { styles } from './styles';

export default function SignIn(){
  const navigation = useNavigation();
  const { signIn, loadingAuth } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = useCallback(() => {
    if (!validateEmail(email)) {
      Alert.alert("Erro", "Por favor, insira um e-mail com formato válido.");
      return;
    }

    signIn(email, password);
  }, [email, password]);

  return(
    <View style={styles.container}>
      <Animatable.View
        animation="fadeInLeft"
        delay={500}
        style={styles.containerHeader}
      >
        <Text style={styles.message}>Bem vindo(a)</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Email</Text>
        <TextInput
          placeholder='Digite um email...'
          style={styles.input}
          value={email}
          onChangeText={ (text) => setEmail(text) }
        />

        <Text style={styles.title}>Senha</Text>
        <TextInput
          placeholder='Sua senha'
          style={styles.input}
          secureTextEntry={true}
          value={password}
          onChangeText={ (text) => setPassword(text) }
        />

        <TouchableOpacity style={styles.button}
          onPress={() => handleLogin()}
        >
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRegister}>
          <Text style={styles.registerText}>Não possui uma conta? Cadastre-se</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  )
}
