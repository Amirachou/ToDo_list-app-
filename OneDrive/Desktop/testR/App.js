import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import TodoScreen from './TodoScreen';
import FavoritesScreen from './FavoritesScreen';
import CompletedTasksScreen from './CompletedTasksScreen';
import ProfileHomeScreen from './ProfileHomeScreen';
import ProfileEditScreen from './ProfileEditScreen';

// Composant factice pour Déconnexion
function LogoutScreen({ setUser }) {
  useEffect(() => {
    // Réinitialisation de l'utilisateur et retour au Login
    setUser(null);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Déconnexion...</Text>
    </View>
  );
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MainDrawer({ items, setItems, user, setUser }) {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        drawerActiveTintColor: '#4CAF50',
        drawerLabelStyle: { fontSize: 16 },
        drawerIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home': iconName = 'home-outline'; break;
            case 'Favorites': iconName = 'heart-outline'; break;
            case 'Completed': iconName = 'checkmark-done-outline'; break;
            case 'Profile': iconName = 'person-outline'; break;
            case 'EditProfile': iconName = 'create-outline'; break;
            case 'Déconnexion': iconName = 'log-out-outline'; break;
            default: iconName = 'ellipse-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      })}
    >
      <Drawer.Screen name="Home">
        {props => <TodoScreen {...props} items={items} setItems={setItems} />}
      </Drawer.Screen>
      <Drawer.Screen name="Favorites">
        {props => <FavoritesScreen {...props} items={items} setItems={setItems} />}
      </Drawer.Screen>
      <Drawer.Screen name="Completed">
        {props => <CompletedTasksScreen {...props} items={items} />}
      </Drawer.Screen>
      <Drawer.Screen name="Profile">
        {props => <ProfileHomeScreen {...props} user={user} />}
      </Drawer.Screen>
      <Drawer.Screen name="EditProfile">
        {props => <ProfileEditScreen {...props} user={user} setUser={setUser} />}
      </Drawer.Screen>
      <Drawer.Screen name="Déconnexion">
        {props => <LogoutScreen {...props} setUser={setUser} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

export default function App() {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);

  return (
    <NavigationContainer>
      {user ? (
        <MainDrawer items={items} setItems={setItems} user={user} setUser={setUser} />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login">
            {props => <LoginScreen {...props} setUser={setUser} />}
          </Stack.Screen>
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
