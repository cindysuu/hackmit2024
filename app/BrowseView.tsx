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
    { name: 'Minecraft', category: 'Games', image: require('../assets/browse/minecraft.png'), index: 0 },
    { name: 'Nintendo', category: 'Games', image: require('../assets/browse/nintendo.png'), index: 1 },
    { name: 'Roblox', category: 'Games', image: require('../assets/browse/roblox.jpeg'), index: 2 },
    { name: 'Sony', category: 'Games', image: require('../assets/browse/sony.jpeg'), index: 3 },  // New addition
  
    { name: 'Disney', category: 'Entertainment', image: require('../assets/browse/disney.jpeg'), index: 4 },
    { name: 'Netflix', category: 'Entertainment', image: require('../assets/browse/netflix.png'), index: 5 },
    { name: 'Youtube', category: 'Entertainment', image: require('../assets/browse/youtube.jpg'), index: 6 },
    { name: 'Paramount', category: 'Entertainment', image: require('../assets/browse/paramount.jpg'), index: 7 },  // New addition
    { name: 'AMC', category: 'Entertainment', image: require('../assets/browse/amc.jpeg'), index: 8 },  // New addition
  
    { name: 'Meta', category: 'Social Media', image: require('../assets/browse/meta.jpeg'), index: 9 },
    { name: 'Pinterest', category: 'Social Media', image: require('../assets/browse/pinterest.png'), index: 10 },
    { name: 'Snapchat', category: 'Social Media', image: require('../assets/browse/snap.jpeg'), index: 11 },
    { name: 'Reddit', category: 'Social Media', image: require('../assets/browse/reddit.jpg'), index: 12 },  // New addition
    { name: 'Spotify', category: 'Social Media', image: require('../assets/browse/spotify.jpeg'), index: 13 },  // New addition
  
    { name: 'Mcdonalds', category: 'Food', image: require('../assets/browse/mcdonalds.jpg'), index: 14 },
    { name: 'Hershey', category: 'Food', image: require('../assets/browse/hershey.png'), index: 15 },
    { name: 'Krispy Kreme', category: 'Food', image: require('../assets/browse/krispykreme.jpg'), index: 16 },
    { name: 'Starbucks', category: 'Food', image: require('../assets/browse/starbucks.png'), index: 17 },  // New addition
    { name: 'Chipotle', category: 'Food', image: require('../assets/browse/chipotle.jpeg'), index: 18 },  // New addition
    { name: 'Nestle', category: 'Food', image: require('../assets/browse/nestle.jpg'), index: 19 },  // New addition
  
    { name: 'Sanrio', category: 'Toys', image: require('../assets/browse/sanrio.jpg'), index: 20 },
    { name: 'Mattel', category: 'Toys', image: require('../assets/browse/mattel.jpeg'), index: 21 },
    { name: 'Build-A-Bear', category: 'Toys', image: require('../assets/browse/buildabear.jpg'), index: 22 },
    { name: 'Hasbro', category: 'Toys', image: require('../assets/browse/hasbro.jpg'), index: 23 },  // New addition
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
  // const filteredStocks = searchQuery !== '' ? fuse.search(searchQuery).map(result => result.item) : [];
  const filteredStocks = stockData.filter(stock =>
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  console.log('searchQuery', searchQuery);
  console.log('filtered stocks', filteredStocks);

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
      {/* {filteredStocks.length > 0 ? (
        filteredStocks.map(stock => (
          <TouchableOpacity key={stock.index} onPress={() => handlePress(stock.name)}>
            <Card style={{ marginBottom: 10 }}>
              <Card.Title title={stock.name} subtitle={stock.category} left={LeftContent} />
              <Card.Cover source={stock.image} />
            </Card>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>No results found</Text>
      )} */}

      <ScrollView style={styles.scrollView}>
        {filteredStocks.map((stock) => (
          <View style={styles.card}>
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
  scrollView: {
    flex: 1,
  },
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