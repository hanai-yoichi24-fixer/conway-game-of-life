# Conway's Game of Life

An interactive implementation of Conway's cellular automaton, a zero-player game that evolves based on simple rules.

## Features

- **Interactive Grid**: Click cells to toggle them alive/dead
- **Auto Simulation**: Run the game automatically with adjustable speed
- **Step Control**: Advance one generation at a time
- **Random Generation**: Fill grid with random pattern
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
- **Speed Slider**: Control simulation speed
- **Click Cells**: Toggle individual cells

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
