import React, { useState } from 'react';
import { View, Pressable, Text, Modal, TextInput, Button } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { useCart } from '../../context/CartContext';

export default function Header() {
  const { cartCount, address, setAddress } = useCart();
  const navigation = useNavigation<any>();
  const [modalVisible, setModalVisible] = useState(false);
  const [newLocation, setNewLocation] = useState('');

  const handleLocationChange = () => {
    setAddress(newLocation);
    setModalVisible(false);
  };

  return (
    <View className='w-full flex flex-row items-center justify-between'>
      <View className='w-10 h-10 rounded- flex justify-center items-center'></View>
      <View className='flex flex-col items-center justify-center'>
        <Pressable onPress={() => setModalVisible(true)} className='flex-row items-center justify-center gap-1'>
          <Text className='text-lg font-bold'>{address}</Text>
          <Feather name="chevron-down" size={14} color="#bd3838" />
        </Pressable>
      </View>
      <Pressable className='w-10 h-10 flex justify-center items-center' onPress={() => navigation.navigate('cart')}>
        <Feather name="shopping-cart" size={20} color="#bd3838" />
        {cartCount > 0 && (
          <View style={{ position: 'absolute', top: -5, right: -5, backgroundColor: 'red', borderRadius: 10, padding: 2 }}>
            <Text style={{ color: 'white', fontSize: 12 }}>{cartCount}</Text>
          </View>
        )}
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Mudar Localização</Text>
            <TextInput
              style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 10, borderRadius: 5 }}
              placeholder="Digite a nova localização"
              value={newLocation}
              onChangeText={setNewLocation}
            />
            <Button title="Confirmar" onPress={handleLocationChange} />
            <Button title="Cancelar" onPress={() => setModalVisible(false)} color="red" />
          </View>
        </View>
      </Modal>
    </View>
  );
}