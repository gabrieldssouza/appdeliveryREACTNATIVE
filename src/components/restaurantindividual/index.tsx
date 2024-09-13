import { View } from 'react-native';
import {useState, useEffect} from 'react';
import RestaurantItem from './item';

export interface Props{
    id: string;
    name: string;
    image: string;
}

export default function Restaurantindividual() {
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
    <View className='px-4 flex-1 w-full h-full mb-11 gap-4'>
        {restaurants.map (item => (
            <RestaurantItem item={item} key={item.id} />
        ))}
    </View>
  );
}