import React from 'react';
import { View, Text, Button  } from 'react-native';
import { useClerk } from '@clerk/clerk-expo';

export default function ProfileScreen() {
    const { signOut } = useClerk();
    const handleLogout = async() => {
        try {
            await signOut();
        } catch (err) {
            console.error("couldn't sign out");
        }
    }
    return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile Screen</Text>
        <Button title="Logout" onPress={handleLogout}/>
    </View>
    );
}
