import React from 'react';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
// import { Stack } from "expo-router";
import Ionicons from 'react-native-vector-icons/Ionicons';

import StocksView from './StocksView';
import StockDetailView from './StockDetailView';
import BrowseView from './BrowseView';
import ProfileView from './ProfileView';
import SellView from './SellView';
import SuccessView from './SuccessView';
import { ClerkProvider, ClerkLoaded, useAuth } from "@clerk/clerk-expo";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';
import { Tabs } from 'expo-router';
import IndexScreen from "./index";
import ProfileScreen from "./profile";
import InventoryScreen from "./inventory";
import LandingScreen from "./landing";
import SignUpScreen from "./signup";
import LoginScreen from "./login"
import {useFonts, Lato_400Regular, Lato_700Bold} from '@expo-google-fonts/lato';

// SecureStore token caching for Clerk
const tokenCache = {
  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error('SecureStore get item error: ', error);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (err) {
      console.error('SecureStore save item error: ', err);
    }
  },
};

// Initialize Convex Client
const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? '';

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  );
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function StocksStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="StocksView" component={StocksView} />
      <Stack.Screen name="StockDetailView" component={StockDetailView} />
      <Stack.Screen name="SellView" component={SellView} />
      <Stack.Screen name="SuccessView" component={SuccessView} />
    </Stack.Navigator>
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        {/* Move the useAuth hook within the ClerkLoaded scope */}
        <ClerkApp />
      </ClerkLoaded>
    </ClerkProvider>
  );
}

function ClerkApp() {
  const[fontsLoaded] = useFonts({Lato_400Regular, Lato_700Bold});
  const { isSignedIn } = useAuth();

  return (
    <ConvexProvider client={convex}>
      {isSignedIn ? (
        <Tab.Navigator>
          <Tab.Screen name="index" component={IndexScreen} />
          <Tab.Screen name="profile" component={ProfileScreen} />
          <Tab.Screen name="inventory" component={InventoryScreen} />
          <Tab.Screen name="StocksView" component={StocksStack} options={{ headerShown: false }} />
          <Tab.Screen name="BrowseView" component={require("./BrowseView").default} />
          <Tab.Screen name="ProfileView" component={require("./ProfileView").default} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="landing" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="landing" component={LandingScreen} />
          <Stack.Screen name="signup" component={SignUpScreen} />
          <Stack.Screen name="login" component={LoginScreen} />
        </Stack.Navigator>
      )}
    </ConvexProvider>
  );
}
