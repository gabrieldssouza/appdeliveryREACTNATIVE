import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  home: undefined;
  login: undefined;
  register: undefined;
  buscar: undefined;
  index: undefined;
  perfil: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'login'>;

interface User {
  email: string;
  senha: string;
}

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async () => {
    const response = await fetch('https://apifakedelivery.vercel.app/users');
    const users: User[] = await response.json();

    const user = users.find((user: User) => user.email === username && user.senha === password);
    if (user) {
      navigation.navigate('buscar'); 
    } else {
      alert('Login falhou');
    }
  };

  return (
    <View style={{flex: 1}} className='flex items-center justify-center px-10'>
      <TextInput style={{borderWidth: 1, paddingHorizontal: 10, borderRadius: 5}} className='w-full h-11' placeholder="Email" value={username} onChangeText={setUsername} />
      <TextInput style={{borderWidth: 1, paddingHorizontal: 10, borderRadius: 5}} className='w-full h-11 mt-3'placeholder="Senhal" value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={{width: '100%'}} onPress={handleLogin}>
        <Text style={{textAlign: 'center', borderRadius: 5}} className='bg-red-600 color-white mt-3 p-3'>Login</Text>
      </TouchableOpacity>
    </View>
  );
}