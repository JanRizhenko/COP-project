import { useState, useMemo } from 'react';

export const useStartPage = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const difficulties = useMemo(() => [
    { level: 3, label: 'Easy', description: '3 disks', minMoves: 7 },
    { level: 4, label: 'Medium', description: '4 disks', minMoves: 15 },
    { level: 5, label: 'Hard', description: '5 disks', minMoves: 31 },
    { level: 6, label: 'Expert', description: '6 disks', minMoves: 63 },
    { level: 7, label: 'Master', description: '7 disks', minMoves: 127 }
  ], []);

  const selectDifficulty = (level) => {
    setSelectedDifficulty(level);
  };

  return {
    difficulties,
    selectedDifficulty,
    selectDifficulty
  };
};
