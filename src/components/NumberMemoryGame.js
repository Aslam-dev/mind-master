
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const NumberMemoryGame = () => {
  const [score, setScore] = useState(0);
  const [number, setNumber] = useState('');
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    generateNumber();
  }, []);

  const generateNumber = () => {
    const randomNumber = Math.floor(Math.random() * 10);
    setNumber(randomNumber.toString());
    setGameOver(false);
  };

  const handlePress = (pressedNumber) => {
    if (pressedNumber === number) {
      setScore(score + 1);
      generateNumber();
    } else {
      setGameOver(true);
    }
  };

  const renderButtons = () => {
    const buttons = [];

    for (let i = 0; i < 10; i++) {
      buttons.push(
        <TouchableOpacity
          key={i}
          style={styles.button}
          onPress={() => handlePress(i.toString())}
          disabled={gameOver}
        >
          <Text style={styles.buttonText}>{i}</Text>
        </TouchableOpacity>
      );
    }

    return buttons;
  };

  const renderGameStatus = () => {
    if (gameOver) {
      return (
        <Text style={styles.gameOverText}>
          Game Over! Your Score: {score}
        </Text>
      );
    }

    return <Text style={styles.scoreText}>Score: {score}</Text>;
  };

  return (
    <View style={styles.container}>
      {renderGameStatus()}
      <Text style={styles.numberText}>{number}</Text>
      <View style={styles.buttonContainer}>{renderButtons()}</View>
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
  scoreText: {
    fontSize: 24,
    marginBottom: 20,
  },
  gameOverText: {
    fontSize: 24,
    marginBottom: 20,
    color: 'red',
  },
  numberText: {
    fontSize: 48,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    width: 80,
    height: 80,
    margin: 10,
    backgroundColor: '#eaeaea',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
  },
});

export default NumberMemoryGame;