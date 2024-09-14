import React from 'react';
import { View, Text } from 'react-native';

export default function ProfileView() {
const gems = 5550; // Define the gems variable
const conversionRate = 0.001;

return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 40, color: '#fff' }}>U</Text>
        </View>
        <Text style={{ marginTop: 20, fontSize: 24 }}>Cindy Su</Text>
        <Text style={{ marginTop: 10, fontSize: 18 }}>{gems} 💎</Text>
        <Text style={{ marginTop: 10, fontSize: 18 }}>${gems * conversionRate} USD</Text>
        <Text style={{ marginTop: 10, fontSize: 18 }}>Conversion Rate: {1 / conversionRate} 💎 / $1 USD</Text>
    </View>
);
}