import { View, Text, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import RestaurantItem from './horizontal';

export interface Props{
    id: string;
    name: string;
    image: string;
}

export default function Restaurants() {
    const [restaurants, setRestaurants] = useState<Props[]>([]);

    useEffect(() => {
        async function getFoods() {
            try {
                const response = await fetch('https://apifakedelivery.vercel.app//restaurants');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setRestaurants(data);
            } catch (error) {
                console.error('Failed to fetch restaurants:', error);
            }
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