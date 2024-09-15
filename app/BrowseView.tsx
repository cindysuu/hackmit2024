// import React from 'react';
// import { View, Text } from 'react-native';

import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function BrowseView() {
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInput
      style={styles.searchBar}
      placeholder="Search..."
      />
      <ScrollView>
      {categories.map((category, index) => (
        <TouchableOpacity 
        key={index} 
        style={styles.row} 
        onPress={() => navigateToDetailView(category.label)}
        >
        <Text style={styles.label}>{category.label}</Text>
        <View style={styles.icons}>
          {category.icons.map((icon, idx) => (
          <TouchableOpacity key={idx} style={styles.iconButton}>
            <FontAwesome name={icon} size={24} color="black" />
          </TouchableOpacity>
          ))}
        </View>
        </TouchableOpacity>
      ))}
      </ScrollView>
    </View>
  );
}

const categories = [
  { label: 'Games', icons: ['gamepad', 'puzzle-piece'] },
  { label: 'Entertainment', icons: ['film', 'music', 'tv'] },
  { label: 'Social Media', icons: ['facebook', 'twitter', 'instagram'] },
];

const styles = StyleSheet.create({
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    flex: 1,
    fontSize: 18,
  },
  icons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 10,
  },
});