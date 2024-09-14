import React from 'react';
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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

// Initialize Convex Client
const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

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
    <ConvexProvider client={convex}>
      {/* <NavigationContainer> */}
        <Tab.Navigator
          // screenOptions={({ route }) => ({
          //   tabBarIcon: ({ focused, color, size }) => {
          //     let iconName;
          //     if (route.name === 'StocksView') {
          //       iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
          //     } else if (route.name === 'BrowseView') {
          //       // iconName = focused ? 'ios-list-box' : 'ios-list';
          //       iconName = focused
          //         ? 'ios-information-circle'
          //         : 'ios-information-circle-outline';
          //     } else if (route.name === 'ProfileView') {
          //       iconName = focused ? 'ios-person' : 'ios-person';
          //     }
          //     return <Ionicons name={iconName} size={size} color={color} />;
          //   },
          //   tabBarActiveTintColor: 'tomato',
          //   tabBarInactiveTintColor: 'gray',
          // })}
        >
          {/* <Tab.Screen name="StocksView" component={require("./StocksView").default} /> */}
          <Tab.Screen name="StocksView" component={StocksStack} options={{ headerShown: false }} />
          <Tab.Screen name="BrowseView" component={require("./BrowseView").default} />
          <Tab.Screen name="ProfileView" component={require("./ProfileView").default} />
        </Tab.Navigator>
      {/* </NavigationContainer> */}
    </ConvexProvider>
  );
}
