import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Modal,
  Button,
  Image
} from 'react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

export default function TodoScreen({ navigation, items, setItems, route }) {
  const [inputValue, setInputValue] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isEditModalVisible, setEditModalVisible] = useState(false);

  const categories = ['All', 'Work', 'Personal', 'Urgent'];

  const name = route?.params?.name || 'Mon Profil';
  const avatar = route?.params?.avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

  const handleAdd = () => {
    if (inputValue.trim()) {
      if (editingIndex !== null) {
        const updatedItems = [...items];
        updatedItems[editingIndex].text = inputValue.trim();
        setItems(updatedItems);
        setEditingIndex(null);
      } else {
        setItems([
          ...items,
          {
            text: inputValue.trim(),
            isFavorite: false,
            isCompleted: false,
            category: selectedCategory,
          },
        ]);
      }
      setInputValue('');
    } else {
      Alert.alert('Error', 'Please enter a valid task!');
    }
  };

  const handleEdit = (index) => {
    setInputValue(items[index].text);
    setEditingIndex(index);
    setEditModalVisible(true);
  };

  const toggleFavorite = (index) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      isFavorite: !updatedItems[index].isFavorite,
    };
    setItems(updatedItems);
  };

  const toggleCompleted = (index) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      isCompleted: !updatedItems[index].isCompleted,
    };
    setItems(updatedItems);
  };

  const renderRightActions = (index) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
      }}
    >
      <Ionicons name="trash" size={24} color="white" />
    </TouchableOpacity>
  );

  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.text.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const completedTasks = items.filter((item) => item.isCompleted).length;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>To-Do List</Text>
          <Text style={styles.taskCounter}>
            {completedTasks}/{items.length} tasks completed
          </Text>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search tasks..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.categoryContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategoryButton,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedCategoryText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Enter a task"
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <Ionicons name="add-circle" size={40} color="#4CAF50" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {filteredItems.map((item, index) => (
            <Swipeable key={index} renderRightActions={() => renderRightActions(index)}>
              <TouchableOpacity
                style={[styles.item, item.isCompleted && styles.completedItem]}
                onPress={() => toggleCompleted(index)}
                onLongPress={() => handleEdit(index)}
              >
                <View style={styles.itemContent}>
                  <TouchableOpacity onPress={() => toggleFavorite(index)}>
                    <Ionicons
                      name={item.isFavorite ? 'star' : 'star-outline'}
                      size={24}
                      color={item.isFavorite ? '#ffc107' : '#6c757d'}
                      style={{ marginRight: 10 }}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      textDecorationLine: item.isCompleted ? 'line-through' : 'none',
                      color: item.isCompleted ? '#6c757d' : 'black',
                    }}
                  >
                    {item.text}
                  </Text>
                  <Text style={styles.categoryLabel}>[{item.category}]</Text>
                </View>
              </TouchableOpacity>
            </Swipeable>
          ))}
        </ScrollView>

        {/* Modal pour l'édition */}
        <Modal visible={isEditModalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit Task</Text>
              <TextInput
                style={[styles.input, { textDecorationLine: 'none', color: 'black' }]}
                value={inputValue}
                onChangeText={setInputValue}
                placeholder="Edit your task"
                placeholderTextColor="#ced4da"
              />
              <View style={styles.modalButtons}>
                <Button
                  title="Save"
                  onPress={() => {
                    if (editingIndex !== null) {
                      const updatedItems = [...items];
                      updatedItems[editingIndex].text = inputValue.trim();
                      setItems(updatedItems);
                      setEditingIndex(null);
                      setInputValue('');
                      setEditModalVisible(false);
                    }
                  }}
                  color="#4CAF50"
                />
                <Button
                  title="Cancel"
                  onPress={() => {
                    setEditModalVisible(false);
                    setEditingIndex(null);
                    setInputValue('');
                  }}
                  color="#dc3545"
                />
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10,
    marginRight: 10,
    marginTop: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ddd',
  },
  profileName: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  header: {
    backgroundColor: '#4CAF50',
    paddingTop: 30,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  taskCounter: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
  },
  searchContainer: {
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  categoryButton: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: '#e9ecef',
  },
  selectedCategoryButton: {
    backgroundColor: '#4CAF50',
  },
  categoryText: {
    color: '#6c757d',
  },
  selectedCategoryText: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  addButton: {
    marginLeft: 10,
  },
  scrollContent: {
    padding: 10,
  },
  item: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ced4da',
  },
  completedItem: {
    backgroundColor: '#e9ecef',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  categoryLabel: {
    fontSize: 12,
    color: '#6c757d',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
});
