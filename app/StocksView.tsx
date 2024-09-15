import React from 'react';
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

export default function StocksView() {
  const navigation = useNavigation();

  const navigateToDetailView = (stockName: string) => {
    navigation.navigate('StockDetailView', { stockName });
  };

  const stocks = [
    { name: 'Disney', price: '$100' },
    { name: 'Hello Kitty', price: '$200' },
    { name: 'Nintendo', price: '$50' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <LottieView
          source={require('../stockview-animation.json')} // Update with the correct path
          autoPlay
          loop
          style={styles.lottieBackground}
        />
        <View style={styles.overlay}>
          <View style={styles.dashboardBox}>
            <Text style={styles.totalWinningsText}>Total Gems</Text>
            <Text style={styles.winningsAmount}>💎 5000</Text>
          </View>

          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>Today's AI Stock Summary:</Text>
            <Text style={styles.summaryText}>
              Today, stock prices for media/entertainment companies are particularly high. This means that your Disney stock is more valuable than usual. It might be a good day to sell some of your stock!
            </Text>
          </View>

          <ScrollView style={styles.scrollView}>
            {stocks.map((stock, index) => (
              <TouchableOpacity
                key={index}
                style={styles.row}
                onPress={() => {
                  console.log(`Navigating to details of ${stock.name}`);
                  navigateToDetailView(stock.name);
                }}
              >
                <View style={styles.stockNameContainer}>
                  <Text style={styles.stockName}>{stock.name}</Text>
                </View>
                <View style={styles.plot}>
                  <Text>📊 Fake Plot</Text>
                </View>
                <View style={styles.stockPriceContainer}>
                  <Text style={styles.stockPrice}>{stock.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  lottieBackground: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  dashboardBox: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  totalWinningsText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 18,
    color: '#333',
  },
  winningsAmount: {
    fontFamily: 'Lato_700Bold',
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  summaryContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#CBC3E3',
    borderRadius: 10,
    borderColor: '#6200ee',
    borderWidth: 1,
  },
  summaryTitle: {
    fontFamily: 'Lato_700Bold',
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  summaryText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 16,
    color: '#555',
  },
  scrollView: {
    flex: 1,
    width: '100%', // Ensure the scroll view takes the full width
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  stockNameContainer: {
    flex: 2, // Controls width of the stock name
  },
  stockName: {
    fontFamily: 'Lato_700Bold',
    fontSize: 18,
    color: '#333',
  },
  plot: {
    flex: 3,
    alignItems: 'center',
  },
  stockPriceContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  stockPrice: {
    fontFamily: 'Lato_700Bold',
    fontSize: 18,
    color: '#6200ee',
  },
});
