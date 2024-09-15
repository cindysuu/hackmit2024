import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface StockDetailViewProps {
    route: {
        params: {
            stockName: string;
        };
    };
    navigation: any;
}

const handleSellPress = (navigation: any) => {
    navigation.navigate('SellView');
};

const StockDetailView: React.FC<StockDetailViewProps> = ({ route, navigation }) => {
    const { stockName } = route.params;

    // Fake data for demonstration
    const sharesOwned = 10;
    const pricePerShare = 150;
    const totalPrice = sharesOwned * pricePerShare;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{stockName}</Text>

            {/* Plot Section */}
            <View style={styles.plotContainer}>
                <Text style={styles.plotText}>📊 Stock Trend for {stockName}</Text>
            </View>

            {/* Stock Info Section */}
            <View style={styles.stockInfoContainer}>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Shares Owned:</Text>
                    <Text style={styles.infoValue}>{sharesOwned}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Price per Share:</Text>
                    <Text style={styles.infoValue}>${pricePerShare}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Total Price:</Text>
                    <Text style={styles.infoValue}>${totalPrice}</Text>
                </View>
            </View>

            {/* Custom Sell Button */}
            <TouchableOpacity style={styles.sellButton} onPress={() => handleSellPress(navigation)}>
                <Text style={styles.sellButtonText}>Sell</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
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
        fontSize: 16,
        color: '#333',
    },
    infoValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6200ee',
    },
    sellButton: {
        backgroundColor: '#6200ee', // Filled purple color
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3, // Gives shadow effect
    },
    sellButtonText: {
        fontFamily: 'Lato_700Bold',
        color: '#fff', // White text
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default StockDetailView;
