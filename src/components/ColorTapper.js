
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const ColorTapper = () => {
  const [score, setScore] = useState(0);
  const [color, setColor] = useState('red');
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  const handleTap = () => {
    if (color === 'green' && !gameOver) {
      setScore(score + 1);
    }
    randomizeColor();
  };

  const randomizeColor = () => {
    const colors = ['red', 'blue', 'green', 'yellow'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(randomColor);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        setGameOver(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleReset = () => {
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timeLeftText}>Time Left: {timeLeft} seconds</Text>
      <Text style={styles.scoreText}>Score: {score}</Text>
      {!gameOver ? (
        <TouchableOpacity
          style={[styles.screen, { backgroundColor: color }]}
          onPress={handleTap}
        >
          <Text style={styles.buttonText}>Tap Me!</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>Game Over!</Text>
          <Text style={styles.finalScoreText}>Final Score: {score}</Text>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.buttonText}>Play Again</Text>
          </TouchableOpacity>
        </View>
      )}
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
  timeLeftText: {
    fontSize: 24,
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 24,
    marginBottom: 20,
  },
  screen: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  gameOverContainer: {
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 24,
    marginBottom: 20,
  },
  finalScoreText: {
    fontSize: 24,
    marginBottom: 20,
  },
  resetButton: {
    width: 120,
    height: 40,
    backgroundColor: 'gray',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ColorTapper;