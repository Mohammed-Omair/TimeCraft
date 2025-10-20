import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getAuth, updateProfile } from "firebase/auth";

const EditProfileScreen = () => {
  const auth = getAuth();
  const user = auth.currentUser; // Get the current user

  const [fullName, setFullName] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    if (user && user.displayName) {
      setFullName(user.displayName); // Set the fullName state if displayName is available
    }
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user) {
      Alert.alert("No user logged in");
      return;
    }
    
    try {
      await updateProfile(user, {
        displayName: fullName
      });
      // Optionally navigate back or show success message
      navigation.goBack();
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert("Error updating profile", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Edit Profile</Text>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Enter your full name"
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#71ACCE',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;
