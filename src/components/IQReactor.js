import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const IQReactor = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameOverMessage, setGameOverMessage] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        handleGameOver();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handlePress = () => {
    setScore(score + 1);
  };

  const handleGameOver = () => {
    setGameOverMessage(`Game Over! Your score: ${score}`);
    setScore(0);
    setTimeLeft(10);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>IQ Reactor</Text>
      <Text style={styles.scoreText}>Score: {score}</Text>
      <Text style={styles.timeText}>Time Left: {timeLeft}</Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Press Me!</Text>
      </TouchableOpacity>
      {gameOverMessage ? <Text style={styles.gameOver}>{gameOverMessage}</Text> : null}
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
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 24,
    marginBottom: 20,
  },
  timeText: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    width: 200,
    height: 40,
    backgroundColor: '#eaeaea',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
  gameOver: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'red',
  },
});

export default IQReactor;
