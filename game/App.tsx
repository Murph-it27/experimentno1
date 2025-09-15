import React, { useEffect, useState } from 'react';
import './App.css';

const HOLE_COUNT = 9;
const GAME_DURATION = 20000; // 30 seconds
const MOLE_SHOW_TIME = 500; // Mole appears for 800ms

type Hole = {
  hasMole: boolean;
  id: number;
};

function App() {
  const [holes, setHoles] = useState<Hole[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION / 1000);
  const [isGameRunning, setIsGameRunning] = useState(false);

  useEffect(() => {
    // Initialize holes
    const initialHoles = Array.from({ length: HOLE_COUNT }, (_, i) => ({
      hasMole: false,
      id: i,
    }));
    setHoles(initialHoles);
  }, []);

  useEffect(() => {
    if (!isGameRunning) return;

    const gameInterval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(gameInterval);
          setIsGameRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const moleInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * HOLE_COUNT);
      setHoles(prev =>
        prev.map((hole, i) =>
          i === randomIndex ? { ...hole, hasMole: true } : hole
        )
      );

      setTimeout(() => {
        setHoles(prev =>
          prev.map((hole, i) =>
            i === randomIndex ? { ...hole, hasMole: false } : hole
          )
        );
      }, MOLE_SHOW_TIME);
    }, 1000);

    return () => {
      clearInterval(gameInterval);
      clearInterval(moleInterval);
    };
  }, [isGameRunning]);

  const whackMole = (index: number) => {
    if (!isGameRunning) return;

    setHoles(prev => {
      if (prev[index].hasMole) {
        setScore(score + 1);
        const newHoles = [...prev];
        newHoles[index].hasMole = false;
        return newHoles;
      }
      return prev;
    });
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION / 1000);
    setIsGameRunning(true);
  };

  return (
    <div className="App">
      <h1>🐹 Whack-a-Mole</h1>
      <div>
        <button onClick={startGame} disabled={isGameRunning}>
          {isGameRunning ? 'Game in Progress...' : 'Start Game'}
        </button>
      </div>
      <h2>Score: {score}</h2>
      <h2>Time Left: {timeLeft}s</h2>
      <div className="grid">
        {holes.map((hole, index) => (
          <div
            key={hole.id}
            className="hole"
            onClick={() => whackMole(index)}
          >
            {hole.hasMole && <span className="mole">🐹</span>}
          </div>
        ))}
      </div>
      {!isGameRunning && timeLeft === 0 && (
        <h2>🎉 Game Over! Final Score: {score}</h2>
      )}
    </div>
  );
}

export default App;
