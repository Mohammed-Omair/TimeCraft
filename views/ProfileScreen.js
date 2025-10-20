import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import background from '../assets/background.png';
import avatar from '../assets/avatar.png'

import { getAuth } from "firebase/auth";

const ProfileScreen = ({ navigation }) => {
  const auth = getAuth();
  const user = auth.currentUser; // Get the current user

  const [fullName, setFullName] = useState('');

  useEffect(() => {
    if (user && user.displayName) {
      setFullName(user.displayName); // Set the fullName state if displayName is available
    }
    else {
      setFullName('Timecraft User')
    }
  }, [user]);

  

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={background} style={styles.background}>
        <View style={styles.container}>
          <View style={styles.profileHeader}>
            <Image
              source={avatar}
              style={styles.profilePic}
            />
            <Text style={styles.userName}>{fullName}</Text>
          </View>

          <View style={styles.menuContainer}>
            <MenuItem
              icon="user-edit"
              title="Edit Profile"
              onPress={() => navigation.navigate('EditProfile')}
            />
            <MenuItem
              icon="language"
              title="Language"
              onPress={() => navigation.navigate('LanguageScreen')}
            />
            <MenuItem
              icon="paint-brush"
              title="Theme"
              onPress={() => navigation.navigate('ThemeScreen')}
            />
            <MenuItem
              icon="bell"
              title="Notifications"
              onPress={() => navigation.navigate('NotificationsScreen')}
            />
            <TouchableOpacity style={styles.signOutButton} onPress={() => {
              dispatch({ type: 'LOGOUT' });
            }}>
              <Icon name="sign-out-alt" size={24} color="#D32F2F" />
              <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const MenuItem = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Icon name={icon} size={20} style={styles.menuIcon} />
    <Text style={styles.menuTitle}>{title}</Text>
    <Icon name="angle-right" size={20} style={styles.menuIconRight} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: 20,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#cccccc',
  },
  userName: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: 'bold',
  },
  menuContainer: {
    marginTop: 50,
    width: '100%',
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  menuIcon: {
    marginRight: 10,
  },
  menuTitle: {
    fontSize: 18,
    flex: 1,
  },
  menuIconRight: {
    color: '#cccccc',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  signOutText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#D32F2F',
  },
});

export default ProfileScreen;
