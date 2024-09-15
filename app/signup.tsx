import * as React from 'react';
import { TextInput, Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSignUp, useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [emailAddress, setEmailAddress] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState('');

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({ firstName, lastName, emailAddress, username, password });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        const user = useUser();
        router.replace('/');
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View style={styles.container}>
      {!pendingVerification ? (
        <>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>Create an account to invest!</Text>
            <TextInput
            autoCapitalize="none"
            value={firstName}
            placeholder="First Name"
            onChangeText={setFirstName}
            style={styles.input}/>
            <TextInput
            autoCapitalize="none"
            value={lastName}
            placeholder="Last Name"
            onChangeText={setLastName}
            style={styles.input}/>
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email"
            onChangeText={setEmailAddress}
            style={styles.input}
          />
          <TextInput
            value={username}
            placeholder="Username"
            onChangeText={setUsername}
            style={styles.input}
          />
          <TextInput
            value={password}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={setPassword}
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            value={code}
            placeholder="Code..."
            onChangeText={setCode}
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={onPressVerify}>
            <Text style={styles.buttonText}>Verify Email</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Lato_700Bold',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Lato_400Regular',
    textAlign: 'center',
    marginBottom: 20,
    color: '#6200ee',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    fontFamily: 'Lato_400Regular',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});