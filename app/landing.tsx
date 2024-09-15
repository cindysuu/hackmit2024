import * as React from 'react';
import { View, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';

export default function LandingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Lottie Animation */}
      <LottieView
        source={require('../landing-animation.json')}
        autoPlay
        loop
        style={styles.lottieBackground}
      />
      
      {/* Overlay Content */}
      <View style={styles.overlay}>
        <Text style={styles.title}>WELCOME TO FUTURES</Text>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/signup')}
        >
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'relative',
  },
  lottieBackground: {
    ...StyleSheet.absoluteFillObject, // Fills the entire parent container
    zIndex: -1, // Ensures the animation is behind other content
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', // Ensures overlay is positioned over the animation
    zIndex: 1, // Ensures overlay content is above the animation
  },
  title: {
    fontFamily: 'Lato_700Bold',
    fontSize: 32,
    marginBottom: 30,
    color: '#333',
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 18,
    color: 'white',
  },
});
