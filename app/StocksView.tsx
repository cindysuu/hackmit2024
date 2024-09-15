import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StocksView() {
  const navigation = useNavigation();
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const [contractDismissed, setContractDismissed] = useState(false); // State to track contract dismissal
  const [contractInfo, setContractInfo] = useState(''); // State for contract details

  // Fetch summary (mock)
  const fetchSummary = async () => {
    try {
      const response = await fetch('https://rachllee--news-summary-app-serve-fastapi-app.modal.run/generate-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer hackmit',
        },
        body: JSON.stringify({ query: 'stock market' }),
      });
      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error('Error fetching summary:', error);
      setSummary('Failed to fetch summary.');
    } finally {
      setLoading(false);
    }
  };

  // Load contract dismissal state from AsyncStorage
  useEffect(() => {
    const loadContractState = async () => {
      const isDismissed = await AsyncStorage.getItem('contractDismissed');
      setContractDismissed(isDismissed === 'true');
    };
    loadContractState();
    fetchSummary(); // Fetch summary once on load
  }, []);

  const navigateToDetailView = (stockName) => {
    navigation.navigate('StockDetailView', { stockName });
  };

  const openBond = () => {
    setContractInfo('Not so fast... you agreed to wait 1 week for 20 gems!');
    setModalVisible(true);
  };

  const closeBond = () => {
    setModalVisible(false);
  };

  // Open the contract details and set modal visible
  const openContract = () => {
    setContractInfo('You agreed to sell 10 apples for 1000 gems. Today, apples are worth 800 gems. You earned 1000 - 800 = 200 gems!');
    setModalVisible(true);
  };

  // Close contract and store dismissal state in AsyncStorage
  const closeContract = async () => {
    await AsyncStorage.setItem('contractDismissed', 'true'); // Store dismissal flag
    setContractDismissed(true); // Set local state to hide contract
    setModalVisible(false);
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
          source={require('../stockview-animation.json')}
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
              {loading ? 'Loading summary...' : summary}
            </Text>
          </View>

          <ScrollView style={styles.scrollView}>
            {stocks.map((stock, index) => (
              <TouchableOpacity
                key={index}
                style={styles.row}
                onPress={() => navigateToDetailView(stock.name)}
              >
                <View style={styles.stockNameContainer}>
                  <Text style={styles.stockName}>{stock.name}</Text>
                </View>
                <View style={styles.plot}>
                  <Text>🔼</Text>
                </View>
                <View style={styles.stockPriceContainer}>
                  <Text style={styles.stockPrice}>{stock.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Bond Box */}
          <TouchableOpacity style={styles.contractBox} onPress={openBond}>
            <Text style={styles.contractTitle}>Bond: Wait 1 week for 20 💎</Text>
            <Progress.Bar progress={0.4} width={100} color={'#4CAF50'} />
            <Text style={styles.contractStatus}>Status: Expired</Text>
          </TouchableOpacity>

          {/* Contract Box (only shown if not dismissed) */}
          {!contractDismissed && (
            <TouchableOpacity style={styles.contractBox} onPress={openContract}>
              <Text style={styles.contractTitle}>Contract: Sell 10 🍎</Text>
              <Progress.Bar progress={1} width={100} color={'#4CAF50'} />
              <Text style={styles.contractStatus}>Status: Expired</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Modal for Contract */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Contract Details</Text>
              <Text style={styles.modalText}>{contractInfo}</Text>
              <TouchableOpacity style={styles.modalButton} onPress={closeContract}>
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    width: '100%',
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
    flex: 2,
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
  contractBox: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    width: '100%',
  },
  contractTitle: {
    fontSize: 18,
    fontFamily: 'Lato_700Bold',
    marginBottom: 10,
  },
  contractStatus: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Lato_700Bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    fontFamily: 'Lato_400Regular',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontFamily: 'Lato_700Bold',
  },
});
