import React, { useState, useContext } from 'react';
import { Image, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Box, Input, NativeBaseProvider, VStack } from 'native-base';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../context";  // Make sure this path is correct
import auth from "../firebaseConfig";

const { width, height } = Dimensions.get('window');

const SignupScreen = () => {
    const navigation = useNavigation();
    const { dispatch } = useContext(AuthContext);  // Use useContext to access dispatch
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const createUser = () => {
        if (password !== confirmPassword) {
            Alert.alert("Passwords do not match");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // Dispatch login action with the user object
                dispatch({
                    type: 'LOGIN',
                    payload: user
                });
                // Navigate to Home upon successful signup
            })
            .catch((error) => {
                const errorMessage = error.message;
                Alert.alert(errorMessage);
            });
    };

    return (
        <NativeBaseProvider>
            <ScrollView contentContainerStyle={styles.container}>
                <Image
                    source={require('../assets/timecraft_logo.png')}
                    style={styles.logo}
                />
                <Text style={styles.signInText}>Sign Up to Continue</Text>

                <VStack space={2} alignItems="center" mb='10' mt='10'>
                    <Text style={styles.inputLabel}>Email</Text>
                    <Input
                        variant="underlined"
                        size="lg"
                        style={styles.inputBox}
                        onChangeText={setEmail}
                    />
                </VStack>

                <VStack space={2} alignItems="center" mb='10'>
                    <Text style={styles.inputLabel}>Password</Text>
                    <Input
                        variant="underlined"
                        size="lg"
                        style={styles.inputBox}
                        secureTextEntry={true}
                        onChangeText={setPassword}
                    />
                </VStack>

                <VStack space={2} alignItems="center">
                    <Text style={styles.inputLabel}>Confirm Password</Text>
                    <Input
                        variant="underlined"
                        size="lg"
                        style={styles.inputBox}
                        secureTextEntry={true}
                        onChangeText={setConfirmPassword}
                    />
                </VStack>

                <Box style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button2} onPress={createUser}>
                        <Text style={styles.buttonText2}>Sign Up</Text>
                    </TouchableOpacity>
                </Box>
            </ScrollView>
        </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
        padding: 10
    },
    logo: {
        width: width * 0.4, 
        height: height * 0.2, 
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: height * 0.05,
    },
    signInText: {
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        alignSelf: 'flex-start'
    },
    inputBox: {
        width: '90%',
        maxWidth: 400
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 30,
    },
    button2: {
        flexDirection: 'row',
        backgroundColor: '#71ACCE',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#71ACCE',
        maxWidth: 400
    },
    buttonText2: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        color: '#FFFFFF'
    },
});

export default SignupScreen;
