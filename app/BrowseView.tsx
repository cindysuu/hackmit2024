// import React from 'react';
// import { View, Text } from 'react-native';

import React from 'react';
import { View, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
// import { Button } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


export default function BrowseView() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <ScrollView>
        <View style={styles.cardWrapper}>
          <Card onPress={() => navigation.navigate('BrowseCategoryView', { category: 'Games' })}>
            <Card.Content>
              <Text variant="titleLarge">Games</Text>
              {/* <Text variant="bodyMedium">Minecraft, Roblox</Text> */}
            </Card.Content>
            <View style={styles.avatarRow}>
              <Avatar.Image size={100} source={require('../assets/images/BrowseGames.jpg')} />
              <Avatar.Image size={100} source={require('../assets/images/BrowseGames.jpg')} />
              <Avatar.Image size={100} source={require('../assets/images/BrowseGames.jpg')} />
            </View>
            {/* <Card.Cover source={require('../assets/images/BrowseGames.jpg')} style={styles.image} />  */}
          </Card>
        </View>

        <View style={styles.cardWrapper}>
          <Card onPress={() => navigation.navigate('BrowseCategoryView', { category: 'Entertainment' })}>
            <Card.Content>
              <Text variant="titleLarge">Entertainment</Text>
              <Text variant="bodyMedium">Netflix, Youtube</Text>
            </Card.Content>
            <View style={styles.avatarRow}>
              <Avatar.Image size={100} source={require('../assets/images/BrowseGames.jpg')} />
              <Avatar.Image size={100} source={require('../assets/images/BrowseGames.jpg')} />
              <Avatar.Image size={100} source={require('../assets/images/BrowseGames.jpg')} />
            </View>
          </Card>
        </View>
        
        <View style={styles.cardWrapper}>
          <Card onPress={() => navigation.navigate('BrowseCategoryView', { category: 'Social Media' })}>
            <Card.Content>
              <Text variant="titleLarge">Social Media</Text>
              <Text variant="bodyMedium">Instagram, Snapchat, Twitter</Text>
            </Card.Content>
            <View style={styles.avatarRow}>
              <Avatar.Image size={100} source={require('../assets/images/BrowseGames.jpg')} />
              <Avatar.Image size={100} source={require('../assets/images/BrowseGames.jpg')} />
              <Avatar.Image size={100} source={require('../assets/images/BrowseGames.jpg')} />
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}

const categories = [
  { label: 'Games', icons: ['gamepad', 'puzzle-piece', 'chess'] },
  { label: 'Entertainment', icons: ['film', 'music', 'tv'] },
  { label: 'Social Media', icons: ['facebook', 'twitter', 'instagram'] },
];

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