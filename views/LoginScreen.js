import React, { useState, useContext } from 'react';
import { Image, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Box, Button, Input, NativeBaseProvider, VStack } from 'native-base';
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../context";
import auth from "../firebaseConfig";

const LoginScreen = () => {
    const navigation = useNavigation();
    const { dispatch } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert("Please enter all fields");
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Successfully signed in
                const user = userCredential.user;
                dispatch({ type: 'LOGIN', payload: user });
            })
            .catch((error) => {
                const errorMessage = error.message;
                Alert.alert(errorMessage);
            });
    };

    return (
        <NativeBaseProvider>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
                <Image
                    source={require('../assets/timecraft_logo.png')}
                    style={styles.logo}
                />
                <Text style={styles.welcomeText}>Welcome back</Text>
                <Text style={styles.signInText}>Sign in to continue</Text>

                <VStack space={4} alignItems="flex-start" mx="5%" mt={10}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <Input
                        variant="underlined"
                        size="lg"
                        style={styles.inputBox}
                        onChangeText={setEmail}
                    />
                </VStack>

                <VStack space={4} alignItems="flex-start" mx="5%">
                    <Text style={styles.inputLabel}>Password</Text>
                    <Input
                        variant="underlined"
                        size="lg"
                        style={styles.inputBox}
                        secureTextEntry={true}
                        onChangeText={setPassword}
                    />
                </VStack>

                <Box style={styles.buttonContainer}>
                    <Button
                        style={styles.signInButton}
                        _text={{ fontWeight: 'bold' }}
                        onPress={handleLogin}
                    >
                        Sign In
                    </Button>
                    <Text style={styles.signUpText}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
                        <Text style={styles.signUpLink}>Sign up</Text>
                    </TouchableOpacity>
                </Box>
            </ScrollView>
        </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 40,
    },
    welcomeText: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
    signInText: {
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center',
        marginTop: 10,
    },
    inputLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        alignSelf: 'flex-start'
    },
    inputBox: {
        width: '100%',
    },
    buttonContainer: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 30,
        alignItems: 'center',
    },
    signInButton: {
        backgroundColor: '#71ACCE',
        paddingVertical: 15,
        width: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        marginBottom: 15,
    },
    signUpText: {
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center',
        marginTop: 20,
    },
    signUpLink: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007bff',
        textAlign: 'center',
    },
});

export default LoginScreen;
