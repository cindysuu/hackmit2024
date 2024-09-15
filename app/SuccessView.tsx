import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Button, Card, Text, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


const SuccessView: React.FC = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
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
    },
    button: {
        margin: 20,
        padding: 10,
    },
});

export default SuccessView;