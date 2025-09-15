import React, { useEffect, useState } from 'react';
import './App.css';

type CardType = {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const EMOJIS = ['🐶', '🐱', '🐵', '🐸', '🐙', '🐧', '🦄', '🐝'];

const shuffleArray = (array: any[]) => {
  return [...array]
    .concat([...array]) // Duplicate for pairs
    .map((item, index) => ({
      id: index,
      emoji: item,
      isFlipped: false,
      isMatched: false
    }))
    .sort(() => Math.random() - 0.5);
};

const App: React.FC = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<CardType[]>([]);
  const [moves, setMoves] = useState(0);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setCards(shuffleArray(EMOJIS));
  }, []);

  const handleCardClick = (card: CardType) => {
    if (disabled || card.isFlipped || card.isMatched) return;

    const flipped = [...flippedCards, { ...card, isFlipped: true }];
    const updatedCards = cards.map((c) =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    );

    setCards(updatedCards);
    setFlippedCards(flipped);

    if (flipped.length === 2) {
      setDisabled(true);
      setMoves((prev) => prev + 1);

      setTimeout(() => {
        const [first, second] = flipped;
        if (first.emoji === second.emoji) {
          // It's a match!
          setCards((prev) =>
            prev.map((c) =>
              c.emoji === first.emoji ? { ...c, isMatched: true } : c
            )
          );
        } else {
          // Not a match, flip back
          setCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === second.id
                ? { ...c, isFlipped: false }
                : c
            )
          );
        }

        setFlippedCards([]);
        setDisabled(false);
      }, 1000);
    }
  };

  const resetGame = () => {
    setCards(shuffleArray(EMOJIS));
    setFlippedCards([]);
    setMoves(0);
    setDisabled(false);
  };

  return (
    <div className="App">
      <h1>🧠 Memory Match Game</h1>
      <p>Moves: {moves}</p>

      <div className="grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${card.isFlipped || card.isMatched ? 'flipped' : ''}`}
            onClick={() => handleCardClick(card)}
          >
            <div className="card-inner">
              <div className="card-front">❓</div>
              <div className="card-back">{card.emoji}</div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={resetGame}>🔁 Restart</button>
    </div>
  );
};

export default App;
