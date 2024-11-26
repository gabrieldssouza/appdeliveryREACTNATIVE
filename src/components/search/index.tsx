import { View, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface SearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function Search({ searchTerm, setSearchTerm }: SearchProps) {
  return (
    <View className='w-full flex-row border h-14 rounded-full items-center gap-2 px-4 bg-transparent'>
      <Feather name="search" size={24} color="#64748b" />
      <TextInput
        placeholder='Buscar comidas'
        className='w-full h-full flex-1 bg-transparent'
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
    </View>
  );
}