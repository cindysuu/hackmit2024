// import React from 'react';
// import { View, Text } from 'react-native';

import React from 'react';
import { SafeAreaView, View, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
// import { Button } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Fuse from 'fuse.js';
import LottieView from 'lottie-react-native';

export default function BrowseView() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
  const navigation = useNavigation();

  const stockData = [
    { name: 'Minecraft', category: 'Games', image: require('../assets/browse/minecraft.png') },
    { name: 'Nintendo', category: 'Games', image: require('../assets/browse/nintendo.png') },
    { name: 'Roblox', category: 'Games', image: require('../assets/browse/roblox.jpeg') },
    { name: 'Disney', category: 'Entertainment', image: require('../assets/browse/disney.jpeg') },
    { name: 'Netflix', category: 'Entertainment', image: require('../assets/browse/netflix.png') },
    { name: 'Youtube', category: 'Entertainment', image: require('../assets/browse/youtube.jpg') },
    { name: 'Meta', category: 'Social Media', image: require('../assets/browse/meta.jpeg') },
    { name: 'Pinterest', category: 'Social Media', image: require('../assets/browse/pinterest.png') },
    { name: 'Snapchat', category: 'Social Media', image: require('../assets/browse/snap.jpeg') },
    { name: 'Mcdonalds', category: 'Food', image: require('../assets/browse/mcdonalds.jpg') },
    { name: 'Hershey', category: 'Food', image: require('../assets/browse/hershey.png') },
    { name: 'Krispy Kreme', category: 'Food', image: require('../assets/browse/krispykreme.jpg') },
    { name: 'Sanrio', category: 'Toys', image: require('../assets/browse/sanrio.jpg') },
    { name: 'Mattel', category: 'Toys', image: require('../assets/browse/mattel.jpeg') },
    { name: 'Build-A-Bear', category: 'Toys', image: require('../assets/browse/buildabear.jpg') },
  ];

  // const filteredStocks = stockData.filter(stock =>
  //   stock.name.toLowerCase().includes(searchQuery.toLowerCase()) && searchQuery !== ''
  // );

  // Fuzzy search using Fuse.js
  const options = {
    keys: ['name'],  // Search by stock name
    threshold: 0.3,  // Lower means more strict matching
  };
  const fuse = new Fuse(stockData, options);
  const filteredStocks = searchQuery !== '' ? fuse.search(searchQuery).map(result => result.item) : [];

  const handlePress = (stockName) => {
    navigation.navigate('StockDetailView', { stockName });
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 10 }}>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <ScrollView>
        {filteredStocks.map((stock, index) => (
          <View key={index} style={styles.card}>
            <TouchableOpacity onPress={() => handlePress(stock.name)}>
              <Text style={{ fontFamily: 'Lato_700Bold' }}>{stock.name}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <ScrollView>
        <View style={styles.card}>
          <Text variant="titleLarge" style={{ fontFamily: 'Lato_700Bold', color: '#6200ee' }}>Food and Drink</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.avatarRow}>
              <TouchableOpacity onPress={() => handlePress('Mcdonalds')}>
                <Avatar.Image size={100} source={require('../assets/browse/mcdonalds.jpg')} style={styles.avatar} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePress('Hershey')}>
                <Avatar.Image size={100} source={require('../assets/browse/hershey.png')} style={styles.avatar} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePress('Krispy Kreme')}>
                <Avatar.Image size={100} source={require('../assets/browse/krispykreme.jpg')} style={styles.avatar} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePress('Starbucks')}>
                <Avatar.Image size={100} source={require('../assets/browse/starbucks.png')} style={styles.avatar} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePress('Chipotle')}>
                <Avatar.Image size={100} source={require('../assets/browse/chipotle.jpeg')} style={styles.avatar} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePress('Nestle')}>
                <Avatar.Image size={100} source={require('../assets/browse/nestle.jpg')} style={styles.avatar} />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        <View style={styles.card}>
          <Text variant="titleLarge" style={{ fontFamily: 'Lato_700Bold', color: '#6200ee' }}>Entertainment</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.avatarRow}>
            <TouchableOpacity onPress={() => handlePress('Disney')}>
              <Avatar.Image size={100} source={require('../assets/browse/disney.jpeg')} style={styles.avatar} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress('Netflix')}>
              <Avatar.Image size={100} source={require('../assets/browse/netflix.png')} style={styles.avatar} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress('Paramount')}>
              <Avatar.Image size={100} source={require('../assets/browse/paramount.jpg')} style={styles.avatar} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress('Youtube')}>
              <Avatar.Image size={100} source={require('../assets/browse/youtube.jpg')} style={styles.avatar} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress('AMC')}>
              <Avatar.Image size={100} source={require('../assets/browse/amc.jpeg')} style={styles.avatar} />
            </TouchableOpacity>
          </View>
          </ScrollView>
        </View>

        <View style={styles.card}>
            <Text variant="titleLarge" style={{ fontFamily: 'Lato_700Bold', color: '#6200ee' }}>Games</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={styles.avatarRow}>
                <TouchableOpacity onPress={() => handlePress('Minecraft')}>
                  <Avatar.Image size={100} source={require('../assets/browse/minecraft.png')} style={styles.avatar} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress('Nintendo')}>
                  <Avatar.Image size={100} source={require('../assets/browse/nintendo.png')} style={styles.avatar} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress('Roblox')}>
                  <Avatar.Image size={100} source={require('../assets/browse/roblox.jpeg')} style={styles.avatar} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress('Sony')}>
                  <Avatar.Image size={100} source={require('../assets/browse/sony.jpeg')} style={styles.avatar} />
                </TouchableOpacity>
              </View>
            </ScrollView>
        </View>

        <View style={styles.card}>
          <Text variant="titleLarge" style={{ fontFamily: 'Lato_700Bold', color: '#6200ee' }}>Social Media</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.avatarRow}>
              <TouchableOpacity onPress={() => handlePress('Meta')}>
                <Avatar.Image size={100} source={require('../assets/browse/meta.jpeg')} style={styles.avatar} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePress('Pinterest')}>
                <Avatar.Image size={100} source={require('../assets/browse/pinterest.png')} style={styles.avatar} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePress('Snapchat')}>
                <Avatar.Image size={100} source={require('../assets/browse/snap.jpeg')} style={styles.avatar} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePress('Reddit')}>
                <Avatar.Image size={100} source={require('../assets/browse/reddit.jpg')} style={styles.avatar} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePress('Spotify')}>
                <Avatar.Image size={100} source={require('../assets/browse/spotify.jpeg')} style={styles.avatar} />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        <View style={styles.card}>
          <Text variant="titleLarge" style={{ fontFamily: 'Lato_700Bold', color: '#6200ee' }}>Toys</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.avatarRow}>
              <TouchableOpacity onPress={() => handlePress('Sanrio')}>
                <Avatar.Image size={100} source={require('../assets/browse/sanrio.jpg')} style={styles.avatar} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePress('Mattel')}>
                <Avatar.Image size={100} source={require('../assets/browse/mattel.jpeg')} style={styles.avatar} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePress('Build-A-Bear')}>
                <Avatar.Image size={100} source={require('../assets/browse/buildabear.jpg')} style={styles.avatar} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePress('Hasbro')}>
                <Avatar.Image size={100} source={require('../assets/browse/hasbro.jpg')} style={styles.avatar} />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        <Text variant="titleLarge" style={{ fontFamily: 'Lato_700Bold', color: '#6200ee', textAlign: 'center', paddingVertical: 30 }}>
          More stocks coming soon! 🚀
        </Text>

        <LottieView
          source={require('../coming-soon-animation.json')} // Update with the correct path
          autoPlay
          loop
          style={styles.lottieBackground}
        />

      </ScrollView>
    </SafeAreaView>
  );
}

const categories = [
  { label: 'Games', icons: ['gamepad', 'puzzle-piece'] },
  { label: 'Entertainment', icons: ['film', 'music', 'tv'] },
  { label: 'Social Media', icons: ['facebook', 'twitter', 'instagram'] },
];

const styles = StyleSheet.create({
  card: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
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
    // paddingHorizontal: 10,
  },
  cardWrapper: {
    padding: 10,  // Add padding around each card
  },
  avatar: {
    marginRight: 15, // Adjust this value to control spacing
  },
  lottieBackground: {
    width: 200,
    height: 200,
    alignSelf: 'center',
},
});