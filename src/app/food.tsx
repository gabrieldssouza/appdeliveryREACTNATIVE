import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList, RestaurantProps } from '../../types/router';
import { Ionicons } from '@expo/vector-icons';

type FoodScreenRouteProp = RouteProp<RootStackParamList, 'food'>;

const FoodScreen: React.FC = () => {
  const route = useRoute<FoodScreenRouteProp>();
  const navigation = useNavigation();
  const { food } = route.params;
  const [restaurant, setRestaurant] = useState<RestaurantProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRestaurant() {
      try {
        const response = await fetch(`https://apifakedelivery.vercel.app/restaurants/${food.restaurantId}`);
        const data = await response.json();
        setRestaurant(data);
      } catch (error) {
        console.error('Failed to fetch restaurant:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRestaurant();
  }, [food.restaurantId]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 16, left: 16, zIndex: 1 }}>
        <Ionicons name="chevron-back" size={32} color="white" />
      </TouchableOpacity>
      <Image source={{ uri: food.image }} style={{ width: '100%', height: 250 }} />
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{food.name}</Text>
        <Text className='mt-2' style={{ fontSize: 18 }}>{food.description}</Text>
        <View className='mt-2 flex flex-row items-center justify-between'>
            <Text style={{ fontSize: 18, color: 'green' }}>R$ {food.price}</Text>
            <View className='flex flex-row items-center gap-2'><Ionicons size={15} name="star"></Ionicons><Text style={{ fontSize: 16 }}>{food.rating}</Text></View>
            <Text style={{ fontSize: 16 }}>{food.time} - R$ {food.delivery}</Text>
        </View>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#bd3838" />
      ) : (
        restaurant && (
          <View className='flex flex-row items-center justify-center gap-8' style={{ padding: 5, backgroundColor: '#f8f8f8', borderRadius: 8, margin: 16 }}>
            <Image source={{ uri: restaurant.image }} style={{ width: 50, height: 50, borderRadius: 8, marginVertical: 8 }} />
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{restaurant.name}</Text>
            <View className='flex flex-row items-center gap-2'><Ionicons size={15} name="star"></Ionicons><Text style={{ fontSize: 16 }}>{restaurant.rating}</Text></View>
          </View>
        )
      )}
    </View>
  );
};

export default FoodScreen;