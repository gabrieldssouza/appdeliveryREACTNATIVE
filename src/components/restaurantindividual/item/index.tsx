import { View, Pressable, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../types/router';
import { Props } from '..';

type RestaurantScreenNavigationProp = StackNavigationProp<RootStackParamList, 'restaurant'>;

export default function RestaurantItem({ item }: { item: Props }) {
  const navigation = useNavigation<RestaurantScreenNavigationProp>();

  const handlePress = () => {
    navigation.navigate('restaurant', { restaurant: item });
  };

  return (
    <View>
      <Pressable className='flex flex-row items-center justify-start gap-2' onPress={handlePress}>
        <Image 
          source={{ uri: item.image }}
          className='w-20 h-20 rounded-xl'
        />
        <View className='flex gap-2'>
          <Text className='text-base text-black leading-4 font-bold' numberOfLines={2}>{item.name}</Text>
          <View className='flex-row items-center gap-1'>
            <Ionicons name='star' size={14} color='#ca8a04' />
            <Text className='text-sm'>{item.rating}</Text>
          </View>
        </View>
      </Pressable>
      <View className='mt-4 w-full h-0.5 bg-slate-400' />
    </View>
  );
}