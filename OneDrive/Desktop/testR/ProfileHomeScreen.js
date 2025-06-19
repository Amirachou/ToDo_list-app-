import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function ProfileHomeScreen({ user }) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user.avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{user.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  name: { marginTop: 10, fontSize: 22, fontWeight: 'bold' }
});
