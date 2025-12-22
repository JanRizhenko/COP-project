export const calculateMinMoves = (n) => {
  return Math.pow(2, n) - 1;
};

export const isValidMove = (rod, disk) => {
  if (rod.length === 0) return true;
  return rod[rod.length - 1] > disk;
};

export const checkWin = (targetRod, totalDisks) => {
  return targetRod.length === totalDisks;
};

export const initializeRods = (diskCount) => {
  const firstRod = Array.from({ length: diskCount }, (_, i) => diskCount - i);
  return [firstRod, [], []];
};

export const moveDisk = (rods, fromRod, toRod) => {
  return null;
};

export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const calculateEfficiency = (actualMoves, minMoves) => {
  if (actualMoves === 0) return 0;
  return Math.round((minMoves / actualMoves) * 100);
};

export const DIFFICULTY_LEVELS = {
  EASY: 3,
  MEDIUM: 4,
  HARD: 5,
  EXPERT: 6,
  MASTER: 7
};

export const ROD_LABELS = ['A', 'B', 'C'];
