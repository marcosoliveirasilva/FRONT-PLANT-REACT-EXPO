import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';
import {
  Alert,
  TextInput,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import {
  onlyNumbers,
  validateCelular,
  validateCPF,
  validateNome,
  validateTelefone
} from '../../Services/fieldValidator';
import { AuthContext } from '../../contexts/auth';
import WidgetMap from './WidgetMap/Index';
import { styles } from './Styles';

export default function ProfileScreen(){
  const { user, updateUser } = useContext(AuthContext);

  const [nomeCompleto, setNome] = useState(user.nomeCompleto);
  const [primeiroNome, setPrimeiroNome] = useState();
  const [cpf, setCPF] = useState(user.cpf);
  const [telefoneCelular, setCelular] = useState(user.telefoneCelular);
  const [telefoneFixo, setFixo] = useState(user.telefoneFixo);
  const [locationCoords, setLocationCoords] = useState({
    'latitude': parseFloat(user.latitude),
    'longitude': parseFloat(user.longitude)
  });

  useFocusEffect(
    useCallback(() => {
      setNome(user.nomeCompleto);
      setCPF(user.cpf);
      setCelular(user.telefoneCelular);
      setFixo(user.telefoneFixo);
    }, [])
  );

  const handleNewLocation = (newLocationCoords: React.SetStateAction<{}>) => {
    setLocationCoords({
      latitude: adjustDecimalPlaces(newLocationCoords.latitude, 6),
      longitude: adjustDecimalPlaces(newLocationCoords.longitude, 6)
    });
  };

  const adjustDecimalPlaces = (nr: number, casas: number) => {
    const og = Math.pow(10, casas)
    return Math.trunc(nr * og) / og;
  }

  useEffect(() => {
    setPrimeiroNome(user.nomeCompleto.split(" ")[0])
  }, []);

  const handleUpdate = useCallback(() => {
    if (!validateNome(nomeCompleto)) {
      Alert.alert("Erro", "Por favor, insira um nome que contenha, no mínimo, cinco caracteres.");
      return;
    }
    if (!validateCPF(cpf)) {
      Alert.alert("Erro", "Por favor, insira um CPF válido no formato xxx.xxx.xxx-xx.");
      return;
    }
    if (!validateCelular(telefoneCelular)) {
      Alert.alert("Erro", "Por favor, insira um número de telefone celular válido no formato (xx) xxxxx-xxxx");
      return;
    }
    if (!validateTelefone(telefoneFixo)) {
      Alert.alert("Erro", "Por favor, insira um número de telefone celular válido no formato (xx) xxxx-xxxx");
      return;
    }

    Alert.alert(
      "Confirmar Atualizar",
      "Você tem certeza que deseja atualizar os dados de cadastro?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Sim",
          onPress: async () => {
            try {
              let response = await updateUser({
                "nomeCompleto": nomeCompleto,
                "cpf": onlyNumbers(cpf),
                "telefoneCelular": onlyNumbers(telefoneCelular),
                "telefoneFixo": onlyNumbers(telefoneFixo),
                "latitude": String(locationCoords.latitude),
                "longitude": String(locationCoords.longitude)
              });

              if (response.status) {
                setPrimeiroNome(nomeCompleto.split(" ")[0]);
                alert("Cadastro atualizado com sucesso!");
              } else {
                Alert.alert("Erro", "Não foi possível atualizar os dados. Por favor, tente novamente.");
              }
            } catch (error) {
              Alert.alert("Erro", "Não foi possível atualizar os dados. Por favor, tente novamente.");
            }
          }
        }
      ],
      { cancelable: false }
    );
  }, [nomeCompleto, cpf, telefoneCelular, telefoneFixo, locationCoords, updateUser]);

  return(
    <View style={styles.container}>
      <Animatable.View
        animation="fadeInLeft"
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
        <TextInputMask
          type={'cpf'}
          placeholder='Digite seu CPF...'
          style={styles.input}
          value={cpf}
          onChangeText={ (text) => setCPF(text) }
        />

        <Text style={styles.title}>Telefone Celular</Text>
        <TextInputMask
          type={'cel-phone'}
          options={{
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99) '
          }}
          placeholder='Digite seu número...'
          style={styles.input}
          value={telefoneCelular}
          onChangeText={ (text) => setCelular(text) }
        />

        <Text style={styles.title}>Telefone Fixo</Text>
        <TextInputMask
          type={'cel-phone'}
          options={{
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99) '
          }}
          placeholder='Digite seu número...'
          style={styles.input}
          value={telefoneFixo}
          onChangeText={ (text) => setFixo(text) }
        />

        <WidgetMap
          latitude={user.latitude}
          longitude={user.longitude}
          onNewLocation={handleNewLocation}
        />

        <TouchableOpacity style={styles.button}
          onPress={() => handleUpdate()}
        >
          <Text style={styles.buttonText}>Atualizar Cadastro</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  )
}
