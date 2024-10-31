import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { CartProvider } from '../context/CartContext';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import '../styles/global.css';
import Buscar from './buscar';
import Index from './index';
import Perfil from './perfil';
import Login from './login';
import Register from './register';
import FoodScreen from './food';
import CartScreen from './cart';

type AuthScreenNavigationProp = StackNavigationProp<any, any>;

type AuthScreenProps = {
  navigation: AuthScreenNavigationProp;
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function RootLayout() {
  const [isUserChecked, setIsUserChecked] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();

        const user = await AsyncStorage.getItem('user');
        console.log(user);
        if (user) {
          setIsUserLoggedIn(true);
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setIsUserChecked(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  const handleLoginSuccess = () => {
    setIsUserLoggedIn(true);
  };

  if (!isUserChecked) {
    return null;
  }

  return (
    <CartProvider>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isUserLoggedIn ? (
        <Stack.Screen name="buscar" component={HomeTabs} />
      ) : (
        <Stack.Screen name="index">
          {props => <AuthScreen {...props} onLoginSuccess={handleLoginSuccess} />}
        </Stack.Screen>
      )}
      <Stack.Screen name="login">
        {props => <Login {...props} onLoginSuccess={handleLoginSuccess} />}
      </Stack.Screen>
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen 
        name="food" 
        component={FoodScreen} 
        options={{ presentation: 'modal' }} 
      />
      <Stack.Screen 
            name="cart" 
            component={CartScreen} 
            options={{ presentation: 'modal' }} 
      />
    </Stack.Navigator>
    </CartProvider>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="home" 
        component={Index} 
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons 
              name={focused ? "home" : "home-outline"} 
              color={color} 
              size={size} 
            />
          ),
          tabBarLabel: () => null,
          tabBarActiveTintColor: '#bd3838',
          tabBarInactiveTintColor: '#bd3838', 
        }}
      />
      <Tab.Screen 
        name="buscar" 
        component={Buscar} 
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons 
              name={focused ? "search" : "search-outline"} 
              color={color} 
              size={size} 
            />
          ),
          tabBarLabel: () => null,
          tabBarActiveTintColor: '#bd3838', 
          tabBarInactiveTintColor: '#bd3838', 
        }}
      />
      <Tab.Screen 
        name="perfil" 
        component={Perfil} 
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons 
              name={focused ? "person-circle" : "person-circle-outline"} 
              color={color} 
              size={size} 
            />
          ),
          tabBarLabel: () => null,
          tabBarActiveTintColor: '#bd3838', 
          tabBarInactiveTintColor: '#bd3838', 
        }}
      />
    </Tab.Navigator>
  );
}

function AuthScreen({ navigation, onLoginSuccess }: AuthScreenProps & { onLoginSuccess: () => void }) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} >
      <Image source={require('../assets/foodvermelho.png')} style={{width: 200, height: 150}} resizeMode="contain" />
      <TouchableOpacity style={{width: '80%'}} onPress={() => navigation.navigate('login')}>
        <Text style={{backgroundColor: '#bd3838', padding: 10, color: 'white', borderRadius: 10, textAlign: 'center', fontSize: 18}}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{width: '80%', marginTop: 5}} onPress={() => navigation.navigate('register')}>
        <Text style={{backgroundColor: '#bd3838', padding: 10, color: 'white', borderRadius: 10, textAlign: 'center', fontSize: 18}}>Registro</Text>
      </TouchableOpacity>
    </View>
  );
}

export default RootLayout;