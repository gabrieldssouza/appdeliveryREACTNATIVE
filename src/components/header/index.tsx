import {View, Pressable, Text} from 'react-native';
import {Ionicons, Feather} from '@expo/vector-icons';

export default function Header() {
  return (
    <View className='w-full flex flex-row items-center justify-between'>
        <View className='w-10 h-10 rounded- flex justify-center items-center'></View>

        <View className='flex flex-col items-center justify-center'>
          <View className='flex-row items-center justify-center gap-1'>
            <Text className='text-lg font-bold'>Taquara, RS</Text>
            <Feather name="chevron-down" size={14} color="#FF0000" />
          </View>
        </View>

        <Pressable className='w-10 h-10 flex justify-center items-center'>
            <Feather name="bell" size={20} color="#FF0000" />
        </Pressable>
    </View>
  );
}
