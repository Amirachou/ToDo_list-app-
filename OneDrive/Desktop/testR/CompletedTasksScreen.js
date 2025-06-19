import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function CompletedTasksScreen({ items }) {
  const completedItems = items.filter(item => item.isCompleted); // Filtrer les tâches complétées

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Completed Tasks</Text>
      {completedItems.length === 0 ? (
        <Text style={styles.emptyMessage}>No completed tasks found.</Text>
      ) : (
        <FlatList
          data={completedItems}
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