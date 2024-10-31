export interface FoodProps {
  id: string;
  image: string;
  rating: number;
  price: number;
  name: string;
  time: string;
  delivery: number;
  description: string;
  restaurantId: string;
}


export interface FoodItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}


export interface RestaurantProps {
  id: string;
  name: string;
  image: string;
  rating: string;
}

export type RootStackParamList = {
  home: undefined;
  buscar: undefined;
  perfil: undefined;
  login: undefined;
  register: undefined;
  food: { food: FoodProps };
};