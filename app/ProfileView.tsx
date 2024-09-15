import { useClerk, useUser } from '@clerk/clerk-expo';
import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function ProfileView() {
  const gems = 5550; // Define the gems variable
  const conversionRate = 0.001;
  const { user } = useUser();
  const { signOut } = useClerk();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error("Couldn't sign out");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>{user?.firstName?.[0]}</Text>
      </View>
      <Text style={styles.nameText}>Welcome Back,</Text>
      <Text style={styles.nameText}>
        {user?.firstName}
      </Text>
      <Text style={styles.gemsText}>{gems} 💎</Text>
      <Text style={styles.gemsText}>${(gems * conversionRate).toFixed(2)} USD</Text>
      <Text style={styles.conversionRateText}>
        Conversion Rate: {Math.round(1 / conversionRate)} 💎 / $1 USD
      </Text>
      <Button title="Logout" onPress={handleLogout} color="#6200ee"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 40,
    color: '#fff',
  },
  nameText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    // marginBottom: 10,
  },
  gemsText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 18,
    color: '#666',
    marginTop: 20,
  },
  conversionRateText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 18,
    color: '#888',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
});
