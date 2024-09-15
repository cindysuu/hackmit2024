import React from 'react';
import { View, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function BrowseCategoryView({ route }) {
    const { category } = route.params;
    const navigation = useNavigation();
  
    return (
        <View style={{ flex: 1, padding: 10 }}>
            <Text variant="titleLarge" style={{ fontFamily: 'Lato_700Bold' }}>{category}</Text>
            <ScrollView>
                <View style={styles.cardWrapper}>
                    <Card onPress={() => navigation.navigate('BuyView', { stock: 'Minecraft' })}>
                        <View style={styles.avatarRow}>
                            <Text style={{ fontFamily: 'Lato_700Bold' }}>Minecraft</Text>
                            <Avatar.Image size={100} source={require('../assets/images/BrowseGames.jpg')} />
                            <Text>$1</Text>
                        </View>
                    </Card>
                </View>

                <View style={styles.cardWrapper}>
                    <Card onPress={() => navigation.navigate('BuyView', { stock: 'Roblox' })}>
                        <View style={styles.avatarRow}>
                            <Text style={{ fontFamily: 'Lato_700Bold' }}>Roblox</Text>
                            <Avatar.Image size={100} source={require('../assets/images/BrowseGames.jpg')} />
                            <Text>$1</Text>
                        </View>
                    </Card>
                </View>

                <View style={styles.cardWrapper}>
                    <Card onPress={() => navigation.navigate('BuyView', { stock: 'Nintendo' })}>
                        <View style={styles.avatarRow}>
                            <Text style={{ fontFamily: 'Lato_700Bold' }}>Nintendo</Text>
                            <Avatar.Image size={100} source={require('../assets/images/BrowseGames.jpg')} />
                            <Text>$1</Text>
                        </View>
                    </Card>
                </View>
            </ScrollView>
        </View>
    );
  }

const styles = StyleSheet.create({
    imageWrapper: {
        width: 150,   // Define the width of the image
        height: 150,  // Define the height of the image
        overflow: 'hidden', // Ensure that the image stays within bounds
    },
    image: {
        width: '100%',  // Make the image fill the wrapper's width
        height: '100%', // Make the image fill the wrapper's height
        resizeMode: 'cover',  // Option to maintain aspect ratio
    },
    avatarRow: {
        flexDirection: 'row', // Aligns avatars in a row
        justifyContent: 'space-around', // Spaces them evenly
        marginVertical: 10, // Adds some vertical margin around the avatars
    },
    cardWrapper: {
        padding: 10,  // Add padding around each card
    },
});