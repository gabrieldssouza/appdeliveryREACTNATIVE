import { Text, View, ScrollView } from "react-native";
import Constants from "expo-constants";
import Header from "../components/header";
import Banner from "../components/banner";
import Search from "../components/search";
import Section from "../components/section";
import {Trending} from "../components/trending";
import Restaurants from "../components/restaurants";
import Restaurantindividual from "../components/restaurantindividual";

const statusBarHeight = Constants.statusBarHeight;

export default function Index() {
  return (
    <ScrollView style={{flex: 1}} 
    className="bg-slate-200"
    showsVerticalScrollIndicator={false}
    >
      <View className="w-full px-4" style={{marginTop: statusBarHeight + 8}}>
        <Header/>
        <Banner/>
        <Search/>
      </View>

        <Section 
          name="Comidas Recomendadas"
          label="Ver mais"
          action={() => console.log('Ver mais')}
          size="text-2xl"
        />      

        <Trending/>

        <Section 
          name="Restaurantes Recomendados"
          label="Ver todos"
          action={() => console.log('Ver todos')}
          size="text-xl"
        />     

        <Restaurants/>

        <Section 
          name="Restaurantes "
          label="Ver todos"
          action={() => console.log('Ver todos')}
          size="text-xl"
        />   

        <Restaurantindividual/>
        
    </ScrollView>
  );
}
