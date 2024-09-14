import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

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
            <View style={styles.plot}>
                <Text>Fake Plot of {stockName}</Text>
            </View>
            <View style={styles.description}>
                <Text>Shares Owned: {sharesOwned}</Text>
                <Text>Price per Share: ${pricePerShare}</Text>
                <Text>Total Price: ${totalPrice}</Text>
            </View>
            <Button title="Sell" onPress={() => handleSellPress(navigation)} />
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
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    plot: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        marginBottom: 20,
    },
    description: {
        marginBottom: 20,
    },
});

export default StockDetailView;