import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList, FoodProps, RestaurantProps } from '../../types/router';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';

type RestaurantScreenRouteProp = RouteProp<RootStackParamList, 'restaurant'>;
type RestaurantScreenNavigationProp = StackNavigationProp<RootStackParamList, 'restaurant'>;

const RestaurantScreen: React.FC = () => {
  const route = useRoute<RestaurantScreenRouteProp>();
  const navigation = useNavigation<RestaurantScreenNavigationProp>();
  const { restaurant } = route.params;
  const [foods, setFoods] = useState<FoodProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFoods() {
      try {
        const response = await fetch('https://apifakedelivery.vercel.app/foods');
        const data = await response.json();
        const filteredFoods = data.filter((food: FoodProps) => food.restaurantId === restaurant.id);
        setFoods(filteredFoods);
      } catch (error) {
        console.error('Failed to fetch foods:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchFoods();
  }, [restaurant.id]);

  const handleFoodPress = (food: FoodProps) => {
    navigation.navigate('food', { food });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={32} color="black" />
      </TouchableOpacity>
      <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} />
      <Text style={styles.restaurantName}>{restaurant.name}</Text>
      <Text style={styles.restaurantRating}>Rating: {restaurant.rating}</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={foods}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleFoodPress(item)} style={styles.foodItem}>
              <Image source={{ uri: item.image }} style={styles.foodImage} />
              <View style={styles.foodDetails}>
                <Text style={styles.foodName}>{item.name}</Text>
                <Text style={styles.foodPrice}>R$ {item.price}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
  },
  restaurantImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  restaurantRating: {
    fontSize: 18,
    color: 'gray',
  },
  foodItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  foodImage: {
    width: 65,
    height: 65,
    borderRadius: 8,
  },
  foodDetails: {
    marginLeft: 16,
    flex: 1,
  },
  foodName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  foodPrice: {
    fontSize: 16,
    color: 'green',
  },
});

export default RestaurantScreen;