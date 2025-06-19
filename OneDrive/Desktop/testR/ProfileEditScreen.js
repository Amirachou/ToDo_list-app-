// ProfileEditScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function ProfileEditScreen({ navigation, user, setUser }) {
  const [name,   setName  ] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar);

  const handleSave = async () => {
    try {
      const response = await fetch(`http://172.20.10.2:1234/user/profile/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, avatar })
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        navigation.goBack();
      } else {
        Alert.alert('Erreur', data.message || 'Mise à jour impossible');
      }
    } catch (err) {
      Alert.alert('Erreur réseau', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nom</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.label}>Avatar (URL)</Text>
      <TextInput style={styles.input} value={avatar} onChangeText={setAvatar} />
      <Button title="Enregistrer" onPress={handleSave} color="#4CAF50" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  label:     { fontSize: 16, marginTop: 10 },
  input:     {
    height: 50, borderWidth: 1, borderColor: '#ced4da',
    borderRadius: 5, paddingHorizontal: 10, marginBottom: 15, backgroundColor: 'white'
  },
});
