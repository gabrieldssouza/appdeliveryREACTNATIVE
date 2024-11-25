import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Pressable, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';

const CheckoutScreen: React.FC = () => {
  const navigation = useNavigation() as StackNavigationProp<any>;
  const { cart, totalPrice, address, setAddress } = useCart();
  const [modalVisible, setModalVisible] = useState(false);
  const [newLocation, setNewLocation] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Cartão de Crédito', value: 'creditCard' },
    { label: 'Cartão de Débito', value: 'debitCard' },
    { label: 'Dinheiro', value: 'cash' },
  ]);

  const handleLocationChange = () => {
    setAddress(newLocation);
    setModalVisible(false);
  };

  const handlePurchase = () => {
    navigation.navigate('order');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Revisar Pedido</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Endereço:</Text>
        <View style={{flexDirection: 'row'}}>
        <Text style={styles.addressText}>{address}</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.changeButton}>
          <Text style={styles.changeText}>Trocar</Text>
        </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        {cart.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Text style={styles.cartItemText}>
              {item.name} - R$ {item.price} x {item.quantity}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Forma de Pagamento:</Text>
        <DropDownPicker
          open={open}
          value={paymentMethod}
          items={items}
          setOpen={setOpen}
          setValue={setPaymentMethod}
          setItems={setItems}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          textStyle={styles.dropdownText}
        />
      </View>

      {/* Botão de Comprar fixado na parte inferior */}
      <View style={styles.purchaseButtonContainer}>
        <TouchableOpacity onPress={handlePurchase} style={styles.purchaseButton}>
          <Text style={styles.purchaseButtonText}>Comprar - R$ {totalPrice.toFixed(2)}</Text>
        </TouchableOpacity>
      </View>

      {/* Modal para trocar a localização */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="black" />
            </Pressable>
            <Text style={styles.modalTitle}>Mudar Localização</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Digite a nova localização"
              value={newLocation}
              onChangeText={setNewLocation}
            />
            <TouchableOpacity onPress={handleLocationChange} style={styles.modalConfirmButton}>
              <Text style={styles.modalConfirmButtonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    textAlign: 'center',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 16,
    color: '#333',
  },
  section: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  addressText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  changeButton: {
    alignSelf: 'flex-start',
    left: 8,
  },
  changeText: {
    fontSize: 16,
    color: '#bd3838',
    fontWeight: 'bold',
  },
  cartItem: {
    marginVertical: 4,
  },
  cartItemText: {
    fontSize: 16,
    color: '#555',
  },
  dropdown: {
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  dropdownContainer: {
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  purchaseButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 15,
    width: '100%',
    paddingHorizontal: 16,
  },
  purchaseButton: {
    backgroundColor: '#bd3838',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  purchaseButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: Dimensions.get('window').width * 0.9,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    elevation: 5,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
  },
  modalConfirmButton: {
    backgroundColor: '#bd3838',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalConfirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CheckoutScreen;
