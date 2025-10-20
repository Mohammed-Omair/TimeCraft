import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Platform, KeyboardAvoidingView, ScrollView, Text } from 'react-native';
import { VStack, FormControl, Input, Button, TextArea } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AuthContext } from '../context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const EditTaskScreen = () => {
    const { dispatch, state } = useContext(AuthContext);
    const navigation = useNavigation();
    const route = useRoute();
    const task = route.params?.task;

    const [taskTitle, setTaskTitle] = useState(task?.title || '');
    const [taskDescription, setTaskDescription] = useState(task?.description || '');
    const [taskDeadline, setTaskDeadline] = useState(new Date(task?.deadline) || new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleSaveTask = async () => {
        const db = getFirestore();
        const taskRef = doc(db, state.user.email, task.id.toString());

        const updates = {
            title: taskTitle,
            description: taskDescription,
            deadline: taskDeadline.toISOString().split('T')[0],
        };

        try {
            await updateDoc(taskRef, updates);
            navigation.goBack();
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleCancel = () => {
        navigation.goBack();
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || taskDeadline;
        setShowDatePicker(Platform.OS === 'ios');
        setTaskDeadline(currentDate);
    };

    useEffect(() => {
        if (task) {
            setTaskTitle(task.title);
            setTaskDescription(task.description);
            setTaskDeadline(new Date(task.deadline));
        }
    }, [task]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.heading}>Edit Task</Text>
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
                        <Button size='lg' style={styles.saveButton} onPress={handleSaveTask} _text={{ fontWeight: 'bold' }}>
                            Save Changes
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

export default EditTaskScreen;
