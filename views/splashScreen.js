import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <Image
                    source={require('../assets/timecraft_logo.png')}
                    style={styles.image}
                />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#DFF3FD'
    },
    image: {
        width: 300, // Adjust according to your image size
        height: 300, // Adjust according to your image size
        resizeMode: 'contain', // Adjust the image's resizeMode as needed
    },
});


export default SplashScreen;