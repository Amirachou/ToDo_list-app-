// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';

export default function LoginScreen({ navigation, setUser }) {
  const [email,    setEmail   ] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert('Erreur', 'Veuillez remplir tous les champs');
    }
    try {
      const response = await fetch('http://172.20.10.3:1234/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
      } else {
        Alert.alert('Erreur', data.message || 'Identifiants incorrects');
      }
    } catch (err) {
      Alert.alert('Erreur réseau', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Se connecter" onPress={handleLogin} color="#4CAF50" />
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.link}>Créer un compte</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f8f9fa' },
  title:     { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input:     {
    width: '100%', height: 50, borderWidth: 1, borderColor: '#ced4da',
    borderRadius: 5, paddingHorizontal: 10, marginBottom: 20, backgroundColor: 'white'
  },
  link:      { color: '#007AFF', marginTop: 15, textAlign: 'center' },
});
