import React, { useState, useEffect } from 'react';
import { StyleSheet, Platform, KeyboardAvoidingView, ScrollView, Text, ActivityIndicator } from 'react-native';
import { VStack, FormControl, Input, Button, TextArea } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const CreateTaskScreen = () => {
  const navigation = useNavigation();
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDeadline, setTaskDeadline] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false); // State to manage loading
  const [userCollection, setUserCollection] = useState('defaultTasks'); // Default collection if user is not found

  useEffect(() => {
    const fetchUser = async () => {
      const storedAuthState = await AsyncStorage.getItem('authState');
      if (storedAuthState) {
        const { isAuthenticated, user } = JSON.parse(storedAuthState);
        if (isAuthenticated && user) {
          setUserCollection(user.email); // Assuming 'name' is the field on the user object
        }
      }
    };

    fetchUser();
  }, []);

  const handleSaveTask = async () => {
    setLoading(true); // Start loading
    const db = getFirestore();

    try {
      await addDoc(collection(db, userCollection), {
        title: taskTitle,
        description: taskDescription,
        deadline: taskDeadline.toISOString().split('T')[0],
        progress: 0, // Initial progress
      });
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      console.error("Error adding task: ", error);
      // Handle errors as needed
    }
    setLoading(false); // End loading
  };

  const handleCancel = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || taskDeadline;
    setShowDatePicker(Platform.OS === 'ios');
    setTaskDeadline(currentDate);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.heading}>Create New Task</Text>
        <VStack space={5} style={styles.vStack}>
          <FormControl isRequired>
            <FormControl.Label>Title</FormControl.Label>
            <Input
              placeholder="Enter task title"
              value={taskTitle}
              onChangeText={setTaskTitle}
              style={styles.input}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Description</FormControl.Label>
            <TextArea
              h={20}
              placeholder="Enter task description"
              value={taskDescription}
              onChangeText={setTaskDescription}
              style={styles.textArea}
            />
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>Deadline</FormControl.Label>
            <Button onPress={() => setShowDatePicker(true)} variant="outline">
              {taskDeadline.toLocaleDateString()}
            </Button>
            {showDatePicker && (
              <DateTimePicker
                value={taskDeadline}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </FormControl>
          <VStack space={2} mt={5}>
            <Button size='lg' style={styles.saveButton} onPress={handleSaveTask} _text={{ fontWeight: 'bold' }} isDisabled={loading}>
              {loading ? <ActivityIndicator size="small" color="#fff" /> : 'Save Task'}
            </Button>
            <Button
              mt={5}
              style={styles.cancelButton}
              onPress={handleCancel}
              size='lg'
              _text={{ color: '#FFFFFF', fontWeight: 'bold' }}
            >
              Cancel
            </Button>
          </VStack>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#DFF3FD',
  },
  contentContainer: {
    paddingVertical: 20,
  },
  vStack: {
    space: 2,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderRadius: 10,
    fontSize: 16,
  },
  textArea: {
    borderRadius: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#71ACCE',
    borderRadius: 10,
  },
  cancelButton: {
    backgroundColor: '#cb5151',
    borderRadius: 10,
  },
});

export default CreateTaskScreen;
