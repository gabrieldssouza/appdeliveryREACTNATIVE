import { View, Text, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import RestaurantItem from './horizontal';

export interface Props{
    id: string;
    name: string;
    image: string;
}

export default function Restaurants() {
    const[restaurants, setRestaurants] = useState<Props[]>([]);

    useEffect(() => {
        async function getFoods(){
            const response = await fetch('http://192.168.1.17:3000/restaurants');
            const data = await response.json();
            setRestaurants(data);
        }

        getFoods();
    }, []);

 return (
    <FlatList
    data={restaurants}
    renderItem={({item}) => <RestaurantItem item={item} />}
    horizontal={true}
    contentContainerStyle={{gap: 14, paddingHorizontal: 16}}
    showsHorizontalScrollIndicator={false}
   />
  );
}