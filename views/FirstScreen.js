import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
    Box,
    Button,
    Input,
    NativeBaseProvider,
    VStack
} from 'native-base';

const FirstScreen = () => {
    const navigation = useNavigation();

    return (
        <NativeBaseProvider>
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/timecraft_logo.png')}
                    style={styles.image}
                />
                <Text style={styles.textTag}>Your Daily Efficiency Companion</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    style={styles.button2}
                    onPress={() => navigation.navigate('LoginScreen')}
                    size='lg'
                    _text={{  fontWeight: 'bold' }}
                >
                    Sign In
                </Button>
                <Button
                    mt={5}
                    style={styles.button3}
                    onPress={() => navigation.navigate('SignupScreen')}
                    size='lg'
                    _text={{ color: '#71ACCE', fontWeight: 'bold' }}
                >
                    Sign Up
                </Button>
            </View>
        </View>
        </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DFF3FD',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 10,
        position: 'absolute',
        alignItems: 'center',
        bottom: 40,
    },
    button1: {
        flexDirection: 'row',
        backgroundColor: '#DFF3FD',
        paddingVertical: 15,
        marginVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderWidth: 3,
        borderColor: '#71ACCE',
        width: '90%',
    },
    button2: {
        width: '90%',
        backgroundColor: '#71ACCE',
        borderRadius: 10
    },
    button3: {
        width: '90%',
        backgroundColor: '#FEFCFF',
        borderRadius: 10,

    },
    buttonIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    buttonText1: {
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center',
    },
    signUpContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 25,
        justifyContent: 'center'
    },
    signUpText: {
        color: '#007bff',
        fontWeight: 'bold',
    },
    textTag: {
        color: '#47525E',
        fontWeight: '300'
    }
});

export default FirstScreen;
