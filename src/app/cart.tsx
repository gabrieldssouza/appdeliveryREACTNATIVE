import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useCart } from '../context/CartContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FoodItem } from '../../types/router';

const CartScreen: React.FC = () => {
  const { cart, increaseQuantity, decreaseQuantity, totalPrice } = useCart();
  const navigation = useNavigation();

  const renderItem = ({ item }: { item: FoodItem }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <View style={styles.dados}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>R$ {item.price}</Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.quantityButton}>
            <Ionicons name="remove-outline" size={20} color="black" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.quantityButton}>
            <Ionicons name="add-outline" size={20} color="#bd3838" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={32} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Carrinho</Text>
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>O carrinho está vazio</Text>}
      />
      <View style={styles.footer}>
        <Text style={styles.totalPrice}>Total: R$ {totalPrice.toFixed(2)}</Text>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Comprar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemImage: {
    width: 65,
    height: 65,
    borderRadius: 8,
  },
  itemDetails: {
    marginLeft: 16,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dados: {
    flexDirection: 'column',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 8,
    flex: 1,
  },
  quantityButton: {
    padding: 10,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 8,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: 'white',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buyButton: {
    backgroundColor: '#bd3838',
    padding: 10,
    borderRadius: 8,
  },
  buyButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default CartScreen;