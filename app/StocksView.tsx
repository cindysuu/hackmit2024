import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function StocksView() {
  const navigation = useNavigation();

  const navigateToDetailView = (stockName: string) => {
    navigation.navigate('StockDetailView', { stockName });
  };

  return (
    <View style={{ flex: 1, padding: 60 }}>
      <ScrollView>
        {stocks.map((stock, index) => (
            <TouchableOpacity 
            key={index} 
            style={[styles.row, { paddingVertical: 100 }]} 
            onPress={() => {
              console.log(`Navigating to details of ${stock.name}`);
              navigateToDetailView(stock.name);
            }}
            >
            <Text style={styles.label}>{stock.name}</Text>
            <View style={styles.plot}>
              <Text>Fake Plot</Text>
            </View>
            <Text style={styles.price}>{stock.price}</Text>
            </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
const stocks = [
  { name: 'Disney', price: '$100' },
  { name: 'Hello Kitty', price: '$200' },
  { name: 'Nintendo', price: '$50' },
];

const styles = StyleSheet.create({
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    flex: 1,
    fontSize: 18,
  },
  plot: {
    flex: 2,
    alignItems: 'center',
  },
  price: {
    flex: 1,
    fontSize: 18,
    textAlign: 'right',
  },
});