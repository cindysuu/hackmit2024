import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Avatar, Button, Card, Text, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const SuccessView: React.FC = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <LottieView
                source={require('../coin-animation.json')} // Update with the correct path
                autoPlay
                loop
                style={styles.lottieBackground}
            />
            <Text style={styles.text}>Success!</Text>
            <Button
                mode="contained"
                onPress={() => navigation.navigate('StocksView')}
                style={styles.button}
            >
                OK
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'green',
        marginBottom: 20,
    },
    button: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#6200ee',
    },
    lottieBackground: {
        width: 200,
        height: 200,
    },
});

export default SuccessView;