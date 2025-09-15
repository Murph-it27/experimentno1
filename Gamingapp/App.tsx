import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';

// Color options for the game
const allColors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink', 'brown', 'cyan', 'lime'];

const App = () => {
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30); // Default to 30 seconds
  const [targetColor, setTargetColor] = useState('');
  const [displayColor, setDisplayColor] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState('Easy'); // Default difficulty

  // Difficulty settings
  const difficultySettings = {
    Easy: { timeLimit: 30, colorSet: allColors.slice(0, 5) },  // 5 colors for easy mode
    Medium: { timeLimit: 20, colorSet: allColors.slice(0, 7) }, // 7 colors for medium mode
    Hard: { timeLimit: 15, colorSet: allColors }, // 10 colors for hard mode
  };

  // Select the color set and time limit based on the difficulty
  const { timeLimit, colorSet } = difficultySettings[difficulty];

  // Generate random color and text
  const generateNewColor = () => {
    const randomColor = colorSet[Math.floor(Math.random() * colorSet.length)];
    const randomTextColor = colorSet[Math.floor(Math.random() * colorSet.length)];

    setTargetColor(randomColor);
    setDisplayColor(randomTextColor);
  };

  // Start a new game
  const startGame = () => {
    setScore(0);
    setTimer(timeLimit);
    setGameOver(false);
    generateNewColor();

    // Start the countdown timer
    const countdown = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime === 1) {
          clearInterval(countdown);
          setGameOver(true);
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  // Handle color tap
  const handleColorTap = (color: string) => {
    if (color === targetColor) {
      setScore(score + 1);
    } else {
      setScore(score - 1); // Penalty for wrong answer
    }
    generateNewColor();
  };

  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(() => generateNewColor(), 1000); // Change color every second
      return () => clearInterval(interval); // Clean up interval on game over
    }
  }, [gameOver]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tap the Color Game</Text>

      {!gameOver ? (
        <>
          <Text style={styles.timer}>Time Left: {timer}s</Text>
          <Text style={styles.score}>Score: {score}</Text>

          <View style={styles.colorContainer}>
            <Text
              style={[styles.colorText, { color: displayColor }]}
              onPress={() => handleColorTap(displayColor)}>
              {targetColor}
            </Text>
          </View>

          <Text style={styles.instruction}>Tap the color name!</Text>
        </>
      ) : (
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>Game Over!</Text>
          <Text style={styles.finalScore}>Your Score: {score}</Text>
          <TouchableOpacity onPress={startGame} style={styles.restartButton}>
            <Text style={styles.buttonText}>Play Again</Text>
          </TouchableOpacity>
        </View>
      )}

      {!gameOver && (
        <View style={styles.buttonContainer}>
          {colorSet.map((color) => (
            <TouchableOpacity
              key={color}
              onPress={() => handleColorTap(color)}
              style={[styles.colorButton, { backgroundColor: color }]}>
              <Text style={styles.buttonText}>{color}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {!gameOver && (
        <View style={styles.difficultyContainer}>
          <Text style={styles.difficultyText}>Choose Difficulty:</Text>
          <Button title="Easy" onPress={() => setDifficulty('Easy')} />
          <Button title="Medium" onPress={() => setDifficulty('Medium')} />
          <Button title="Hard" onPress={() => setDifficulty('Hard')} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  timer: {
    fontSize: 24,
    marginBottom: 10,
  },
  score: {
    fontSize: 24,
    marginBottom: 20,
  },
  colorContainer: {
    marginBottom: 30,
  },
  colorText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  instruction: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  gameOverContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 36,
    color: 'red',
  },
  finalScore: {
    fontSize: 24,
    marginBottom: 20,
  },
  restartButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  colorButton: {
    width: 100,
    height: 100,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  difficultyContainer: {
    marginTop: 20,
  },
  difficultyText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default App;
