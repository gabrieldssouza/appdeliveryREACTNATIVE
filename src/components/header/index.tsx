import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { useCart } from '../../context/CartContext';

export default function Header() {
  const { cartCount } = useCart();
  const navigation = useNavigation<any>();

  return (
    <View className='w-full flex flex-row items-center justify-between'>
      <View className='w-10 h-10 rounded- flex justify-center items-center'></View>
      <View className='flex flex-col items-center justify-center'>
        <View className='flex-row items-center justify-center gap-1'>
          <Text className='text-lg font-bold'>Taquara, RS</Text>
          <Feather name="chevron-down" size={14} color="#bd3838" />
        </View>
      </View>
      <Pressable className='w-10 h-10 flex justify-center items-center' onPress={() => navigation.navigate('cart')}>
        <Feather name="shopping-cart" size={20} color="#bd3838" />
        {cartCount > 0 && (
          <View style={{ position: 'absolute', top: -5, right: -5, backgroundColor: 'red', borderRadius: 10, padding: 2 }}>
            <Text style={{ color: 'white', fontSize: 12 }}>{cartCount}</Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}