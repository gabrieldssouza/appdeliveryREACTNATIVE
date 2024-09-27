import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import '../styles/global.css'
import Buscar from './buscar';
import Index from './index';
import Perfil from './perfil';
import Login from './login';
import Register from './register';


type AuthScreenNavigationProp = StackNavigationProp<any, any>;

type AuthScreenProps = {
  navigation: AuthScreenNavigationProp;
};


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function RootLayout() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" component={AuthScreen} />
      <Stack.Screen name="buscar" component={HomeTabs} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="register" component={Register} />
    </Stack.Navigator>
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
          tabBarActiveTintColor: '#ff0000',
          tabBarInactiveTintColor: '#ff0000', 
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
          tabBarActiveTintColor: '#ff0000', 
          tabBarInactiveTintColor: '#ff0000', 
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
          tabBarActiveTintColor: '#ff0000', 
          tabBarInactiveTintColor: '#ff0000', 
        }}
      />
    </Tab.Navigator>
  );
}

  function AuthScreen({ navigation }: AuthScreenProps) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} >
      <Text style={{fontSize: 30, fontWeight: 'bold', color: '#757575'}}>CIMOL</Text>
      <Text style={{fontSize: 30, marginBottom: 20, fontWeight: 'bold', color: '#ff0000'}}>FOODS</Text>
      <TouchableOpacity style={{width: '80%'}} onPress={() => navigation.navigate('login')}>
        <Text style={{backgroundColor: 'red', padding: 10, color: 'white', borderRadius: 10, textAlign: 'center', fontSize: 18}}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{width: '80%', marginTop: 5}} onPress={() => navigation.navigate('register')}>
        <Text style={{backgroundColor: 'red', padding: 10, color: 'white', borderRadius: 10, textAlign: 'center', fontSize: 18}}>Registro</Text>
      </TouchableOpacity>
    </View>
  );
}

export default RootLayout;