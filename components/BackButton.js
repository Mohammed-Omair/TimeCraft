import React from 'react';
import { StyleSheet } from 'react-native';
import { NativeBaseProvider, IconButton } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const BackButton = () => {
  return (
    <IconButton
      icon={<Ionicons name="arrow-back" size={30} color="black" />}
      style={styles.backButton}
    />
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 30,
    left: 0,
    backgroundColor: 'transparent',
  },
});

export default BackButton;