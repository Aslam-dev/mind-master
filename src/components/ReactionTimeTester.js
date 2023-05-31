import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const ReactionTimeTester = () => {
  const [timeStarted, setTimeStarted] = useState(false);
  const [reactionTime, setReactionTime] = useState(0);
  const [title, setTitle] = useState('Wait for the screen to turn green!');

  const handlePress = () => {
    if (!timeStarted) {
      // alert("Wait for the screen to turn green!");
    } else {
      const endTime = new Date().getTime();
      const timeDiff = endTime - timeStarted;
      setReactionTime(timeDiff);
      setTimeStarted(false);
    }
  };

  useEffect(() => {
    let timer;
    if (timeStarted) {
      timer = setTimeout(() => {
        // alert("Tap now!");
        setTitle('Tap now!');
        setTimeStarted(new Date().getTime());
      }, Math.random() * 5000 + 2000);
    }

    return () => clearTimeout(timer);
  }, [timeStarted]);

  const handleStart = () => {
    if (!timeStarted) {
      // alert("Get ready!");
      setTitle('Get ready!');
      setTimeout(() => {
        // alert("Tap now!");
        setTitle('Tap now!');
        setTimeStarted(new Date().getTime());
      }, Math.random() * 3000 + 1000);
    }
  };

  const handleReset = () => {
    setTimeStarted(false);
    setReactionTime(0);
    setTitle('Wait for the screen to turn green!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity
        style={timeStarted ? styles.screenGreen : styles.screenRed}
        onPress={handlePress}
        disabled={!timeStarted}
      >
        {timeStarted ? (
          <Text style={styles.buttonText}>Tap!</Text>
        ) : (
          <Text style={styles.buttonText}>Wait for green</Text>
        )}
      </TouchableOpacity>

      {timeStarted ? (
        <Text style={styles.reactionText}>Reaction Time: Tap to stop</Text>
      ) : (
        <Text style={styles.reactionText}>
          Reaction Time: {reactionTime} milliseconds
        </Text>
      )}

      <TouchableOpacity style={styles.startButton} onPress={handleStart}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
  },
  screenRed: {
    width: 200,
    height: 200,
    backgroundColor: 'red',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenGreen: {
    width: 200,
    height: 200,
    backgroundColor: 'green',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  reactionText: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 10,
  },
  startButton: {
    width: 100,
    height: 40,
    backgroundColor: 'blue',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  resetButton: {
    width: 100,
    height: 40,
    backgroundColor: 'gray',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ReactionTimeTester;
