import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator
} from "react-native";
import shortid from "shortid";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from "../context";
import { TabScreenHeader, TaskInfo } from "../components";
import { formatCurrentDate } from "../utils/DataHelper";
import { collection, getFirestore, query, where, onSnapshot } from "firebase/firestore";

import splash from "../assets/splash.png";

const Tab = createMaterialTopTabNavigator();

function TaskTab({ filter }) {
  const { state } = useContext(AuthContext);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    const userEmail = state.user.email; // Assuming user email is stored in the state
    const tasksCollection = collection(db, userEmail);
    const q = query(tasksCollection, where("progress", filter === "Ongoing" ? "<" : "==", 100));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(tasksData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching tasks: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [filter]);

  const renderEmptyComponent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#71ACCE" />;
    } else if (tasks.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text>No tasks {filter.toLowerCase()} yet.</Text>
          <Image source={splash} style={styles.image} />
        </View>
      );
    }
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.tasksBody}>
        <View style={styles.tasksList}>
          {tasks.length > 0
            ? tasks.map((task) => (
                <TaskInfo task={task} key={shortid.generate()} />
              ))
            : renderEmptyComponent()}
        </View>
      </ScrollView>
      <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate('Tasks')}
        >
          <MaterialCommunityIcons
            name="plus-circle"
            size={60}
            color="lightblue"
          />
        </TouchableOpacity>
    </>
  );
}

function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TabScreenHeader
        leftComponent={() => (
          <View style={styles.flexRow}>
            <Text style={styles.headerLeftText}>{formatCurrentDate()}</Text>
            <MaterialCommunityIcons
              name="calendar-month-outline"
              size={20}
              color="#000"
            />
          </View>
        )}
        isMoreBtnVisible={true}
      />
      <Tab.Navigator>
        <Tab.Screen
          name="Ongoing"
          children={() => <TaskTab filter="Ongoing" />}
        />
        <Tab.Screen
          name="Completed"
          children={() => <TaskTab filter="Completed" />}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  headerLeftText: {
    color: "#000",
    marginRight: 5,
    fontWeight: "bold",
    fontSize: 15,
  },
  tasksBody: {
    flex: 1,
  },
  addButton: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 50,
  },
  addButtonText: {
    color: "#71ACCE",
    fontSize: 30,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
  tasksList: {
    marginBottom: 50,
  },
  createButton: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});

export default HomeScreen;
