import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const App = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [geolocation, setGeolocation] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  const API_TOKEN = '6c39390e6fa55c';

  const fetchGeolocation = async (ip) => {
    try {
      const url = `https://ipinfo.io/${ip}/geo`;
      const headers = {
        'Authorization': `Bearer ${API_TOKEN}`, // Add authorization header
      };
      const response = await fetch(url, { headers });
      if (!response.ok) {
        throw new Error('Failed to fetch geolocation data');
      }
      const data = await response.json();
      setGeolocation(data);
      setError(null);
      setHistory([...history, ip]);
    } catch (error) {
      setError(error.message);
    }
  };
  

  const validateIp = (ip) => {
    const regex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    return regex.test(ip);
  };

  const handleSearch = () => {
    if (!validateIp(ipAddress)) {
      setError('Invalid IP Address format.');
      return;
    }
    fetchGeolocation(ipAddress);
    setIpAddress(''); // Clear search field
  };

  const handleClear = () => {
    setGeolocation(null);
    setError(null);
    setIpAddress('');
  };

  useEffect(() => {
    // Fetch geolocation for logged user on initial render
    fetchGeolocation('').catch((error) => console.error(error));
  }, []);

  const renderHistoryItem = ({ item }) => (
    <Text style={styles.historyItem}>{item}</Text>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>IP Geolocation</Text>
      {geolocation ? (
        <>
          <Text style={styles.infoLabel}>IP Address:</Text>
          <Text style={styles.infoData}>{geolocation.ip}</Text>
          <Text style={styles.infoLabel}>City:</Text>
          <Text style={styles.infoData}>{geolocation.city}</Text>
          <Text style={styles.infoLabel}>Country:</Text>
          <Text style={styles.infoData}>{geolocation.country}</Text>
        </>
      ) : (
        <Text style={styles.infoData}>No geolocation data available.</Text>
      )}
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        value={ipAddress}
        onChangeText={setIpAddress}
        placeholder="Enter IP Address"
      />

      <View style={styles.fixToText}>
        <Button title="Search" onPress={handleSearch} /> &nbsp;
        <Button title="Clear Search" onPress={handleClear} />
      </View>
      <Text style={styles.historyTitle}>Search History:</Text>
      <FlatList
        data={history}
        renderItem={renderHistoryItem}
        keyExtractor={(item) => item}
        style={styles.historyList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  infoLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoData: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  historyTitle: {
    marginTop: 20,
    marginBottom: 5,
  },
  historyList: {
    maxHeight: 100,
  },
  historyItem: {
    marginBottom: 5,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default App;
