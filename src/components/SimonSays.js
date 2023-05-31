import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const SimonSays = () => {
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [remainingTime, setRemainingTime] = useState(500);

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    if (remainingTime === 0) {
      setGameOver(true);
    } else {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [remainingTime]);

  const startGame = () => {
    setSequence([]);
    setUserSequence([]);
    setScore(0);
    setGameOver(false);
    setRemainingTime(500);
    playNextSequence();
  };

  const playNextSequence = () => {
    const nextNumber = Math.floor(Math.random() * 4);
    const newSequence = [...sequence, nextNumber];
    setSequence(newSequence);
    setUserSequence([]);
    playSequence(newSequence);
  };

  const playSequence = async (sequence) => {
    for (let i = 0; i < sequence.length; i++) {
      await delay(1000);
      highlightButton(sequence[i]);
      await delay(500);
      unhighlightButton(sequence[i]);
    }
  };

  const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const highlightButton = (index) => {
    // Highlight the button with the given index
    // (0: red, 1: blue, 2: green, 3: yellow)
  };

  const unhighlightButton = (index) => {
    // Unhighlight the button with the given index
    // (0: red, 1: blue, 2: green, 3: yellow)
  };

  const handlePress = (index) => {
    if (gameOver) {
      startGame();
      return;
    }

    highlightButton(index);
    setTimeout(() => {
      unhighlightButton(index);
      checkUserInput(index);
    }, 200);
  };

  const checkUserInput = (index) => {
    const updatedUserSequence = [...userSequence, index];
    setUserSequence(updatedUserSequence);

    for (let i = 0; i < updatedUserSequence.length; i++) {
      if (updatedUserSequence[i] !== sequence[i]) {
        setGameOver(true);
        return;
      }
    }

    if (updatedUserSequence.length === sequence.length) {
      setScore(score + 1);
      playNextSequence();
    }
  };

  const renderButtons = () => {
    const buttons = [];

    for (let i = 0; i < 4; i++) {
      buttons.push(
        <TouchableOpacity
          key={i}
          style={[styles.button, { backgroundColor: getColor(i) }]}
          onPress={() => handlePress(i)}
          disabled={gameOver}
        />
      );
    }

    return buttons;
  };

  const getColor = (index) => {
    let color;

    switch (index) {
      case 0:
        color = '#FF0000'; // Red
        break;
      case 1:
        color = '#0000FF'; // Blue
        break;
      case 2:
        color = '#00FF00'; // Green
        break;
      case 3:
        color = '#FFFF00'; // Yellow
        break;
      default:
        color = '#FFFFFF'; // White (Fallback color)
    }

    return color;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.remainingTimeText}>Remaining Time: {remainingTime}</Text>
      <Text style={styles.scoreText}>Score: {score}</Text>
      <View style={styles.buttonsContainer}>{renderButtons()}</View>
      {gameOver && (
        <TouchableOpacity style={styles.restartButton} onPress={startGame}>
          <Text style={styles.restartButtonText}>Restart</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  remainingTimeText: {
    fontSize: 24,
    marginBottom: 20,
    color: '#FFFFFF',
  },
  scoreText: {
    fontSize: 24,
    marginBottom: 20,
    color: '#FFFFFF',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 10,
  },
  restartButton: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#CCCCCC',
    borderRadius: 5,
  },
  restartButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
});

export default SimonSays;