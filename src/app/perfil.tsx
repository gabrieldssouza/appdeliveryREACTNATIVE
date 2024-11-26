import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/header";
import { useNavigation } from 'expo-router';
import { StackNavigationProp } from '@react-navigation/stack';
import {Ionicons} from '@expo/vector-icons';

const statusBarHeight = Constants.statusBarHeight;
const { width } = Dimensions.get("window");

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
    <ScrollView style={{ flex: 1, backgroundColor: '#f8f9fa' }} showsVerticalScrollIndicator={false}>
      <View style={[styles.container, { marginTop: statusBarHeight + 8 }]}>
        <Header />
        <View style={styles.userInfoContainer}>
          {user ? (
        <View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userBalance}>R$ {user.saldo}</Text>
        </View>
          ) : (
        <Text style={styles.loadingText}>Carregando...</Text>
          )}
        </View>

        <View>
          <TouchableOpacity style={styles.menuOption}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="mail-outline" size={24} color="#333" />
          <Text style={styles.menuOptionText}> Mensagens</Text>
        </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuOption}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="notifications-outline" size={24} color="#333" />
          <Text style={styles.menuOptionText}> Notificações</Text>
        </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuOption}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="settings-outline" size={24} color="#333" />
          <Text style={styles.menuOptionText}> Configurações</Text>
        </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleRemoveAccount}>
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    width: '100%',
  },
  userInfoContainer: {
    marginTop: 16,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  userBalance: {
    fontSize: 20,
    color: '#555',
    marginTop: 8,
  },
  loadingText: {
    fontSize: 18,
    color: '#888',
  },
  menuOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuOptionText: {
    fontSize: 18,
    color: '#333',
  },
  logoutButton: {
    marginTop: 10,
    width: width * 0.9,
    alignSelf: 'center',
  },
  logoutText: {
    color: '#bd3838',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
