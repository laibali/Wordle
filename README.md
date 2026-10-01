Wordle
A recreation of the Wordle web game built with React. This project started as a way for me to refresh on React by initially coding the game in Python (wordle.py) and then implementing that same logic in Reacy.

## Play the Game
**[Play Wordle](https://laibali.github.io/Wordle/)**

## Features
* 6 attempts to guess a 5-letter word
* On-screen and physical keyboard support
* Letter feedback based on Wordle's rules
* Handles duplicate letters correctly
* Visual keyboard feedback for previously guessed letters
* Reset/new game functionality

## Tech Stack
* **React**
* **JavaScript**
* **Vite**
* **CSS**
* **GitHub Pages**

## What I Learned

I built this project to relearn React from the ground up. I started with a Python version of Wordle and then recreated it as a web application.
Through the project, I learned how to work with:
* React state and `useState`
* `useEffect` and keyboard event listeners
* Event handling
* Conditional rendering
* Managing game state across multiple components
* Handling duplicate letters in word comparisons
* Deploying a React application with GitHub Pages

One of the more challenging parts was implementing keyboard controls while keeping React state and event listeners synchronized. Working through that issue helped me better understand how React's state and effects interact.

## Running Locally
Clone the repository and install the dependencies:
```bash
git clone https://github.com/laibali/Wordle.git
cd Wordle
npm install
npm run build
npm run dev
```

Then open the local URL provided by Vite in your browser.

## Future Improvements
* Add statistics for wins, losses, and guess distribution
* Add a share-results feature
* Add animations and additional visual feedback
* Add difficulty or custom game modes
* Add word validity check
