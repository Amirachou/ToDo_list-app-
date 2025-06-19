// SignUpScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';

export default function SignUpScreen({ navigation }) {
  const [name,            setName          ] = useState('');
  const [email,           setEmail         ] = useState('');
  const [password,        setPassword      ] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      return Alert.alert('Erreur', 'Veuillez remplir tous les champs');
    }
    if (password !== confirmPassword) {
      return Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
    }
    try {
      const response = await fetch('http://172.20.10.2:1234/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, confirmPassword })
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert('Succès', 'Compte créé avec succès !');
        navigation.replace('Login');
      } else {
        Alert.alert('Erreur', data.message || 'Une erreur est survenue');
      }
    } catch (err) {
      Alert.alert('Erreur réseau', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un compte</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={name}
        onChangeText={setName}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirmer mot de passe"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="S'inscrire" onPress={handleSignUp} color="#4CAF50" />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>J'ai déjà un compte</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f8f9fa' },
  title:     { fontSize: 26, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input:     {
    borderWidth: 1, borderColor: '#ced4da',
    padding: 12, borderRadius: 5, marginBottom: 15, backgroundColor: 'white'
  },
  link:      { color: '#007AFF', marginTop: 15, textAlign: 'center' },
});
