import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
export default function FavoritesScreen({ items }) {
    const favoriteItems = items.filter(item => item.isFavorite); // Filtrer les favoris
  
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Favorite Tasks</Text>
        {favoriteItems.length === 0 ? (
          <Text style={styles.emptyMessage}>No favorite tasks found.</Text>
        ) : (
          <FlatList
            data={favoriteItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.text}>{item.text}</Text>
              </View>
            )}
          />
        )}
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emptyMessage: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 20,
  },
  item: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ced4da',
  },
  text: {
    fontSize: 16,
  },
});