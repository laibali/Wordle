import { useEffect, useState } from 'react'
import './App.css'
import words from './words.js'

function App() {
  const resetGame = () => {
    setSecretWord(words[Math.floor(Math.random() * words.length)]);

    setCurrentGuess([
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ]);

    setResults([
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
  ]);

    setCurrentRow(0);
    setCurrentCol(0);
    setGameOver(false);
    setKeyboardColors({});
  };
  
  
  const [keyboardColors, setKeyboardColors] = useState({});
  const keyColor = (letter, color) => {
    setKeyboardColors(prev => ({
      ...prev,
      [letter]: color
    }));
  };

  const setColor = (letter) => {
    return keyboardColors[letter] || "#d3d6da";
  };
  const [gameOver, setGameOver] = useState(false);
  const [secretWord, setSecretWord] = useState(
    words[Math.floor(Math.random() * words.length)]
  );
  const getFrequency = () => {
    const frequency = {};
    for (let char of secretWord) {
      frequency[char] = (frequency[char] || 0) + 1;
    }
    return frequency;
  }
  const [currentGuess, setCurrentGuess] = useState(
    [
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ]);
  const [results, setResults] = useState(
    [
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ]
  );
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const handleLetter = (letter) => {
    if (gameOver) return;
    const newGuess = currentGuess.map(row => [...row]);
    newGuess[currentRow][currentCol] = letter;
    setCurrentGuess(newGuess);

    if (currentCol < 4) {
      setCurrentCol(currentCol + 1);
    }
    
  };
  const handleErase = () => {
    if (gameOver) return;
    const newGuess = currentGuess.map(row => [...row]);
    if (currentGuess[currentRow][currentCol] !== "") {
      newGuess[currentRow][currentCol] = "";
      setCurrentGuess(newGuess); }
    else if (currentCol > 0) {
      newGuess[currentRow][currentCol - 1] = "";
      setCurrentGuess(newGuess);
      setCurrentCol(currentCol - 1);
    }
  };
  const handleEnter = () => {
    if (gameOver) return;
    const guess = currentGuess[currentRow].join("");
    console.log("Current guess:", guess);
    if (guess.length < 5) {
      alert("Please enter a 5-letter word.");
      return;
    }
    const result = ["", "", "", "", ""];
    if (guess === secretWord) {
      result.fill("correct");
      const newResults = results.map(row => [...row]);
      newResults[currentRow] = result;
      setResults(newResults);
      setGameOver(true);
      return;
    }
    const secretfreq = getFrequency();
    for (let i = 0; i < 5; i++) {
      if (guess[i] === secretWord[i]) {
        result[i] = "correct";
        secretfreq[guess[i]]--;
        keyColor(guess[i], "#05b61f")
      }
    }
    for (let i = 0; i < 5; i++) {
      if (result[i] === "correct") continue;
      else if (guess[i] != secretWord[i] && secretWord.includes(guess[i]) && secretfreq[guess[i]] > 0) {
        result[i] = "present";
        secretfreq[guess[i]] -= 1
        keyColor(guess[i], "#f0f034")
      }
      else {
        result[i] = "absent";
        // change the color of the letter in the keyboard to gray
        keyColor(guess[i], "#6f7b89")
      }
    }
    const newResults = results.map(row => [...row]);
    newResults[currentRow] = result;
    setResults(newResults);
    if (currentRow === 5) {
      alert("Game Over! The secret word was: " + secretWord);
      setGameOver(true);
    }
    else {
      setCurrentRow(currentRow + 1);
      setCurrentCol(0);
    }
  };

  useEffect(() => {
  const handleKeyDown = (event) => {
    const key = event.key.toUpperCase();

    if (key === "ENTER") {
      handleEnter();
    }
    else if (key === "BACKSPACE") {
      handleErase();
    }
    else if (/^[A-Z]$/.test(key)) {
      handleLetter(key);
    }
  }; document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    }, [currentGuess, currentRow, currentCol, gameOver]);

  return (
    <div>
      <h1 className="title">Wordle</h1>
      <div className='board'> 
        {[0,1,2,3,4,5].map((row) => (
          <div className="row"> 
            {[0,1,2,3,4].map((col) => (
            <div className={`tile ${results[row][col]}`}>
              {currentGuess[row][col]}
            </div> ))}
          </div> ))}
      </div>

      <div className="keyboard">
        <div className="key-row">
          {"QWERTYUIOP".split("").map((letter) => (
            <button onClick={() => handleLetter(letter)} style={{ backgroundColor: setColor(letter) }}>
              {letter}
            </button>
          ))}
        </div>

        <div className="key-row">
          {"ASDFGHJKL".split("").map((letter) => (
            <button onClick={() => handleLetter(letter)} style={{ backgroundColor: setColor(letter) }}>
              {letter}
            </button>
          ))}
        </div>

        <div className="key-row">
          <button onClick={handleEnter} className="special-key">
            Enter
          </button>

          {"ZXCVBNM".split("").map((letter) => (
            <button onClick={() => handleLetter(letter)} style={{ backgroundColor: setColor(letter) }}>
              {letter}
            </button>
          ))}
          
          <button onClick={handleErase} className="special-key">
            Delete
          </button>

        </div>

      </div>
      
      {gameOver && (
        <button className="play-again" onClick={resetGame}>
          Play Again
        </button>
      )}

    </div>
  );
}

export default App;
