import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, FlatList, TextInput } from "react-native";
import Constants from "expo-constants";
import Header from "../components/header";
import Banner from "../components/banner";
import Search from "../components/search";
import Section from "../components/section";
import Card from "../components/trending/food";
import { Props as FoodProps } from "../components/trending";
import { Feather } from '@expo/vector-icons';

const statusBarHeight = Constants.statusBarHeight;

export default function Buscar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [foods, setFoods] = useState<FoodProps[]>([]);
  const [filteredFoods, setFilteredFoods] = useState<FoodProps[]>([]);

  useEffect(() => {
    async function fetchFoods() {
      const response = await fetch('https://apifakedelivery.vercel.app/foods');
      const data = await response.json();
      setFoods(data);
      setFilteredFoods(data);
    }

    fetchFoods();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = foods.filter(food =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFoods(filtered);
    } else {
      setFilteredFoods(foods);
    }
  }, [searchTerm, foods]);

  return (
    <ScrollView style={{ flex: 1 }} className="bg-slate-200" showsVerticalScrollIndicator={false}>
      <View className="w-full px-4" style={{ marginTop: statusBarHeight + 8 }}>
        <Header />
        <View className='w-full flex-row border h-14 rounded-full items-center gap-2 px-4 bg-transparent'>
          <Feather name="search" size={24} color="#64748b" />
          <TextInput
            placeholder='Buscar comidas'
            className='w-full h-full flex-1 bg-transparent'
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>
      </View>
      <Section name="Resultados da Busca" label="" action={() => {}} size="text-2xl" />
      <FlatList
        data={filteredFoods}
        renderItem={({ item }) => <Card food={item} />}
        horizontal={true}
        contentContainerStyle={{ gap: 16, paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </ScrollView>
  );
}