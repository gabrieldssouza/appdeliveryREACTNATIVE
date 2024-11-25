import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from 'expo-router';
import { useCart } from '../context/CartContext';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const OrderScreen: React.FC = () => {
  const navigation = useNavigation();
  const { getTotalDeliveryTime } = useCart();
  const [estimatedTime, setEstimatedTime] = useState('');

  useEffect(() => {
    const deliveryTime = getTotalDeliveryTime();
    const currentTime = new Date();
    currentTime.setMinutes(currentTime.getMinutes() + deliveryTime);
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    setEstimatedTime(`${hours}:${minutes}`);
  }, [getTotalDeliveryTime]);

  return (
    <View style={styles.container}>
      <Ionicons 
        name="chevron-back" 
        size={32} 
        color="white" 
        style={styles.backIcon} 
        onPress={() => navigation.navigate('home')} 
      />
      <View style={styles.card}>
        <Text style={styles.title}>Pedido Confirmado!</Text>
        <Text style={styles.subtitle}>Obrigado por comprar conosco.</Text>
        <View style={styles.estimatedTimeContainer}>
          <Text style={styles.estimatedTimeText}>Tempo estimado de chegada:</Text>
          <Text style={styles.time}>{estimatedTime}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bd3838',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 5,
    borderRadius: 50,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: width * 0.85,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#bd3838',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  estimatedTimeContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  estimatedTimeText: {
    fontSize: 18,
    color: '#333',
  },
  time: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#bd3838',
    marginTop: 5,
  },
});

export default OrderScreen;
