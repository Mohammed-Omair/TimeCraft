import React, { useReducer, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FirstScreen from './views/FirstScreen';
import SignupScreen from './views/SignupScreen';
import LoginScreen from './views/LoginScreen';
import HomeScreen from './views/HomeScreen';
import TasksScreen from './views/TasksScreen';
import TimerScreen from './views/TimerScreen';
import ProfileScreen from './views/ProfileScreen';
import SettingsScreen from './views/SettingsScreen';
import { AuthContext } from './context';

import reducer from './store/reducer';
import initialState from './store/state';
import { MenuProvider } from 'react-native-popup-menu';
import { Provider as PaperProvider } from 'react-native-paper';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AsyncStorage from "@react-native-async-storage/async-storage";
import EditProfileScreen from './views/EditProfileScreen';
import EditTaskScreen from './views/EditTaskScreen';
import LanguageScreen from './views/LangugeSettings';
import ThemeScreen from './views/ThemeScreen';
import NotificationsScreen from './views/NotificationScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Authentication Stack Navigator
const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FirstScreen" component={FirstScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

// Main App Bottom Tab Navigator
const MainTabNavigator = () => {

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#47525E",
        tabBarInactiveTintColor: "#71ACCE",
        tabBarStyle: [{ display: "flex" }, null]
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={TasksScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="format-list-checks" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Timer"
        component={TimerScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="timer" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Profile Stack Navigator (for Profile tab)
const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LanguageScreen" component={LanguageScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ThemeScreen" component={ThemeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EditTaskScreen" component={EditTaskScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const App = () => {
  // Simulate authentication status, true for authenticated, false for not authenticated

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const loadAuthState = async () => {
      const storedAuthState = await AsyncStorage.getItem('authState');
      if (storedAuthState) {
        const { isAuthenticated, user } = JSON.parse(storedAuthState);
        if (isAuthenticated && user) {
          dispatch({ type: 'LOGIN', payload: user });
        }
      }
    };
    loadAuthState();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}>
      <PaperProvider>
        <MenuProvider>
          <StatusBar barStyle="light-content" />
          <SafeAreaView style={styles.areaContainer}>
            <NavigationContainer>
              <NativeBaseProvider>
                {state.isAuthenticated ? <MainTabNavigator /> : <AuthStack />}
              </NativeBaseProvider>
            </NavigationContainer>
          </SafeAreaView>
        </MenuProvider>
      </PaperProvider>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  areaContainer: {
    flex: 1,
  },
});

export default App;
