# 🍏 Memory Match Game

An interactive, responsive memory training game built from scratch using pure JavaScript, CSS, and HTML as part of the RS School training task.

## 🚀 Deployment (Live Demo)
You can play the game live here: [https://diana-dedo.github.io/memory-game/]

## ✨ Key Features
- **Pure JavaScript DOM Generation:** The `<body>` tag in `index.html` remains empty. The entire interface, score counters, buttons, game board, and modal windows are dynamically created using `document.createElement()` and DOM manipulation, avoiding `innerHTML` and `insertAdjacentHTML`.
- **Reusable Modal System:** Both the Victory window and Leaderboard use a single object-oriented component factory (`createModal()`), completely reusing overlay logic and close handlers without code duplication.
- **LocalStorage Database:** Player scores (number of moves and dates) are formatted, sorted, and saved in `localStorage`, retaining the Top-10 scores between browser refreshes.
- **Robust Asynchronous Logic:** Pressing "New Game" during a card-flip delay instantly triggers `clearTimeout`, aborting the past session cleanly without pending timer artifacts.
- **Responsive Layout:** Tailored with professional CSS Grid and relative viewport units (`vw`/`vh`) to fit seamlessly on mobile devices in a single scroll-free interface.

## 🛠️ Local Installation & Launch

To run this project locally on your machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   ```
2. **Navigate into the project folder:**
   ```bash
   cd memory-game
   ```
3. **Launch the application:**
   - Open the `index.html` file directly in your browser.
   - *Alternative (Recommended):* Right-click `index.html` inside VS Code and select **"Open with Live Server"** to host the page with hot-reload features enabled.

## 📜 Fisher-Yates Array Shuffle Note
The array items are shuffled randomly using the standard **Fisher-Yates Shuffle Algorithm** right before the DOM card injection loop. Layout randomness can be easily verified by refreshing the browser tab or inspecting the generated card nodes inside Chrome Developer Tools (`F12`).
