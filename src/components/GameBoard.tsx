"use client";

import { useState, useCallback, useRef, useEffect } from "react";

const GRID_SIZE = 50;
const CELL_SIZE = 12;

type Grid = boolean[][];
type Pattern = { row: number; col: number }[];

const createEmptyGrid = (): Grid => {
  return Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill(false));
};

const createRandomGrid = (): Grid => {
  return Array(GRID_SIZE)
    .fill(null)
    .map(() =>
      Array(GRID_SIZE)
        .fill(null)
        .map(() => Math.random() > 0.7)
    );
};

const countLiveNeighbors = (grid: Grid, row: number, col: number): number => {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      const newRow = (row + i + GRID_SIZE) % GRID_SIZE;
      const newCol = (col + j + GRID_SIZE) % GRID_SIZE;
      if (grid[newRow][newCol]) count++;
    }
  }
  return count;
};

const stepSimulation = (grid: Grid): Grid => {
  const newGrid = createEmptyGrid();
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      const liveNeighbors = countLiveNeighbors(grid, row, col);
      const isAlive = grid[row][col];

      if (isAlive && (liveNeighbors === 2 || liveNeighbors === 3)) {
        newGrid[row][col] = true;
      } else if (!isAlive && liveNeighbors === 3) {
        newGrid[row][col] = true;
      }
    }
  }
  return newGrid;
};

// Famous patterns
const PATTERNS = {
  glider: [
    { row: 0, col: 1 },
    { row: 1, col: 2 },
    { row: 2, col: 0 },
    { row: 2, col: 1 },
    { row: 2, col: 2 },
  ] as Pattern,
  blinker: [
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: 2 },
  ] as Pattern,
  block: [
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 1, col: 0 },
    { row: 1, col: 1 },
  ] as Pattern,
  toad: [
    { row: 0, col: 1 },
    { row: 0, col: 2 },
    { row: 0, col: 3 },
    { row: 1, col: 0 },
    { row: 1, col: 1 },
    { row: 1, col: 2 },
  ] as Pattern,
  beacon: [
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 1, col: 0 },
    { row: 2, col: 2 },
    { row: 2, col: 3 },
    { row: 3, col: 3 },
  ] as Pattern,
  pulsar: [
    { row: 0, col: 2 },
    { row: 0, col: 3 },
    { row: 0, col: 4 },
    { row: 0, col: 8 },
    { row: 0, col: 9 },
    { row: 0, col: 10 },
    { row: 2, col: 0 },
    { row: 2, col: 5 },
    { row: 2, col: 10 },
    { row: 3, col: 0 },
    { row: 3, col: 5 },
    { row: 3, col: 10 },
    { row: 4, col: 0 },
    { row: 4, col: 5 },
    { row: 4, col: 10 },
    { row: 5, col: 2 },
    { row: 5, col: 3 },
    { row: 5, col: 4 },
    { row: 5, col: 8 },
    { row: 5, col: 9 },
    { row: 5, col: 10 },
    { row: 8, col: 2 },
    { row: 8, col: 3 },
    { row: 8, col: 4 },
    { row: 8, col: 8 },
    { row: 8, col: 9 },
    { row: 8, col: 10 },
    { row: 10, col: 0 },
    { row: 10, col: 5 },
    { row: 10, col: 10 },
  ] as Pattern,
  garden: [
    { row: 0, col: 3 },
    { row: 1, col: 0 },
    { row: 1, col: 1 },
    { row: 1, col: 2 },
    { row: 2, col: 0 },
    { row: 2, col: 2 },
    { row: 3, col: 3 },
    { row: 4, col: 3 },
  ] as Pattern,
};

export default function GameBoard() {
  const [grid, setGrid] = useState<Grid>(createEmptyGrid());
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(100);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setGrid((prevGrid) => stepSimulation(prevGrid));
    }, 101 - speed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, speed]);

  const toggleCell = useCallback((row: number, col: number) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((r) => [...r]);
      newGrid[row][col] = !newGrid[row][col];
      return newGrid;
    });
  }, []);

  const placePattern = useCallback((pattern: Pattern) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((r) => [...r]);
      const startRow = Math.floor(GRID_SIZE / 2);
      const startCol = Math.floor(GRID_SIZE / 2);

      pattern.forEach((cell) => {
        const r = (startRow + cell.row) % GRID_SIZE;
        const c = (startCol + cell.col) % GRID_SIZE;
        newGrid[r][c] = true;
      });

      return newGrid;
    });
    setIsRunning(false);
  }, []);

  const handleReset = useCallback(() => {
    setGrid(createEmptyGrid());
    setIsRunning(false);
  }, []);

  const handleRandom = useCallback(() => {
    setGrid(createRandomGrid());
    setIsRunning(false);
  }, []);

  const handleStep = useCallback(() => {
    setGrid((prevGrid) => stepSimulation(prevGrid));
  }, []);

  const countAlive = grid.reduce(
    (sum, row) => sum + row.filter((cell) => cell).length,
    0
  );

  return (
    <div className="container">
      <h1>Conway&apos;s Game of Life</h1>

      <div className="controls">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={isRunning ? "btn btn-stop" : "btn btn-play"}
        >
          {isRunning ? "⏸ Pause" : "▶ Play"}
        </button>
        <button onClick={handleStep} className="btn">
          ⏭ Step
        </button>
        <button onClick={handleRandom} className="btn">
          🎲 Random
        </button>
        <button onClick={handleReset} className="btn btn-danger">
          🗑 Clear
        </button>
      </div>

      <div className="patterns">
        <label>🎨 Place Pattern:</label>
        <div className="pattern-buttons">
          <button
            onClick={() => placePattern(PATTERNS.glider)}
            className="btn btn-pattern"
            title="Glider - moves diagonally"
          >
            🛸 Glider
          </button>
          <button
            onClick={() => placePattern(PATTERNS.blinker)}
            className="btn btn-pattern"
            title="Blinker - period 2"
          >
            💫 Blinker
          </button>
          <button
            onClick={() => placePattern(PATTERNS.block)}
            className="btn btn-pattern"
            title="Block - static"
          >
            ◼️ Block
          </button>
          <button
            onClick={() => placePattern(PATTERNS.toad)}
            className="btn btn-pattern"
            title="Toad - period 2"
          >
            🐸 Toad
          </button>
          <button
            onClick={() => placePattern(PATTERNS.beacon)}
            className="btn btn-pattern"
            title="Beacon - period 2"
          >
            🔔 Beacon
          </button>
          <button
            onClick={() => placePattern(PATTERNS.pulsar)}
            className="btn btn-pattern"
            title="Pulsar - period 3"
          >
            ✨ Pulsar
          </button>
          <button
            onClick={() => placePattern(PATTERNS.garden)}
            className="btn btn-pattern"
            title="Garden of Eden - no parent configuration"
          >
            🌿 Garden
          </button>
        </div>
      </div>

      <div className="settings">
        <label>
          Speed: <span>{speed}</span>
          <input
            type="range"
            min="1"
            max="100"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
        </label>
      </div>

      <div className="stats">
        <p>Live Cells: <strong>{countAlive}</strong> / {GRID_SIZE * GRID_SIZE}</p>
      </div>

      <div
        className="grid"
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((isAlive, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`cell ${isAlive ? "alive" : ""}`}
              style={{
                width: CELL_SIZE,
                height: CELL_SIZE,
              }}
              onClick={() => toggleCell(rowIndex, colIndex)}
            />
          ))
        )}
      </div>

      <div className="info">
        <p>Click cells to toggle them. Press Play to run the simulation.</p>
      </div>
    </div>
  );
}
