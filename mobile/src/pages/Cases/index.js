import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import api from '../../services/api';

import logo from '../../assets/logo.png';

import styles from './styles';

export default function Cases() {
  const [cases, setCases ] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  function navigateToDetail(cause) {
    navigation.navigate('Detail', { cause });
  }

  async function loadCases() {
    if (loading) return

    if (total > 0 && cases.lenght === total) return
    
    setLoading(true);

    const response = await api.get('cases', {
      params: { page }
    });

    setCases([...cases, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect( () => {
    loadCases();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} causas</Text>
        </Text>
      </View>

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>Escolha uma causa e salve o dia.</Text>
    
      <FlatList 
         data={cases}
         style={styles.causeList}
         keyExtractor={cause => String(cause.id)}
         onEndReached={loadCases}
         onEndReachedThreshold={0.2}
         renderItem={({ item: cause }) => (
          <View style={styles.cause}>
            <Text style={styles.causeProperty}>ONG:</Text>
            <Text style={styles.causeValue}>{cause.name}</Text>

            <Text style={styles.causeProperty}>CAUSA:</Text>
            <Text style={styles.causeValue}>{cause.title}</Text>

            <Text style={styles.causeProperty}>VALOR</Text>
            <Text style={styles.causeValue}>{`R$${cause.value},00`}
                  </Text>

            <TouchableOpacity style={styles.detailsButton}
                              onPress={() => navigateToDetail(cause)}
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
