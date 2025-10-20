import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const CenteredImage = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/timecraft_logo.png')}
                style={styles.image}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200, // Adjust according to your image size
        height: 200, // Adjust according to your image size
        resizeMode: 'contain', // Adjust the image's resizeMode as needed
    },
});


export default CenteredImage;