import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/header";
import { useNavigation } from 'expo-router';
import { StackNavigationProp } from '@react-navigation/stack';

const statusBarHeight = Constants.statusBarHeight;
export default function Perfil() {
  

  interface User {
    name: string;
    saldo: number;
  }

  type RootStackParamList = {
    home: undefined;
    login: undefined;
    register: undefined;
    buscar: undefined;
    index: undefined;
    perfil: undefined;
  };
  
  type PerfilScreenNavigationProp = StackNavigationProp<RootStackParamList, 'perfil'>;

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
        console.log(user);
      }
    };

    fetchUser();
  }, []);

  const navigation = useNavigation<PerfilScreenNavigationProp>();

  const handleRemoveAccount = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
    navigation.navigate('login');
  };

  return (
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      <View className="w-full px-4" style={{marginTop: statusBarHeight + 8}}>
        <Header/>
        <View className="mt-4">
          {user ? (
            <View>
              <Text className="text-xl font-bold">{user.name}</Text>
              <Text className="text-xl text-gray-500">R$ {user.saldo}</Text>
            </View>
          ) : (
            <Text>Carregando...</Text>
          )}
        </View>
        <TouchableOpacity onPress={handleRemoveAccount}>
          <Text className="text-red-500">Sair da conta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}