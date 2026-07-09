# Conway's Game of Life

An interactive implementation of Conway's cellular automaton, a zero-player game that evolves based on simple rules.

## Features

- **Interactive Grid**: Click cells to toggle them alive/dead
- **Auto Simulation**: Run the game automatically with adjustable speed
- **Step Control**: Advance one generation at a time
- **Random Generation**: Fill grid with random pattern
- **Famous Patterns**: One-click placement of classic patterns:
  - 🛸 **Glider** - Moves diagonally across the grid
  - 💫 **Blinker** - Oscillates with period 2
  - ◼️ **Block** - Static stable pattern
  - 🐸 **Toad** - Oscillates with period 2
  - 🔔 **Beacon** - Oscillates with period 2
  - ✨ **Pulsar** - Complex oscillator with period 3
  - 🌿 **Garden of Eden** - A configuration with no parent state
- **Clear**: Reset the grid
- **Live Counter**: Track number of alive cells

## Rules

1. Any live cell with 2 or 3 live neighbors survives
2. Any dead cell with exactly 3 live neighbors becomes alive
3. All other cells die or stay dead

## Controls

- **Play/Pause**: Start or stop the simulation
- **Step**: Advance one generation
- **Random**: Fill grid with random pattern
- **Clear**: Reset all cells to dead
- **Place Pattern**: Click any pattern button to place it in the center
- **Speed Slider**: Control simulation speed (1-100)
- **Click Cells**: Toggle individual cells manually

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to play.

## Build & Deploy

```bash
npm run build
npm start
```

## Patterns Explained

- **Glider**: A 5-cell pattern that travels diagonally. One of the most interesting patterns in GoL.
- **Blinker**: The smallest oscillator. Toggles between horizontal and vertical every generation.
- **Block**: A 2×2 square. Completely stable and does not change.
- **Toad**: A period-2 oscillator with 6 cells. Creates a pleasing bouncing animation.
- **Beacon**: A period-2 oscillator made of two blocks touching at corners.
- **Pulsar**: A famous period-3 oscillator with 48 cells. Creates a complex pulsing pattern.
- **Garden of Eden** (10×10, 56 cells): Discovered in 2011 by Marijn Heule et al. This is one of the smallest known Orphan patterns - a configuration that has **no parent configuration**. In other words, no previous generation in any evolution can produce this state. It can only occur as an initial condition. This makes it a fascinating example of the Garden of Eden theorem in cellular automata!

## Fun Experiments

Try combining patterns or placing gliders to interact with other structures! Experiment with:
- Multiple gliders colliding with each other
- Placing patterns inside the Garden of Eden
- Creating your own patterns with manual cell placement
- Observing how the Garden of Eden evolves - it will transform but can never be recreated from any other state
