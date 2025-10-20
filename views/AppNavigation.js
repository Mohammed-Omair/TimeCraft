// AppNavigation.js
import React, { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './views/HomeScreen';
import LoginScreen from './views/LoginScreen';
import SignupScreen from './views/SignupScreen';
import ProfileScreen from './views/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
  </Stack.Navigator>
);

const MainTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const AppNavigation = () => {
  const { state } = useContext(AuthContext);

  return state.isAuthenticated ? <MainTabNavigator /> : <AuthStack />;
};

export default AppNavigation;
