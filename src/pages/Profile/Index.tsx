import React, { useState, useContext, useEffect } from 'react';
import { TextInput } from 'react-native';

import { AuthContext } from '../../contexts/auth';

import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { styles } from './Styles';
import WidgetMap from './WidgetMap/Index';

export default function ProfileScreen(){
  const { user } = useContext(AuthContext);

  const [nomeCompleto, setNome] = useState(user.nomeCompleto);
  const [primeiroNome, setPrimeiroNome] = useState();
  const [cpf, setCPF] = useState(user.cpf);
  const [telefoneCelular, setCelular] = useState(user.telefoneCelular);
  const [telefoneFixo, setFixo] = useState(user.telefoneFixo);

  useEffect(() => {
    setPrimeiroNome(user.nomeCompleto.split(" ")[0])
  }, []);

  function handleLogin(){
    //signIn(email, password);
  }

  return(
    <View style={styles.container}>
      <Animatable.View
        animation="fadeInLeft"
        delay={500}
        style={styles.containerHeader}
      >
        <Text style={styles.message}>Bem vindo(a) {primeiroNome}</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Nome Completo</Text>
        <TextInput
          placeholder='Digite seu nome...'
          style={styles.input}
          value={nomeCompleto}
          onChangeText={ (text) => setNome(text) }
        />

        <Text style={styles.title}>CPF</Text>
        <TextInput
          placeholder='Digite seu CPF...'
          style={styles.input}
          value={cpf}
          onChangeText={ (text) => setCPF(text) }
        />

        <Text style={styles.title}>Telefone Celular</Text>
        <TextInput
          placeholder='Digite seu número...'
          style={styles.input}
          value={telefoneCelular}
          onChangeText={ (text) => setCelular(text) }
        />

        <Text style={styles.title}>Telefone Fixo</Text>
        <TextInput
          placeholder='Digite seu número...'
          style={styles.input}
          value={telefoneFixo}
          onChangeText={ (text) => setFixo(text) }
        />

        <WidgetMap
          latitude={user.latitude}
          longitude={user.longitude}
        />

        <TouchableOpacity style={styles.button}
          onPress={() => handleLogin()}
        >
          <Text style={styles.buttonText}>Atualizar Cadastro</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  )
}


