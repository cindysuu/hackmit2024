import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import StockChart from '../components/LineChart';

interface StockDetailViewProps {
    route: {
        params: {
            stockName: string;
            stockPrice: number;
            sharesOwned: number;
        };
    };
    navigation: any;
}

const handleSellPress = (navigation: any) => {
    navigation.navigate('SellView');
};

const StockDetailView: React.FC<StockDetailViewProps> = ({ route, navigation }) => {
    const { stockName } = route.params;
    const { stockPrice } = route.params;
    const { sharesOwned } = route.params;
    const totalPrice = sharesOwned * stockPrice;


    let fullData = [];
    let lastPrice = 0;
    let stockPrice2 = 0;

    if (stockName === 'Disney') {
        fullData = [
            { price: 30.22, timestamp: new Date('2023-09-26T00:00:00') },
            { price: 28.59, timestamp: new Date('2023-09-25T00:00:00') },
            { price: 21.49, timestamp: new Date('2023-09-22T00:00:00') },
            { price: 30.00, timestamp: new Date('2023-09-21T00:00:00') },
            { price: 40.40, timestamp: new Date('2023-09-20T00:00:00') },
            { price: 36.40, timestamp: new Date('2023-09-19T00:00:00') },
            { price: 50.00, timestamp: new Date('2023-09-18T00:00:00') },
            { price: 45.07, timestamp: new Date('2023-09-15T00:00:00') },
            { price: 75.00, timestamp: new Date('2023-09-14T00:00:00') },
            { price: 100.00, timestamp: new Date('2023-09-13T00:00:00') },
        ];
    } else if (stockName === 'Hello Kitty') {
        fullData = [
            { price: 100.22, timestamp: new Date('2023-09-26T00:00:00') },
            { price: 80.59, timestamp: new Date('2023-09-25T00:00:00') },
            { price: 60.49, timestamp: new Date('2023-09-22T00:00:00') },
            { price: 80.00, timestamp: new Date('2023-09-21T00:00:00') },
            { price: 70.40, timestamp: new Date('2023-09-20T00:00:00') },
            { price: 80.40, timestamp: new Date('2023-09-19T00:00:00') },
            { price: 100.00, timestamp: new Date('2023-09-18T00:00:00') },
            { price: 120.07, timestamp: new Date('2023-09-15T00:00:00') },
            { price: 180.00, timestamp: new Date('2023-09-14T00:00:00') },
            { price: 200.00, timestamp: new Date('2023-09-13T00:00:00') },
        ];
    } else if (stockName === 'Nintendo') {
        fullData = [
            { price: 62, timestamp: new Date('2023-09-26T00:00:00') },
            { price: 65, timestamp: new Date('2023-09-25T00:00:00') },
            { price: 70, timestamp: new Date('2023-09-22T00:00:00') },
            { price: 72, timestamp: new Date('2023-09-21T00:00:00') },
            { price: 70, timestamp: new Date('2023-09-20T00:00:00') },
            { price: 75, timestamp: new Date('2023-09-19T00:00:00') },
            { price: 70, timestamp: new Date('2023-09-18T00:00:00') },
            { price: 65, timestamp: new Date('2023-09-15T00:00:00') },
            { price: 55, timestamp: new Date('2023-09-14T00:00:00') },
            { price: 50.00, timestamp: new Date('2023-09-13T00:00:00') },
        ];
    } else {
        fullData = Array.from({ length: 10 }, (_, i) => ({
            price: parseFloat((Math.random() * (200 - 20) + 20).toFixed(2)),
            timestamp: new Date(new Date().setDate(new Date().getDate() - i)),
        })).reverse();
        lastPrice = fullData[fullData.length - 1].price;
        stockPrice2 = lastPrice;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{stockName}</Text>

            {/* Plot Section */}
            {/* <View style={styles.plotContainer}>
                <Text style={styles.plotText}>📊 Stock Trend for {stockName}</Text>
            </View> */}

            <View style={styles.plotContainer}>
                <StockChart data={fullData} />
            </View>

            {/* Stock Info Section */}
            <View style={styles.stockInfoContainer}>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Shares Owned:</Text>
                    <Text style={styles.infoValue}>{sharesOwned || 0}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Price per Share: </Text>
                    <Text style={styles.infoValue}>{stockPrice || lastPrice}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Total Price:</Text>
                    <Text style={styles.infoValue}>${totalPrice || 0}</Text>
                </View>
            </View>

            {/* Custom Sell Button */}
            {/* <TouchableOpacity style={styles.sellButton} onPress={() => handleSellPress(navigation)}>
                <Text style={styles.sellButtonText}>Sell</Text>
            </TouchableOpacity> */}

            <Button
                mode="contained"
                onPress={() => navigation.navigate('BuyView', { stock: stockName, stockPrice: stockPrice || stockPrice2, conversionRate: 0.1 })}
                style={styles.button}
            >
                BUY
            </Button>

            <Button
                mode="contained"
                onPress={() => navigation.navigate('SellView', { stock: stockName, stockPrice: stockPrice || stockPrice2, conversionRate: 0.1 })}
                style={styles.button}
            >
                SELL
            </Button>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'center', // Centers content vertically
        alignItems: 'center', // Centers content horizontally
    },
    title: {
        fontFamily: 'Lato_700Bold',
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#333',
    },
    plotContainer: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginBottom: 20,
        padding: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    plotText: {
        fontFamily: 'Lato_400Regular',
        fontSize: 16,
        color: '#555',
    },
    stockInfoContainer: {
        backgroundColor: '#fafafa',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    infoRow: {
        fontFamily: 'Lato_400Regular',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    infoLabel: {
        fontFamily: 'Lato_400Regular',
        fontSize: 16,
        color: '#333',
    },
    infoValue: {
        fontFamily: 'Lato_700Bold',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6200ee',
    },
    // button: {
    //     backgroundColor: '#6200ee',
    //     paddingVertical: 15,
    //     marginHorizontal: 90,
    //     borderRadius: 8,
    //     alignItems: 'center',
    //     marginTop: 20,
    // },
    // buttonText: {
    //     color: '#fff',
    //     fontWeight: 'bold',
    //     fontSize: 18,
    // },
    // sellButton: {
    //     backgroundColor: '#6200ee', // Filled purple color
    //     paddingVertical: 15,
    //     paddingHorizontal: 30,
    //     borderRadius: 8,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     elevation: 3, // Gives shadow effect
    // },
    // sellButtonText: {
    //     fontFamily: 'Lato_700Bold',
    //     color: '#fff', // White text
    //     fontSize: 18,
    //     fontWeight: 'bold',
    // },
    button: {
        fontFamily: 'Lato_700Bold',
        margin: 20,
        padding: 10,
        backgroundColor: '#6200ee',
    },
});

export default StockDetailView;
