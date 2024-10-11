import React from 'react';
import { View, Pressable, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../types/router';

type FoodScreenNavigationProp = StackNavigationProp<RootStackParamList, 'food'>;

interface FoodProps {
  image: string;
  rating: number;
  price: number;
  name: string;
  time: string;
  delivery: number;
  description: string;
  restaurantId: string;
}

interface CardProps {
  food: FoodProps;
}

function Card({ food }: CardProps) {
  const navigation = useNavigation<FoodScreenNavigationProp>();

  const handlePress = () => {
    navigation.navigate('food', { food });
  };

  return (
    <Pressable onPress={handlePress} className='bg-neutral-200 flex flex-col rounded-xl relative'>
      <Image source={{ uri: food.image }} className='w-44 h-36 rounded-t-xl' />

      <View className='flex flex-row bg-neutral-900/90 w-fit gap-1 rounded-full absolute top-2 right-2 px-2 py-1 items-center justify-center'>
        <Ionicons name='star' size={14} color="#ca8a04" />
        <Text className='text-white text-sm'>{food.rating}</Text>
      </View>

      <View className='px-2 py-2'>
        <Text className='text-green-700 font-medium text-lg'>R$ {food.price}</Text>
        <Text className='text-black mt-1'>{food.name}</Text>
        <Text className='text-neutral-600 text-sm'>{food.time} - R$ {food.delivery}</Text>
      </View>
    </Pressable>
  );
}

export default Card;