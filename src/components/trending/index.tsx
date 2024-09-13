import { FlatList } from 'react-native';
import {useState, useEffect} from 'react';
import Card from './food';

export interface Props{
    id: string;
    name: string;
    price: number;
    time: string;
    delivery: number;
    rating: number;
    image: string;
    restaurantId: string;
}

export function Trending() {
    const[foods, setFoods] = useState<Props[]>([]);

    useEffect(() => {
        async function getFoods(){
            const response = await fetch('http://192.168.1.17:3000/foods');
            const data = await response.json();
            setFoods(data);
        }

        getFoods();
    }, []);
 return (
   <FlatList
    data={foods}
    renderItem={({item}) => <Card food={item} />}
    horizontal={true}
    contentContainerStyle={{gap: 14, paddingHorizontal: 16}}
    showsHorizontalScrollIndicator={false}
   />
  );
}