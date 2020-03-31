import React from 'react';
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import logo from '../../assets/logo.png';

import styles from './styles';

export default function Cases() {
  const navigation = useNavigation();

  function navigateToDetail() {
    navigation.navigate('Detail');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>5 causas</Text>
        </Text>
      </View>

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>Escolha uma causa e salve o dia.</Text>
    
      <FlatList 
         data={[1, 2, 3, 4, 5]}
         style={styles.causeList}
         keyExtractor={cause => String(cause)}
         showsVerticalScrollIndicator={false}
         renderItem={() => (
          <View style={styles.cause}>
            <Text style={styles.causeProperty}>ONG:</Text>
            <Text style={styles.causeValue}>APAD</Text>

            <Text style={styles.causeProperty}>CAUSA:</Text>
            <Text style={styles.causeValue}>Cachorrinho abandonado</Text>

            <Text style={styles.causeProperty}>VALOR</Text>
            <Text style={styles.causeValue}>R$ 120,00</Text>

            <TouchableOpacity style={styles.detailsButton}
                              onPress={navigateToDetail}
                              >

              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#E02041" />
            </TouchableOpacity>
          </View>
         )}
      />

    </View>
  );
}
