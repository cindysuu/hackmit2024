import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar, Button, Card, Text, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function BuyView({ route }) {
    const { stock } = route.params;
    const navigation = useNavigation();
    const [text, setText] = React.useState("");
  
    return (
        <View>
            <Text style={styles.stockTitle}>{stock}</Text>
            <Text style={styles.stockSubTitle}>Number of stocks</Text>
            <TextInput
                // label="Number of shares"
                value={text}
                onChangeText={text => setText(text)}
            />
            <Button
                mode="contained"
                onPress={() => navigation.navigate('SuccessView')}
                style={styles.button}
            >
                Buy
            </Button>
        </View>
    );
  }

const styles = StyleSheet.create({
    stockTitle: {
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        fontSize: 40,
        marginVertical: 10,
    },
    stockSubTitle: {
        color: 'black',
        textAlign: 'center',
        fontSize: 20,
        marginVertical: 10,
    },
    button: {
        margin: 20,
        padding: 10,
    },
});

// const BuyView: React.FC = () => {
//     return (
//         <div>
//             <h1>Buy View</h1>
//             {/* Add your component content here */}
//         </div>
//     );
// };

// export default BuyView;