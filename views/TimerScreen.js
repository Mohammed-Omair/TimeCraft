import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { MaterialIcons } from '@expo/vector-icons';
import { Modal, Button, VStack, HStack, Center, NativeBaseProvider, Box } from 'native-base';

import backgroundImage from '../assets/focus.png'

const focusTimes = { '15 mins': 15 * 60, '25 mins': 25 * 60, '30 mins': 30 * 60, '45 mins': 45 * 60, '1 hour': 60 * 60 };
const breakTimes = { '5 mins': 5 * 60, '10 mins': 10 * 60, '15 mins': 15 * 60, '20 mins': 20 * 60, '30 mins': 30 * 60 };

const PomodoroTimer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [workTime, setWorkTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [timerType, setTimerType] = useState('work');

  const convertTimeToSeconds = (time) => parseInt(time);

  const getButtonStyle = (time, currentTime) => ({
    backgroundColor: time === currentTime ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.3)',
    padding: 10,
    borderRadius: 20,
    width: '45%', // Adjust width to fit two buttons per row
    alignItems: 'center',
    justifyContent: 'center'
  });

  const startTimer = (type) => {
    setIsPlaying(true);
    setTimerType(type);
    setKey(prevKey => prevKey + 1);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setKey(prevKey => prevKey + 1);
  };

  const handleSaveTime = () => {
    setModalVisible(false);
  };

  return (
    <NativeBaseProvider>
      <View style={{ flex: 1 }}>
        <ImageBackground source={backgroundImage} style={styles.background}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
              <MaterialIcons name="settings" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.timerWrapper}>
            <CountdownCircleTimer
              key={key}
              isPlaying={isPlaying}
              duration={timerType === 'work' ? workTime : breakTime}
              colors={['#FFFFFF']}
              trailColor="rgba(255, 255, 255, 0.2)"
              strokeWidth={2}
              trailStrokeWidth={2}
              size={300}
              strokeLinecap="round"
            >
              {({ remainingTime }) => (
                <Text style={styles.remainingTime}>
                  {Math.floor(remainingTime / 3600).toString().padStart(2, '0')}:
                  {Math.floor((remainingTime % 3600) / 60).toString().padStart(2, '0')}:
                  {Math.floor(remainingTime % 60).toString().padStart(2, '0')}
                </Text>
              )}
            </CountdownCircleTimer>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.button, timerType === 'work' ? { backgroundColor: 'rgba(255, 255, 255, 0.5)' } : {}]}
              onPress={() => startTimer('work')}
            >
              <MaterialIcons name="work" size={32} color={timerType === 'work' ? 'black' : 'white'} />
              <Text style={styles.buttonText}>Focus</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, timerType === 'break' ? { backgroundColor: 'rgba(255, 255, 255, 0.5)' } : {}]}
              onPress={() => startTimer('break')}
            >
              <MaterialIcons name="free-breakfast" size={32} color={timerType === 'break' ? 'black' : 'white'} />
              <Text style={styles.buttonText}>Break</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleReset}>
              <MaterialIcons name="refresh" size={32} color="white" />
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* Modal for custom time settings */}
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Set Custom Times</Modal.Header>
            <Modal.Body>
              <VStack space={4}>
                <Text>Focus Time:</Text>
                <HStack space={2} justifyContent="center" alignItems="center" flexWrap="wrap">
                  {Object.entries(focusTimes).map(([label, seconds]) => (
                    <Button key={label}
                      variant="subtle"
                      colorScheme={workTime === seconds ? "primary" : "coolGray"}
                      onPress={() => setWorkTime(seconds)}
                      m={1} // margin for spacing between buttons
                    >
                      {label}
                    </Button>
                  ))}
                </HStack>
                <Text>Break Time:</Text>
                <HStack space={2} justifyContent="center" alignItems="center" flexWrap="wrap">
                  {Object.entries(breakTimes).map(([label, seconds]) => (
                    <Button key={label}
                      variant="subtle"
                      colorScheme={breakTime === seconds ? "primary" : "coolGray"}
                      onPress={() => setBreakTime(seconds)}
                      m={1} // margin for spacing between buttons
                    >
                      {label}
                    </Button>
                  ))}
                </HStack>
              </VStack>
            </Modal.Body>
            <Modal.Footer>
              <Box flex={1} flexDirection="row" justifyContent="space-between" alignItems="center">
                <Button flex={1} variant="ghost" colorScheme="blueGray" onPress={() => setModalVisible(false)}>
                  Cancel
                </Button>
                <Button flex={1} onPress={handleSaveTime}>
                  Save
                </Button>
              </Box>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 48,
  },
  header: {
    width: '100%',
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  editButton: {
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
  },
  timerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  remainingTime: {
    fontSize: 48,
    color: 'white',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingBottom: 48,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 25,
    minWidth: 120, // Ensure all buttons have at least this width for better alignment
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 8,
  },
});

export default PomodoroTimer;