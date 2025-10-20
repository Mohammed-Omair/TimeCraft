import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../../../context';

import styles from './taskInfoStyle';

import { useNavigation } from '@react-navigation/native';
import { getFirestore, doc, updateDoc, deleteDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function TaskInfo({ task }) {
  const { dispatch } = useContext(AuthContext);
  const [isCompleting, setIsCompleting] = useState(false);
  const [isUncompleting, setIsUncompleting] = useState(false);

  const navigation = useNavigation();


  useEffect(() => {
    if (isCompleting || isUncompleting) {
      const timer = setTimeout(() => {
        dispatch({
          type: 'TOGGLE_TASK',
          payload: { taskId: task.id },
        });
        setIsCompleting(false);
        setIsUncompleting(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isCompleting, isUncompleting, dispatch, task.id]);


  const handleEditTask = () => {
    // Navigate to EditTaskScreen with task data
    navigation.navigate('EditTaskScreen', { task });
  };

  const handleDeleteTask = async () => {
    const db = getFirestore();
    let taskRef;

    const storedAuthState = await AsyncStorage.getItem('authState');
    if (storedAuthState) {
      const { isAuthenticated, user } = JSON.parse(storedAuthState);
      if (isAuthenticated && user) {
        taskRef = doc(db, user.email, task.id.toString()); // Ensure task.id is a string if it's not already
      }
    }

    try {
        await deleteDoc(taskRef);
    } catch (error) {
        console.error("Error deleting task:", error);
    }
};

  const handleToggleTask = async () => {
    const db = getFirestore();

    let taskRef;

    const storedAuthState = await AsyncStorage.getItem('authState');
    if (storedAuthState) {
      const { isAuthenticated, user } = JSON.parse(storedAuthState);
      if (isAuthenticated && user) {
        taskRef = doc(db, user.email, task.id.toString()); // Ensure task.id is a string if it's not already
      }
    }

    const newProgress = task.progress === 100 ? 0 : 100;

    // Set component state to loading
    setIsCompleting(true);

    try {
      await updateDoc(taskRef, {
        progress: newProgress
      });
    } catch (error) {
      console.error("Error updating task progress:", error);
    }
  };


  const getCheckboxIcon = () => {
    if (isCompleting || (task.progress === 100 && !isUncompleting)) {
      return <MaterialCommunityIcons name="check" size={24} color="green" />;
    } else {
      return <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="grey" />;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        (isCompleting || (task.progress === 100 && !isUncompleting)) && styles.dimmed,
        isUncompleting && styles.undimmed
      ]}
      onPress={handleToggleTask}
      disabled={isCompleting || isUncompleting}
    >
      <View style={styles.infoContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.taskTitle} numberOfLines={1} ellipsizeMode="tail">
            {task?.title}
          </Text>
          <Text style={styles.taskDescription} numberOfLines={1} ellipsizeMode="tail">
            {task?.description}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          {getCheckboxIcon()}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={handleEditTask}>
          <MaterialCommunityIcons name="pencil-outline" size={24} color="black" />
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteTask}>
          <MaterialCommunityIcons name="trash-can-outline" size={24} color="red" />
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default TaskInfo;