import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';

const LoginPage = ({ navigation }) => { // Pass navigation prop

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = () => {
    // Implement your login logic here (e.g., API call)
    console.log('Username:', username);
    console.log('Password:', password);

    // Simulate successful login (replace with actual logic)
    if (username === 'username' && password === 'password') {
      navigation.navigate("index");
    } else {
      console.log('Invalid login credentials.');
      setError('Invalid login credentials.');
    }
  };

  const handleClear = () => {
    setError(null);
    setUsername('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Geolocator Login</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        placeholderTextColor="#aaa"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
      />
      <View style={styles.fixToText}>
        <Button title="Login" onPress={handleLogin} /> &nbsp;
        <Button title="Reset" onPress={handleClear} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  input: {
    height: 40,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginPage;
