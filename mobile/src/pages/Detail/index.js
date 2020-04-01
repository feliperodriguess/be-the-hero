import React from 'react';

import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import * as mailComposer from 'expo-mail-composer';

import logo from '../../assets/logo.png';
import styles from './styles';

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const cause = route.params.cause;
  const message = `Ola ${cause.name}, estou entrando em contato pois gostaria de ajudar na causa do ${cause.title} com o valor de R$${cause.value},00.`;

  function navigateBack(){
    navigation.goBack();
  }

  function sendEmail() {
    mailComposer.composeAsync({
      subject: `Herói do caso: ${cause.title}`,
      recipients: [cause.email],
      body: message,
    })
  }

  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=55${cause.whatsapp}&text=${message}`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#E02041" />
        </TouchableOpacity>
      </View>

      <View style={styles.cause}>
          <Text style={[styles.causeProperty, {marginTop: 0}]}>ONG:</Text>
          <Text style={styles.causeValue}>{cause.name} de {cause.city}/<Text style={styles.ufUpperCase}t>{cause.uf}</Text></Text>

          <Text style={styles.causeProperty}>CAUSA:</Text>
          <Text style={styles.causeValue}>{cause.title}</Text>

          <Text style={styles.causeProperty}>VALOR</Text>
          <Text style={styles.causeValue}>{`R$${cause.value},00`}</Text>
      </View>
      
      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói dessa causa.</Text>
        
        <Text style={styles.heroDescription}>Entre em contato:</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>Whatsapp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendEmail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
