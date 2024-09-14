import { ConvexProvider, ConvexReactClient } from "convex/react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Stack } from "expo-router";

// Initialize Convex Client
const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

const Tab = createBottomTabNavigator();

export default function RootLayout() {
  return (
    <ConvexProvider client={convex}>
      {/* Tab Navigator for Home, Profile, Inventory */}
      <Tab.Navigator>
        <Tab.Screen name="index" component={require("./index").default} />
        <Tab.Screen name="profile" component={require("./profile").default} />
        <Tab.Screen name="inventory" component={require("./inventory").default} />
      </Tab.Navigator>
    </ConvexProvider>
  );
}
