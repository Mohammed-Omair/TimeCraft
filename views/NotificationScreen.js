import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, ImageBackground } from 'react-native';
import { Checkbox } from 'native-base';
import background from '../assets/background.png';

const NotificationsScreen = () => {
    // State to track whether notifications are on or off
    const [notificationsOn, setNotificationsOn] = useState(false);

    // Handler to toggle notifications state
    const toggleNotifications = (value) => {
        setNotificationsOn(value);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={background} style={styles.background}>
                <Text style={styles.header}>Notifications Settings</Text>
                <View style={styles.content}>
                    <Text style={styles.languageText}>On</Text>
                    <Checkbox 
                        isChecked={notificationsOn}
                        onChange={() => toggleNotifications(true)}
                        accessibilityLabel="Toggle Notifications ON"
                    />
                </View>
                <View style={styles.content}>
                    <Text style={styles.languageText}>Off</Text>
                    <Checkbox 
                        isChecked={!notificationsOn}
                        onChange={() => toggleNotifications(false)}
                        accessibilityLabel="Toggle Notifications OFF"
                    />
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4'
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 20,
        color: '#333',
        marginBottom: 10
    },
    content: {
        margin: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    languageText: {
        fontSize: 18,
        color: '#666'
    },
    background: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },
});

export default NotificationsScreen;
