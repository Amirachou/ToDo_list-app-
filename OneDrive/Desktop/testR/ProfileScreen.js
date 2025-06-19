import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
} from 'react-native';

export default function ProfileHomeScreen({ navigation, route }) {
  const name = route.params?.name || "Nom inconnu";
  const avatar = route.params?.avatar || '';

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: avatar || 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
        }}
        style={styles.image}
      />

      <Text style={styles.name}>{name}</Text>

      <Button
        title="Modifier le profil"
        onPress={() =>
          navigation.navigate('ProfileEdit', { name, avatar })
        }
        color="#4CAF50"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ddd',
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
